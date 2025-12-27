
import os
import sys
import asyncio
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorClient

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'test_database')

RASI_DATA = {
    "mesham": {
        "tamil": "மேஷம்", "english": "Mesham",
        "daily": {"ta": "இன்று உங்களுக்கு சந்திராஷ்டமம் உள்ளது. கவனமாக இருக்கவும்.", "en": "Today you have Chandrashtamam. Be careful."},
        "weekly": {"ta": "இந்த வாரம் தொழில் வளர்ச்சி சிறப்பாக இருக்கும்.", "en": "Career growth will be excellent this week."}
    },
    "rishabam": {
        "tamil": "ரிஷபம்", "english": "Rishabam",
        "daily": {"ta": "பண வரவு திருப்திகரமாக இருக்கும்.", "en": "Cash flow will be satisfactory."},
        "weekly": {"ta": "குடும்பத்தில் மகிழ்ச்சி நிலவும் வாரம்.", "en": "A week of happiness in the family."}
    },
    "mithunam": {
        "tamil": "மிதுனம்", "english": "Mithunam",
        "daily": {"ta": "உடல் ஆரோக்கியத்தில் கவனம் தேவை.", "en": "Attention needed on health."},
        "weekly": {"ta": "புதிய முயற்சிகள் வெற்றி தரும்.", "en": "New efforts will bring success."}
    },
    "kadagam": {
        "tamil": "கடகம்", "english": "Kadagam",
        "daily": {"ta": "நண்பர்கள் மூலம் ஆதாயம் கிடைக்கும்.", "en": "Gain through friends."},
        "weekly": {"ta": "பயணங்களால் நன்மை உண்டாகும்.", "en": "Travel will bring benefits."}
    },
    "simmam": {
        "tamil": "சிம்மம்", "english": "Simmam",
        "daily": {"ta": "தொழிலில் போட்டி இருக்கும்.", "en": "There will be competition in business."},
        "weekly": {"ta": "எதிர்பார்த்த உதவிகள் கிடைக்கும்.", "en": "Expected help will be available."}
    },
    "kanni": {
        "tamil": "கன்னி", "english": "Kanni",
        "daily": {"ta": "வாகன யோகம் உண்டு.", "en": "Vehicle luck is present."},
        "weekly": {"ta": "மாணவர்களுக்கு சிறப்பான வாரம்.", "en": "Excellent week for students."}
    },
    "thulam": {
        "tamil": "துலாம்", "english": "Thulam",
        "daily": {"ta": "செலவுகள் அதிகரிக்கும்.", "en": "Expenses will increase."},
        "weekly": {"ta": "ஆன்மீக சிந்தனை மேலோங்கும்.", "en": "Spiritual thoughts will prevail."}
    },
    "vrichikam": {
        "tamil": "விருச்சிகம்", "english": "Vrichikam",
        "daily": {"ta": "மனதிற்கு பிடித்த செய்தி வரும்.", "en": "Good news will arrive."},
        "weekly": {"ta": "சொத்து சம்பந்தமான பிரச்சனைகள் தீரும்.", "en": "Property related issues will be resolved."}
    },
    "dhanusu": {
        "tamil": "தனுசு", "english": "Dhanusu",
        "daily": {"ta": "வேலைப்பளு குறையும்.", "en": "Workload will decrease."},
        "weekly": {"ta": "தம்பதியரிடையே ஒற்றுமை பலப்படும்.", "en": "Unity between couples will strengthen."}
    },
    "makaram": {
        "tamil": "மகரம்", "english": "Makaram",
        "daily": {"ta": "எதிலும் வெற்றி கிடைக்கும்.", "en": "Success in everything."},
        "weekly": {"ta": "வெளிநாட்டு வாய்ப்புகள் வரும்.", "en": "Foreign opportunities will come."}
    },
    "kumbam": {
        "tamil": "கும்பம்", "english": "Kumbam",
        "daily": {"ta": "கோபம் தவிர்க்கவும்.", "en": "Avoid anger."},
        "weekly": {"ta": "உடல் நிலையில் முன்னேற்றம் ஏற்படும்.", "en": "Health will improve."}
    },
    "meenam": {
        "tamil": "மீனம்", "english": "Meenam",
        "daily": {"ta": "பண வரவு தாமதமாகும்.", "en": "Cash flow will be delayed."},
        "weekly": {"ta": "நண்பர்கள் உதவி செய்வார்கள்.", "en": "Friends will help."}
    }
}

async def populate_rasi_palan():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    # Ensure collection exists
    await db.rasi_palan.delete_many({})  # Clear existing
    
    # 1. Populate Daily Rasi Palan (Today)
    today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    
    daily_docs = []
    for rasi_key, data in RASI_DATA.items():
        daily_docs.append({
            "type": "daily",
            "date": today,
            "rasi": rasi_key,
            "rasi_tamil": data["tamil"],
            "rasi_english": data["english"],
            "prediction_tamil": data["daily"]["ta"],
            "prediction_english": data["daily"]["en"],
            "lucky_color": "Yellow", # Placeholder
            "lucky_number": 5
        })
    
    await db.rasi_palan.insert_many(daily_docs)
    print(f"Inserted {len(daily_docs)} daily rasi palan records.")

    # 2. Populate Weekly Rasi Palan (Current Week)
    # Start of week (Monday)
    start_of_week = today - timedelta(days=today.weekday())
    
    weekly_docs = []
    for rasi_key, data in RASI_DATA.items():
        weekly_docs.append({
            "type": "weekly",
            "start_date": start_of_week,
            "end_date": start_of_week + timedelta(days=6),
            "rasi": rasi_key,
            "rasi_tamil": data["tamil"],
            "rasi_english": data["english"],
            "prediction_tamil": data["weekly"]["ta"],
            "prediction_english": data["weekly"]["en"],
            "lucky_days": "Monday, Friday"
        })
        
    await db.rasi_palan.insert_many(weekly_docs)
    print(f"Inserted {len(weekly_docs)} weekly rasi palan records.")

if __name__ == "__main__":
    asyncio.run(populate_rasi_palan())
