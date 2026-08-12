from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def global_exception_handler(exc, context):
    """Custom global exception handler delivering standardized API error envelopes."""
    response = exception_handler(exc, context)

    if response is not None:
        custom_response_data = {
            "success": False,
            "code": getattr(exc, "default_code", "API_ERROR").upper(),
            "message": str(exc.detail) if hasattr(exc, "detail") and isinstance(exc.detail, str) else "Validation error occurred",
            "errors": response.data if isinstance(response.data, dict) else {"detail": response.data}
        }
        response.data = custom_response_data
    else:
        response = Response({
            "success": False,
            "code": "INTERNAL_SERVER_ERROR",
            "message": "An unexpected server error occurred",
            "errors": {"detail": str(exc)}
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return response
