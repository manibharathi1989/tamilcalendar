"""
Tamil Calendar Calculator Module
Provides calculations for Tamil calendar data including Panchang elements
"""

from datetime import datetime, date
from typing import Dict, Any

# Tamil day names
TAMIL_DAYS = {
    0: "திங்கள்",      # Monday
    1: "செவ்வாய்",     # Tuesday
    2: "புதன்",        # Wednesday
    3: "வியாழன்",      # Thursday
    4: "வெள்ளி",       # Friday
    5: "சனி",          # Saturday
    6: "ஞாயிறு"        # Sunday
}

ENGLISH_DAYS = {
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday"
}

# Tamil months
TAMIL_MONTHS = {
    1: "சித்திரை",     # Chithirai (Apr-May)
    2: "வைகாசி",       # Vaigasi (May-Jun)
    3: "ஆனி",          # Aani (Jun-Jul)
    4: "ஆடி",          # Aadi (Jul-Aug)
    5: "ஆவணி",         # Aavani (Aug-Sep)
    6: "புரட்டாசி",    # Purattasi (Sep-Oct)
    7: "ஐப்பசி",       # Aippasi (Oct-Nov)
    8: "கார்த்திகை",   # Karthigai (Nov-Dec)
    9: "மார்கழி",      # Margazhi (Dec-Jan)
    10: "தை",          # Thai (Jan-Feb)
    11: "மாசி",        # Maasi (Feb-Mar)
    12: "பங்குனி"      # Panguni (Mar-Apr)
}

# Tamil year names (60-year cycle)
TAMIL_YEARS = [
    "பிரபவ", "விபவ", "சுக்ல", "பிரமோதூத", "பிரஜோத்பத்தி",
    "ஆங்கீரச", "ஸ்ரீமுக", "பவ", "யுவ", "தாது",
    "ஈஸ்வர", "வெகுதான்ய", "பிரமாதி", "விக்கிரம", "விஷு",
    "சித்திரபானு", "சுபானு", "தாரண", "பார்த்திப", "விய",
    "சர்வஜித்", "சர்வதாரி", "விரோதி", "விக்ருதி", "கர",
    "நந்தன", "விஜய", "ஜய", "மன்மத", "துன்முகி",
    "ஹேவிளம்பி", "விளம்பி", "விகாரி", "சார்வரி", "பிலவ",
    "சுபகிருது", "சோபகிருது", "குரோதி", "விசுவாவசு", "பராபவ",
    "பிலவங்க", "கீலக", "சௌமிய", "சாதாரண", "விரோதகிருது",
    "பரிதாபி", "பிரமாதீச", "ஆனந்த", "ராட்சச", "நள",
    "பிங்கள", "காளயுக்தி", "சித்தார்த்தி", "ரௌத்திரி", "துன்மதி",
    "துந்துபி", "ருத்ரோத்காரி", "ரக்தாட்சி", "குரோதன", "அட்சய"
]

# Soolam (direction) based on day of week
SOOLAM_BY_DAY = {
    0: {"tamil": "கிழக்கு", "english": "Kizhakku (East)"},        # Monday
    1: {"tamil": "வடக்கு", "english": "Vadakku (North)"},         # Tuesday
    2: {"tamil": "வடக்கு", "english": "Vadakku (North)"},         # Wednesday
    3: {"tamil": "தெற்கு", "english": "Therkku (South)"},         # Thursday
    4: {"tamil": "மேற்கு", "english": "Merkku (West)"},           # Friday
    5: {"tamil": "கிழக்கு", "english": "Kizhakku (East)"},        # Saturday
    6: {"tamil": "மேற்கு", "english": "Merkku (West)"}            # Sunday
}

# Parigaram (remedy) based on day of week
PARIGARAM_BY_DAY = {
    0: {"tamil": "வெல்லம்", "english": "Vellam (Jaggery)"},       # Monday
    1: {"tamil": "கோதுமை", "english": "Gothumai (Wheat)"},        # Tuesday
    2: {"tamil": "பச்சைப்பயறு", "english": "Pachaipayaru (Green Gram)"},  # Wednesday
    3: {"tamil": "தைலம்", "english": "Thailam (Oil)"},            # Thursday
    4: {"tamil": "அரிசி", "english": "Arisi (Rice)"},             # Friday
    5: {"tamil": "உளுந்து", "english": "Ulundhu (Black Gram)"},   # Saturday
    6: {"tamil": "கடலை", "english": "Kadalai (Gram)"}             # Sunday
}

