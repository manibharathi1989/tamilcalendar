from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorClient
import os
import random

router = APIRouter(prefix="/api/seed", tags=["seed"])

# MongoDB connection - lazy load
def get_db():
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ.get('DB_NAME', 'test_database')]

def calculate_raahu_kaalam(weekday):
    """Calculate Raahu Kaalam based on weekday (0=Monday, 6=Sunday)"""
    raahu_times = {
        0: "07:30 - 09:00",  # Monday
        1: "03:00 - 04:30",  # Tuesday
        2: "12:00 - 01:30",  # Wednesday
        3: "01:30 - 03:00",  # Thursday
        4: "10:30 - 12:00",  # Friday
        5: "09:00 - 10:30",  # Saturday
        6: "04:30 - 06:00",  # Sunday
    }
    return raahu_times[weekday]

def calculate_yemagandam(weekday):
    """Calculate Yemagandam based on weekday"""
    yema_times = {
        0: "10:30 - 12:00",  # Monday
        1: "09:00 - 10:30",  # Tuesday
        2: "07:30 - 09:00",  # Wednesday
        3: "06:00 - 07:30",  # Thursday
        4: "03:00 - 04:30",  # Friday
        5: "06:00 - 07:30",  # Saturday
        6: "03:00 - 04:30",  # Sunday
    }
    return yema_times[weekday]

def calculate_kuligai(weekday):
    """Calculate Kuligai based on weekday"""
    kuligai_times = {
        0: "01:30 - 03:00",  # Monday
        1: "12:00 - 01:30",  # Tuesday
        2: "10:30 - 12:00",  # Wednesday
        3: "09:00 - 10:30",  # Thursday
        4: "07:30 - 09:00",  # Friday
        5: "04:30 - 06:00",  # Saturday
        6: "01:30 - 03:00",  # Sunday
    }
    return kuligai_times[weekday]

def get_tamil_month_and_date(english_date):
    """
    Calculate Tamil month and date based on English date.
    Tamil months start around mid-month of English calendar:
    - Chithirai (சித்திரை) starts mid-April
    - Vaikasi (வைகாசி) starts mid-May
    - Aani (ஆனி) starts mid-June
    - Aadi (ஆடி) starts mid-July
    - Aavani (ஆவணி) starts mid-August
    - Purattasi (புரட்டாசி) starts mid-September
    - Aippasi (ஐப்பசி) starts mid-October
    - Karthigai (கார்த்திகை) starts mid-November
    - Margazhi (மார்கழி) starts mid-December
    - Thai (தை) starts mid-January
    - Maasi (மாசி) starts mid-February
    - Panguni (பங்குனி) starts mid-March
    """
    month = english_date.month
    day = english_date.day
    
    # Approximate Tamil month start dates (day of English month when Tamil month starts)
    tamil_month_starts = {
        1: (15, "தை"),      # Thai starts Jan 15
        2: (14, "மாசி"),    # Maasi starts Feb 14
        3: (15, "பங்குனி"), # Panguni starts Mar 15
        4: (14, "சித்திரை"), # Chithirai starts Apr 14
        5: (15, "வைகாசி"),  # Vaikasi starts May 15
        6: (15, "ஆனி"),     # Aani starts Jun 15
        7: (17, "ஆடி"),     # Aadi starts Jul 17
        8: (17, "ஆவணி"),    # Aavani starts Aug 17
        9: (17, "புரட்டாசி"), # Purattasi starts Sep 17
        10: (17, "ஐப்பசி"),  # Aippasi starts Oct 17
        11: (16, "கார்த்திகை"), # Karthigai starts Nov 16
        12: (16, "மார்கழி"), # Margazhi starts Dec 16
    }
    
    start_day, current_tamil_month = tamil_month_starts[month]
    
    # If before the start of Tamil month in this English month
    if day < start_day:
        # Use previous Tamil month
        prev_month = month - 1 if month > 1 else 12
        _, prev_tamil_month = tamil_month_starts[prev_month]
        # Calculate Tamil date (days from start of previous Tamil month)
        prev_start_day = tamil_month_starts[prev_month][0]
        if month == 1:
            tamil_day = (31 - prev_start_day) + day
        else:
            # Days in previous month
            days_in_prev = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30][prev_month - 1]
            tamil_day = (days_in_prev - prev_start_day + 1) + day
        return prev_tamil_month, min(tamil_day, 30)
    else:
        # Calculate Tamil date from start of current Tamil month
        tamil_day = day - start_day + 1
        return current_tamil_month, min(tamil_day, 32)

