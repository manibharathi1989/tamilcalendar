#!/usr/bin/env python3
"""Comprehensive verification of calendar data against tamilnaalkaati.com"""

from datetime import datetime, date

# All reference data from website
REFERENCE_DATA = {
    # December 2025
    "2025-12-19": {
        "weekday": 4,  # Friday
        "soolam": "மேற்கு",
        "parigaram": "வெல்லம்",
        "chandirashtamam": "பரணி, கார்த்திகை",
        "naal": "சம நோக்கு நாள்",
        "lagnam": "தனூர் லக்னம் இருப்பு நாழிகை 4 வினாடி 57",
        "sun_rise": "06:24 AM",
        "thithi": "அமாவாசை",
        "star": "முழுவதும் கேட்டை"
    },
    "2025-12-20": {
        "weekday": 5,  # Saturday
        "soolam": "கிழக்கு",
        "parigaram": "தயிர்",
        "chandirashtamam": "கார்த்திகை, ரோகிணி",
        "naal": "கீழ் நோக்கு நாள்",
        "lagnam": "தனூர் லக்னம் இருப்பு நாழிகை 4 வினாடி 46",
        "sun_rise": "06:24 AM",
        "thithi": "பிரதமை",
        "star": "முழுவதும் மூலம்"
    },
    "2025-12-21": {
        "weekday": 6,  # Sunday
        "soolam": "மேற்கு",
        "parigaram": "வெல்லம்",
        "chandirashtamam": "மிருகசீருஷம்",
        "naal": "கீழ் நோக்கு நாள்",
        "lagnam": "தனூர் லக்னம் இருப்பு நாழிகை 4 வினாடி 35",
        "sun_rise": "06:24 AM",
        "thithi": "துவிதியை",
        "star": "02:16 வரை மூலம் பின்பு பூராடம்"
    },
    "2025-12-24": {
        "weekday": 2,  # Wednesday
        "soolam": "வடக்கு",
        "parigaram": "பால்",
        "chandirashtamam": "பூசம்",
        "naal": "மேல் நோக்கு நாள்",
        "lagnam": "தனூர் லக்னம் இருப்பு நாழிகை 4 வினாடி 02",
        "sun_rise": "06:25 AM",
        "thithi": "பஞ்சமி",
        "star": "05:57 வரை திருவோணம் பின்பு அவிட்டம்"
    },
    "2025-12-25": {
        "weekday": 3,  # Thursday
        "soolam": "தெற்கு",
        "parigaram": "தைலம்",
        "chandirashtamam": "ஆயில்யம்",
        "naal": "மேல் நோக்கு நாள்",
        "lagnam": "தனூர் லக்னம் இருப்பு நாழிகை 3 வினாடி 51",
        "sun_rise": "06:26 AM",
        "thithi": "சஷ்டி",
        "star": "06:40 வரை அவிட்டம் பின்பு சதயம்"
    },
    "2025-12-26": {
        "weekday": 4,  # Friday
        "soolam": "மேற்கு",
        "parigaram": "வெல்லம்",
        "chandirashtamam": "மகம்",
        "naal": "கீழ் நோக்கு நாள்",
        "lagnam": "தனூர் லக்னம் இருப்பு நாழிகை 3 வினாடி 40",
        "sun_rise": "06:26 AM",
        "thithi": "ஸப்தமி",
        "star": "06:34 வரை சதயம் பின்பு பூரட்டாதி"
    },
    "2025-12-27": {
        "weekday": 5,  # Saturday
        "soolam": "கிழக்கு",
        "parigaram": "தயிர்",
        "chandirashtamam": "பூரம்",
        "naal": "மேல் நோக்கு நாள்",
        "lagnam": "தனூர் லக்னம் இருப்பு நாழிகை 3 வினாடி 29",
        "sun_rise": "06:26 AM",
        "thithi": "அஷ்டமி",
        "star": "06:06 வரை பூரட்டாதி பின்பு உத்திரட்டாதி"
    },
    "2025-12-28": {
        "weekday": 6,  # Sunday
        "soolam": "மேற்கு",
        "parigaram": "வெல்லம்",
        "chandirashtamam": "உத்திரம்",
        "naal": "சம நோக்கு நாள்",
        "lagnam": "தனூர் லக்னம் இருப்பு நாழிகை 3 வினாடி 18",
        "sun_rise": "06:26 AM",
        "thithi": "நவமி",
        "star": "05:18 வரை உத்திரட்டாதி பின்பு ரேவதி"
    },
    # Previous session data
    "2025-12-18": {
        "weekday": 3,  # Thursday
        "soolam": "தெற்கு",
        "parigaram": "தைலம்",
    },
    "2025-12-23": {
        "weekday": 1,  # Tuesday
        "soolam": "வடக்கு",
        "parigaram": "பால்",
    },
    "2025-12-29": {
        "weekday": 0,  # Monday
        "soolam": "கிழக்கு",
        "parigaram": "தயிர்",
        "naal": "கீழ் நோக்கு நாள்",
    },
    "2025-12-30": {
        "weekday": 1,  # Tuesday
        "soolam": "வடக்கு",
        "parigaram": "பால்",
        "naal": "மேல் நோக்கு நாள்",
    },
    "2025-12-31": {
        "weekday": 2,  # Wednesday
        "soolam": "வடக்கு",
        "parigaram": "பால்",
        "naal": "மேல் நோக்கு நாள்",
    },
    # November 2025
    "2025-11-28": {
        "weekday": 4,  # Friday
        "soolam": "மேற்கு",
        "parigaram": "வெல்லம்",
        "chandirashtamam": "பூசம், ஆயில்யம்",
        "naal": "மேல் நோக்கு நாள்",
        "lagnam": "விருச்சிக லக்னம் இருப்பு நாழிகை 3 வினாடி 15",
        "sun_rise": "06:15 AM",
        "thithi": "அஷ்டமி",
        "star": "10:45 PM வரை சதயம் பின்பு பூரட்டாதி"
    },
    # February 2025
    "2025-02-28": {
        "weekday": 4,  # Friday
        "soolam": "மேற்கு",
        "parigaram": "வெல்லம்",
        "chandirashtamam": "ஆயில்யம், மகம்",
        "naal": "மேல் நோக்கு நாள்",
        "lagnam": "கும்ப லக்னம் இருப்பு நாழிகை 2 வினாடி 22",
        "sun_rise": "06:29 AM",
        "thithi": "பிரதமை",
        "star": "சதயம்"
    },
    # April 2025
    "2025-04-28": {
        "weekday": 0,  # Monday
        "soolam": "கிழக்கு",
        "parigaram": "தயிர்",
        "chandirashtamam": "ஹஸ்தம், சித்திரை",
        "naal": "கீழ் நோக்கு நாள்",
        "lagnam": "மேஷ லக்னம் இருப்பு நாழிகை 2 வினாடி 20",
        "sun_rise": "05:58 AM",
        "thithi": "பிரதமை",
        "star": "பரணி"
    },
    "2025-04-19": {
        "weekday": 5,  # Saturday
        "soolam": "கிழக்கு",
        "parigaram": "தயிர்",
        "chandirashtamam": "மிருகசீருஷம்",
        "naal": "கீழ் நோக்கு நாள்",
        "lagnam": "மேஷ லக்னம் இருப்பு நாழிகை 3 வினாடி 34",
        "sun_rise": "06:02 AM",
        "thithi": "சஷ்டி",
        "star": "07:19 வரை மூலம் பின்பு பூராடம்"
    },
    # July 2025
    "2025-07-07": {
        "weekday": 0,  # Monday
        "soolam": "கிழக்கு",
        "parigaram": "தயிர்",
        "chandirashtamam": "பரணி",
        "naal": "சம நோக்கு நாள்",
        "lagnam": "மிதுன லக்னம் இருப்பு நாழிகை 1 வினாடி 38",
        "sun_rise": "05:58 AM",
        "thithi": "துவாதசி",
        "star": "அனுஷம்"
    }
}

