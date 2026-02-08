from rest_framework import serializers
from .models import Account, Contact, Deal, Task, Notification, ContactNote, FinanceTransaction, TransactionAudit, FinanceAIReport
from django.contrib.auth import get_user_model

User = get_user_model()

class FinanceTransactionSerializer(serializers.ModelSerializer):
    """
    Serializer for FinanceTransaction model
    """
    owner_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = FinanceTransaction
        fields = [
            'id',
            'date',
            'description',
            'category',
            'amount',
            'type',
            'owner',
            'owner_name',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'owner', 'owner_name', 'created_at', 'updated_at']

    def get_owner_name(self, obj):
        if obj.owner:
            if obj.owner.first_name and obj.owner.last_name:
                return f"{obj.owner.first_name} {obj.owner.last_name}"
            return obj.owner.email
        return "Unknown"

class AccountSerializer(serializers.ModelSerializer):
    """
    Serializer for Account model
    """
    owner_name = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Account
        fields = [
            'id',
            'company_name',
            'industry',
            'website',
            'email',
            'phone',
            'address',
            'city',
            'state',
            'country',
            'contact_person_name',
            'contact_person_phone',
            'lead_source',
            'service_requirement',
            'owner',
            'owner_name',
            'status',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'owner', 'owner_name', 'created_at', 'updated_at']
    
    def get_owner_name(self, obj):
        """Return the owner's full name or email"""
        if obj.owner:
            if obj.owner.first_name and obj.owner.last_name:
                return f"{obj.owner.first_name} {obj.owner.last_name}"
            return obj.owner.email
        return "Unassigned"
    
    def validate_company_name(self, value):
        """Validate company name is not empty"""
        if not value or not value.strip():
            raise serializers.ValidationError("Company name is required")
        return value.strip()
    
    def validate_industry(self, value):
        """Validate industry is not empty"""
        if not value or not value.strip():
            raise serializers.ValidationError("Industry is required")
        return value.strip()
    
    def validate_country(self, value):
        """Validate country is not empty"""
        if not value or not value.strip():
            raise serializers.ValidationError("Country is required")
        return value.strip()
    

    def validate_lead_source(self, value):
        """Validate lead source is not empty"""
        if not value or not value.strip():
            raise serializers.ValidationError("Lead source is required")
        return value.strip()


class ContactSerializer(serializers.ModelSerializer):
    """
    Serializer for Contact model
    """
    account_name = serializers.CharField(source='account.company_name', read_only=True)
    
    class Meta:
        model = Contact
        fields = [
            'id',
            'account',
            'account_name',
            'name',
            'title',
            'email',
            'phone',
            'role',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class DealSerializer(serializers.ModelSerializer):
    """
    Serializer for Deal model
    """
    account_name = serializers.CharField(source='account.company_name', read_only=True)
    owner_name = serializers.SerializerMethodField(read_only=True)
    open_task_count = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Deal
        fields = [
            'id',
            'account',
            'account_name',
            'name',
            'amount',
            'stage',
            'close_date',
            'owner',
            'owner_name',
            'open_task_count',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'owner', 'owner_name', 'open_task_count', 'created_at', 'updated_at']

    def get_owner_name(self, obj):
        """Return the owner's full name or email"""
        if obj.owner:
            if obj.owner.first_name and obj.owner.last_name:
                return f"{obj.owner.first_name} {obj.owner.last_name}"
            return obj.owner.email
        return "Unassigned"
    
    def get_open_task_count(self, obj):
        """Count tasks not in 'Done' or 'Completed' status"""
        # Using filter directly on related manager
        return obj.tasks.exclude(status__in=['Done', 'Completed']).count()

class TaskSerializer(serializers.ModelSerializer):
    """
    Serializer for Task model
    """
    account_name = serializers.CharField(source='account.company_name', read_only=True)
    deal_name = serializers.CharField(source='deal.name', read_only=True)
    assigned_to_name = serializers.SerializerMethodField(read_only=True)
    tagged_users_details = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'description',
            'due_date',
            'priority',
            'status',
            'account',
            'account_name',
            'deal',
            'deal_name',
            'assigned_to',
            'assigned_to_name',
            'tagged_users',
            'tagged_users_details',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'assigned_to_name', 'tagged_users_details', 'created_at', 'updated_at']
        extra_kwargs = {
            'tagged_users': {'required': False}
        }

    def get_assigned_to_name(self, obj):
        """Return the assigned user's full name or email"""
        if obj.assigned_to:
            if obj.assigned_to.first_name and obj.assigned_to.last_name:
                return f"{obj.assigned_to.first_name} {obj.assigned_to.last_name}"
            return obj.assigned_to.email
        return "Unassigned"
    
    def get_tagged_users_details(self, obj):
        """Return list of tagged users with id and name"""
        users = []
        for user in obj.tagged_users.all():
            name = user.email
            if user.first_name and user.last_name:
                name = f"{user.first_name} {user.last_name}"
            users.append({'id': user.id, 'name': name})
        return users

from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    """
    Serializer for Notification model
    """
    recipient_name = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Notification
        fields = [
            'id',
            'recipient',
            'recipient_name',
            'message',
            'link',
            'is_read',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']
    
    def get_recipient_name(self, obj):
        """Return the recipient's full name or email"""
        if obj.recipient:
            if obj.recipient.first_name and obj.recipient.last_name:
                return f"{obj.recipient.first_name} {obj.recipient.last_name}"
            return obj.recipient.email
        return "Unknown"

class ContactNoteSerializer(serializers.ModelSerializer):
    """
    Serializer for ContactNote model
    """
    created_by_name = serializers.SerializerMethodField()
    
    class Meta:
        model = ContactNote
        fields = ['id', 'contact', 'title', 'content', 'type', 'created_by', 'created_by_name', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']
    
    def get_created_by_name(self, obj):
        if obj.created_by:
            if obj.created_by.first_name and obj.created_by.last_name:
                return f"{obj.created_by.first_name} {obj.created_by.last_name}"
            return obj.created_by.email
        return 'System'
class TransactionAuditSerializer(serializers.ModelSerializer):
    """
    Serializer for TransactionAudit model
    """
    user_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = TransactionAudit
        fields = [
            'id',
            'transaction_id',
            'action',
            'comment',
            'user',
            'user_name',
            'data_snapshot',
            'timestamp',
        ]
        read_only_fields = ['id', 'user', 'user_name', 'timestamp']

    def get_user_name(self, obj):
        if obj.user:
            if obj.user.first_name and obj.user.last_name:
                return f"{obj.user.first_name} {obj.user.last_name}"
            return obj.user.email
        return "Unknown"

class FinanceAIReportSerializer(serializers.ModelSerializer):
    """
    Serializer for FinanceAIReport model
    """
    class Meta:
        model = FinanceAIReport
        fields = ['id', 'report_data', 'created_at']
        read_only_fields = ['id', 'created_at']