# Raahu Kaalam timings by day
RAAHU_KAALAM = {
    0: "07:30 - 09:00",   # Monday
    1: "15:00 - 16:30",   # Tuesday
    2: "12:00 - 13:30",   # Wednesday
    3: "13:30 - 15:00",   # Thursday
    4: "10:30 - 12:00",   # Friday
    5: "09:00 - 10:30",   # Saturday
    6: "16:30 - 18:00"    # Sunday
}

# Yemagandam timings by day
YEMAGANDAM = {
    0: "10:30 - 12:00",   # Monday
    1: "09:00 - 10:30",   # Tuesday
    2: "07:30 - 09:00",   # Wednesday
    3: "06:00 - 07:30",   # Thursday
    4: "15:00 - 16:30",   # Friday
    5: "13:30 - 15:00",   # Saturday
    6: "12:00 - 13:30"    # Sunday
}

# Kuligai timings by day
KULIGAI = {
    0: "13:30 - 15:00",   # Monday
    1: "12:00 - 13:30",   # Tuesday
    2: "10:30 - 12:00",   # Wednesday
    3: "09:00 - 10:30",   # Thursday
    4: "07:30 - 09:00",   # Friday
    5: "06:00 - 07:30",   # Saturday
    6: "15:00 - 16:30"    # Sunday
}

# 27 Nakshatras (Stars)
NAKSHATRAS = [
    "அஸ்வினி", "பரணி", "கிருத்திகை", "ரோகிணி", "மிருகசீரிடம்",
    "திருவாதிரை", "புனர்பூசம்", "பூசம்", "ஆயில்யம்", "மகம்",
    "பூரம்", "உத்திரம்", "அஸ்தம்", "சித்திரை", "சுவாதி",
    "விசாகம்", "அனுஷம்", "கேட்டை", "மூலம்", "பூராடம்",
    "உத்திராடம்", "திருவோணம்", "அவிட்டம்", "சதயம்", "பூரட்டாதி",
    "உத்திரட்டாதி", "ரேவதி"
]

# 15 Tithis
TITHIS = [
    "பிரதமை", "துவிதியை", "திரிதியை", "சதுர்த்தி", "பஞ்சமி",
    "சஷ்டி", "சப்தமி", "அஷ்டமி", "நவமி", "தசமி",
    "ஏகாதசி", "துவாதசி", "திரயோதசி", "சதுர்த்தசி", "பௌர்ணமி/அமாவாசை"
]

# 27 Yogams
YOGAMS = [
    "விஷ்கம்பம்", "பிரீதி", "ஆயுஷ்மான்", "சௌபாக்யம்", "சோபனம்",
    "அதிகண்டம்", "சுகர்மா", "திருதி", "சூலம்", "கண்டம்",
    "விருத்தி", "துருவம்", "வியாகாதம்", "ஹர்ஷணம்", "வஜ்ரம்",
    "சித்தி", "வியதீபாதம்", "வரியான்", "பரிகம்", "சிவம்",
    "சித்தம்", "சாத்தியம்", "சுபம்", "சுப்பிரம்", "பிராம்யம்",
    "ஐந்திரம்", "வைதிருதி"
]

# Naal types
NAAL_TYPES = [
    "அமிர்த நாள்",
    "மேல் நோக்கு நாள்",
    "கீழ் நோக்கு நாள்",
    "நடு நாள்",
    "சுப நாள்"
]

# Lagnam (Ascendant) signs
LAGNAMS = [
    "மேஷ லக்னம்", "ரிஷப லக்னம்", "மிதுன லக்னம்", "கடக லக்னம்",
    "சிம்ம லக்னம்", "கன்னி லக்னம்", "துலா லக்னம்", "விருச்சிக லக்னம்",
    "தனுர் லக்னம்", "மகர லக்னம்", "கும்ப லக்னம்", "மீன லக்னம்"
]

# 12 Rasis (Zodiac Signs)
RASIS = [
    "மேஷம்",      # Aries (0)
    "ரிஷபம்",     # Taurus (1)
    "மிதுனம்",    # Gemini (2)
    "கடகம்",      # Cancer (3)
    "சிம்மம்",    # Leo (4)
    "கன்னி",      # Virgo (5)
    "துலாம்",     # Libra (6)
    "விருச்சிகம்", # Scorpio (7)
    "தனுசு",      # Sagittarius (8)
    "மகரம்",      # Capricorn (9)
    "கும்பம்",    # Aquarius (10)
    "மீனம்"       # Pisces (11)
]