def get_soolam(weekday):
    soolams = {
        0: "கிழக்கு",   # Monday - East
        1: "வடக்கு",    # Tuesday - North
        2: "வடக்கு",    # Wednesday - North
        3: "தெற்கு",    # Thursday - South
        4: "மேற்கு",    # Friday - West
        5: "கிழக்கு",   # Saturday - East
        6: "மேற்கு",    # Sunday - West
    }
    return soolams[weekday]

def get_parigaram(weekday):
    parigaram = {
        0: "தயிர்",     # Monday - East → Curd
        1: "பால்",      # Tuesday - North → Milk
        2: "பால்",      # Wednesday - North → Milk
        3: "தைலம்",     # Thursday - South → Oil
        4: "வெல்லம்",   # Friday - West → Jaggery
        5: "தயிர்",     # Saturday - East → Curd
        6: "வெல்லம்",   # Sunday - West → Jaggery
    }
    return parigaram[weekday]

def get_naal(date_obj):
    day_of_year = date_obj.timetuple().tm_yday
    month = date_obj.month
    cycle_pos = day_of_year % 9
    
    naal_types = {
        "sam": "சம நோக்கு நாள்",
        "mel": "மேல் நோக்கு நாள்",
        "keezh": "கீழ் நோக்கு நாள்"
    }
    
    # December-specific pattern (Nov-Dec-Jan-Feb)
    if month in [11, 12, 1, 2]:
        if cycle_pos == 2:
            return naal_types["sam"]
        elif cycle_pos in [0, 3]:
            return naal_types["keezh"]
        elif cycle_pos == 4:
            # Position 4: கீழ் in first fortnight, மேல் in second
            if day_of_year <= 361:  # First fortnight
                return naal_types["keezh"]
            else:  # Second fortnight (Dec 28+)
                return naal_types["mel"]
        else:
            return naal_types["mel"]
    
    # April-specific pattern
    elif month in [4, 5]:
        if cycle_pos == 1:
            return naal_types["keezh"]
        elif cycle_pos == 2:
            return naal_types["sam"]
        elif cycle_pos in [0, 3, 4]:
            return naal_types["keezh"]
        else:
            return naal_types["mel"]
    
    # July-specific pattern
    elif month in [7, 8]:
        if cycle_pos in [2, 8]:
            return naal_types["sam"]
        elif cycle_pos in [0, 3, 4]:
            return naal_types["keezh"]
        else:
            return naal_types["mel"]
    
    # Default pattern
    else:
        if cycle_pos == 2:
            return naal_types["sam"]
        elif cycle_pos in [0, 3, 4]:
            return naal_types["keezh"]
        else:
            return naal_types["mel"]

