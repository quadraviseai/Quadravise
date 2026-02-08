from django.contrib import admin
from .models import Account, Contact, Deal, Task, ContactNote

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'account', 'title', 'email', 'phone', 'role']
    list_filter = ['account', 'role']
    search_fields = ['name', 'email']

@admin.register(Deal)
class DealAdmin(admin.ModelAdmin):
    list_display = ['name', 'account', 'amount', 'stage', 'close_date', 'owner']
    list_filter = ['stage', 'owner']
    search_fields = ['name', 'account__company_name']

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'account', 'priority', 'status', 'due_date', 'assigned_to']
    list_filter = ['priority', 'status', 'assigned_to']
    search_fields = ['title', 'description']

@admin.register(ContactNote)
class ContactNoteAdmin(admin.ModelAdmin):
    list_display = ['contact', 'created_by', 'created_at']
    list_filter = ['contact', 'created_by']
    search_fields = ['content']

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'industry', 'country', 'status', 'owner', 'created_at']
    list_filter = ['status', 'industry', 'country', 'lead_source']
    search_fields = ['company_name', 'email', 'contact_person_name']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Company Information', {
            'fields': ('company_name', 'industry', 'website', 'email', 'phone')
        }),
        ('Address', {
            'fields': ('address', 'city', 'state', 'country')
        }),
        ('Contact Person', {
            'fields': ('contact_person_name', 'contact_person_phone')
        }),
        ('CRM Information', {
            'fields': ('lead_source', 'owner', 'status')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