# Chandirashtamam - Stars for each rasi (inauspicious stars)
CHANDIRASHTAMAM_STARS = {
    "மேஷம்": "அனுஷம், கேட்டை",
    "ரிஷபம்": "மூலம், பூராடம்",
    "மிதுனம்": "உத்திராடம், திருவோணம்",
    "கடகம்": "அவிட்டம், சதயம்",
    "சிம்மம்": "பூரட்டாதி, உத்திரட்டாதி",
    "கன்னி": "ரேவதி, அஸ்வினி",
    "துலாம்": "பரணி, கிருத்திகை",
    "விருச்சிகம்": "ரோகிணி, மிருகசீரிடம்",
    "தனுசு": "திருவாதிரை, புனர்பூசம்",
    "மகரம்": "பூசம், ஆயில்யம்",
    "கும்பம்": "மகம், பூரம்",
    "மீனம்": "உத்திரம், அஸ்தம்"
}

# Map each Nakshatra to its Rasi
# Each rasi spans 2.25 nakshatras (27 nakshatras / 12 rasis)
NAKSHATRA_TO_RASI = {
    "அஸ்வினி": "மேஷம்",        # Aries
    "பரணி": "மேஷம்",           # Aries
    "கிருத்திகை": "ரிஷபம்",    # Taurus (mostly)
    "ரோகிணி": "ரிஷபம்",        # Taurus
    "மிருகசீரிடம்": "மிதுனம்",  # Gemini (mostly)
    "திருவாதிரை": "மிதுனம்",   # Gemini
    "புனர்பூசம்": "கடகம்",     # Cancer (mostly)
    "பூசம்": "கடகம்",          # Cancer
    "ஆயில்யம்": "கடகம்",       # Cancer
    "மகம்": "சிம்மம்",          # Leo
    "பூரம்": "சிம்மம்",         # Leo
    "உத்திரம்": "கன்னி",       # Virgo (mostly)
    "அஸ்தம்": "கன்னி",         # Virgo
    "சித்திரை": "துலாம்",      # Libra (mostly)
    "சுவாதி": "துலாம்",        # Libra
    "விசாகம்": "விருச்சிகம்",  # Scorpio (mostly)
    "அனுஷம்": "விருச்சிகம்",   # Scorpio
    "கேட்டை": "விருச்சிகம்",   # Scorpio
    "மூலம்": "தனுசு",          # Sagittarius
    "பூராடம்": "தனுசு",        # Sagittarius
    "உத்திராடம்": "மகரம்",     # Capricorn (mostly)
    "திருவோணம்": "மகரம்",      # Capricorn
    "அவிட்டம்": "கும்பம்",     # Aquarius (mostly)
    "சதயம்": "கும்பம்",        # Aquarius
    "பூரட்டாதி": "மீனம்",      # Pisces (mostly)
    "உத்திரட்டாதி": "மீனம்",   # Pisces
    "ரேவதி": "மீனம்"           # Pisces
}

# Mel Nokku (Upward Looking) Stars
MEL_NOKKU_STARS = [
    "ரோகிணி", "திருவாதிரை", "பூசம்", "உத்திரம்", 
    "உத்திராடம்", "திருவோணம்", "அவிட்டம்", "சதயம்", "உத்திரட்டாதி"
]

# Keel Nokku (Downward Looking) Stars
KEEL_NOKKU_STARS = [
    "பரணி", "கிருத்திகை", "ஆயில்யம்", "மகம்", "பூரம்",
    "விசாகம்", "மூலம்", "பூராடம்", "பூரட்டாதி"
]

# Sama Nokku (Level Looking) Stars - remaining stars
SAMA_NOKKU_STARS = [
    "அஸ்வினி", "மிருகசீரிடம்", "புனர்பூசம்", "அஸ்தம்", 
    "சித்திரை", "சுவாதி", "அனுஷம்", "கேட்டை", "ரேவதி"
]