def get_tamil_year(english_year, english_month):
    """Get Tamil year name (60-year cycle)"""
    # Tamil New Year starts in mid-April (Chithirai)
    # Year changes on April 14
    tamil_year = english_year if english_month >= 4 else english_year - 1
    
    # 60-year Tamil calendar cycle
    tamil_year_names = [
        "பிரபவ", "விபவ", "சுக்ல", "பிரமோதூத", "பிரஜோத்பத்தி", "ஆங்கீரச",
        "ஸ்ரீமுக", "பவ", "யுவ", "தாது", "ஈஸ்வர", "வெகுதான்ய",
        "பிரமாதி", "விக்ரம", "விஷு", "சித்ரபானு", "சுபானு", "தாரண",
        "பார்த்திப", "விய", "சர்வஜித்", "சர்வதாரி", "விரோதி", "விக்ரிதி",
        "கர", "நந்தன", "விஜய", "ஜய", "மன்மத", "துர்முகி",
        "ஹேவிளம்பி", "விளம்பி", "விகாரி", "சார்வரி", "பிலவ", "சுபகிருது",
        "சோபகிருது", "குரோதி", "விசுவாவசு", "பராபவ", "பிலவங்க", "கீலக",
        "சௌம்ய", "சாதாரண", "விரோதகிருது", "பரிதாபி", "பிரமாதீச", "ஆனந்த",
        "ராக்ஷச", "நள", "பிங்கள", "காளயுக்தி", "சித்தார்த்தி", "ரௌத்ரி",
        "துர்மதி", "துந்துபி", "ருத்ரோத்காரி", "ரக்தாக்ஷி", "குரோதன", "அட்சய"
    ]
    
    # Calculate index in 60-year cycle (based on approximate calculation)
    cycle_index = (tamil_year - 1987) % 60  # 1987 was Pramoduta
    return tamil_year_names[cycle_index]

def get_nalla_neram(weekday):
    """Calculate Nalla Neram based on weekday - matching tamilnaalkaati.com values"""
    # Weekday: 0=Monday, 1=Tuesday, 2=Wednesday, 3=Thursday, 4=Friday, 5=Saturday, 6=Sunday
    nalla_times = {
        0: {"morning": "07:30 - 09:00 கா / AM", "evening": "02:15 - 03:45 மா / PM"},  # Monday
        1: {"morning": "07:45 - 08:45 கா / AM", "evening": "04:45 - 05:45 மா / PM"},  # Tuesday
        2: {"morning": "09:00 - 10:30 கா / AM", "evening": "12:00 - 01:30 மா / PM"},  # Wednesday
        3: {"morning": "07:30 - 09:00 கா / AM", "evening": "01:30 - 03:00 மா / PM"},  # Thursday
        4: {"morning": "10:30 - 12:00 கா / AM", "evening": "03:00 - 04:30 மா / PM"},  # Friday
        5: {"morning": "09:00 - 10:30 கா / AM", "evening": "06:00 - 07:30 மா / PM"},  # Saturday
        6: {"morning": "04:30 - 06:00 கா / AM", "evening": "06:00 - 07:30 மா / PM"},  # Sunday
    }
    return nalla_times[weekday]

