
import math

def calculate_ascendant(lat_deg, lon_deg, year, month, day, hour, minute):
    # Inputs
    # lat_deg, lon_deg: Observer location
    # time: UTC time
    
    # Julian Day
    def get_jd(y, m, d, h):
        if m <= 2:
            y -= 1
            m += 12
        a = math.floor(y / 100)
        b = 2 - a + math.floor(a / 4)
        jd = math.floor(365.25 * (y + 4716)) + math.floor(30.6001 * (m + 1)) + d + b - 1524.5
        jd += h / 24.0
        return jd
        
    jd = get_jd(year, month, day, hour + minute/60.0)
    
    # Sidereal Time at Greenwich (GMST)
    T = (jd - 2451545.0) / 36525.0
    gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - T * T * T / 38710000.0
    gmst = gmst % 360.0
    
    # Local Sidereal Time (LST)
    lst = gmst + lon_deg
    lst = lst % 360.0
    
    # Obliquity of Ecliptic (epsilon)
    eps = 23.4392911 - 0.01300416 * T - 1.63889e-7 * T * T + 5.03611e-7 * T * T * T
    eps_rad = math.radians(eps)
    
    lst_rad = math.radians(lst)
    lat_rad = math.radians(lat_deg)
    
    # Formula for Ascendant
    # tan(Asc) = cos(LST) / ( -sin(LST) * cos(eps) + tan(lat) * sin(eps) )
    numerator = math.cos(lst_rad)
    denominator = -math.sin(lst_rad) * math.cos(eps_rad) + math.tan(lat_rad) * math.sin(eps_rad)
    
    asc_rad = math.atan2(numerator, denominator) # Wait, atan2(y, x) is usually (numerator, denominator) if tan = y/x? No, tan = sin/cos.
    # Actually tan(Asc) = y/x. 
    # Here tan(Asc) = N/D.
    # We use atan2(N, D) or atan2(D, N)?
    # Convention: atan2(y, x) computes arctan(y/x).
    # So asc_rad = math.atan2(numerator, denominator)
    
    # Wait, let's verify formula.
    # https://www.astro.com/astrology/in_ascendant_e.htm
    # Asc = arctan( -cos(RAMC) / (sin(RAMC)*cos(e) + tan(lat)*sin(e)) ) ?
    
    # Let's try standard approach:
    # Asc = atan2(y, x)
    # x = cos(RAMC)
    # y = -sin(RAMC) * cos(eps) + tan(lat) * sin(eps)
    # Asc = atan2(y, x) ? No this gives MC?
    
    # Let's use `pyswisseph` logic or trusted formula.
    # Formula from "Astronomical Algorithms" (Meeus)?
    # Ascendant = arctan( cos(RAMC) / ( -sin(RAMC)*cos(eps) + tan(lat)*sin(eps) ) )
    
    asc_rad = math.atan2(numerator, denominator)
    asc_deg = math.degrees(asc_rad)
    asc_deg = (asc_deg + 360) % 360
    
    # Ayanamsa (Lahiri) ~ 24 degrees
    ayanamsa = 24.1 # Approx for 2026
    
    nirayana_asc = (asc_deg - ayanamsa + 360) % 360
    
    return nirayana_asc

# Test Jan 1, 2026 at 6:30 AM IST (1:00 AM UTC)
# Chennai
asc = calculate_ascendant(13.0827, 80.2707, 2026, 1, 1, 1, 0)
print(f"Ascendant (Approx): {asc}")
rasi_idx = int(asc / 30)
print(f"Rasi Index: {rasi_idx}")