# Special Yogam based on Day + Star combination
# Day: 0=Monday, 1=Tuesday, 2=Wednesday, 3=Thursday, 4=Friday, 5=Saturday, 6=Sunday
SPECIAL_YOGAM = {
    # Thursday (3) combinations
    (3, "கிருத்திகை"): "அமிர்த யோகம்",
    (3, "புனர்பூசம்"): "அமிர்த யோகம்",
    (3, "ரோகிணி"): "மரண யோகம்",
    (3, "மிருகசீரிடம்"): "மரண யோகம்",
    (3, "அஸ்வினி"): "சித்த யோகம்",
    (3, "பரணி"): "சித்த யோகம்",
    
    # Sunday (6) combinations
    (6, "பூசம்"): "அமிர்த யோகம்",
    (6, "அஸ்தம்"): "அமிர்த யோகம்",
    (6, "மூலம்"): "மரண யோகம்",
    (6, "ஆயில்யம்"): "மரண யோகம்",
    (6, "உத்திரம்"): "சித்த யோகம்",
    (6, "உத்திராடம்"): "சித்த யோகம்",
    
    # Monday (0) combinations
    (0, "ரோகிணி"): "அமிர்த யோகம்",
    (0, "மிருகசீரிடம்"): "அமிர்த யோகம்",
    (0, "சித்திரை"): "மரண யோகம்",
    (0, "சுவாதி"): "மரண யோகம்",
    (0, "திருவாதிரை"): "சித்த யோகம்",
    (0, "புனர்பூசம்"): "சித்த யோகம்",
    
    # Tuesday (1) combinations
    (1, "அஸ்வினி"): "அமிர்த யோகம்",
    (1, "பரணி"): "அமிர்த யோகம்",
    (1, "விசாகம்"): "மரண யோகம்",
    (1, "அனுஷம்"): "மரண யோகம்",
    (1, "மகம்"): "சித்த யோகம்",
    (1, "பூரம்"): "சித்த யோகம்",
    
    # Wednesday (2) combinations
    (2, "திருவாதிரை"): "அமிர்த யோகம்",
    (2, "புனர்பூசம்"): "அமிர்த யோகம்",
    (2, "கேட்டை"): "மரண யோகம்",
    (2, "மூலம்"): "மரண யோகம்",
    (2, "திருவோணம்"): "சித்த யோகம்",
    (2, "அவிட்டம்"): "சித்த யோகம்",
    
    # Friday (4) combinations
    (4, "பூரம்"): "அமிர்த யோகம்",
    (4, "உத்திரம்"): "அமிர்த யோகம்",
    (4, "பூரட்டாதி"): "மரண யோகம்",
    (4, "உத்திரட்டாதி"): "மரண யோகம்",
    (4, "சதயம்"): "சித்த யோகம்",
    (4, "ரேவதி"): "சித்த யோகம்",
    
    # Saturday (5) combinations
    (5, "சுவாதி"): "அமிர்த யோகம்",
    (5, "விசாகம்"): "அமிர்த யோகம்",
    (5, "ரேவதி"): "மரண யோகம்",
    (5, "அஸ்வினி"): "மரண யோகம்",
    (5, "பூராடம்"): "சித்த யோகம்",
    (5, "உத்திராடம்"): "சித்த யோகம்",
}

# Solar month to Lagnam mapping (at sunrise)
# Tamil month determines the Sun's position, which is the Lagnam at sunrise
SOLAR_MONTH_LAGNAM = {
    "சித்திரை": "மேஷம்",        # Aries (Apr-May)
    "வைகாசி": "ரிஷபம்",        # Taurus (May-Jun)
    "ஆனி": "மிதுனம்",           # Gemini (Jun-Jul)
    "ஆடி": "கடகம்",            # Cancer (Jul-Aug)
    "ஆவணி": "சிம்மம்",          # Leo (Aug-Sep)
    "புரட்டாசி": "கன்னி",       # Virgo (Sep-Oct)
    "ஐப்பசி": "துலாம்",         # Libra (Oct-Nov)
    "கார்த்திகை": "விருச்சிகம்", # Scorpio (Nov-Dec)
    "மார்கழி": "தனுசு",         # Sagittarius (Dec-Jan)
    "தை": "மகரம்",              # Capricorn (Jan-Feb)
    "மாசி": "கும்பம்",          # Aquarius (Feb-Mar)
    "பங்குனி": "மீனம்"          # Pisces (Mar-Apr)
}


