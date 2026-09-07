# File based cache
#
# What is FileBasedCache?
# Instead of storing cache in RAM, Django stores the cached data as files on disk.
#
# LocMemCache
#         ↓
# RAM
#
#
# FileBasedCache
#         ↓
# Files
#
# So instead of this
#
# RAM
#
# user:1
# products
# homepage
#
# it becomes
#
# cache_directory/
#
# a83dj38d1.cache
# bd83j38d9.cache
# ck3938dk3.cache
#
# Each cache entry becomes a file.
#
# —————————————————————————————————————————————————————————————————————————
# Configuration

# settings.py

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.filebased.FileBasedCache",
        "LOCATION": "/Users/pragya/cache",
    }
}

# or

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.filebased.FileBasedCache",
        "LOCATION": BASE_DIR / "cache",
    }
}

# This creates
#
# project/
#
# manage.py
# cache/
# settings.py
#
# Whenever you cache something, Django writes files inside the cache directory.
# —————————————————————————————————————————————————————
# Getting and setting data
# How data is stored
# Suppose

from django.core.cache import cache

cache.set("username", "Pragya")

# Instead of RAM,
# Django creates a file.
#
# cache/
#
# 41ad92d8812.cache
#
# Inside that file Django stores
#
# Key:
# username
#
# Value:
# Pragya
#
# Expiration:
# 300 seconds
#
# The exact file format is internal to Django—you don't usually read or edit these files manually.
#
# Getting Data

cache.get("username")

# ———————————————————————————————————————————————————————————————————
# Does it survive server restart?
# Yes.
# This is the biggest difference from LocMemCache.
#
# LocMemCache
#
# Server Stops
#
# ↓
#
# RAM cleared
#
# ↓
#
# Cache gone
#
#
# FileBasedCache
#
# Server Stops
#
# ↓
#
# Files still exist
#
# ↓
#
# Server starts
#
# ↓
#
# Cache still exists
#
# Because files remain on disk.
# ———————————————————————————————————————————————————————————————
#
# Is it shared?
# Suppose
#
# One Django Server
#
# ↓
#
# Cache Folder
#
# Everything is fine.
#
# Now
#
# Worker 1
#
# ↓
#
# cache/
#
# Worker 2
#
# ↓
#
# cache/
#
# If both workers point to the same cache directory, they can share the cached data.
#
# This is one advantage over LocMemCache.
# However, if you have multiple machines, each machine has its own disk unless you're using shared storage.
#
# Server A
#
# /cache
#
#
# Server B
#
# /cache
#
# Different disks.
# Different cache.
#
#
# ****Note*** So FileBasedCache is slower than LocMemCache because every cache hit still involves reading from the filesystem.
#
#
# ***NOTE*****
# Rule of thumb
# Use:
#
# if not variable:
#
# ✅ When you want to check for any falsy value (e.g., empty string, empty list, 0, False, None).
# Use:
#
# if variable is None:
#
# ✅ When you specifically want to know whether the value is None.
