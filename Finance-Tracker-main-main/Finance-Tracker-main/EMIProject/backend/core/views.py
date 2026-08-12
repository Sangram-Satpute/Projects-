from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db import connection
from django.utils import timezone
import redis
from django.conf import settings

class HealthCheckView(APIView):
    """Production health check endpoint evaluating Database, Cache, and System metadata."""
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        db_status = "healthy"
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
        except Exception:
            db_status = "unhealthy"

        redis_status = "disabled"
        try:
            r = redis.Redis.from_url(getattr(settings, 'REDIS_URL', 'redis://127.0.0.1:6379/0'))
            if r.ping():
                redis_status = "healthy"
        except Exception:
            redis_status = "degraded"

        return Response({
            "status": "online" if db_status == "healthy" else "degraded",
            "version": "v1.0.0",
            "timestamp": timezone.now().isoformat(),
            "services": {
                "database": db_status,
                "cache_redis": redis_status
            }
        })