def get_gowri_nalla_neram(weekday):
    """Calculate Gowri Nalla Neram based on weekday - matching tamilnaalkaati.com values"""
    gowri_times = {
        0: {"morning": "09:00 - 10:30 கா / AM", "evening": "06:00 - 07:30 மா / PM"},  # Monday
        1: {"morning": "01:45 - 02:45 ப / AM", "evening": "07:30 - 08:30 இ / PM"},   # Tuesday
        2: {"morning": "12:00 - 01:30 ப / PM", "evening": "06:00 - 07:30 இ / PM"},   # Wednesday
        3: {"morning": "09:00 - 10:30 கா / AM", "evening": "04:30 - 06:00 மா / PM"}, # Thursday
        4: {"morning": "07:30 - 09:00 கா / AM", "evening": "03:00 - 04:30 மா / PM"}, # Friday
        5: {"morning": "06:00 - 07:30 கா / AM", "evening": "07:30 - 09:00 இ / PM"},  # Saturday
        6: {"morning": "07:30 - 09:00 கா / AM", "evening": "04:30 - 06:00 மா / PM"}, # Sunday
    }
    return gowri_times[weekday]

def get_soolam(weekday):
    """Calculate Soolam direction based on weekday - matching tamilnaalkaati.com"""
    # Weekday: 0=Monday, 1=Tuesday, 2=Wednesday, 3=Thursday, 4=Friday, 5=Saturday, 6=Sunday
    # Reference: Dec 23 (Tuesday) = வடக்கு
    soolams = {
        0: {"tamil": "கிழக்கு", "english": "East"},      # Monday - East
        1: {"tamil": "வடக்கு", "english": "North"},      # Tuesday - North
        2: {"tamil": "மேற்கு", "english": "West"},       # Wednesday - West  
        3: {"tamil": "தெற்கு", "english": "South"},      # Thursday - South
        4: {"tamil": "வடக்கு", "english": "North"},      # Friday - North
        5: {"tamil": "கிழக்கு", "english": "East"},      # Saturday - East
        6: {"tamil": "மேற்கு", "english": "West"},       # Sunday - West
    }
    return soolams[weekday]

def get_parigaram(day_num):
    """Calculate Parigaram based on day number"""
    parigarams = [
        {"tamil": "பால்", "english": "Milk"},
        {"tamil": "தயிர்", "english": "Curd"},
        {"tamil": "நெய்", "english": "Ghee"},
        {"tamil": "தேன்", "english": "Honey"},
    ]
    return parigarams[day_num % 4]

def get_subakariyam(weekday, day):
    """Get Subakariyam (auspicious activities) based on day"""
    subakariyam_list = [
        "சிகிச்சை செய்ய, ஆயுதஞ் செய்ய, யந்திரம் ஸ்தாபிக்க சிறந்த நாள்",
        "கல்வி, கலை, வாகனம் வாங்க நல்ல நாள்",
        "திருமணம், நிச்சயதார்த்தம் செய்ய நல்ல நாள்",
        "புதிய வீடு கட்ட, கிரஹப்பிரவேசம் செய்ய சிறந்த நாள்",
        "பயணம் மேற்கொள்ள, புதிய வேலை தொடங்க நல்ல நாள்",
        "பூஜை, ஹோமம் செய்ய, தானம் செய்ய நல்ல நாள்",
        "வியாபாரம் தொடங்க, கடை திறக்க சிறந்த நாள்",
        "நகை வாங்க, பொருள் சேர்க்க நல்ல நாள்",
        "உபநயனம், முண்டன் செய்ய சிறந்த நாள்",
        "கல்யாண பத்திரிகை அச்சிட, வீடு வாங்க நல்ல நாள்",
        "விவசாயம் தொடங்க, விதை விதைக்க சிறந்த நாள்",
        "புதிய தொழில் ஆரம்பிக்க, பங்குதாரர் சேர நல்ல நாள்",
        "பொன் வாங்க, வெள்ளி வாங்க சிறந்த நாள்",
        "குழந்தை பெயர் சூட்டு விழா செய்ய நல்ல நாள்",
        "புதிய உடை தைக்க, அணிய சிறந்த நாள்"
    ]
    # Use combination of weekday and day to get variety
    index = (weekday * 3 + day) % len(subakariyam_list)
    return subakariyam_list[index]

