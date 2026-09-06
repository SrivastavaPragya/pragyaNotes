# Custom Middlewares in Django
#
# Basic middleware structure
# Create:
#
# your_app/
#     middleware.py
#
# Then write:

class SimpleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Runs BEFORE the view
        print("Before view")

        response = self.get_response(request)

        # Runs AFTER the view
        print("After view")

        return response

# Register it in settings.py:

MIDDLEWARE = [
    # existing middleware...
    "your_app.middleware.SimpleMiddleware",
]

# Now every request will print:
#
# Before view
# After view
#
# 4. What is get_response?
# This line is the core:
#
# response = self.get_response(request)
#
# It means:
# "Pass this request to the next middleware. If there is no next middleware, run the view."
# So:

class GetResponseExample:
    def __call__(self, request):
        print("Before")

        response = self.get_response(request)

        print("After")

        return response

# Flow:
#
# Before
# → next middleware
# → next middleware
# → view
# ← response comes back
# After
#
# If you remove this:
#
# response = self.get_response(request)
#
# the request will never reach the view.
#
# 5. __init__ vs __call__

class MyMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        pass
        # ...

# __init__
# Runs usually once when Django loads the middleware.
# Use it for setup:

class MyMiddlewareWithSetup:
    def __init__(self, get_response):
        self.get_response = get_response
        print("Middleware loaded once")

# Do not put request-specific logic here.
# Bad:

# def __init__(self, get_response):
#     print(request.user)  # request does not exist here

# __call__
# Runs for every incoming request.

# def __call__(self, request):
#     print(request.path)

# 6. Middleware before the view
# Anything before this line:
#
# response = self.get_response(request)
#
# runs before the view.
# Example: attach a custom value to request.

class CompanyMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.company_name = "Neobase"

        response = self.get_response(request)
        return response

# Now in any view:

def dashboard(request):
    print(request.company_name)
    return JsonResponse({"company": request.company_name})

# This is useful for things like:
#
# request.tenant
# request.organization
# request.current_company
# request.request_id
# request.start_time
#
# 7. Middleware after the view
# Anything after:
#
# response = self.get_response(request)
#
# runs after the view returns a response.
# Example: add a header to every response.

class AddHeaderMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        response["X-App-Name"] = "My Django App"

        return response

# Now every response has:
#
# X-App-Name: My Django App
#
# Modern Django also supports:
#
# response.headers["X-App-Name"] = "My Django App"
#
# You modify response, not request, when you want to send a header back to the browser.
#
# One-line difference
#
# __init__ → middleware ko ek baar ready karta hai
# __call__ → har request ko handle karta hai
#
# Video wala code likely aisa hoga

from django.utils.deprecation import MiddlewareMixin

class SimpleMiddlewareMixinVersion(MiddlewareMixin):

    def process_request(self, request):
        print("Before view")

    def process_response(self, request, response):
        print("After view")
        return response

# Isko settings.py mein add karoge:
#
# MIDDLEWARE = [
#     # ...
#     "blog.middleware.SimpleMiddleware",
# ]
#
# Isme __init__ aur __call__ kahan hain?
# Tum nahi likh rahi, because MiddlewareMixin ke andar already defined hain.
# Conceptually Django ke andar kuch aisa hota hai:

class MiddlewareMixinConceptual:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # process_request chalega
        response = self.get_response(request)
        # process_response chalega
        return response

# So when you write:
#
# class SimpleMiddleware(MiddlewareMixin):
#
# your class gets the ready-made __init__ and __call__.
# That means you only write your actual logic:
#
# def process_request(self, request):
#     print("Before view")
#
# and
#
# def process_response(self, request, response):
#     print("After view")
#     return response
