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
            {"date": datetime(2025, 12, 25), "type": "sashti_viradham", "tamil_name": "சஷ்டி விரதம்", "english_name": "Sashti Viradham", "month": 12, "year": 2025},
            
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

@router.post("/populate-daily-calendar")
async def seed_daily_calendar():
    """Seed daily calendar data for December 2025"""
    try:
        # Clear existing daily calendar data for December 2025
        await db.daily_calendars.delete_many({
            "date": {
                "$gte": datetime(2025, 12, 1),
                "$lte": datetime(2025, 12, 31)
            }
        })
        
        # Generate daily calendar for December 2025
        daily_calendars = []
        for day in range(1, 32):
            date = datetime(2025, 12, day)
            daily_calendars.append({
                "date": date,
                "tamil_date": f"{day} - மார்கழி - விசுவாவசு",
                "tamil_day": ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"][date.weekday()],
                "tamil_month": "மார்கழி",
                "tamil_year": "விசுவாவசு",
                "english_day": date.strftime("%A"),
                "nalla_neram": {
                    "morning": "07:45 - 08:45 கா / AM",
                    "evening": "04:45 - 05:45 மா / PM"
                },
                "gowri_nalla_neram": {
                    "morning": "01:45 - 02:45 கா / AM",
                    "evening": "07:30 - 08:30 மா / PM"
                },
                "raahu_kaalam": "03.00 - 04.30",
                "yemagandam": "09.00 - 10.30",
                "kuligai": "12.00 - 01.30",
                "soolam": {"tamil": "வடக்கு", "english": "Vadakku"},
                "parigaram": {"tamil": "பால்", "english": "Paal"},
                "chandirashtamam": "புனர்பூசம்",
                "naal": "மேல் நோக்கு நாள்",
                "lagnam": "தனுர் லக்னம் இருப்பு நாழிகை 04 வினாடி 13",
                "sun_rise": "06:25 கா / AM",
                "sraardha_thithi": "சதுர்த்தி",
                "thithi": "இன்று காலை 11:30 AM வரை திரிதியை பின்பு சதுர்த்தி",
                "star": "இன்று அதிகாலை 05:31 AM வரை உத்திராடம் பின்பு திருவோணம்",
                "subakariyam": "சிகிச்சை செய்ய, ஆயுதஞ் செய்ய, யந்திரம் ஸ்தாபிக்க சிறந்த நாள்"
            })
        
        if daily_calendars:
            await db.daily_calendars.insert_many(daily_calendars)
        
        return {
            "message": "Daily calendar for December 2025 seeded successfully",
            "days_count": len(daily_calendars)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
