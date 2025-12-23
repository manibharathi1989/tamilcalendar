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

def get_tamil_month(month):
    """Get Tamil month name based on English month"""
    tamil_months = [
        "தை", "மாசி", "பங்குனி", "சித்திரை", "வைகாசி", "ஆனி",
        "ஆடி", "ஆவணி", "புரட்டாசி", "ஐப்பசி", "கார்த்திகை", "மார்கழி"
    ]
    return tamil_months[month - 1]

def get_nalla_neram(weekday):
    """Calculate Nalla Neram based on weekday"""
    nalla_morning = [
        "07:45 - 08:45", "06:30 - 07:30", "08:00 - 09:00", "09:15 - 10:15",
        "07:00 - 08:00", "08:30 - 09:30", "09:45 - 10:45"
    ]
    nalla_evening = [
        "04:45 - 05:45", "05:30 - 06:30", "04:00 - 05:00", "03:15 - 04:15",
        "05:00 - 06:00", "04:30 - 05:30", "03:45 - 04:45"
    ]
    return {
        "morning": f"{nalla_morning[weekday]} கா / AM",
        "evening": f"{nalla_evening[weekday]} மா / PM"
    }

def get_gowri_nalla_neram(weekday):
    """Calculate Gowri Nalla Neram based on weekday"""
    gowri_morning = [
        "01:45 - 02:45", "02:30 - 03:30", "01:00 - 02:00", "12:15 - 01:15",
        "02:00 - 03:00", "01:30 - 02:30", "12:45 - 01:45"
    ]
    gowri_evening = [
        "07:30 - 08:30", "08:15 - 09:15", "07:00 - 08:00", "06:30 - 07:30",
        "08:00 - 09:00", "07:45 - 08:45", "06:15 - 07:15"
    ]
    return {
        "morning": f"{gowri_morning[weekday]} கா / AM",
        "evening": f"{gowri_evening[weekday]} மா / PM"
    }

def get_soolam(day_num):
    """Calculate Soolam direction based on day number"""
    soolams = [
        {"tamil": "கிழக்கு", "english": "East"},
        {"tamil": "தெற்கு", "english": "South"},
        {"tamil": "மேற்கு", "english": "West"},
        {"tamil": "வடக்கு", "english": "North"},
    ]
    return soolams[day_num % 4]

def get_parigaram(day_num):
    """Calculate Parigaram based on day number"""
    parigarams = [
        {"tamil": "பால்", "english": "Milk"},
        {"tamil": "தயிர்", "english": "Curd"},
        {"tamil": "நெய்", "english": "Ghee"},
        {"tamil": "தேன்", "english": "Honey"},
    ]
    return parigarams[day_num % 4]

def generate_daily_calendar(date):
    """Generate complete daily calendar data for a given date"""
    weekday = date.weekday()
    day = date.day
    month = date.month
    year = date.year
    
    tamil_days = ["திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி", "ஞாயிறு"]
    tamil_month = get_tamil_month(month)
    
    # Calculate year in Tamil calendar (approximate)
    tamil_year_names = ["விசுவாவசு", "பிரபவ", "விபவ", "சுக்ல", "பிரமோதூத", "பிரஜோத்பத்தி"]
    tamil_year = tamil_year_names[(year - 2000) % len(tamil_year_names)]
    
    return {
        "date": date,
        "tamil_date": f"{day} - {tamil_month} - {tamil_year}",
        "tamil_day": tamil_days[weekday],
        "tamil_month": tamil_month,
        "tamil_year": tamil_year,
        "english_day": date.strftime("%A"),
        "nalla_neram": get_nalla_neram(weekday),
        "gowri_nalla_neram": get_gowri_nalla_neram(weekday),
        "raahu_kaalam": calculate_raahu_kaalam(weekday),
        "yemagandam": calculate_yemagandam(weekday),
        "kuligai": calculate_kuligai(weekday),
        "soolam": get_soolam(day),
        "parigaram": get_parigaram(day),
        "chandirashtamam": ["புனர்பூசம்", "பூசம்", "ஆயில்யம்", "மகம்"][day % 4],
        "naal": "மேல் நோக்கு நாள்" if day % 2 == 0 else "கீழ் நோக்கு நாள்",
        "lagnam": f"தனுர் லக்னம் இருப்பு நாழிகை {day % 5} வினாடி {(day * 3) % 60}",
        "sun_rise": "06:25 கா / AM" if month < 6 else "05:45 கா / AM",
        "sraardha_thithi": ["சதுர்த்தி", "பஞ்சமி", "சஷ்டி", "சப்தமி"][day % 4],
        "thithi": f"இன்று காலை 11:30 AM வரை திரிதியை பின்பு {['சதுர்த்தி', 'பஞ்சமி'][day % 2]}",
        "star": f"இன்று அதிகாலை 05:31 AM வரை {['உத்திராடம்', 'திருவோணம்', 'அவிட்டம்'][day % 3]} பின்பு {['திருவோணம்', 'அவிட்டம்', 'சதயம்'][day % 3]}",
        "subakariyam": "சிகிச்சை செய்ய, ஆயுதஞ் செய்ய, யந்திரம் ஸ்தாபிக்க சிறந்த நாள்" if weekday in [0, 2, 4] else "கல்வி, கலை, வாகனம் வாங்க நல்ல நாள்"
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
