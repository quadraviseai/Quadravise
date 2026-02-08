from rest_framework import permissions, views, viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import connections
from django.db.models import Count, Sum, F
from django.db.models.functions import TruncMonth
from django.db.utils import OperationalError
from django.conf import settings
from django.utils import timezone
from django.db.migrations.recorder import MigrationRecorder
import os

from authentication.permissions import IsAdmin
from .models import Account, Contact, Deal, Task, ContactNote, FinanceTransaction, TransactionAudit, FinanceAIReport
from .serializers import (
    AccountSerializer, 
    ContactSerializer, 
    DealSerializer, 
    TaskSerializer,
    ContactNoteSerializer,
    FinanceTransactionSerializer,
    TransactionAuditSerializer,
    FinanceAIReportSerializer
)


class FinanceTransactionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Finance Transactions
    """
    serializer_class = FinanceTransactionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['description', 'category']
    ordering_fields = ['date', 'amount', 'created_at']
    ordering = ['-date', '-created_at']

    def get_queryset(self):
        # Users can only see their own transactions
        queryset = FinanceTransaction.objects.filter(owner=self.request.user)
        
        # Period Filtering
        period = self.request.query_params.get('period', None)
        if period:
            now = timezone.now()
            if period == 'month':
                queryset = queryset.filter(date__year=now.year, date__month=now.month)
            elif period == 'quarter':
                # Determine current quarter
                quarter = (now.month - 1) // 3 + 1
                start_month = (quarter - 1) * 3 + 1
                queryset = queryset.filter(date__year=now.year, date__month__gte=start_month, date__month__lt=start_month + 3)
            elif period == 'year':
                queryset = queryset.filter(date__year=now.year)
                
        return queryset

    def perform_create(self, serializer):
        comment = self.request.data.get('comment', 'Initial transaction creation.')
        instance = serializer.save(owner=self.request.user)
        
        # Record Audit
        TransactionAudit.objects.create(
            transaction_id=instance.id,
            action='CREATE',
            comment=comment,
            user=self.request.user,
            data_snapshot=serializer.data
        )

    def perform_update(self, serializer):
        comment = self.request.data.get('comment')
        if not comment:
            from rest_framework.exceptions import ValidationError
            raise ValidationError({"comment": "A comment is mandatory for editing a transaction."})
            
        instance = serializer.save()
        
        # Record Audit
        TransactionAudit.objects.create(
            transaction_id=instance.id,
            action='EDIT',
            comment=comment,
            user=self.request.user,
            data_snapshot=serializer.data
        )

    def destroy(self, request, *pk, **kwargs):
        instance = self.get_object()
        comment = request.data.get('comment') or request.query_params.get('comment')
        
        if not comment:
            from rest_framework.exceptions import ValidationError
            raise ValidationError({"comment": "A comment is mandatory for deleting a transaction."})
            
        # Record Audit before deletion
        TransactionAudit.objects.create(
            transaction_id=instance.id,
            action='DELETE',
            comment=comment,
            user=request.user,
            data_snapshot=FinanceTransactionSerializer(instance).data
        )
        
        return super().destroy(request, *pk, **kwargs)

    @action(detail=True, methods=['get'])
    def audit_log(self, request, pk=None):
        """
        Get the audit history for a specific transaction
        """
        audits = TransactionAudit.objects.filter(transaction_id=pk).order_by('-timestamp')
        serializer = TransactionAuditSerializer(audits, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def all_audits(self, request):
        """
        Get all finance audits (for the timeline)
        """
        audits = TransactionAudit.objects.all().order_by('-timestamp')[:50]
        serializer = TransactionAuditSerializer(audits, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def summary(self, request):
        """
        Get totals for income, expense and balance
        """
        from django.db.models import Sum
        
        queryset = self.get_queryset()
        income = queryset.filter(type='income').aggregate(total=Sum('amount'))['total'] or 0
        expense = queryset.filter(type='expense').aggregate(total=Sum('amount'))['total'] or 0
        
        return Response({
            "totalIncome": float(income),
            "totalExpenses": float(expense),
            "balance": float(income - expense)
        })

class HealthCheckView(views.APIView):
    permission_classes = [IsAdmin] # Admin only

    def get(self, request):
        db_conn = connections['default']
        db_connected = False
        try:
            db_conn.cursor()
            db_connected = True
        except OperationalError:
            db_connected = False
        
        last_migration = "Unknown"
        try:
            last_migration = MigrationRecorder.Migration.objects.latest("applied").name
        except Exception:
            pass
            
        return Response({
            "env_name": "Development" if settings.DEBUG else "Production",
            "db_connected": db_connected,
            "db_host": os.getenv('DB_HOST', '127.0.0.1'),
            "db_port": os.getenv('DB_PORT', '5432'),
            "db_name": os.getenv('DB_NAME', 'unknown'),
            "migration_version": last_migration,
            "server_time": timezone.now()
        })


class FinanceAIReportViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Finance AI Reports
    """
    serializer_class = FinanceAIReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FinanceAIReport.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=False, methods=['get'])
    def latest(self, request):
        """
        Get the latest financial report for the current user
        """
        report = self.get_queryset().first()
        if report:
            serializer = self.get_serializer(report)
            return Response(serializer.data)
        return Response({"detail": "No reports found"}, status=404)


class AccountViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Accounts
    Provides CRUD operations: list, create, retrieve, update, partial_update, destroy
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    filterset_fields = ['status', 'industry']
    search_fields = ['company_name', 'email']
    ordering_fields = ['company_name', 'created_at', 'status']
    ordering = ['-created_at']
    
    def get_queryset(self):
        """
        Optionally filter accounts by status, industry, or owner
        """
        queryset = Account.objects.all()
        
        # Filter by status
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)
        
        # Filter by industry
        industry = self.request.query_params.get('industry', None)
        if industry:
            queryset = queryset.filter(industry__icontains=industry)
        
        # Filter by owner
        owner_id = self.request.query_params.get('owner', None)
        if owner_id:
            queryset = queryset.filter(owner__id=owner_id)
        
        # Search by company name
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(company_name__icontains=search)
        
        return queryset
    
    def perform_create(self, serializer):
        """
        Automatically set the owner to the current user when creating an account
        Also create a primary contact if contact person info is provided.
        """
        account = serializer.save(owner=self.request.user)
        
        # Debug logging
        print(f"[DEBUG] Account created: {account.company_name}")
        print(f"[DEBUG] Contact person name: {account.contact_person_name}")
        print(f"[DEBUG] Contact person phone: {account.contact_person_phone}")
        
        # Auto-create a Contact record for the primary contact person
        if account.contact_person_name:
            contact = Contact.objects.create(
                account=account,
                name=account.contact_person_name,
                phone=account.contact_person_phone or "",
                email=account.email, # Default to account email as we don't have separate contact email in form yet
                role="Primary Contact"
            )
            print(f"[DEBUG] Contact created: {contact.name} (ID: {contact.id})")
        else:
            print("[DEBUG] No contact person name provided, skipping contact creation")


class ContactViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Contacts
    """
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'email', 'account__company_name']
    ordering_fields = ['name', 'created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = Contact.objects.all()
        # Filter by account if provided
        account_id = self.request.query_params.get('account', None)
        if account_id:
            queryset = queryset.filter(account__id=account_id)
        return queryset
    
    @action(detail=True, methods=['get'])
    def timeline(self, request, pk=None):
        """
        Get unified activity timeline for a contact
        """
        from rest_framework.decorators import action
        from rest_framework.response import Response
        from django.db import models
        
        contact = self.get_object()
        activities = []
        
        # 1. Get related tasks (through account or tagged)
        if contact.account:
            tasks = Task.objects.filter(account=contact.account).order_by('-created_at')[:10]
            
            for task in tasks:
                activities.append({
                    'id': task.id,
                    'type': 'task',
                    'title': task.title,
                    'description': task.description or '',
                    'timestamp': task.created_at.isoformat(),
                    'user': task.assigned_to.email if task.assigned_to else 'Unassigned',
                    'metadata': {
                        'priority': task.priority,
                        'status': task.status,
                        'due_date': task.due_date.isoformat() if task.due_date else None
                    }
                })
        
        # 2. Get related deals (through account)
        if contact.account:
            deals = Deal.objects.filter(account=contact.account).order_by('-created_at')[:10]
            for deal in deals:
                activities.append({
                    'id': deal.id,
                    'type': 'deal',
                    'title': deal.name,
                    'description': f"${deal.amount} - {deal.stage}",
                    'timestamp': deal.created_at.isoformat(),
                    'user': deal.owner.email if deal.owner else 'Unassigned',
                    'metadata': {
                        'amount': str(deal.amount),
                        'stage': deal.stage,
                        'close_date': deal.close_date.isoformat() if deal.close_date else None
                    }
                })
        
        # 3. Get notes
        notes = contact.notes.all()[:10]
        for note in notes:
            activities.append({
                'id': note.id,
                'type': note.type or 'note',
                'title': note.title if note.type == 'mom' and note.title else ('Email Logged' if note.type == 'email' else 'Note added'),
                'description': note.content,
                'timestamp': note.created_at.isoformat(),
                'user': note.created_by.email if note.created_by else 'System',
                'metadata': {
                    'title': note.title,
                    'type': note.type
                }
            })
        
        # Sort by timestamp
        activities.sort(key=lambda x: x['timestamp'], reverse=True)
        
        return Response(activities[:20])  # Return top 20 most recent


class DealViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Deals
    """
    queryset = Deal.objects.all()
    serializer_class = DealSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'account__company_name']
    ordering_fields = ['amount', 'close_date', 'created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = Deal.objects.all()
        
        # Filter by account
        account_id = self.request.query_params.get('account', None)
        if account_id:
            queryset = queryset.filter(account__id=account_id)
            
        # Filter by stage
        stage = self.request.query_params.get('stage', None)
        if stage:
            queryset = queryset.filter(stage=stage)
            
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        # Auto-set close_date to today if stage is marked as 'Won' and date is missing
        instance = serializer.save()
        if instance.stage == 'Won' and not instance.close_date:
            instance.close_date = timezone.now().date()
            instance.save()


class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Tasks
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'account__company_name']
    ordering_fields = ['due_date', 'priority', 'status', 'created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = Task.objects.all()
        
        # Filter by account
        account_id = self.request.query_params.get('account', None)
        if account_id:
            queryset = queryset.filter(account__id=account_id)
            
        # Filter by status
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)
            
        # Filter by assigned user
        assigned_to = self.request.query_params.get('assigned_to', None)
        if assigned_to:
            if assigned_to == 'me':
                queryset = queryset.filter(assigned_to=self.request.user)
            else:
                queryset = queryset.filter(assigned_to__id=assigned_to)
                
        return queryset

    def perform_create(self, serializer):
        task = serializer.save()
        self._create_notifications(task)

    def perform_update(self, serializer):
        task = serializer.save()
        self._create_notifications(task)

    def _create_notifications(self, task):
        """Helper to create notifications for assigned/tagged users"""
        recipients = set()
        if task.assigned_to and task.assigned_to != self.request.user:
            recipients.add(task.assigned_to)
        
        for user in task.tagged_users.all():
            if user != self.request.user:
                recipients.add(user)
        
        for recipient in recipients:
            Notification.objects.create(
                recipient=recipient,
                message=f"You have been tagged/assigned to task: {task.title}",
                link=f"/crm/tasks/" # Frontend route to handle task details
            )

