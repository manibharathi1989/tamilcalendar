from fastapi import APIRouter, HTTPException, Depends, Header
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import Optional
import os
import hashlib

router = APIRouter(prefix="/api/admin", tags=["admin"])

# MongoDB connection - lazy load
def get_db():
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ.get('DB_NAME', 'test_database')]

# Simple auth token (in production, use JWT or OAuth)
ADMIN_TOKEN = "tamil_calendar_admin_2025"

def verify_admin(authorization: str = Header(None)):
    """Verify admin token"""
    if not authorization or authorization != f"Bearer {ADMIN_TOKEN}":
        raise HTTPException(status_code=401, detail="Unauthorized")
    return True

class DailyCalendarUpdate(BaseModel):
    tamil_date: Optional[str] = None
    nalla_neram: Optional[dict] = None
    gowri_nalla_neram: Optional[dict] = None
    raahu_kaalam: Optional[str] = None
    yemagandam: Optional[str] = None
    kuligai: Optional[str] = None
    soolam: Optional[dict] = None
    parigaram: Optional[dict] = None
    chandirashtamam: Optional[str] = None
    naal: Optional[str] = None
    lagnam: Optional[str] = None
    sun_rise: Optional[str] = None
    sraardha_thithi: Optional[str] = None
    thithi: Optional[str] = None
    star: Optional[str] = None
    subakariyam: Optional[str] = None

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
async def admin_login(request: LoginRequest):
    """Admin login endpoint"""
    # Simple username/password check (in production, use proper auth)
    if request.username == "admin" and request.password == "tamil123":
        return {
            "success": True,
            "token": ADMIN_TOKEN,
            "message": "Login successful"
        }
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.get("/calendar/{year}/{month}/{day}")
async def get_calendar_for_edit(
    year: int, 
    month: int, 
    day: int,
    authenticated: bool = Depends(verify_admin)
):
    """Get calendar data for editing"""
    try:
        db = get_db()
        date = datetime(year, month, day)
        
        calendar_data = await db.daily_calendars.find_one({"date": date})
        
        if not calendar_data:
            raise HTTPException(status_code=404, detail="Calendar data not found")
        
        calendar_data.pop("_id", None)
        return calendar_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/calendar/{year}/{month}/{day}")