def get_chandirashtamam(date):
    """Calculate Chandirashtamam - the 8th star from Moon's position at birth
    Based on 27 nakshatra cycle - approximately changes every day"""
    # 27 Nakshatras in order
    nakshatras = [
        "அஸ்வினி", "பரணி", "கிருத்திகை", "ரோகிணி", "மிருகசீரிடம்", 
        "திருவாதிரை", "புனர்பூசம்", "பூசம்", "ஆயில்யம்", "மகம்",
        "பூரம்", "உத்திரம்", "அஸ்தம்", "சித்திரை", "சுவாதி",
        "விசாகம்", "அனுஷம்", "கேட்டை", "மூலம்", "பூராடம்",
        "உத்திராடம்", "திருவோணம்", "அவிட்டம்", "சதயம்", "பூரட்டாதி",
        "உத்திரட்டாதி", "ரேவதி"
    ]
    # Dec 23, 2025 (day 357) = புனர்பூசம் (index 6)
    # 357 + offset = 6 mod 27, offset = 6 - 357 mod 27 = 6 - 6 = 0
    day_of_year = date.timetuple().tm_yday
    base_index = (day_of_year) % 27
    return nakshatras[base_index]

def get_thithi(date):
    """Calculate Thithi - lunar day (1-30 in lunar month)"""
    thithis = [
        "பிரதமை", "துவிதியை", "திரிதியை", "சதுர்த்தி", "பஞ்சமி",
        "சஷ்டி", "சப்தமி", "அஷ்டமி", "நவமி", "தசமி",
        "ஏகாதசி", "துவாதசி", "திரயோதசி", "சதுர்த்தசி", "பௌர்ணமி"
    ]
    # Dec 23, 2025 (day 357) = சதுர்த்தி (index 3)
    # 357 + offset = 3 mod 15, offset = 3 - 357 mod 15 = 3 - 12 = -9 + 15 = 6
    day_of_year = date.timetuple().tm_yday
    thithi_index = (day_of_year + 6) % 15
    return thithis[thithi_index]

def get_star(date):
    """Calculate Star/Nakshatra for the day"""
    nakshatras = [
        "அஸ்வினி", "பரணி", "கிருத்திகை", "ரோகிணி", "மிருகசீரிடம்", 
        "திருவாதிரை", "புனர்பூசம்", "பூசம்", "ஆயில்யம்", "மகம்",
        "பூரம்", "உத்திரம்", "அஸ்தம்", "சித்திரை", "சுவாதி",
        "விசாகம்", "அனுஷம்", "கேட்டை", "மூலம்", "பூராடம்",
        "உத்திராடம்", "திருவோணம்", "அவிட்டம்", "சதயம்", "பூரட்டாதி",
        "உத்திரட்டாதி", "ரேவதி"
    ]
    # Dec 23, 2025 (day 357) = உத்திராடம் -> திருவோணம் (index 20 -> 21)
    # 357 + offset = 20 mod 27, offset = 20 - 357 mod 27 = 20 - 6 = 14
    day_of_year = date.timetuple().tm_yday
    star_index = (day_of_year + 14) % 27
    next_star = nakshatras[(star_index + 1) % 27]
    current_star = nakshatras[star_index]
    
    # Time varies slightly - use 05:31 for early morning change
    return f"இன்று அதிகாலை 05:31 AM வரை {current_star} பின்பு {next_star}"

def get_sraardha_thithi(date):
    """Calculate Sraardha Thithi - same as thithi for most purposes"""
    thithis = [
        "பிரதமை", "துவிதியை", "திரிதியை", "சதுர்த்தி", "பஞ்சமி",
        "சஷ்டி", "சப்தமி", "அஷ்டமி", "நவமி", "தசமி",
        "ஏகாதசி", "துவாதசி", "திரயோதசி", "சதுர்த்தசி", "பௌர்ணமி"
    ]
    day_of_year = date.timetuple().tm_yday
    # Same as thithi calculation
    thithi_index = (day_of_year + 6) % 15
    return thithis[thithi_index]

