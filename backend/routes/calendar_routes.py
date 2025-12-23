from fastapi import APIRouter, HTTPException, Query
from datetime import datetime, timedelta
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorClient
import os

router = APIRouter(prefix="/api/calendar", tags=["calendar"])

# MongoDB connection - lazy load
def get_db():
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ.get('DB_NAME', 'test_database')]

@router.get("/daily/{year}/{month}/{day}")
async def get_daily_calendar(year: int, month: int, day: int):
    """Get daily calendar data for a specific date"""
    try:
        db = get_db()
        date = datetime(year, month, day)
        calendar_data = await db.daily_calendars.find_one({
            "date": date
        })
        
        if not calendar_data:
            # Return default data if not found
            return {
                "date": date.isoformat(),
                "tamil_date": f"{day} - மார்கழி - விசுவாவசு",
                "tamil_day": "செவ்வாய்",
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
            }
        
        # Remove MongoDB _id field
        if calendar_data and "_id" in calendar_data:
            calendar_data.pop("_id")
        
        return calendar_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/special-days/{year}/{month}")
async def get_special_days(year: int, month: int):
    """Get special days for a specific month"""
    try:
        # Get all special days for the month
        special_days = await db.special_days.find({
            "year": year,
            "month": month
        }).to_list(1000)
        
        # Group by type
        result = {
            "amavasai": [],
            "pournami": [],
            "karthigai": [],
            "sashtiViradham": [],
            "sankatharaChathurthi": [],
            "chathurthi": [],
            "pradosham": [],
            "thiruvonam": [],
            "maadhasivarathiri": [],
            "ekadhasi": [],
            "ashtami": [],
            "navami": [],
            "govtHolidays": [],
            "weddingDays": [],
            "festivals": []
        }
        
        for day in special_days:
            day.pop("_id", None)
            date_str = day["date"].strftime("%d-%b-%Y %A")
            
            day_type = day["type"]
            if day_type == "amavasai":
                result["amavasai"].append(date_str)
            elif day_type == "pournami":
                result["pournami"].append(date_str)
            elif day_type == "karthigai":
                result["karthigai"].append(date_str)
            elif day_type == "sashti_viradham":
                result["sashtiViradham"].append(date_str)
            elif day_type == "sankatahara_chathurthi":
                result["sankatharaChathurthi"].append(date_str)
            elif day_type == "chathurthi":
                result["chathurthi"].append(date_str)
            elif day_type == "pradosham":
                result["pradosham"].append(date_str)
            elif day_type == "thiruvonam":
                result["thiruvonam"].append(date_str)
            elif day_type == "maadha_sivarathiri":
                result["maadhasivarathiri"].append(date_str)
            elif day_type == "ekadhasi":
                result["ekadhasi"].append(date_str)
            elif day_type == "ashtami":
                result["ashtami"].append(date_str)
            elif day_type == "navami":
                result["navami"].append(date_str)
            elif day_type == "govt_holiday":
                result["govtHolidays"].append({
                    "date": date_str,
                    "tamil": day["tamil_name"],
                    "english": day["english_name"]
                })
            elif day_type == "wedding":
                result["weddingDays"].append({
                    "date": date_str,
                    "phase": day.get("phase", "")
                })
            elif day_type == "festival":
                result["festivals"].append({
                    "date": date_str,
                    "tamil": day["tamil_name"],
                    "english": day["english_name"]
                })
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/rasi-palan/{type}")
async def get_rasi_palan(type: str, date: Optional[str] = None):
    """Get Rasi Palan (horoscope) data"""
    try:
        query = {"type": type}
        if date:
            query["date"] = datetime.fromisoformat(date)
        
        rasi_palan = await db.rasi_palan.find(query).to_list(100)
        
        for item in rasi_palan:
            item.pop("_id", None)
        
        return rasi_palan
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/monthly/{year}/{month}")
async def get_monthly_calendar(year: int, month: int):
    """Get monthly calendar overview"""
    try:
        monthly_data = await db.monthly_calendars.find_one({
            "year": year,
            "month": month
        })
        
        if monthly_data:
            monthly_data.pop("_id", None)
        
        return monthly_data or {
            "year": year,
            "month": month,
            "tamil_month": "மார்கழி",
            "special_days": [],
            "festivals": [],
            "wedding_days": [],
            "govt_holidays": []
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/years")
async def get_available_years():
    """Get list of available years"""
    return {"years": list(range(2005, 2027))}

@router.get("/search")
async def search_calendar(
    start_date: str,
    end_date: str,
    event_type: Optional[str] = None
):
    """Search calendar events within a date range"""
    try:
        start = datetime.fromisoformat(start_date)
        end = datetime.fromisoformat(end_date)
        
        query = {
            "date": {
                "$gte": start,
                "$lte": end
            }
        }
        
        if event_type:
            query["type"] = event_type
        
        events = await db.special_days.find(query).to_list(1000)
        
        for event in events:
            event.pop("_id", None)
        
        return events
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