async def update_calendar(
    year: int,
    month: int,
    day: int,
    updates: DailyCalendarUpdate,
    authenticated: bool = Depends(verify_admin)
):
    """Update calendar data for a specific date"""
    try:
        db = get_db()
        date = datetime(year, month, day)
        
        # Build update dict with only provided fields
        update_dict = {k: v for k, v in updates.dict().items() if v is not None}
        
        if not update_dict:
            raise HTTPException(status_code=400, detail="No fields to update")
        
        # Update the document
        result = await db.daily_calendars.update_one(
            {"date": date},
            {"$set": update_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Calendar data not found")
        
        return {
            "success": True,
            "message": f"Calendar updated for {year}-{month:02d}-{day:02d}",
            "updated_fields": list(update_dict.keys())
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/calendar/search")
async def search_calendar_admin(
    year: Optional[int] = None,
    month: Optional[int] = None,
    limit: int = 50,
    authenticated: bool = Depends(verify_admin)
):
    """Search calendar data (admin only)"""
    try:
        db = get_db()
        query = {}
        
        if year and month:
            start_date = datetime(year, month, 1)
            if month == 12:
                end_date = datetime(year + 1, 1, 1)
            else:
                end_date = datetime(year, month + 1, 1)
            query["date"] = {"$gte": start_date, "$lt": end_date}
        elif year:
            start_date = datetime(year, 1, 1)
            end_date = datetime(year + 1, 1, 1)
            query["date"] = {"$gte": start_date, "$lt": end_date}
        
        calendars = await db.daily_calendars.find(query).limit(limit).to_list(limit)
        
        for cal in calendars:
            cal.pop("_id", None)
            cal["date"] = cal["date"].isoformat()
        
        return {
            "count": len(calendars),
            "data": calendars
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/calendar/{year}/{month}/{day}")
async def delete_calendar(
    year: int,
    month: int,
    day: int,
    authenticated: bool = Depends(verify_admin)
):
    """Delete calendar data for a specific date"""
    try:
        db = get_db()
        date = datetime(year, month, day)
        
        result = await db.daily_calendars.delete_one({"date": date})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Calendar data not found")
        
        return {
            "success": True,
            "message": f"Calendar deleted for {year}-{month:02d}-{day:02d}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/stats")
async def get_admin_stats(authenticated: bool = Depends(verify_admin)):
    """Get database statistics"""
    try:
        db = get_db()
        
        total_calendars = await db.daily_calendars.count_documents({})
        total_special_days = await db.special_days.count_documents({})
        
        # Get year-wise count
        pipeline = [
            {
                "$group": {
                    "_id": {"$year": "$date"},
                    "count": {"$sum": 1}
                }
            },
            {"$sort": {"_id": 1}}
        ]
        
        year_stats = await db.daily_calendars.aggregate(pipeline).to_list(100)
        
        return {
            "total_calendars": total_calendars,
            "total_special_days": total_special_days,
            "year_wise_stats": [
                {"year": stat["_id"], "days": stat["count"]} 
                for stat in year_stats
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class SpecialDayCreate(BaseModel):
    date: str
    type: str
    tamil_name: Optional[str] = None
    english_name: Optional[str] = None
    year: int
    month: int

@router.get("/special-days/{year}/{month}")
async def get_special_days_admin(
    year: int,
    month: int,
    authenticated: bool = Depends(verify_admin)
):
    """Get special days for admin editing"""
    try:
        db = get_db()
        special_days = await db.special_days.find({
            "year": year,
            "month": month
        }).to_list(1000)
        
        result = []
        for day in special_days:
            day["id"] = str(day.pop("_id"))
            if "date" in day and hasattr(day["date"], 'isoformat'):
                day["date"] = day["date"].isoformat()
            result.append(day)
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/special-days")
async def add_special_day(
    day_data: SpecialDayCreate,
    authenticated: bool = Depends(verify_admin)
):
    """Add a new special day"""
    try:
        db = get_db()
        
        # Parse the date
        date_obj = datetime.fromisoformat(day_data.date)
        
        new_day = {
            "date": date_obj,
            "type": day_data.type,
            "tamil_name": day_data.tamil_name or day_data.type,
            "english_name": day_data.english_name or day_data.type,
            "year": day_data.year,
            "month": day_data.month
        }
        
        result = await db.special_days.insert_one(new_day)
        
        return {
            "success": True,
            "message": "Special day added successfully",
            "id": str(result.inserted_id)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/special-days/{day_id}")
async def delete_special_day(
    day_id: str,
    authenticated: bool = Depends(verify_admin)
):
    """Delete a special day"""
    try:
        from bson import ObjectId
        db = get_db()
        
        result = await db.special_days.delete_one({"_id": ObjectId(day_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Special day not found")
        
        return {
            "success": True,
            "message": "Special day deleted successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/analytics")
async def get_analytics(authenticated: bool = Depends(verify_admin)):
    """Get comprehensive analytics"""
    try:
        db = get_db()
        
        total_days = await db.daily_calendars.count_documents({})
        total_special_days = await db.special_days.count_documents({})
        
        # Count by event type
        pipeline = [
            {"$group": {"_id": "$type", "count": {"$sum": 1}}}
        ]
        type_counts = await db.special_days.aggregate(pipeline).to_list(100)
        events_by_type = {item["_id"]: item["count"] for item in type_counts}
        
        # Get years with data
        years_pipeline = [
            {"$group": {"_id": {"$year": "$date"}}},
            {"$count": "total"}
        ]
        years_result = await db.daily_calendars.aggregate(years_pipeline).to_list(1)
        years_available = years_result[0]["total"] if years_result else 0
        
        return {
            "totalDays": total_days,
            "totalSpecialDays": total_special_days,
            "yearsAvailable": years_available,
            "monthsWithData": years_available * 12,
            "eventsByType": events_by_type
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
