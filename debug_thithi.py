
import sys
import os
sys.path.append('/app/backend')
from utils.astronomy_calculator import calculate_panchangam, get_sidereal_longitude, normalize_degrees
from datetime import datetime

def debug_thithi(date_str, lat='28.6139', lon='77.2090', name="New Delhi"):
    dt = datetime.fromisoformat(date_str)
    print(f"\n--- Debugging Thithi for {date_str} at {name} ({lat}, {lon}) ---")
    
    # Calculate directly
    panchang = calculate_panchangam(dt, lat, lon)
    
    # Manual Breakdown
    calc_date = dt.replace(hour=12, minute=0, second=0, microsecond=0)
    # Convert to UTC for ephem (IST - 5:30)
    from datetime import timedelta
    calc_date_utc = calc_date - timedelta(hours=5, minutes=30)
    
    sun_lon = get_sidereal_longitude('sun', calc_date_utc, lat, lon)
    moon_lon = get_sidereal_longitude('moon', calc_date_utc, lat, lon)
    
    tithi_diff = normalize_degrees(moon_lon - sun_lon)
    tithi_index = int(tithi_diff / 12)
    tithi_deg_into = tithi_diff % 12
    
    print(f"Sun Longitude: {sun_lon:.4f}")
    print(f"Moon Longitude: {moon_lon:.4f}")
    print(f"Difference (Moon - Sun): {tithi_diff:.4f}")
    print(f"Tithi Index (0-29): {tithi_index}")
    print(f"Degrees into current Thithi: {tithi_deg_into:.4f}")
    print(f"Calculated Thithi: {panchang['thithi_ta']}")
    print(f"Thithi End Time: {panchang['thithi_end_time']}")
    
    return panchang

# Check Jan 1, 2026
debug_thithi("2026-01-01", lat='28.6139', lon='77.2090', name="New Delhi")
debug_thithi("2026-01-01", lat='13.0827', lon='80.2707', name="Chennai")

