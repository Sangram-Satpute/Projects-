from rest_framework.renderers import JSONRenderer

class StandardJSONRenderer(JSONRenderer):
    """Global JSON renderer wrapping all successful responses in a standard API envelope."""
    def render(self, data, accepted_media_type=None, renderer_context=None):
        status_code = renderer_context['response'].status_code if renderer_context else 200

        # If data is already in standardized error format or schema view, render directly
        if isinstance(data, dict) and ('success' in data or 'openapi' in data):
            return super().render(data, accepted_media_type, renderer_context)

        envelope = {
            "success": status_code < 400,
            "message": "Operation completed successfully",
            "data": data
        }

        return super().render(envelope, accepted_media_type, renderer_context)