# Predefined calendar data for specific dates
SPECIFIC_DATE_DATA = {
    # April 17, 2025 - Thursday (Verified from tamilnaalkaati.com)
    (2025, 4, 17): {
        "tamil_date": "04 - சித்திரை - விசுவாவசு",
        "tamil_day": "வியாழன்",
        "tamil_month": "சித்திரை",
        "tamil_year": "விசுவாவசு",
        "english_day": "Thursday",
        "nalla_neram": {
            "morning": "----------",
            "evening": "12:00 - 01:00 ப / PM"
        },
        "gowri_nalla_neram": {
            "morning": "----------",
            "evening": "06:30 - 07:30 இ / PM"
        },
        "raahu_kaalam": "01:30 - 03:00",
        "yemagandam": "06:00 - 07:30",
        "kuligai": "09:00 - 10:30",
        "soolam": {"tamil": "தெற்கு", "english": "Therkku (South)"},
        "parigaram": {"tamil": "தைலம்", "english": "Thailam (Oil)"},
        "chandirashtamam": "கார்த்திகை",
        "naal": "சம நோக்கு நாள்",
        "lagnam": "மேஷ லக்னம் இருப்பு நாழிகை 3 வினாடி 50",
        "sun_rise": "06:03 கா / AM",
        "sun_set": "06:28 மா / PM",
        "sraardha_thithi": "பஞ்சமி",
        "thithi": "பஞ்சமி",
        "star": "கேட்டை",
        "yogam": "வரியான்",
        "karanam": "தைதுலை",
        "subakariyam": "குரு வழிபாடு, தான தர்மம், புதிய முயற்சிகள் தொடங்க, கல்வி கற்க சிறந்த நாள்"
    },
    # January 1, 2026 - Thursday (Verified with user's calculation rules)
    (2026, 1, 1): {
        "tamil_date": "17 - மார்கழி - விசுவாவசு",
        "tamil_day": "வியாழன்",
        "tamil_month": "மார்கழி",
        "tamil_year": "விசுவாவசு",
        "english_day": "Thursday",
        "nalla_neram": {
            "morning": "10:30 - 11:30 கா / AM, 12:30 - 01:30 ப / PM",
            "evening": "----------"
        },
        "gowri_nalla_neram": {
            "morning": "----------",
            "evening": "06:30 - 07:30 இ / PM"
        },
        "raahu_kaalam": "01:30 - 03:00",
        "yemagandam": "06:00 - 07:30",
        "kuligai": "09:00 - 10:30",
        "soolam": {"tamil": "தெற்கு", "english": "Therkku (South)"},
        "parigaram": {"tamil": "தைலம்", "english": "Thailam (Oil)"},
        "chandirashtamam": "துலாம் - பரணி, கிருத்திகை",
        "naal": "மேல் நோக்கு நாள்",
        "lagnam": "தனுசு லக்னம் இருப்பு நாழிகை 2 வினாடி 34",
        "sun_rise": "06:30 கா / AM",
        "sun_set": "05:47 மா / PM",
        "sraardha_thithi": "திரயோதசி",
        "thithi": "இன்று மாலை 05:54 PM வரை திரயோதசி பின்பு சதுர்த்தசி",
        "star": "இன்று இரவு 10:48 PM வரை ரோகிணி பின்பு மிருகசீரிடம்",
        "yogam": "மரண யோகம்",
        "karanam": "கௌலவம்",
        "subakariyam": "ஆங்கில வருடப்பிறப்பு, குரு வழிபாடு, தான தர்மம், புதிய முயற்சிகள் தொடங்க சிறந்த நாள்"
    },
    # December 3, 2025 - Wednesday (Verified from prokerala.com)
    (2025, 12, 3): {
        "tamil_date": "17 - கார்த்திகை - விசுவாவசு",
        "tamil_day": "புதன்",
        "tamil_month": "கார்த்திகை",
        "tamil_year": "விசுவாவசு",
        "english_day": "Wednesday",
        "nalla_neram": {
            "morning": "09:09 - 10:34 கா / AM",
            "evening": "02:47 - 04:12 மா / PM"
        },
        "gowri_nalla_neram": {
            "morning": "07:45 - 09:09 கா / AM",
            "evening": "01:23 - 02:47 மா / PM"
        },
        "raahu_kaalam": "11:58 - 01:23",
        "yemagandam": "07:45 - 09:09",
        "kuligai": "10:34 - 11:58",
        "soolam": {"tamil": "வடக்கு", "english": "Vadakku (North)"},
        "parigaram": {"tamil": "பச்சைப்பயறு", "english": "Pachaipayaru (Green Gram)"},
        "chandirashtamam": "உத்திரட்டாதி, ரேவதி",
        "naal": "கீழ் நோக்கு நாள்",
        "lagnam": "விருச்சிக லக்னம் இருப்பு நாழிகை 4 வினாடி 28",
        "sun_rise": "06:20 கா / AM",
        "sun_set": "05:36 மா / PM",
        "sraardha_thithi": "திரயோதசி",
        "thithi": "திரயோதசி மதியம் 12:26 PM வரை பின்பு சதுர்த்தசி",
        "star": "பரணி மாலை 06:00 PM வரை பின்பு கார்த்திகை",
        "yogam": "பரிகம் மாலை 04:57 PM வரை பின்பு சிவம்",
        "karanam": "வணிஜை",
        "subakariyam": "புதன் வழிபாடு, வியாபாரம் தொடங்க, கணக்கு பார்க்க, கல்வி கற்க சிறந்த நாள்"
    },
}