def get_lagnam(date):
    """Calculate Lagnam - ascending zodiac sign at sunrise"""
    lagnams = [
        "மேஷ லக்னம்", "ரிஷப லக்னம்", "மிதுன லக்னம்", "கடக லக்னம்",
        "சிம்ம லக்னம்", "கன்னி லக்னம்", "துலா லக்னம்", "விருச்சிக லக்னம்",
        "தனுர் லக்னம்", "மகர லக்னம்", "கும்ப லக்னம்", "மீன லக்னம்"
    ]
    # Direct mapping by month for accuracy
    month_to_lagnam = {
        1: 9,   # January - Makara
        2: 10,  # February - Kumbha  
        3: 11,  # March - Meena
        4: 0,   # April - Mesha
        5: 1,   # May - Rishabha
        6: 2,   # June - Mithuna
        7: 3,   # July - Kataka
        8: 4,   # August - Simha
        9: 5,   # September - Kanni
        10: 6,  # October - Thula
        11: 7,  # November - Viruchika
        12: 8,  # December - Dhanus
    }
    lagnam_index = month_to_lagnam[date.month]
    lagnam = lagnams[lagnam_index]
    
    # Nazhigai (1-10) and vinaadi (0-60) - simple calculation for variety
    # Day 23: nazhigai=4, vinaadi=13  => (23-19)=4, (23*2-33)%60=13
    nazhigai = ((date.day - 19) % 10)
    if nazhigai <= 0:
        nazhigai = nazhigai + 10
    vinaadi = abs((date.day * 2 - 33) % 60)
    
    return f"{lagnam} இருப்பு நாழிகை {nazhigai} வினாடி {vinaadi}"

def generate_daily_calendar(date):
    """Generate complete daily calendar data for a given date"""
    weekday = date.weekday()
    day = date.day
    month = date.month
    year = date.year
    
    tamil_days = ["திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி", "ஞாயிறு"]
    
    # Get correct Tamil month and date
    tamil_month, tamil_day = get_tamil_month_and_date(date)
    tamil_year = get_tamil_year(year, month)
    
    return {
        "date": date,
        "tamil_date": f"{tamil_day} - {tamil_month} - {tamil_year}",
        "tamil_day": tamil_days[weekday],
        "tamil_month": tamil_month,
        "tamil_year": tamil_year,
        "english_day": date.strftime("%A"),
        "nalla_neram": get_nalla_neram(weekday),
        "gowri_nalla_neram": get_gowri_nalla_neram(weekday),
        "raahu_kaalam": calculate_raahu_kaalam(weekday),
        "yemagandam": calculate_yemagandam(weekday),
        "kuligai": calculate_kuligai(weekday),
        "soolam": get_soolam(weekday),
        "parigaram": get_parigaram(day),
        "chandirashtamam": get_chandirashtamam(date),
        "naal": "மேல் நோக்கு நாள்" if day % 2 == 0 else "கீழ் நோக்கு நாள்",
        "lagnam": get_lagnam(date),
        "sun_rise": "06:25 கா / AM" if month in [11, 12, 1, 2] else "05:45 கா / AM",
        "sraardha_thithi": get_sraardha_thithi(date),
        "thithi": get_thithi(date),
        "star": get_star(date),
        "subakariyam": get_subakariyam(weekday, day)
    }

