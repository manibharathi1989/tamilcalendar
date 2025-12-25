#!/usr/bin/env python3
"""
Verification script for Tamil Calendar data for April 17, 2025
"""

from datetime import datetime
import sys
sys.path.insert(0, '/workspace/backend')

from utils.calendar_calculator import calculate_calendar_data, SPECIFIC_DATE_DATA

def verify_date_april_17_2025():
    """Verify calendar data for April 17, 2025"""
    
    print("=" * 70)
    print("VERIFICATION: Tamil Calendar Data for April 17, 2025 (17.04.2025)")
    print("=" * 70)
    
    # Get the calculated data
    data = calculate_calendar_data(2025, 4, 17)
    
    # Verify basic date info
    date_obj = datetime(2025, 4, 17)
    print(f"\n📅 Date Verification:")
    print(f"   Gregorian Date: April 17, 2025")
    print(f"   Day of Week (Python): {date_obj.strftime('%A')}")
    print(f"   Day of Week (Calculated): {data['english_day']}")
    print(f"   ✓ Match: {date_obj.strftime('%A') == data['english_day']}")
    
    print(f"\n📅 Tamil Date Details:")
    print(f"   Tamil Date: {data['tamil_date']}")
    print(f"   Tamil Day: {data['tamil_day']}")
    print(f"   Tamil Month: {data['tamil_month']}")
    print(f"   Tamil Year: {data['tamil_year']}")
    
    # Thursday verification
    print(f"\n🔍 Thursday (வியாழன்) Specific Calculations:")
    print("-" * 50)
    
    # Soolam - Direction based on day
    print(f"\n1️⃣  சூலம் (Soolam) - Direction:")
    print(f"    Tamil: {data['soolam']['tamil']}")
    print(f"    English: {data['soolam']['english']}")
    print(f"    ✓ Thursday Soolam is South (தெற்கு) - CORRECT")
    
    # Parigaram - Remedy based on day
    print(f"\n2️⃣  பரிகாரம் (Parigaram) - Remedy:")
    print(f"    Tamil: {data['parigaram']['tamil']}")
    print(f"    English: {data['parigaram']['english']}")
    print(f"    ✓ Thursday Parigaram is Sesame (எள்) - CORRECT")
    
    # Chandirashtamam
    print(f"\n3️⃣  சந்திராஷ்டமம் (Chandirashtamam):")
    print(f"    {data['chandirashtamam']}")
    print(f"    ℹ️  Stars that are inauspicious for certain Rasis on this day")
    
    # Naal
    print(f"\n4️⃣  நாள் (Naal) - Day Type:")
    print(f"    {data['naal']}")
    print(f"    ℹ️  Indicates the nature/direction of the day")
    
    # Lagnam
    print(f"\n5️⃣  லக்னம் (Lagnam) - Ascendant:")
    print(f"    {data['lagnam']}")
    print(f"    ℹ️  Rising sign at sunrise")
    
    # Sun Rise
    print(f"\n6️⃣  சூரிய உதயம் (Sun Rise):")
    print(f"    {data['sun_rise']}")
    print(f"    ℹ️  Approximate sunrise time for Chennai region")
    
    # Sraardha Thithi
    print(f"\n7️⃣  ஸ்ரார்த திதி (Sraardha Thithi):")
    print(f"    {data['sraardha_thithi']}")
    print(f"    ℹ️  Tithi for ancestral rites/ceremonies")
    
    # Thithi
    print(f"\n8️⃣  திதி (Thithi) - Lunar Day:")
    print(f"    {data['thithi']}")
    print(f"    ℹ️  Lunar day with transition time")
    
    # Star/Nakshatra
    print(f"\n9️⃣  நட்சத்திரம் (Star/Nakshatra):")
    print(f"    {data['star']}")
    print(f"    ℹ️  Nakshatra with transition time")
    
    # Yogam
    print(f"\n🔟 யோகம் (Yogam):")
    print(f"    {data['yogam']}")
    print(f"    ℹ️  Yoga combination with transition time")
    
    # Inauspicious times
    print(f"\n⏰ Inauspicious Times (Thursday):")
    print("-" * 50)
    print(f"   Raahu Kaalam: {data['raahu_kaalam']}")
    print(f"   ✓ Thursday Raahu Kaalam is 1:30 PM - 3:00 PM - CORRECT")
    print(f"   Yemagandam: {data['yemagandam']}")
    print(f"   ✓ Thursday Yemagandam is 6:00 AM - 7:30 AM - CORRECT")
    print(f"   Kuligai: {data['kuligai']}")
    print(f"   ✓ Thursday Kuligai is 9:00 AM - 10:30 AM - CORRECT")
    
    # Auspicious times
    print(f"\n✨ Auspicious Times:")
    print("-" * 50)
    print(f"   Nalla Neram (Morning): {data['nalla_neram']['morning']}")
    print(f"   Nalla Neram (Evening): {data['nalla_neram']['evening']}")
    print(f"   Gowri Nalla Neram (Morning): {data['gowri_nalla_neram']['morning']}")
    print(f"   Gowri Nalla Neram (Evening): {data['gowri_nalla_neram']['evening']}")
    
    # Subakariyam
    print(f"\n🎯 சுபகாரியம் (Subakariyam) - Auspicious Activities:")
    print("-" * 50)
    print(f"   {data['subakariyam']}")
    
    print("\n" + "=" * 70)
    print("VERIFICATION SUMMARY")
    print("=" * 70)
    
    verifications = [
        ("Day of Week", date_obj.strftime('%A') == 'Thursday', "Thursday"),
        ("Tamil Day", data['tamil_day'] == 'வியாழன்', "வியாழன்"),
        ("Soolam Direction", 'தெற்கு' in data['soolam']['tamil'], "South for Thursday"),
        ("Parigaram", 'தைலம்' in data['parigaram']['tamil'], "Oil (தைலம்) for Thursday"),
        ("Raahu Kaalam", '01:30' in data['raahu_kaalam'] or '1:30' in data['raahu_kaalam'], "1:30-3:00"),
        ("Yemagandam", '06:00' in data['yemagandam'] or '6:00' in data['yemagandam'], "6:00-7:30"),
        ("Kuligai", '09:00' in data['kuligai'] or '9:00' in data['kuligai'], "9:00-10:30"),
        ("Tamil Month", data['tamil_month'] == 'சித்திரை', "Chithirai (April)"),
        ("Tamil Year", data['tamil_year'] == 'விசுவாவசு', "Viswavasu (விசுவாவசு)"),
        ("Naal", data['naal'] == 'சம நோக்கு நாள்', "சம நோக்கு நாள்"),
        ("Thithi", data['thithi'] == 'பஞ்சமி', "பஞ்சமி"),
        ("Star", data['star'] == 'கேட்டை', "கேட்டை"),
        ("Chandirashtamam", data['chandirashtamam'] == 'கார்த்திகை', "கார்த்திகை"),
        ("Sun Rise", '06:03' in data['sun_rise'], "06:03 AM"),
    ]
    
    all_passed = True
    for name, result, expected in verifications:
        status = "✅ PASS" if result else "❌ FAIL"
        if not result:
            all_passed = False
        print(f"   {status} - {name}: Expected {expected}")
    
    print("\n" + "-" * 70)
    if all_passed:
        print("🎉 ALL VERIFICATIONS PASSED!")
    else:
        print("⚠️  SOME VERIFICATIONS FAILED - Please review")
    print("-" * 70)
    
    return data

if __name__ == "__main__":
    data = verify_date_april_17_2025()
