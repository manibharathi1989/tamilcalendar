
import ephem
import math
from datetime import datetime, timedelta

def normalize_degrees(deg):
    deg = deg % 360
    return deg if deg >= 0 else deg + 360

def check_time(dt_str, label):
    dt = datetime.fromisoformat(dt_str)
    
    # 1. Topocentric (Chennai)
    obs = ephem.Observer()
    obs.lat = '13.0827'
    obs.lon = '80.2707'
    obs.elevation = 0
    obs.date = ephem.Date(dt)
    
    sun_topo = ephem.Sun(obs)
    moon_topo = ephem.Moon(obs)
    
    # Use Ecliptic for longitude
    sun_lon_topo = math.degrees(ephem.Ecliptic(sun_topo).lon)
    moon_lon_topo = math.degrees(ephem.Ecliptic(moon_topo).lon)
    
    diff_topo = normalize_degrees(moon_lon_topo - sun_lon_topo)
    tithi_topo = diff_topo / 12.0
    
    # 2. Geocentric
    sun_geo = ephem.Sun()
    moon_geo = ephem.Moon()
    sun_geo.compute(ephem.Date(dt))
    moon_geo.compute(ephem.Date(dt))
    
    sun_lon_geo = math.degrees(ephem.Ecliptic(sun_geo).lon)
    moon_lon_geo = math.degrees(ephem.Ecliptic(moon_geo).lon)
    
    diff_geo = normalize_degrees(moon_lon_geo - sun_lon_geo)
    tithi_geo = diff_geo / 12.0
    
    print(f"\n--- {label} ({dt_str} UTC) ---")
    print(f"Topocentric Tithi: {tithi_topo:.4f} (Index: {int(tithi_topo)})")
    print(f"Geocentric Tithi:  {tithi_geo:.4f} (Index: {int(tithi_geo)})")
    print(f"Sun (Geo): {sun_lon_geo:.4f}, Moon (Geo): {moon_lon_geo:.4f}")

# Event: Jan 14, 2026 12:22 PM IST = 06:52 UTC (Expected End of Ekadashi 10->11)
check_time("2026-01-14T06:52:00", "Expected Event Time (06:52 UTC)")

# My Script Output: Jan 14, 2026 5:54 PM IST = 12:24 UTC
check_time("2026-01-14T12:24:00", "Script Output Time (12:24 UTC)")
