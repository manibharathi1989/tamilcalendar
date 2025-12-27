"""
Tamil Calendar Astronomy Calculator
Uses PyEphem for precise astronomical calculations matching the reference HTML script
"""

import ephem
from datetime import datetime, timedelta
from typing import Dict, Any, Tuple, Optional
import math

# Chennai coordinates (same as reference script)
CHENNAI_LAT = '13.0827'
CHENNAI_LON = '80.2707'
CHENNAI_ELEV = 10  # meters

# 27 Nakshatras (Stars) in order
STARS_TA = [
    "அசுவினி", "பரணி", "கார்த்திகை", "ரோகிணி", "மிருகசீரிடம்",
    "திருவாதிரை", "புனர்பூசம்", "பூசம்", "ஆயில்யம்", "மகம்",
    "பூரம்", "உத்திரம்", "ஹஸ்தம்", "சித்திரை", "சுவாதி",
    "விசாகம்", "அனுஷம்", "கேட்டை", "மூலம்", "பூராடம்",
    "உத்திராடம்", "திருவோணம்", "அவிட்டம்", "சதயம்", "பூரட்டாதி",
    "உத்திரட்டாதி", "ரேவதி"
]

STARS_ENG = [
    "Ashwini", "Bharani", "Krithigai", "Rohini", "Mrigasirsha",
    "Thiruvadirai", "Punarpoosam", "Poosam", "Ayilyam", "Magam",
    "Pooram", "Uthiram", "Hastam", "Chithirai", "Swathi",
    "Visakam", "Anusham", "Kettai", "Moolam", "Pooradam",
    "Uthiradam", "Thiruvonam", "Avittam", "Sathayam", "Poorattathi",
    "Uthirattathi", "Revathi"
]

# 15 Tithis + Pournami/Amavasya
TITHIS_TA = [
    "பிரதமை", "துவிதியை", "திருதியை", "சதுர்த்தி", "பஞ்சமி",
    "சஷ்டி", "சப்தமி", "அஷ்டமி", "நவமி", "தசமி",
    "ஏகாதசி", "துவாதசி", "திரயோதசி", "சதுர்த்தசி", "பௌர்ணமி", "அமாவாசை"
]

TITHIS_ENG = [
    "Prathamai", "Dwitiyai", "Tritiyai", "Chaturthi", "Panchami",
    "Shashti", "Saptami", "Ashtami", "Navami", "Dashami",
    "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Pournami", "Amavasya"
]

# 12 Rasis
RASIS_TA = [
    "மேஷம்", "ரிஷபம்", "மிதுனம்", "கடகம்", "சிம்மம்", "கன்னி",
    "துலாம்", "விருச்சிகம்", "தனுசு", "மகரம்", "கும்பம்", "மீனம்"
]

RASIS_ENG = [
    "Mesham", "Rishabam", "Mithunam", "Kadagam", "Simmam", "Kanni",
    "Thulam", "Vrichikam", "Dhanusu", "Makaram", "Kumbam", "Meenam"
]

# Stars in each Rasi (for Chandirashtamam display)
RASI_TO_STARS = [
    "அசுவினி, பரணி, கார்த்திகை (1)",
    "கார்த்திகை (2-4), ரோகிணி, மிருகசீரிடம் (1,2)",
    "மிருகசீரிடம் (3,4), திருவாதிரை, புனர்பூசம் (1-3)",
    "புனர்பூசம் (4), பூசம், ஆயில்யம்",
    "மகம், பூரம், உத்திரம் (1)",
    "உத்திரம் (2-4), ஹஸ்தம், சித்திரை (1,2)",
    "சித்திரை (3,4), சுவாதி, விசாகம் (1-3)",
    "விசாகம் (4), அனுஷம், கேட்டை",
    "மூலம், பூராடம், உத்திராடம் (1)",
    "உத்திராடம் (2-4), திருவோணம், அவிட்டம் (1,2)",
    "அவிட்டம் (3,4), சதயம், பூரட்டாதி (1-3)",
    "பூரட்டாதி (4), உத்திரட்டாதி, ரேவதி"
]

# Tamil months
TAMIL_MONTHS = [
    "சித்திரை", "வைகாசி", "ஆனி", "ஆடி", "ஆவணி", "புரட்டாசி",
    "ஐப்பசி", "கார்த்திகை", "மார்கழி", "தை", "மாசி", "பங்குனி"
]

# Mel Nokku stars (indices)
MEL_NOKKU_INDICES = [3, 5, 7, 11, 20, 21, 22, 23, 25, 0]
# Keel Nokku stars (indices)
KEEL_NOKKU_INDICES = [1, 2, 8, 9, 10, 15, 18, 19, 24]


def get_observer(date: datetime) -> ephem.Observer:
    """Create an observer at Chennai for the given date"""
    observer = ephem.Observer()
    observer.lat = CHENNAI_LAT
    observer.lon = CHENNAI_LON
    observer.elevation = CHENNAI_ELEV
    observer.date = ephem.Date(date)
    return observer


