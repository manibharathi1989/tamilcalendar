
import sys
import os
sys.path.append('/app/backend')
from utils.calendar_calculator import calculate_calendar_data

# Date: Jan 14, 2026 (Thai Pongal)
# Location: Chennai
lat_chennai = '13.0827'
lon_chennai = '80.2707'

result = calculate_calendar_data(2026, 1, 14, lat=lat_chennai, lon=lon_chennai)

print("\n--- Script Result for Jan 14, 2026 (Chennai) ---")
print(f"Date: {result['tamil_date']}")
print(f"Sunrise: {result['sun_rise']}")
print(f"Sunset: {result['sun_set']}")
print(f"Thithi: {result['thithi']}")
print(f"Star: {result['star']}")
print(f"Yogam: {result['yogam']}")
print(f"Soolam: {result['soolam']['tamil']} ({result['soolam']['english']})")
