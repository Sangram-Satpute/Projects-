from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from decimal import Decimal
from datetime import date, timedelta

from core.models import Loan, Saving, Investment, UserProfile
from expenses.models import Expense, Wallet, Income, RecurringExpense
from decision_engine.models import FinancialGoal, AffordabilityQueryLog, FinancialHealthHistory, AIRecommendation
from decision_engine.services.health_score import FinancialHealthScoreService
from decision_engine.services.affordability import AffordabilityEngineService
from decision_engine.services.cashflow import CashFlowPredictionService
from decision_engine.services.goal_simulator import GoalSimulatorService
from decision_engine.services.recommendation import AIRecommendationService


class DecisionEngineServiceTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='aideveloper', password='password123')
        self.profile = self.user.userprofile
        self.profile.monthly_income = Decimal('80000.00')
        self.profile.save()

        # Add liquid wallet balance
        self.wallet = Wallet.objects.create(
            user=self.user,
            name='HDFC Main',
            wallet_type='BANK',
            balance=Decimal('250000.00')
        )

        # Add savings
        self.saving = Saving.objects.create(
            name='Emergency FD',
            amount=Decimal('100000.00'),
            date=date.today()
        )

        # Add investment
        self.investment = Investment.objects.create(
            name='Nifty 50 Index',
            amount=Decimal('150000.00'),
            current_value=Decimal('180000.00'),
            category='MF',
            date=date.today()
        )

        # Add recent monthly expense
        self.expense = Expense.objects.create(
            user=self.user,
            title='Rent & Groceries',
            amount=Decimal('25000.00'),
            category='BIL',
            wallet=self.wallet,
            date=date.today()
        )

    def test_financial_health_score(self):
        service = FinancialHealthScoreService(self.user)
        result = service.calculate()

        self.assertIn('overall_score', result)
        self.assertIn('status', result)
        self.assertIn('grade', result)
        self.assertGreaterEqual(result['overall_score'], 0.0)
        self.assertLessEqual(result['overall_score'], 100.0)

    def test_can_i_afford_lump_sum_yes(self):
        service = AffordabilityEngineService(self.user)
        # Small purchase (₹15,000) relative to ₹350,000 liquid funds
        result = service.analyze(purchase_name='Smartphone', amount=15000, payment_type='LUMP_SUM')

        self.assertEqual(result['decision'], 'YES')
        self.assertGreaterEqual(result['affordability_score'], 70.0)
        self.assertIn('ai_explanation', result)

    def test_can_i_afford_lump_sum_no(self):
        service = AffordabilityEngineService(self.user)
        # Massive purchase (₹500,000) exceeding liquid funds (₹350,000)
        result = service.analyze(purchase_name='Superbike', amount=500000, payment_type='LUMP_SUM')

        self.assertEqual(result['decision'], 'NO')
        self.assertLessEqual(result['affordability_score'], 30.0)

    def test_cash_flow_prediction(self):
        service = CashFlowPredictionService(self.user)
        result = service.predict(days=90)

        self.assertEqual(result['horizon_days'], 90)
        self.assertEqual(len(result['milestones']), 3)
        self.assertGreater(result['projected_ending_balance'], 0)

    def test_goal_simulator(self):
        service = GoalSimulatorService(self.user)
        target_date = (date.today() + timedelta(days=365)).strftime('%Y-%m-%d')
        result = service.simulate(
            goal_name='Laptop Upgrade',
            target_amount=120000,
            current_saved=20000,
            target_date=target_date
        )

        self.assertEqual(result['goal_name'], 'Laptop Upgrade')
        self.assertEqual(result['remaining_needed'], 100000.0)
        self.assertIn(result['feasibility'], ['EASY', 'MODERATE', 'CHALLENGING', 'UNFEASIBLE'])

    def test_ai_recommendations(self):
        service = AIRecommendationService(self.user)
        recs = service.generate_recommendations()

        self.assertIsInstance(recs, list)
        self.assertGreater(len(recs), 0)


class DecisionEngineAPITestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='apitestuser', password='password123')
        self.client = APIClient()

        # Obtain JWT Token
        response = self.client.post('/api/v1/token/', {
            'username': 'apitestuser',
            'password': 'password123'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_health_score_api(self):
        response = self.client.get('/api/v1/decision/health-score/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
        self.assertIn('overall_score', response.data['data'])

    def test_can_i_afford_api(self):
        response = self.client.post('/api/v1/decision/can-i-afford/', {
            'purchase_name': 'Gaming Console',
            'amount': 45000,
            'payment_type': 'LUMP_SUM'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
        self.assertIn('decision', response.data['data'])

    def test_cash_flow_predict_api(self):
        response = self.client.get('/api/v1/decision/cash-flow-predict/?days=180')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
        self.assertEqual(response.data['data']['horizon_days'], 180)

    def test_goals_crud_api(self):
        # Create Goal
        create_resp = self.client.post('/api/v1/decision/goals/', {
            'name': 'Europe Trip',
            'target_amount': '250000.00',
            'current_saved': '50000.00',
            'target_date': '2027-06-30',
            'category': 'VACATION',
            'priority': 'HIGH'
        }, format='json')
        self.assertEqual(create_resp.status_code, status.HTTP_201_CREATED)
        goal_id = create_resp.data['id']

        # List Goals
        list_resp = self.client.get('/api/v1/decision/goals/')
        self.assertEqual(list_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(list_resp.data), 1)

    def test_goal_simulate_api(self):
        response = self.client.post('/api/v1/decision/goals/simulate/', {
            'goal_name': 'Electric Scooter',
            'target_amount': 90000,
            'current_saved': 15000
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])

    def test_recommendations_api(self):
        response = self.client.get('/api/v1/decision/recommendations/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
