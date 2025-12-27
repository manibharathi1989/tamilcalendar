
import asyncio
import os
import sys
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorClient

# Add parent directory to path
sys.path.append('/app/backend')
from utils.calendar_calculator import calculate_calendar_data

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'test_database')

async def populate_special_days():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    # Target months: Dec 2025, Jan 2026
    targets = [(2025, 12), (2026, 1)]
    
    fixed_events = {
        (2025, 12, 3): [("festival", "கார்த்திகை தீபம்", "Karthigai Deepam")],
        (2025, 12, 19): [("festival", "ஹனுமன் ஜெயந்தி", "Hanumath Jayanthi")],
        (2025, 12, 25): [("govt_holiday", "கிறிஸ்துமஸ்", "Christmas"), ("festival", "கிறிஸ்துமஸ்", "Christmas")],
        (2025, 12, 30): [("festival", "வைகுண்ட ஏகாதசி", "Vaikunta Ekadasi")],
        
        (2026, 1, 1): [("govt_holiday", "ஆங்கில புத்தாண்டு", "New Year")],
        (2026, 1, 14): [("govt_holiday", "பொங்கல்", "Pongal"), ("festival", "பொங்கல்", "Pongal")],
        (2026, 1, 15): [("govt_holiday", "மாட்டு பொங்கல்", "Mattu Pongal"), ("festival", "மாட்டு பொங்கல்", "Mattu Pongal")],
        (2026, 1, 16): [("govt_holiday", "காணும் பொங்கல்", "Kaanum Pongal"), ("festival", "காணும் பொங்கல்", "Kaanum Pongal")],
        (2026, 1, 26): [("govt_holiday", "குடியரசு தினம்", "Republic Day")]
    }

    for year, month in targets:
        print(f"Processing {year}-{month}...")
        
        # Clear existing
        await db.special_days.delete_many({"year": year, "month": month})
        
        start_date = datetime(year, month, 1)
        if month == 12:
            end_date = datetime(year + 1, 1, 1) - timedelta(days=1)
        else:
            end_date = datetime(year, month + 1, 1) - timedelta(days=1)
            
        days_in_month = (end_date - start_date).days + 1
        
        for i in range(days_in_month):
            current_date = start_date + timedelta(days=i)
            day = current_date.day
            
            # Get calendar data
            # Use default location (New Delhi) or Chennai? 
            # Ideally consistent with user default, but for special days generic is fine.
            # Using Chennai logic for Tamil calendar standards often better for festivals.
            cal_data = calculate_calendar_data(year, month, day, lat='13.0827', lon='80.2707')
            
            tithi_idx = cal_data.get('tithi_index')
            star_idx = cal_data.get('star_index')
            
            events = []
            
            # Derived Events
            # Amavasai (15) / Pournami (14)
            # Tithi index 0-14 (Shukla), 15-29 (Krishna)? 
            # Wait, calculate_panchangam returns 0-29?
            # Let's check logic:
            # tithi_index = int(tithi_diff / 12) -> 0 to 29
            # 0-14: Shukla (Valarpirai)
            # 15-29: Krishna (Theipirai)
            # Full Moon (Pournami) is usually end of Shukla (around 14-15)
            # New Moon (Amavasai) is end of Krishna (around 29-0)
            
            # But the code says:
            # t_index = tithi_index % 15
            # if t_index == 14: ... Pournami/Amavasaya
            
            # So:
            # If tithi_index = 14 -> Pournami (End of Shukla)
            # If tithi_index = 29 -> Amavasai (End of Krishna)
            
            if tithi_idx == 14:
                events.append(("pournami", "பௌர்ணமி", "Pournami"))
            elif tithi_idx == 29:
                events.append(("amavasai", "அமாவாசை", "Amavasai"))
                
            # Pradosham (Trayodashi = 12 or 27)
            if tithi_idx == 12 or tithi_idx == 27:
                events.append(("pradosham", "பிரதோஷம்", "Pradosham"))
                
            # Ekadasi (10 or 25)
            if tithi_idx == 10 or tithi_idx == 25:
                events.append(("ekadhasi", "ஏகாதசி", "Ekadhasi"))
                
            # Karthigai (Star = Krithigai = 2)
            if star_idx == 2:
                events.append(("karthigai", "கார்த்திகை", "Karthigai"))
                
            # Thiruvonam (Star = Thiruvonam = 21)
            if star_idx == 21:
                events.append(("thiruvonam", "திருவோணம்", "Thiruvonam"))
                
            # Chathurthi (3 or 18)
            if tithi_idx == 3: # Shukla Chathurthi
                events.append(("chathurthi", "சதுர்த்தி", "Chathurthi"))
            elif tithi_idx == 18: # Krishna Chathurthi (Sankatahara)
                events.append(("sankatahara_chathurthi", "சங்கடஹர சதுர்த்தி", "Sankatahara Chathurthi"))
                
            # Sashti (5 or 20)
            if tithi_idx == 5: # Shukla Sashti (Viradham)
                events.append(("sashti_viradham", "சஷ்டி விரதம்", "Sashti Viradham"))
                
            # Ashtami (7 or 22)
            if tithi_idx == 7 or tithi_idx == 22:
                events.append(("ashtami", "அஷ்டமி", "Ashtami"))
                
            # Navami (8 or 23)
            if tithi_idx == 8 or tithi_idx == 23:
                events.append(("navami", "நவமி", "Navami"))
                
            # Maadha Sivarathiri (Krishna Chaturdashi = 28)
            if tithi_idx == 28:
                events.append(("maadha_sivarathiri", "மாத சிவராத்திரி", "Maadha Sivarathiri"))
                
            # Fixed Events
            if (year, month, day) in fixed_events:
                events.extend(fixed_events[(year, month, day)])
                
            # Insert into DB
            for evt_type, evt_ta, evt_eng in events:
                doc = {
                    "date": current_date,
                    "year": year,
                    "month": month,
                    "type": evt_type,
                    "tamil_name": evt_ta,
                    "english_name": evt_eng,
                    "created_at": datetime.utcnow()
                }
                await db.special_days.insert_one(doc)
                
    print("Population complete.")

if __name__ == "__main__":
    asyncio.run(populate_special_days())