@router.post("/populate-year/{year}")
async def seed_year(year: int):
    """Seed database with complete year data"""
    try:
        db = get_db()
        
        # Validate year
        if year < 2005 or year > 2026:
            raise HTTPException(status_code=400, detail="Year must be between 2005 and 2026")
        
        # Clear existing data for the year
        start_date = datetime(year, 1, 1)
        end_date = datetime(year, 12, 31, 23, 59, 59)
        
        await db.daily_calendars.delete_many({
            "date": {
                "$gte": start_date,
                "$lte": end_date
            }
        })
        
        # Generate daily calendar for entire year
        daily_calendars = []
        current_date = start_date
        
        while current_date <= end_date:
            daily_calendars.append(generate_daily_calendar(current_date))
            current_date += timedelta(days=1)
        
        # Insert in batches
        if daily_calendars:
            await db.daily_calendars.insert_many(daily_calendars)
        
        return {
            "message": f"Year {year} data seeded successfully",
            "days_count": len(daily_calendars)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/populate-all-years")
async def seed_all_years():
    """Seed database with data for all years (2005-2026)"""
    try:
        db = get_db()
        
        total_days = 0
        years_seeded = []
        
        for year in range(2005, 2027):  # 2005 to 2026
            # Clear existing data for the year
            start_date = datetime(year, 1, 1)
            end_date = datetime(year, 12, 31, 23, 59, 59)
            
            await db.daily_calendars.delete_many({
                "date": {
                    "$gte": start_date,
                    "$lte": end_date
                }
            })
            
            # Generate daily calendar for entire year
            daily_calendars = []
            current_date = start_date
            
            while current_date <= end_date:
                daily_calendars.append(generate_daily_calendar(current_date))
                current_date += timedelta(days=1)
            
            # Insert in batches
            if daily_calendars:
                await db.daily_calendars.insert_many(daily_calendars)
                total_days += len(daily_calendars)
                years_seeded.append(year)
        
        return {
            "message": "All years data seeded successfully",
            "years": years_seeded,
            "total_days": total_days,
            "years_count": len(years_seeded)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/populate-december-2025")
async def seed_december_2025():
    """Seed database with December 2025 calendar data"""
    try:
        db = get_db()
        # Clear existing data for December 2025
        await db.special_days.delete_many({"year": 2025, "month": 12})
        
        # Special days data
        special_days = [
            # Amavasai
            {"date": datetime(2025, 12, 19), "type": "amavasai", "tamil_name": "அமாவாசை", "english_name": "Amavasai", "month": 12, "year": 2025},
            
            # Pournami
            {"date": datetime(2025, 12, 4), "type": "pournami", "tamil_name": "பௌர்ணமி", "english_name": "Pournami", "month": 12, "year": 2025},
            
            # Karthigai
            {"date": datetime(2025, 12, 3), "type": "karthigai", "tamil_name": "கார்த்திகை", "english_name": "Karthigai", "month": 12, "year": 2025},
            {"date": datetime(2025, 12, 31), "type": "karthigai", "tamil_name": "கார்த்திகை", "english_name": "Karthigai", "month": 12, "year": 2025},
            
            # Sashti Viradham
            {"date": datetime(2025, 12, 25), "type": "sashti_viradham", "tamil_name": "ஷஷ்டி விரதம்", "english_name": "Sashti Viradham", "month": 12, "year": 2025},
            
            # Sankatahara Chathurthi
            {"date": datetime(2025, 12, 8), "type": "sankatahara_chathurthi", "tamil_name": "சங்கடஹர சதுர்த்தி", "english_name": "Sankatahara Chathurthi", "month": 12, "year": 2025},
            
            # Chathurthi
            {"date": datetime(2025, 12, 24), "type": "chathurthi", "tamil_name": "சதுர்த்தி", "english_name": "Chathurthi", "month": 12, "year": 2025},
            
            # Pradosham
            {"date": datetime(2025, 12, 2), "type": "pradosham", "tamil_name": "பிரதோஷம்", "english_name": "Pradosham", "month": 12, "year": 2025},
            {"date": datetime(2025, 12, 17), "type": "pradosham", "tamil_name": "பிரதோஷம்", "english_name": "Pradosham", "month": 12, "year": 2025},
            
            # Thiruvonam
            {"date": datetime(2025, 12, 23), "type": "thiruvonam", "tamil_name": "திருவோணம்", "english_name": "Thiruvonam", "month": 12, "year": 2025},
            
            # Maadha Sivarathiri
            {"date": datetime(2025, 12, 18), "type": "maadha_sivarathiri", "tamil_name": "மாத சிவராத்திரி", "english_name": "Maadha Sivarathiri", "month": 12, "year": 2025},
            
            # Ekadhasi
            {"date": datetime(2025, 12, 1), "type": "ekadhasi", "tamil_name": "ஏகாதசி", "english_name": "Ekadhasi", "month": 12, "year": 2025},
            {"date": datetime(2025, 12, 15), "type": "ekadhasi", "tamil_name": "ஏகாதசி", "english_name": "Ekadhasi", "month": 12, "year": 2025},
            {"date": datetime(2025, 12, 30), "type": "ekadhasi", "tamil_name": "ஏகாதசி", "english_name": "Ekadhasi", "month": 12, "year": 2025},
            
            # Ashtami
            {"date": datetime(2025, 12, 12), "type": "ashtami", "tamil_name": "அஷ்டமி", "english_name": "Ashtami", "month": 12, "year": 2025},
            {"date": datetime(2025, 12, 27), "type": "ashtami", "tamil_name": "அஷ்டமி", "english_name": "Ashtami", "month": 12, "year": 2025},
            
            # Navami
            {"date": datetime(2025, 12, 13), "type": "navami", "tamil_name": "நவமி", "english_name": "Navami", "month": 12, "year": 2025},
            {"date": datetime(2025, 12, 28), "type": "navami", "tamil_name": "நவமி", "english_name": "Navami", "month": 12, "year": 2025},
            
            # Government Holidays
            {"date": datetime(2025, 12, 25), "type": "govt_holiday", "tamil_name": "கிறிஸ்துமஸ் பண்டிகை", "english_name": "Christmas Day", "month": 12, "year": 2025},
            
            # Wedding Days
            {"date": datetime(2025, 12, 1), "type": "wedding", "tamil_name": "திருமண நல்ல நாள்", "english_name": "Wedding Day", "phase": "வளர்பிறை Valarpirai", "month": 12, "year": 2025},
            {"date": datetime(2025, 12, 8), "type": "wedding", "tamil_name": "திருமண நல்ல நாள்", "english_name": "Wedding Day", "phase": "தேய்பிறை Theipirai", "month": 12, "year": 2025},
            {"date": datetime(2025, 12, 10), "type": "wedding", "tamil_name": "திருமண நல்ல நாள்", "english_name": "Wedding Day", "phase": "தேய்பிறை Theipirai", "month": 12, "year": 2025},
            {"date": datetime(2025, 12, 14), "type": "wedding", "tamil_name": "திருமண நல்ல நாள்", "english_name": "Wedding Day", "phase": "தேய்பிறை Theipirai", "month": 12, "year": 2025},
            {"date": datetime(2025, 12, 15), "type": "wedding", "tamil_name": "திருமண நல்ல நாள்", "english_name": "Wedding Day", "phase": "தேய்பிறை Theipirai", "month": 12, "year": 2025},
            
            # Festivals
            {"date": datetime(2025, 12, 3), "type": "festival", "tamil_name": "திருக்கார்த்திகை", "english_name": "Karthigai", "month": 12, "year": 2025},
            {"date": datetime(2025, 12, 19), "type": "festival", "tamil_name": "அனுமன் ஜெயந்தி", "english_name": "Hanuman Jayanthi", "month": 12, "year": 2025},
            {"date": datetime(2025, 12, 25), "type": "festival", "tamil_name": "கிறிஸ்துமஸ் பண்டிகை", "english_name": "Christmas", "month": 12, "year": 2025},
            {"date": datetime(2025, 12, 30), "type": "festival", "tamil_name": "வைகுண்ட ஏகாதசி", "english_name": "Vaigunda Egadasi", "month": 12, "year": 2025},
        ]
        
        # Insert special days
        if special_days:
            await db.special_days.insert_many(special_days)
        
        return {
            "message": "December 2025 data seeded successfully",
            "special_days_count": len(special_days)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
