
import ephem
import math
from datetime import datetime, timedelta

def get_jd(y, m, d, h):
    if m <= 2:
        y -= 1
        m += 12
    a = math.floor(y / 100)
    b = 2 - a + math.floor(a / 4)
    jd = math.floor(365.25 * (y + 4716)) + math.floor(30.6001 * (m + 1)) + d + b - 1524.5
    jd += h / 24.0
    return jd

def normalize_degrees(deg):
    deg = deg % 360
    return deg if deg >= 0 else deg + 360

def debug_lagnam_calc(date_str, lat='13.0827', lon='80.2707'):
    print(f"\n--- Debugging Lagnam for {date_str} ---")
    dt = datetime.fromisoformat(date_str)
    
    # 1. Simulate Sunrise (Approx)
    # Using ephem directly to match backend
    obs = ephem.Observer()
    obs.lat = lat
    obs.lon = lon
    obs.elevation = 10
    obs.date = ephem.Date(dt - timedelta(hours=5, minutes=30))
    sun = ephem.Sun()
    rising = obs.next_rising(sun)
    sunrise_utc = ephem.Date(rising).datetime()
    
    # Re-calculate JD
    jd = ephem.julian_date(ephem.Date(sunrise_utc))
    print(f"Sunrise UTC: {sunrise_utc}")
    print(f"Julian Day: {jd}")
    
    # 3. GMST
    t = (jd - 2451545.0) / 36525.0
    gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * t**2 - t**3 / 38710000.0
    gmst = normalize_degrees(gmst)
    print(f"GMST: {gmst}")
    
    # 4. LST
    lst = normalize_degrees(gmst + float(lon))
    print(f"LST: {lst}")
    
    # 5. Ascendant
    e = 23.4392911 - 0.01300416 * t 
    e_rad = math.radians(e)
    lst_rad = math.radians(lst)
    lat_rad = math.radians(float(lat))
    
    y = math.cos(lst_rad)
    x = -math.sin(lst_rad) * math.cos(e_rad) + math.tan(lat_rad) * math.sin(e_rad)
    
    asc_rad = math.atan2(y, x)
    asc_deg = normalize_degrees(math.degrees(asc_rad))
    print(f"Sayana Ascendant: {asc_deg}")
    
    # 6. Ayanamsa
    ayanamsa = 23.8561666667 + 0.0139666667 * ((jd - 2451545.0) / 36525.0)
    print(f"Ayanamsa: {ayanamsa}")
    
    nirayana_asc = normalize_degrees(asc_deg - ayanamsa)
    print(f"Nirayana Ascendant: {nirayana_asc}")
    
    # 7. Rasi & Balance
    lagnam_index = int(nirayana_asc / 30)
    degree_into_rasi = nirayana_asc % 30
    degree_remaining = 30 - degree_into_rasi
    
    minutes_remaining = degree_remaining * 4
    nazhigai = int(minutes_remaining / 24)
    vinadi = int((minutes_remaining % 24) * 2.5) # CORRECTED FACTOR: 60/24 = 2.5
    
    print(f"Rasi Index: {lagnam_index}")
    print(f"Degree Remaining: {degree_remaining}")
    print(f"Minutes Remaining: {minutes_remaining}")
    print(f"Nazhigai: {nazhigai}, Vinadi: {vinadi}")

debug_lagnam_calc("2026-01-01")
debug_lagnam_calc("2026-01-14")
debug_lagnam_calc("2025-12-27")
