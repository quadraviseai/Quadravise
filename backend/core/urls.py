from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AccountViewSet, ContactViewSet, DealViewSet, TaskViewSet, 
    NotificationViewSet, ContactNoteViewSet, HealthCheckView,
    FinanceTransactionViewSet, FinanceAIReportViewSet, DashboardViewSet, AIViewSet
)

# Create router and register viewsets
router = DefaultRouter()
router.register(r'dashboard', DashboardViewSet, basename='dashboard')
router.register(r'accounts', AccountViewSet, basename='account')
router.register(r'contacts', ContactViewSet, basename='contact')
router.register(r'deals', DealViewSet, basename='deal')
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'notifications', NotificationViewSet, basename='notification')
router.register(r'contact-notes', ContactNoteViewSet, basename='contactnote')
router.register(r'finance', FinanceTransactionViewSet, basename='finance')
router.register(r'finance-ai-reports', FinanceAIReportViewSet, basename='financeaireport')
router.register(r'ai', AIViewSet, basename='ai')

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('', include(router.urls)),
]
