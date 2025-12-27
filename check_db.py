
import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'test_database')

async def check_db():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    # Count by type for Dec 2025
    pipeline = [
        {"$match": {"year": 2025, "month": 12}},
        {"$group": {"_id": "$type", "count": {"$sum": 1}}}
    ]
    
    cursor = db.special_days.aggregate(pipeline)
    async for doc in cursor:
        print(doc)

if __name__ == "__main__":
    asyncio.run(check_db())