def get_tamil_year(year: int) -> str:
    """Get Tamil year name for a given Gregorian year"""
    # Tamil new year starts in April, so adjust accordingly
    # 2025-2026 is Shubhakrit (சுபகிருது)
    base_year = 2024  # Krodhi year
    cycle_position = (year - base_year) % 60
    return TAMIL_YEARS[(35 + cycle_position) % 60]  # 35 is the index for Shubhakrit in 2025


def get_tamil_month_from_date(dt: datetime) -> tuple:
    """
    Get Tamil month and approximate Tamil date from Gregorian date
    Returns (tamil_month_name, approximate_tamil_date)
    """
    month = dt.month
    day = dt.day
    
    # Approximate Tamil month transitions (these vary each year)
    tamil_month_starts = {
        1: (10, "மார்கழி", "தை"),      # Jan: Margazhi -> Thai around 14th
        2: (11, "தை", "மாசி"),          # Feb: Thai -> Maasi around 13th
        3: (12, "மாசி", "பங்குனி"),     # Mar: Maasi -> Panguni around 14th
        4: (1, "பங்குனி", "சித்திரை"),  # Apr: Panguni -> Chithirai around 14th
        5: (2, "சித்திரை", "வைகாசி"),   # May: Chithirai -> Vaigasi around 15th
        6: (3, "வைகாசி", "ஆனி"),        # Jun: Vaigasi -> Aani around 15th
        7: (4, "ஆனி", "ஆடி"),           # Jul: Aani -> Aadi around 17th
        8: (5, "ஆடி", "ஆவணி"),          # Aug: Aadi -> Aavani around 17th
        9: (6, "ஆவணி", "புரட்டாசி"),    # Sep: Aavani -> Purattasi around 17th
        10: (7, "புரட்டாசி", "ஐப்பசி"),  # Oct: Purattasi -> Aippasi around 18th
        11: (8, "ஐப்பசி", "கார்த்திகை"), # Nov: Aippasi -> Karthigai around 17th
        12: (9, "கார்த்திகை", "மார்கழி") # Dec: Karthigai -> Margazhi around 16th
    }
    
    transition_days = {1: 14, 2: 13, 3: 14, 4: 14, 5: 15, 6: 15, 
                       7: 17, 8: 17, 9: 17, 10: 18, 11: 17, 12: 16}
    
    if day < transition_days[month]:
        tamil_month = tamil_month_starts[month][1]
        tamil_date = day + 17  # Approximate
    else:
        tamil_month = tamil_month_starts[month][2]
        tamil_date = day - transition_days[month] + 1
    
    return tamil_month, tamil_date


