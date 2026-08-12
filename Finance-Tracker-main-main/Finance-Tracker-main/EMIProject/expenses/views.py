from django.views.generic import ListView, CreateView, UpdateView, DeleteView, TemplateView, View
from django.urls import reverse_lazy
from django.shortcuts import redirect
from .models import Expense, Wallet, CategoryBudget, Income, WalletTransfer, RecurringExpense
from django import forms
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Sum
from datetime import date
import calendar
from core.services.whatsapp import WhatsAppService

class ExpenseForm(forms.ModelForm):
    class Meta:
        model = Expense
        fields = ['title', 'amount', 'category', 'wallet', 'date']
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'title': forms.TextInput(attrs={'list': 'expense-titles', 'autocomplete': 'off', 'placeholder': 'e.g. Lunch, Uber, Rent', 'class': 'form-control'}),
            'amount': forms.NumberInput(attrs={'class': 'form-control'}),
            'category': forms.Select(attrs={'class': 'form-control'}),
            'wallet': forms.Select(attrs={'class': 'form-control'}),
        }
        labels = {
            'title': 'Expense Name',
            'amount': 'Amount (₹)',
            'category': 'Category',
            'wallet': 'Wallet / Account',
            'date': 'Date of Expense',
        }

class WalletForm(forms.ModelForm):
    class Meta:
        model = Wallet
        fields = ['name', 'wallet_type', 'balance', 'account_number_last4', 'color', 'icon', 'is_default']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'e.g. HDFC Salary Bank'}),
            'wallet_type': forms.Select(attrs={'class': 'form-control'}),
            'balance': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.01'}),
            'account_number_last4': forms.TextInput(attrs={'class': 'form-control', 'placeholder': '1234', 'maxlength': 4}),
            'color': forms.TextInput(attrs={'type': 'color', 'class': 'form-control form-control-color', 'style': 'height: 38px;'}),
            'icon': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'fa-wallet'}),
            'is_default': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }

class CategoryBudgetForm(forms.ModelForm):
    class Meta:
        model = CategoryBudget
        fields = ['category', 'monthly_limit']
        widgets = {
            'category': forms.Select(attrs={'class': 'form-control'}),
            'monthly_limit': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Monthly limit in ₹'}),
        }

class IncomeForm(forms.ModelForm):
    class Meta:
        model = Income
        fields = ['title', 'amount', 'source', 'wallet', 'date']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'e.g. Monthly Salary'}),
            'amount': forms.NumberInput(attrs={'class': 'form-control'}),
            'source': forms.Select(attrs={'class': 'form-control'}),
            'wallet': forms.Select(attrs={'class': 'form-control'}),
            'date': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
        }

class WalletTransferForm(forms.ModelForm):
    class Meta:
        model = WalletTransfer
        fields = ['from_wallet', 'to_wallet', 'amount', 'note', 'date']
        widgets = {
            'from_wallet': forms.Select(attrs={'class': 'form-control'}),
            'to_wallet': forms.Select(attrs={'class': 'form-control'}),
            'amount': forms.NumberInput(attrs={'class': 'form-control'}),
            'note': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Optional note'}),
            'date': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
        }

class ExpenseListView(LoginRequiredMixin, ListView):
    model = Expense
    template_name = 'expenses/expense_list.html'
    context_object_name = 'expenses'
    ordering = ['-date']

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        today = date.today()
        first_day = today.replace(day=1)
        _, last_day = calendar.monthrange(today.year, today.month)
        
        # Monthly Outflow
        month_total = Expense.objects.filter(date__gte=first_day).aggregate(Sum('amount'))['amount__sum'] or 0
        context['month_total'] = float(month_total)
        context['month_count'] = Expense.objects.filter(date__gte=first_day).count()
        
        # Burn Rate (Daily Average)
        context['daily_burn'] = float(month_total) / today.day if today.day > 0 else 0
        
        # Projection (Burn Rate * Days in Month)
        context['projected_total'] = context['daily_burn'] * last_day
        
        # Budget context (using user income if available)
        try:
            profile = self.request.user.userprofile
            income = float(profile.monthly_income)
            context['budget_percent'] = (float(month_total) / income * 100) if income > 0 else 0
        except:
            context['budget_percent'] = 0
            
        return context

