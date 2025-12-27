
import ephem
import math
from datetime import datetime, timedelta

# Constants for Chennai
LAT = '13.0827'
LON = '80.2707'
ELEV = 10

def get_observer(date):
    obs = ephem.Observer()
    obs.lat = LAT
    obs.lon = LON
    obs.elevation = ELEV
    obs.date = ephem.Date(date - timedelta(hours=5, minutes=30)) # UTC
    return obs

def get_sidereal_time(date):
    obs = get_observer(date)
    return obs.sidereal_time()

def get_lahiri_ayanamsa(date):
    jd = ephem.julian_date(ephem.Date(date))
    return 23.8561666667 + 0.0139666667 * ((jd - 2451545.0) / 36525.0)

def calculate_lagnam(date):
    # Calculate Ascendant (Lagna)
    obs = get_observer(date)
    
    # Get sidereal time
    st = obs.sidereal_time()
    
    # Simple calculation of Lagna (this is complex in pure python without specific astrology lib)
    # Using approximation: Lagna = ST * 15 + Longitude + correction?
    # Better to use pyephem to find the point on ecliptic rising at horizon
    
    # We need the longitude of the intersection of ecliptic and horizon (Ascendant)
    # PyEphem doesn't have direct 'ascendant'. We can calculate it.
    
    # Formula for Ascendant:
    # tan(Asc) = cos(ST) / (sin(ST)*cos(e) - tan(lat)*sin(e))
    # where ST = Local Sidereal Time, e = obliquity of ecliptic (~23.44)
    
    ra = obs.sidereal_time()
    # Convert RA to degrees
    ra_deg = math.degrees(ra)
    
    # Obliquity of ecliptic
    e = math.radians(23.44)
    lat_rad = math.radians(float(LAT))
    
    # ST in radians
    st_rad = ra
    
    # Calculate Ascendant
    # Formula: tan(lambda) = -cos(ST) / (sin(ST)*cos(e) + tan(phi)*sin(e)) 
    # Wait, let's look up standard formula
    
    # tan(L) = (sin(RAMC) * cos(E) + tan(LAT) * sin(E)) / cos(RAMC) ?? No
    
    # Correct Formula:
    # tan(Asc) = cos(RAMC) / ( -sin(RAMC) * cos(eps) + tan(phi) * sin(eps) )
    # RAMC = Right Ascension of Midheaven + 90 degrees? No.
    
    # Let's use a verified approximation or library if possible.
    # Actually, simpler: Lagnam at sunrise is Sun's position.
    # User says "wrong info", likely because we showed just the Sun Sign, not the specific degree or time balance.
    # Tamil calendars show "Mesha Lagnam Iruppu Nazhigai X Vinadi Y".
    # This means "Mesha Lagnam Balance Duration: X nazhigai Y vinadi".
    # This implies the Lagnam *at Sunrise* is Mesha, and it has X time left before changing.
    
    pass

def calculate_sraardha_thithi(date):
    # Sraardha Thithi is Thithi at Aparahna time (approx 1:30 PM)
    # Aparahna = 3/5 to 4/5 of day duration.
    # Day = Sunrise to Sunset.
    
    obs = get_observer(date)
    sun = ephem.Sun()
    
    rising = obs.next_rising(sun)
    setting = obs.next_setting(sun)
    
    sunrise_utc = ephem.Date(rising).datetime()
    sunset_utc = ephem.Date(setting).datetime()
    
    sunrise_ist = sunrise_utc + timedelta(hours=5, minutes=30)
    sunset_ist = sunset_utc + timedelta(hours=5, minutes=30)
    
    day_duration = (sunset_ist - sunrise_ist).total_seconds()
    
    # Aparahna Start = Sunrise + (3 * DayDuration / 5)
    # Aparahna End = Sunrise + (4 * DayDuration / 5)
    
    aparahna_start = sunrise_ist + timedelta(seconds=(3 * day_duration / 5))
    aparahna_end = sunrise_ist + timedelta(seconds=(4 * day_duration / 5))
    
    # Find middle of Aparahna
    aparahna_mid = aparahna_start + (aparahna_end - aparahna_start) / 2
    
    print(f"Sunrise: {sunrise_ist.time()}")
    print(f"Sunset: {sunset_ist.time()}")
    print(f"Aparahna: {aparahna_start.time()} to {aparahna_end.time()}")
    print(f"Checking Thithi at: {aparahna_mid.time()}")
    
    return aparahna_mid

# Test for Jan 1, 2026
dt = datetime(2026, 1, 1)
calculate_sraardha_thithi(dt)