from .models import Notification
from .serializers import NotificationSerializer

class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Notifications (Read-Only matching requirement)
    """
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Notification.objects.filter(recipient=self.request.user).order_by('-created_at')

class ContactNoteViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Contact Notes
    """
    queryset = ContactNote.objects.all()
    serializer_class = ContactNoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    pagination_class = None
    
    def get_queryset(self):
        queryset = ContactNote.objects.all()
        contact_id = self.request.query_params.get('contact', None)
        if contact_id:
            queryset = queryset.filter(contact__id=contact_id)
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class DashboardViewSet(viewsets.ViewSet):
    """
    ViewSet for Dashboard aggregation data.
    """
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def summary(self, request):
        """
        Returns high-level stats: Total Accounts, Open Deals, Pending Tasks, Revenue (Won Deals)
        """
        # 1. Accounts Count
        total_accounts = Account.objects.count()
        new_accounts_this_month = Account.objects.filter(
            created_at__month=timezone.now().month, 
            created_at__year=timezone.now().year
        ).count()

        # 2. Open Deals (Not Won or Lost)
        open_deals_count = Deal.objects.exclude(stage__in=['Won', 'Lost']).count()
        open_deals_value = Deal.objects.exclude(stage__in=['Won', 'Lost']).aggregate(total=Sum('amount'))['total'] or 0

        # 3. Pending Tasks
        pending_tasks = Task.objects.exclude(status='Done').filter(assigned_to=request.user).count()

        # 4. Won Revenue (All time or specific period)
        revenue = Deal.objects.filter(stage='Won').aggregate(total=Sum('amount'))['total'] or 0

        return Response({
            "accounts": {
                "total": total_accounts,
                "new_this_month": new_accounts_this_month
            },
            "deals": {
                "open_count": open_deals_count,
                "open_value": open_deals_value
            },
            "tasks": {
                "pending_my_tasks": pending_tasks
            },
            "revenue": {
                "total_won": revenue
            }
        })

    @action(detail=False, methods=['get'])
    def sales_chart(self, request):
        """
        Returns aggregated Deal Revenue (Won) over the last 6-12 months.
        """
        # Get last 6 months
        end_date = timezone.now()
        start_date = end_date - timezone.timedelta(days=180)

        sales_data = Deal.objects.filter(
            stage='Won',
            close_date__gte=start_date
        ).annotate(
            month=TruncMonth('close_date')
        ).values('month').annotate(
            total_sales=Sum('amount'),
            count=Count('id')
        ).order_by('month')

        chart_data = []
        for entry in sales_data:
            chart_data.append({
                "name": entry['month'].strftime("%b"), # Mon, Tue... or Jan, Feb
                "full_date": entry['month'].strftime("%Y-%m-%d"),
                "revenue": entry['total_sales'],
                "deals_count": entry['count']
            })

        return Response(chart_data)

    @action(detail=False, methods=['get'])
    def pipeline_status(self, request):
        """
        Returns count of deals in each stage.
        """
        pipeline = Deal.objects.values('stage').annotate(
            count=Count('id'),
            total_value=Sum('amount')
        ).order_by('-total_value')

        return Response(pipeline)

    @action(detail=False, methods=['get'])
    def task_overview(self, request):
        """
        Returns tasks breakdown by Status and Priority.
        """
        tasks_by_status = Task.objects.values('status').annotate(count=Count('id'))
        tasks_by_priority = Task.objects.values('priority').annotate(count=Count('id'))

        return Response({
            "by_status": tasks_by_status,
            "by_priority": tasks_by_priority
        })