def get_lahiri_ayanamsa(date: datetime) -> float:
    """
    Calculate Lahiri Ayanamsa for a given date
    Reference formula from HTML script:
    ayanamsa = 23.8561666667 + 0.0139666667 * ((julian_day - 2451545.0) / 36525.0)
    """
    # Convert to Julian Day
    jd = ephem.julian_date(ephem.Date(date))
    # Calculate ayanamsa using Lahiri formula
    ayanamsa = 23.8561666667 + 0.0139666667 * ((jd - 2451545.0) / 36525.0)
    return ayanamsa


def normalize_degrees(deg: float) -> float:
    """Normalize degrees to 0-360 range"""
    deg = deg % 360
    return deg if deg >= 0 else deg + 360


def get_sidereal_longitude(body: str, date: datetime) -> float:
    """
    Get sidereal longitude of a celestial body
    Sidereal = Tropical - Ayanamsa
    """
    observer = get_observer(date)
    
    if body == 'sun':
        obj = ephem.Sun(observer)
    elif body == 'moon':
        obj = ephem.Moon(observer)
    else:
        raise ValueError(f"Unknown body: {body}")
    
    # Get tropical ecliptic longitude in degrees
    tropical_lon = math.degrees(float(ephem.Ecliptic(obj).lon))
    
    # Subtract ayanamsa to get sidereal longitude
    ayanamsa = get_lahiri_ayanamsa(date)
    sidereal_lon = normalize_degrees(tropical_lon - ayanamsa)
    
    return sidereal_lon


def get_sunrise_sunset(date: datetime) -> Tuple[datetime, datetime]:
    """Get precise sunrise and sunset times for Chennai"""
    observer = get_observer(date)
    observer.horizon = '0'  # Standard horizon
    
    sun = ephem.Sun()
    
    try:
        # Get sunrise
        sunrise_ephem = observer.next_rising(sun)
        sunrise = ephem.Date(sunrise_ephem).datetime()
        
        # Get sunset
        sunset_ephem = observer.next_setting(sun)
        sunset = ephem.Date(sunset_ephem).datetime()
        
        # Adjust for IST (UTC+5:30)
        sunrise = sunrise + timedelta(hours=5, minutes=30)
        sunset = sunset + timedelta(hours=5, minutes=30)
        
        return sunrise, sunset
    except Exception:
        # Fallback to approximate times
        return (
            date.replace(hour=6, minute=0),
            date.replace(hour=18, minute=0)
        )


def format_time_tamil(dt: datetime) -> str:
    """Format time in Tamil calendar style"""
    hour = dt.hour
    minute = dt.minute
    
    if hour < 12:
        ampm = "கா / AM"
        display_hour = hour if hour > 0 else 12
    else:
        ampm = "மா / PM"
        display_hour = hour - 12 if hour > 12 else 12
    
    return f"{display_hour:02d}:{minute:02d} {ampm}"


def find_end_time(current_value: int, calc_type: str, start_date: datetime) -> str:
    """
    Find when the current star or thithi ends
    Similar to findEndTime() in reference script
    """
    time = start_date
    base_day = start_date.day
    
    # Search in 15-minute intervals for up to 36 hours
    for i in range(36 * 4):
        time = time + timedelta(minutes=15)
        
        sun_lon = get_sidereal_longitude('sun', time)
        moon_lon = get_sidereal_longitude('moon', time)
        
        if calc_type == 'star':
            new_value = int(moon_lon / 13.333333)
        elif calc_type == 'tithi':
            diff = normalize_degrees(moon_lon - sun_lon)
            new_value = int(diff / 12)
        else:
            continue
        
        if new_value != current_value:
            # Go back and find precise minute
            time = time - timedelta(minutes=15)
            for m in range(16):
                time = time + timedelta(minutes=1)
                
                sun_lon = get_sidereal_longitude('sun', time)
                moon_lon = get_sidereal_longitude('moon', time)
                
                if calc_type == 'star':
                    precise_val = int(moon_lon / 13.333333)
                else:
                    diff = normalize_degrees(moon_lon - sun_lon)
                    precise_val = int(diff / 12)
                
                if precise_val != current_value:
                    # Adjust for IST
                    end_time = time + timedelta(hours=5, minutes=30)
                    
                    if end_time.day != base_day:
                        return f"Next Day ({format_time_short(end_time)})"
                    return f"till {format_time_short(end_time)}"
            
            break
    
    return "Full Day"


def format_time_short(dt: datetime) -> str:
    """Format time in short format HH:MM AM/PM"""
    hour = dt.hour
    minute = dt.minute
    
    if hour < 12:
        ampm = "AM"
        display_hour = hour if hour > 0 else 12
    else:
        ampm = "PM"
        display_hour = hour - 12 if hour > 12 else 12
    
    return f"{display_hour}:{minute:02d} {ampm}"


