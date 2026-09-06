# Cache in Django
# Django In-Memory Cache (LocMemCache)

from django.shortcuts import render
from .models import YoutubeUser
from django.core.cache import cache


# Create your views here.

def users_list(request):
    users=cache.get('users_data')
    if not users:
        print("Fetching data from database")
        users=YoutubeUser.objects.all()
        cache.set('users_data',users,timeout=60)
    else:
        print("Fetching data from cache")
    return render(request,'users_list.html',{'users':users})

# —————————————————————————————————————————————————————————————————————————————————————————
#
# What happens after server restart?
# This is the biggest limitation.
# Suppose cache contains
#
# RAM
#
# Products
# Users
# Orders
#
# You stop server
#
# Ctrl + C
#
# RAM is cleared.
# Again
#
# python manage.py runserver
#
# Cache becomes
#
# EMPTY
#
# Everything is lost.
#
# —————————————————————————————————————————————————————————————————————————————————————————
#
# Multiple Django Processes
# This is the most important interview question.
# Imagine
#
# Gunicorn
#
# Worker 1
# Worker 2
# Worker 3
#
# Each worker has its own RAM.
#
# Worker 1
#
# Cache
# -------
# User
# Products
# -------
#
#
# Worker 2
#
# Cache
# -------
# EMPTY
# -------
#
# If request goes
#
# Request A
# ↓
#
# Worker 1
#
# Cache exists.
# But
#
# Request B
# ↓
#
# Worker 2
#
# Worker 2 has no cache.
# It queries database again.
# Every worker maintains its own independent cache.
# That's why LocMemCache is not shared across workers or servers.
#
# ——————————————————————————————————————————————————————————————————————————
#
# Why not use it in Production?
# Suppose your production has
#
# Load Balancer
#
# ↓
#
# Server 1
#
# ↓
#
# Server 2
#
# ↓
#
# Server 3
#
# Each server has
#
# Own RAM
# Own Cache
#
# So
#
# User A
#
# ↓
#
# Server 1
#
# Cache Hit
#
# But
#
# User B
#
# ↓
#
# Server 3
#
# Cache Miss
#
# Caches are inconsistent.
# That's why production usually uses
# Shared Redis
# Shared Memcached
# All servers connect to the same cache.
#
# LocMemCache is Django's built-in in-memory cache backend. It stores cached data in the RAM of the current
# Django process, making reads and writes very fast. Since the cache is local to each process, it's not
# shared across multiple Gunicorn workers or servers. The cache is also cleared whenever the process
# restarts. Because of these limitations, it's ideal for development and simple deployments, while
# production systems typically use shared cache backends like Redis or Memcached.
