
import asyncio
import os
import sys
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorClient

sys.path.append('/app/backend')
from utils.calendar_calculator import calculate_calendar_data

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'test_database')

async def debug_populate():
    # Check Dec 1-5 2025
    year = 2025
    month = 12
    for day in range(1, 6):
        cal_data = calculate_calendar_data(year, month, day, lat='13.0827', lon='80.2707')
        tithi_idx = cal_data.get('tithi_index')
        star_idx = cal_data.get('star_index')
        print(f"Dec {day}: Tithi={tithi_idx}, Star={star_idx}")

if __name__ == "__main__":
    asyncio.run(debug_populate())