class ExpenseCreateView(LoginRequiredMixin, CreateView):
    model = Expense
    form_class = ExpenseForm
    template_name = 'expenses/expense_form.html'
    success_url = reverse_lazy('expense_list')

    def form_valid(self, form):
        if self.request.user.is_authenticated:
            form.instance.user = self.request.user
        response = super().form_valid(form)
        
        if self.object.amount >= 5000:
            try:
                wa = WhatsAppService()
                wa.send_alert(self.request.user, self.object.title, self.object.amount)
            except Exception as e:
                print(f"Failed to send alert: {e}")
                
        return response

    def get_initial(self):
        initial = super().get_initial()
        title = self.request.GET.get('title')
        amount = self.request.GET.get('amount')
        
        if title:
            initial['title'] = title
        if amount:
            initial['amount'] = amount
        return initial

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        existing_titles = list(Expense.objects.values_list('title', flat=True).distinct())
        defaults = ['Lunch', 'Dinner', 'Groceries', 'Uber', 'Fuel', 'Rent', 'Electricity', 'Internet', 'Movies', 'Coffee', 'Medicine']
        
        context['suggested_titles'] = sorted(list(set(existing_titles + defaults)))
        context['page_title'] = 'Add New Expense'
        context['button_text'] = 'Save Expense'
        return context

class ExpenseUpdateView(LoginRequiredMixin, UpdateView):
    model = Expense
    form_class = ExpenseForm
    template_name = 'expenses/expense_form.html'
    success_url = reverse_lazy('expense_list')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = 'Edit Expense'
        context['button_text'] = 'Update Expense'
        return context

class ExpenseDeleteView(LoginRequiredMixin, DeleteView):
    model = Expense
    template_name = 'expenses/expense_confirm_delete.html'
    success_url = reverse_lazy('expense_list')

class RecurringExpenseForm(forms.ModelForm):
    class Meta:
        model = RecurringExpense
        fields = ['title', 'amount', 'recurrence_type', 'category', 'payment_date', 'frequency', 'start_date', 'is_active']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'e.g. Netflix, Rent'}),
            'amount': forms.NumberInput(attrs={'class': 'form-control'}),
            'recurrence_type': forms.Select(attrs={'class': 'form-control', 'onchange': 'toggleCategory(this)'}),
            'category': forms.Select(attrs={'class': 'form-control'}),
            'payment_date': forms.NumberInput(attrs={'class': 'form-control', 'min': 1, 'max': 31, 'placeholder': 'Day (1-31)'}),
            'frequency': forms.Select(attrs={'class': 'form-control'}),
            'start_date': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'is_active': forms.CheckboxInput(attrs={'class': 'form-check-input', 'style': 'margin-left: 0;'})
        }

class RecurringExpenseListView(LoginRequiredMixin, ListView):
    model = RecurringExpense
    template_name = 'expenses/recurring_list.html'
    context_object_name = 'recurring_expenses'
    ordering = ['-start_date']

class RecurringExpenseCreateView(LoginRequiredMixin, CreateView):
    model = RecurringExpense
    form_class = RecurringExpenseForm
    template_name = 'expenses/recurring_form.html'
    success_url = reverse_lazy('recurring_list')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = 'Add Recurring Expense'
        context['button_text'] = 'Setup Automation'
        return context

class RecurringExpenseUpdateView(LoginRequiredMixin, UpdateView):
    model = RecurringExpense
    form_class = RecurringExpenseForm
    template_name = 'expenses/recurring_form.html'
    success_url = reverse_lazy('recurring_list')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = 'Edit Recurring Expense'
        context['button_text'] = 'Update Automation'
        return context

class RecurringExpenseDeleteView(LoginRequiredMixin, DeleteView):
    model = RecurringExpense
    template_name = 'expenses/expense_confirm_delete.html'
    success_url = reverse_lazy('recurring_list')

