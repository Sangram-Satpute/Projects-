from django.urls import path
from django.views.generic import TemplateView
from .views import (
    ExpenseListView, ExpenseCreateView, ExpenseUpdateView, ExpenseDeleteView,
    RecurringExpenseListView, RecurringExpenseCreateView, RecurringExpenseUpdateView, RecurringExpenseDeleteView,
    WalletDashboardView, WalletCreateView, WalletUpdateView, WalletDeleteView,
    CategoryBudgetCreateView, IncomeCreateView, WalletTransferCreateView
)

urlpatterns = [
    path('', ExpenseListView.as_view(), name='expense_list'),
    path('add/', ExpenseCreateView.as_view(), name='expense_create'),
    path('edit/<int:pk>/', ExpenseUpdateView.as_view(), name='expense_update'),
    path('delete/<int:pk>/', ExpenseDeleteView.as_view(), name='expense_delete'),
    path('scan/', TemplateView.as_view(template_name='expenses/scan.html'), name='scan_pay'),
    
    # Wallet & Budget Tracker
    path('wallet/', WalletDashboardView.as_view(), name='wallet_dashboard'),
    path('wallet/add/', WalletCreateView.as_view(), name='wallet_add'),
    path('wallet/edit/<int:pk>/', WalletUpdateView.as_view(), name='wallet_edit'),
    path('wallet/delete/<int:pk>/', WalletDeleteView.as_view(), name='wallet_delete'),
    path('budget/add/', CategoryBudgetCreateView.as_view(), name='budget_add'),
    path('income/add/', IncomeCreateView.as_view(), name='income_add'),
    path('transfer/add/', WalletTransferCreateView.as_view(), name='transfer_add'),
    
    # Recurring Expenses
    path('recurring/', RecurringExpenseListView.as_view(), name='recurring_list'),
    path('recurring/add/', RecurringExpenseCreateView.as_view(), name='recurring_add'),
    path('recurring/edit/<int:pk>/', RecurringExpenseUpdateView.as_view(), name='recurring_edit'),
    path('recurring/delete/<int:pk>/', RecurringExpenseDeleteView.as_view(), name='recurring_delete'),
]
