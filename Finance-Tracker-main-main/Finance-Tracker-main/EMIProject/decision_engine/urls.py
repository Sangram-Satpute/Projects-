from django.urls import path, include
from rest_framework.routers import DefaultRouter
from decision_engine.views import (
    FinancialHealthScoreAPIView, AffordabilityAnalysisAPIView,
    CashFlowPredictAPIView, GoalViewSet, GoalSimulateAPIView,
    AIRecommendationAPIView
)

router = DefaultRouter()
router.register(r'goals', GoalViewSet, basename='goal')

urlpatterns = [
    path('health-score/', FinancialHealthScoreAPIView.as_view(), name='api_health_score'),
    path('can-i-afford/', AffordabilityAnalysisAPIView.as_view(), name='api_can_i_afford'),
    path('cash-flow-predict/', CashFlowPredictAPIView.as_view(), name='api_cash_flow_predict'),
    path('goals/simulate/', GoalSimulateAPIView.as_view(), name='api_goals_simulate'),
    path('recommendations/', AIRecommendationAPIView.as_view(), name='api_recommendations'),
    path('', include(router.urls)),
]
