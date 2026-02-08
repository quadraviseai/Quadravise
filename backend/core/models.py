from django.db import models
from django.conf import settings

class Account(models.Model):
    """
    Account model representing companies/organizations in the CRM
    """
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Onboarding', 'Onboarding'),
        ('Inactive', 'Inactive'),
        ('On Hold', 'On Hold'),
    ]

    SERVICE_TYPE_CHOICES = [
        ('Website Development', 'Website Development'),
        ('Website Maintenance', 'Website Maintenance'),
        ('Mobile App Development', 'Mobile App Development'),
        ('E-Commerce Solutions', 'E-Commerce Solutions'),
        ('SEO & Digital Marketing', 'SEO & Digital Marketing'),
        ('UI/UX Design', 'UI/UX Design'),
        ('Cloud Solutions', 'Cloud Solutions'),
        ('Consulting', 'Consulting'),
        ('Other', 'Other'),
    ]
    
    # Company Information
    company_name = models.CharField(max_length=255)
    industry = models.CharField(max_length=100)
    service_requirement = models.CharField(max_length=100, choices=SERVICE_TYPE_CHOICES, default='Other')
    website = models.URLField(max_length=500, blank=True, null=True)
    email = models.EmailField(default='no-reply@example.com')
    phone = models.CharField(max_length=20, blank=True, null=True)
    
    # Address Information
    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=100, default='Unknown')
    state = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100)
    
    # Contact Person Information
    contact_person_name = models.CharField(max_length=255, default='Unknown Contact')
    contact_person_title = models.CharField(max_length=255, blank=True, null=True)
    contact_person_phone = models.CharField(max_length=20, default='000-000-0000')
    
    # CRM Information
    lead_source = models.CharField(max_length=100)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='owned_accounts'
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Active'
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Account'
        verbose_name_plural = 'Accounts'
    

class Contact(models.Model):
    """
    Contact model representing individuals associated with Accounts
    """
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='contacts', blank=True, null=True)
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    role = models.CharField(max_length=100, blank=True, null=True)  # e.g., Decision Maker, Influencer
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.account.company_name}"

class Deal(models.Model):
    """
    Deal model representing sales opportunities
    """
    STAGE_CHOICES = [
        ('New', 'New'),
        ('Qualification', 'Qualification'),
        ('Proposition', 'Proposition'),
        ('Negotiation', 'Negotiation'),
        ('Won', 'Won'),
        ('Lost', 'Lost'),
    ]

    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='deals')
    name = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    stage = models.CharField(max_length=50, choices=STAGE_CHOICES, default='New')
    close_date = models.DateField(blank=True, null=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='deals'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.account.company_name}"

class Task(models.Model):
    """
    Task model for CRM activities
    """
    PRIORITY_CHOICES = [
        ('High', 'High'),
        ('Medium', 'Medium'),
        ('Low', 'Low'),
    ]
    STATUS_CHOICES = [
        ('To Do', 'To Do'),
        ('In Progress', 'In Progress'),
        ('Done', 'Done'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    due_date = models.DateTimeField(blank=True, null=True)
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='Medium')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='To Do')
    
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='tasks', blank=True, null=True)
    deal = models.ForeignKey(Deal, on_delete=models.SET_NULL, related_name='tasks', blank=True, null=True)
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='assigned_tasks'
    )
    tagged_users = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='tagged_tasks',
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Notification(models.Model):
    """
    Notification model for user alerts
    """
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    link = models.CharField(max_length=255, blank=True, null=True) # e.g., /crm/tasks/1/
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Notification for {self.recipient}: {self.message[:20]}..."

class ContactNote(models.Model):
    """
    Notes/Remarks for contacts
    """
    TYPE_CHOICES = [
        ('note', 'Note'),
        ('email', 'Email'),
        ('mom', 'MoM'),
    ]
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name='notes')
    title = models.CharField(max_length=255, blank=True, null=True)
    content = models.TextField()
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='note')
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='contact_notes'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Note for {self.contact.name} by {self.created_by}"

class FinanceTransaction(models.Model):
    """
    FinanceTransaction model for tracking income and expenses
    """
    TYPE_CHOICES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]

    date = models.DateField()
    description = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='finance_transactions'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', '-created_at']
        verbose_name = 'Finance Transaction'
        verbose_name_plural = 'Finance Transactions'

    def __str__(self):
        return f"{self.type.capitalize()}: {self.description} ({self.amount})"
class TransactionAudit(models.Model):
    """
    TransactionAudit model for tracking changes and deletions of Finance Transactions.
    """
    ACTION_CHOICES = [
        ('CREATE', 'Created'),
        ('EDIT', 'Edited'),
        ('DELETE', 'Deleted'),
    ]

    transaction_id = models.IntegerField() # Store original ID (independent of deletion)
    action = models.CharField(max_length=10, choices=ACTION_CHOICES)
    comment = models.TextField()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='finance_audits'
    )
    data_snapshot = models.JSONField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']
        verbose_name = 'Transaction Audit'
        verbose_name_plural = 'Transaction Audits'

    def __str__(self):
        return f"{self.action} on Tx #{self.transaction_id} by {self.user}"

class FinanceAIReport(models.Model):
    """
    Model to store AI-generated financial reports and projections.
    """
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='finance_ai_reports'
    )
    report_data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Finance AI Report'
        verbose_name_plural = 'Finance AI Reports'

    def __str__(self):
        return f"AI Report for {self.owner} at {self.created_at}"