class WalletDashboardView(LoginRequiredMixin, TemplateView):
    template_name = 'expenses/wallet_dashboard.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = self.request.user
        
        wallets = Wallet.objects.filter(user=user) if user.is_authenticated else Wallet.objects.all()
        if not wallets.exists():
            default_w = Wallet.objects.create(
                user=user if user.is_authenticated else None,
                name="Main Bank Account",
                wallet_type="BANK",
                balance=0.00,
                color="#2563eb",
                icon="fa-building-columns",
                is_default=True
            )
            wallets = Wallet.objects.filter(pk=default_w.pk)

        total_balance = sum(w.balance for w in wallets)
        
        today = date.today()
        first_day = today.replace(day=1)
        
        monthly_incomes = Income.objects.filter(date__gte=first_day)
        if user.is_authenticated:
            monthly_incomes = monthly_incomes.filter(user=user)
        total_monthly_income = monthly_incomes.aggregate(Sum('amount'))['amount__sum'] or 0.00
        
        monthly_expenses = Expense.objects.filter(date__gte=first_day)
        if user.is_authenticated:
            monthly_expenses = monthly_expenses.filter(user=user)
        total_monthly_expense = monthly_expenses.aggregate(Sum('amount'))['amount__sum'] or 0.00
        
        net_cashflow = total_monthly_income - total_monthly_expense

        category_budgets = CategoryBudget.objects.all()
        if user.is_authenticated:
            category_budgets = category_budgets.filter(user=user)
            
        budgets_data = []
        categories_dict = dict(Expense.CATEGORY_CHOICES)
        
        cat_spending = {}
        for exp in monthly_expenses:
            cat_spending[exp.category] = cat_spending.get(exp.category, 0.0) + float(exp.amount)
            
        for b in category_budgets:
            spent = cat_spending.get(b.category, 0.0)
            limit = float(b.monthly_limit)
            pct = round((spent / limit * 100), 1) if limit > 0 else 0
            status = 'safe'
            if pct >= 90:
                status = 'danger'
            elif pct >= 70:
                status = 'warning'
                
            budgets_data.append({
                'id': b.id,
                'category_code': b.category,
                'category_name': categories_dict.get(b.category, b.category),
                'spent': spent,
                'limit': limit,
                'remaining': limit - spent,
                'percent': min(pct, 100),
                'raw_percent': pct,
                'status': status
            })

        recent_incomes = Income.objects.all()[:5]
        recent_transfers = WalletTransfer.objects.all()[:5]

        context.update({
            'wallets': wallets,
            'total_balance': total_balance,
            'total_monthly_income': total_monthly_income,
            'total_monthly_expense': total_monthly_expense,
            'net_cashflow': net_cashflow,
            'budgets': budgets_data,
            'recent_incomes': recent_incomes,
            'recent_transfers': recent_transfers,
            'wallet_form': WalletForm(),
            'budget_form': CategoryBudgetForm(),
            'income_form': IncomeForm(),
            'transfer_form': WalletTransferForm(),
            'categories_dict': categories_dict,
        })
        return context

class WalletCreateView(LoginRequiredMixin, CreateView):
    model = Wallet
    form_class = WalletForm
    success_url = reverse_lazy('wallet_dashboard')

    def form_valid(self, form):
        if self.request.user.is_authenticated:
            form.instance.user = self.request.user
        return super().form_valid(form)

class WalletUpdateView(LoginRequiredMixin, UpdateView):
    model = Wallet
    form_class = WalletForm
    template_name = 'expenses/wallet_form.html'
    success_url = reverse_lazy('wallet_dashboard')

class WalletDeleteView(LoginRequiredMixin, DeleteView):
    model = Wallet
    template_name = 'expenses/expense_confirm_delete.html'
    success_url = reverse_lazy('wallet_dashboard')

class CategoryBudgetCreateView(LoginRequiredMixin, View):
    def post(self, request, *args, **kwargs):
        category = request.POST.get('category')
        monthly_limit = request.POST.get('monthly_limit')
        if category and monthly_limit:
            CategoryBudget.objects.update_or_create(
                user=request.user if request.user.is_authenticated else None,
                category=category,
                defaults={'monthly_limit': monthly_limit}
            )
        return redirect('wallet_dashboard')

class IncomeCreateView(LoginRequiredMixin, CreateView):
    model = Income
    form_class = IncomeForm
    success_url = reverse_lazy('wallet_dashboard')

    def form_valid(self, form):
        if self.request.user.is_authenticated:
            form.instance.user = self.request.user
        return super().form_valid(form)

class WalletTransferCreateView(LoginRequiredMixin, CreateView):
    model = WalletTransfer
    form_class = WalletTransferForm
    success_url = reverse_lazy('wallet_dashboard')

    def form_valid(self, form):
        if self.request.user.is_authenticated:
            form.instance.user = self.request.user
        return super().form_valid(form)
