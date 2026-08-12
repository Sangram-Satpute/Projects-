from rest_framework import views, viewsets, status, permissions
from rest_framework.response import Response
from decision_engine.models import FinancialGoal, AIRecommendation, FinancialHealthHistory
from decision_engine.serializers import (
    FinancialGoalSerializer, AffordabilityRequestSerializer,
    GoalSimulationRequestSerializer, AIRecommendationSerializer,
    FinancialHealthHistorySerializer
)
from decision_engine.services.health_score import FinancialHealthScoreService
from decision_engine.services.affordability import AffordabilityEngineService
from decision_engine.services.cashflow import CashFlowPredictionService
from decision_engine.services.goal_simulator import GoalSimulatorService
from decision_engine.services.recommendation import AIRecommendationService

class FinancialHealthScoreAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        service = FinancialHealthScoreService(request.user)
        result = service.calculate()
        return Response({
            'success': True,
            'data': result
        }, status=status.HTTP_200_OK)


class AffordabilityAnalysisAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = AffordabilityRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        service = AffordabilityEngineService(request.user)
        result = service.analyze(
            purchase_name=data['purchase_name'],
            amount=data['amount'],
            payment_type=data.get('payment_type', 'LUMP_SUM'),
            down_payment=data.get('down_payment', 0),
            tenure_months=data.get('tenure_months', 12),
            interest_rate=data.get('interest_rate', 12.0)
        )
        return Response({
            'success': True,
            'data': result
        }, status=status.HTTP_200_OK)


class CashFlowPredictAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        days_param = request.query_params.get('days', 90)
        service = CashFlowPredictionService(request.user)
        result = service.predict(days=days_param)
        return Response({
            'success': True,
            'data': result
        }, status=status.HTTP_200_OK)


class GoalViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FinancialGoalSerializer

    def get_queryset(self):
        return FinancialGoal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class GoalSimulateAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = GoalSimulationRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        service = GoalSimulatorService(request.user)
        result = service.simulate(
            goal_name=data['goal_name'],
            target_amount=data['target_amount'],
            current_saved=data.get('current_saved', 0),
            target_date=data.get('target_date'),
            monthly_contribution=data.get('monthly_contribution')
        )
        return Response({
            'success': True,
            'data': result
        }, status=status.HTTP_200_OK)


class AIRecommendationAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        service = AIRecommendationService(request.user)
        recs = service.generate_recommendations()
        return Response({
            'success': True,
            'count': len(recs),
            'data': recs
        }, status=status.HTTP_200_OK)