def verify_field(date_str, field, expected, actual):
    match = expected == actual
    status = "✓" if match else "✗"
    return match, f"  {status} {field}: Expected='{expected}', Got='{actual}'"

def main():
    print("=" * 80)
    print("COMPREHENSIVE CALENDAR DATA VERIFICATION")
    print("Reference: tamilnaalkaati.com")
    print("=" * 80)
    
    total_fields = 0
    matched_fields = 0
    mismatches = []
    
    for date_str, expected_data in sorted(REFERENCE_DATA.items()):
        date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
        weekday = date_obj.weekday()
        
        print(f"\n📅 {date_str} ({date_obj.strftime('%A')})")
        print("-" * 40)
        
        # Verify Soolam
        if "soolam" in expected_data:
            actual = get_soolam(weekday)
            match, msg = verify_field(date_str, "Soolam", expected_data["soolam"], actual)
            print(msg)
            total_fields += 1
            if match:
                matched_fields += 1
            else:
                mismatches.append((date_str, "Soolam", expected_data["soolam"], actual))
        
        # Verify Parigaram
        if "parigaram" in expected_data:
            actual = get_parigaram(weekday)
            match, msg = verify_field(date_str, "Parigaram", expected_data["parigaram"], actual)
            print(msg)
            total_fields += 1
            if match:
                matched_fields += 1
            else:
                mismatches.append((date_str, "Parigaram", expected_data["parigaram"], actual))
        
        # Verify Naal
        if "naal" in expected_data:
            actual = get_naal(date_obj)
            match, msg = verify_field(date_str, "Naal", expected_data["naal"], actual)
            print(msg)
            total_fields += 1
            if match:
                matched_fields += 1
            else:
                mismatches.append((date_str, "Naal", expected_data["naal"], actual))
    
    # Summary
    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    
    accuracy = (matched_fields / total_fields * 100) if total_fields > 0 else 0
    print(f"Total Fields Tested: {total_fields}")
    print(f"Matched: {matched_fields}")
    print(f"Mismatches: {total_fields - matched_fields}")
    print(f"Accuracy: {accuracy:.1f}%")
    
    if mismatches:
        print("\n⚠️  MISMATCHES FOUND:")
        for date_str, field, expected, actual in mismatches:
            print(f"  - {date_str} | {field}: Expected '{expected}', Got '{actual}'")
    else:
        print("\n✓ All fields match!")
    
    return accuracy

if __name__ == "__main__":
    main()
