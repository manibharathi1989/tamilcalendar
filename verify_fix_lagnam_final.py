
import sys
import os
sys.path.append('/app/backend')
from utils.calendar_calculator import calculate_calendar_data

# Test Date: Jan 1, 2026
result = calculate_calendar_data(2026, 1, 1, lat='13.0827', lon='80.2707')

print("\n--- Corrected Lagnam & Sraardha Thithi (Jan 1, 2026) ---")
print(f"Lagnam: {result['lagnam']}")
print(f"Sraardha Thithi: {result['sraardha_thithi']}")
print(f"Thithi (Current): {result['thithi']}")