def calculate_panchangam(date: datetime) -> Dict[str, Any]:
    """
    Calculate complete panchangam using precise astronomical calculations
    Matches the reference HTML script calculations
    """
    # Set calculation time to noon IST
    calc_date = date.replace(hour=12, minute=0, second=0, microsecond=0)
    # Convert to UTC for ephem
    calc_date_utc = calc_date - timedelta(hours=5, minutes=30)
    
    # Get sidereal longitudes
    sun_lon = get_sidereal_longitude('sun', calc_date_utc)
    moon_lon = get_sidereal_longitude('moon', calc_date_utc)
    
    # Star (Nakshatra) - Moon's position in 27 divisions
    star_index = int(moon_lon / 13.333333) % 27
    star_end_time = find_end_time(star_index, 'star', calc_date_utc)
    
    # Thithi - Angular difference between Moon and Sun
    tithi_diff = normalize_degrees(moon_lon - sun_lon)
    tithi_index = int(tithi_diff / 12)
    tithi_end_time = find_end_time(tithi_index, 'tithi', calc_date_utc)
    
    # Rasi - Moon's zodiac sign
    rasi_index = int(moon_lon / 30) % 12
    
    # Sun's Rasi (for Lagnam at sunrise)
    sun_rasi_index = int(sun_lon / 30) % 12
    
    # Tamil month based on Sun's position
    tamil_month = TAMIL_MONTHS[sun_rasi_index]
    tamil_date = int(sun_lon % 30) + 1
    
    # Chandirashtamam - (rasiIndex + 5) % 12
    chandrashtamam_index = (rasi_index + 5) % 12
    
    # Paksha (waxing/waning moon phase)
    if tithi_index < 15:
        paksha_ta = "வளர்பிறை"
        paksha_eng = "Valarpirai"
    else:
        paksha_ta = "தேய்பிறை"
        paksha_eng = "Theipirai"
    
    # Thithi name (handle 15th position for Pournami/Amavasya)
    t_index = tithi_index % 15
    if t_index == 14:
        thithi_name_ta = "பௌர்ணமி" if tithi_index < 15 else "அமாவாசை"
        thithi_name_eng = "Pournami" if tithi_index < 15 else "Amavasya"
    else:
        thithi_name_ta = TITHIS_TA[t_index]
        thithi_name_eng = TITHIS_ENG[t_index]
    
    # Naal (Nokku) based on star
    if star_index in MEL_NOKKU_INDICES:
        nokku_ta = "மேல் நோக்கு நாள்"
        nokku_eng = "Mel Nokku Naal"
    elif star_index in KEEL_NOKKU_INDICES:
        nokku_ta = "கீழ் நோக்கு நாள்"
        nokku_eng = "Keel Nokku Naal"
    else:
        nokku_ta = "சம நோக்கு நாள்"
        nokku_eng = "Sama Nokku Naal"
    
    # Yogam based on day + star
    day_index = date.weekday()  # 0=Monday in Python
    # Convert to JS style (0=Sunday)
    js_day = (day_index + 1) % 7
    
    yoga_ta = "சித்த யோகம்"
    yoga_eng = "Siddha Yogam"
    
    # Thursday (4 in JS) + Rohini(3) or Mrigasirsha(4) = Marana Yogam
    if js_day == 4 and star_index in [3, 4]:
        yoga_ta = "மரண யோகம்"
        yoga_eng = "Marana Yogam"
    # Friday (5 in JS) + Ashwini(0) or Revathi(26) = Amrita Yogam
    elif js_day == 5 and star_index in [0, 26]:
        yoga_ta = "அமிர்த யோகம்"
        yoga_eng = "Amrita Yogam"
    
    # Get sunrise and sunset
    sunrise, sunset = get_sunrise_sunset(calc_date_utc)
    
    return {
        "tamil_month": tamil_month,
        "tamil_date": tamil_date,
        "star_index": star_index,
        "star_ta": STARS_TA[star_index],
        "star_eng": STARS_ENG[star_index],
        "star_end_time": star_end_time,
        "tithi_index": tithi_index,
        "thithi_ta": f"{paksha_ta} {thithi_name_ta}",
        "thithi_eng": f"{paksha_eng} {thithi_name_eng}",
        "thithi_end_time": tithi_end_time,
        "sraardha_ta": thithi_name_ta,
        "sraardha_eng": thithi_name_eng,
        "rasi_index": rasi_index,
        "moon_rasi_ta": RASIS_TA[rasi_index],
        "moon_rasi_eng": RASIS_ENG[rasi_index],
        "sun_rasi_index": sun_rasi_index,
        "lagnam_ta": RASIS_TA[sun_rasi_index],
        "lagnam_eng": RASIS_ENG[sun_rasi_index],
        "chandrashtamam_index": chandrashtamam_index,
        "chandrashtamam_ta": RASIS_TA[chandrashtamam_index],
        "chandrashtamam_eng": RASIS_ENG[chandrashtamam_index],
        "chandrashtamam_stars": RASI_TO_STARS[chandrashtamam_index],
        "nokku_ta": nokku_ta,
        "nokku_eng": nokku_eng,
        "yoga_ta": yoga_ta,
        "yoga_eng": yoga_eng,
        "sunrise": format_time_tamil(sunrise),
        "sunset": format_time_tamil(sunset),
        "sunrise_dt": sunrise,
        "sunset_dt": sunset,
    }
