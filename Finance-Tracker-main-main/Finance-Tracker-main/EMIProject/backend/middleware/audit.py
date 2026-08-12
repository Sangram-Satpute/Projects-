import logging

logger = logging.getLogger('audit')

class RequestAuditMiddleware:
    """Request Audit Logging Middleware for Security and Traceability."""
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        ip = request.META.get('REMOTE_ADDR')
        method = request.method
        path = request.path
        
        response = self.get_response(request)
        
        status_code = response.status_code
        logger.info(f"AUDIT LOG | IP: {ip} | Method: {method} | Path: {path} | Status: {status_code}")
        return response
