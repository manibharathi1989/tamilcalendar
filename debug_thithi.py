
import sys
import os
import json
sys.path.append('/app/backend')
from utils.calendar_calculator import calculate_calendar_data
from datetime import datetime

# Check Jan 1, 2026 with full formatting
result = calculate_calendar_data(2026, 1, 1, lat='28.6139', lon='77.2090')
print("\n--- Full Calendar Data for 2026-01-01 (New Delhi) ---")
print(f"Thithi: {result['thithi']}")
print(f"Star: {result['star']}")
print(f"Sunrise: {result['sun_rise']}")
print(f"Sunset: {result['sun_set']}")

# Check today (verify logic generally)
now = datetime.now()
result_today = calculate_calendar_data(now.year, now.month, now.day, lat='28.6139', lon='77.2090')
print(f"\n--- Today ({now.date()}) ---")
print(f"Thithi: {result_today['thithi']}")