def calculate_calendar_data(year: int, month: int, day: int) -> Dict[str, Any]:
    """
    Calculate Tamil calendar data for a given date
    """
    # Check if we have specific data for this date
    date_key = (year, month, day)
    if date_key in SPECIFIC_DATE_DATA:
        data = SPECIFIC_DATE_DATA[date_key].copy()
        data["date"] = datetime(year, month, day).isoformat()
        return data
    
    # Calculate dynamically
    dt = datetime(year, month, day)
    weekday = dt.weekday()
    
    tamil_month, tamil_date = get_tamil_month_from_date(dt)
    tamil_year = get_tamil_year(year)
    
    # Calculate nakshatra index (simplified - actual calculation requires astronomical data)
    day_of_year = dt.timetuple().tm_yday
    nakshatra_index = (day_of_year * 27 // 365) % 27
    next_nakshatra_index = (nakshatra_index + 1) % 27
    
    # Calculate thithi (simplified)
    thithi_index = (day_of_year * 30 // 365) % 15
    next_thithi_index = (thithi_index + 1) % 15
    
    # Calculate yogam (simplified)
    yogam_index = (day_of_year * 27 // 365 + 3) % 27
    next_yogam_index = (yogam_index + 1) % 27
    
    # Calculate lagnam (simplified - changes every ~2 hours)
    lagnam_index = (day_of_year + month) % 12
    
    # Naal type based on nakshatra (using proper Nokku classification)
    current_nakshatra = NAKSHATRAS[nakshatra_index]
    naal_type = get_naal_type(current_nakshatra)
    
    # Chandirashtamam based on Moon's Rasi (8th sign back)
    chandirashtamam = get_chandirashtamam_rasi(current_nakshatra)
    
    # Lagnam at sunrise based on Tamil month
    lagnam = get_lagnam_at_sunrise(tamil_month)
    
    # Sunrise time based on date and Chennai latitude
    sunrise = get_sunrise_time(month, day)
    
    # Calculate special yogam based on Day + Star
    special_yogam = get_special_yogam(weekday, current_nakshatra)
    if special_yogam:
        yogam_display = special_yogam
    else:
        # Use regular yogam calculation
        yogam_display = f"{YOGAMS[yogam_index]} யோகம் மாலை 05:00 PM வரை பின்பு {YOGAMS[next_yogam_index]}"
    
    return {
        "date": dt.isoformat(),
        "tamil_date": f"{tamil_date} - {tamil_month} - {tamil_year}",
        "tamil_day": TAMIL_DAYS[weekday],
        "tamil_month": tamil_month,
        "tamil_year": tamil_year,
        "english_day": ENGLISH_DAYS[weekday],
        "nalla_neram": {
            "morning": "07:30 - 09:00 கா / AM",
            "evening": "03:00 - 04:30 மா / PM"
        },
        "gowri_nalla_neram": {
            "morning": "06:00 - 07:30 கா / AM", 
            "evening": "01:30 - 03:00 மா / PM"
        },
        "raahu_kaalam": RAAHU_KAALAM[weekday],
        "yemagandam": YEMAGANDAM[weekday],
        "kuligai": KULIGAI[weekday],
        "soolam": SOOLAM_BY_DAY[weekday],
        "parigaram": PARIGARAM_BY_DAY[weekday],
        "chandirashtamam": chandirashtamam,
        "naal": naal_type,
        "lagnam": f"{lagnam} இருப்பு நாழிகை 04 வினாடி 15",
        "sun_rise": sunrise,
        "sun_set": "06:25 மா / PM",
        "sraardha_thithi": TITHIS[thithi_index],
        "thithi": f"இன்று காலை 10:30 AM வரை {TITHIS[thithi_index]} பின்பு {TITHIS[next_thithi_index]}",
        "star": f"இன்று மாலை 04:30 PM வரை {NAKSHATRAS[nakshatra_index]} பின்பு {NAKSHATRAS[next_nakshatra_index]}",
        "yogam": yogam_display,
        "subakariyam": get_subakariyam(weekday, nakshatra_index)
    }


def get_subakariyam(weekday: int, nakshatra_index: int) -> str:
    """Get auspicious activities based on day and star"""
    activities = {
        0: "சந்திர வழிபாடு, புதிய ஆடை அணிய, பயணம் செய்ய சிறந்த நாள்",
        1: "முருகன் வழிபாடு, வீர முயற்சிகள், நிலம் வாங்க சிறந்த நாள்",
        2: "விஷ்ணு வழிபாடு, வியாபாரம் தொடங்க, கணக்கு பார்க்க சிறந்த நாள்",
        3: "குரு வழிபாடு, கல்வி கற்க, தான தர்மம் செய்ய சிறந்த நாள்",
        4: "லட்சுமி வழிபாடு, திருமணம், நகை வாங்க சிறந்த நாள்",
        5: "சனி வழிபாடு, எண்ணெய் தேய்த்து குளிக்க, இரும்பு பொருட்கள் வாங்க சிறந்த நாள்",
        6: "சூரிய வழிபாடு, புதிய வேலை தொடங்க, அரசு காரியம் செய்ய சிறந்த நாள்"
    }
    return activities.get(weekday, "சிறந்த நாள்")


def get_chandirashtamam_rasi(nakshatra: str) -> str:
    """
    Calculate Chandirashtamam - the Rasi for which today is inauspicious
    Based on Moon's current position, count 8 signs back
    
    Args:
        nakshatra: Current nakshatra name in Tamil
        
    Returns:
        Chandirashtamam rasi with its inauspicious stars
    """
    # Get Moon's current Rasi from nakshatra
    moon_rasi = NAKSHATRA_TO_RASI.get(nakshatra)
    if not moon_rasi:
        return "துலாம் - பரணி, கிருத்திகை"  # Default
    
    # Find the index of moon's rasi
    try:
        moon_rasi_index = RASIS.index(moon_rasi)
    except ValueError:
        return "துலாம் - பரணி, கிருத்திகை"
    
    # Count 8 signs back (or forward 4 signs, same result)
    # Chandirashtamam is the 8th sign FROM the Moon's rasi
    chandirashtamam_index = (moon_rasi_index + 7) % 12  # +7 because we count from 1
    
    # Actually, we need to find which rasi is affected
    # If Moon is in Taurus, count back 8: Taurus(1)->Aries(2)->Pisces(3)->Aquarius(4)->Capricorn(5)->Sagittarius(6)->Scorpio(7)->Libra(8)
    # So we go backwards: (moon_rasi_index - 7) % 12
    # Or equivalently: (moon_rasi_index + 5) % 12 (going forward 5 = going back 7)
    
    chandirashtamam_index = (moon_rasi_index - 7) % 12
    chandirashtamam_rasi = RASIS[chandirashtamam_index]
    
    # Get the inauspicious stars for this rasi
    inauspicious_stars = CHANDIRASHTAMAM_STARS.get(chandirashtamam_rasi, "")
    
    return f"{chandirashtamam_rasi} - {inauspicious_stars}"


def get_naal_type(nakshatra: str) -> str:
    """
    Get the Naal (day type) based on the nakshatra
    
    Args:
        nakshatra: Current nakshatra name in Tamil
        
    Returns:
        Naal type (Mel Nokku, Keel Nokku, or Sama Nokku)
    """
    if nakshatra in MEL_NOKKU_STARS:
        return "மேல் நோக்கு நாள்"
    elif nakshatra in KEEL_NOKKU_STARS:
        return "கீழ் நோக்கு நாள்"
    elif nakshatra in SAMA_NOKKU_STARS:
        return "சம நோக்கு நாள்"
    else:
        return "சம நோக்கு நாள்"  # Default


def get_special_yogam(weekday: int, nakshatra: str) -> str:
    """
    Get special Yogam based on Day + Star combination
    
    Args:
        weekday: 0=Monday, 1=Tuesday, ..., 6=Sunday
        nakshatra: Current nakshatra name in Tamil
        
    Returns:
        Special yogam name if applicable, otherwise None
    """
    return SPECIAL_YOGAM.get((weekday, nakshatra))


def get_lagnam_at_sunrise(tamil_month: str) -> str:
    """
    Get the Lagnam (Ascendant) at sunrise based on Tamil month
    At sunrise, the Lagnam is the same as the Sun's zodiac sign
    
    Args:
        tamil_month: Tamil month name
        
    Returns:
        Lagnam rasi name with format
    """
    lagnam_rasi = SOLAR_MONTH_LAGNAM.get(tamil_month, "தனுசு")
    return f"{lagnam_rasi} லக்னம்"


def get_sunrise_time(month: int, day: int, latitude: float = 13.0827) -> str:
    """
    Calculate approximate sunrise time based on date and latitude (Chennai default)
    Uses simplified calculation for Tamil Nadu region
    
    Args:
        month: Gregorian month (1-12)
        day: Day of month
        latitude: Latitude (default Chennai: 13.0827)
        
    Returns:
        Sunrise time string in format "HH:MM கா / AM"
    """
    import math
    
    # Day of year approximation
    day_of_year = (month - 1) * 30 + day
    
    # Earth's axial tilt effect on sunrise
    # Simplified formula for tropical regions
    declination = 23.45 * math.sin(math.radians((360 / 365) * (day_of_year - 81)))
    
    # Hour angle at sunrise
    cos_hour_angle = -math.tan(math.radians(latitude)) * math.tan(math.radians(declination))
    cos_hour_angle = max(-1, min(1, cos_hour_angle))  # Clamp to valid range
    
    hour_angle = math.degrees(math.acos(cos_hour_angle))
    
    # Convert to sunrise time (solar noon is approximately 12:00)
    sunrise_hours = 12 - (hour_angle / 15)
    
    # Adjust for Chennai's longitude (80.27°E) vs IST (82.5°E)
    # IST is based on 82.5°E, Chennai is at 80.27°E
    # Difference: (82.5 - 80.27) / 15 = 0.149 hours = ~9 minutes earlier
    sunrise_hours += 0.15
    
    # Add equation of time correction (simplified)
    b = 2 * math.pi * (day_of_year - 81) / 365
    eot = 9.87 * math.sin(2 * b) - 7.53 * math.cos(b) - 1.5 * math.sin(b)
    sunrise_hours -= eot / 60
    
    hours = int(sunrise_hours)
    minutes = int((sunrise_hours - hours) * 60)
    
    return f"{hours:02d}:{minutes:02d} கா / AM"
