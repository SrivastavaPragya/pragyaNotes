REST_FRAMEWORK = {
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.ScopedRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "login": "5/min",
        "notes": "100/min",
    }
}

# View

from rest_framework.throttling import ScopedRateThrottle

class LoginAPIView(APIView):
    throttle_scope = "login"
    throttle_classes = [ScopedRateThrottle]

# Another view

class NotesAPIView(APIView):
    throttle_scope = "notes"
    throttle_classes = [ScopedRateThrottle]
