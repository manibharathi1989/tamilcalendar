from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class NallaNeram(BaseModel):
    morning: str
    evening: str

class SoolamParigaram(BaseModel):
    tamil: str
    english: str

class DailyCalendar(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: datetime
    tamil_date: str
    tamil_day: str
    tamil_month: str
    tamil_year: str
    english_day: str
    nalla_neram: NallaNeram
    gowri_nalla_neram: NallaNeram
    raahu_kaalam: str
    yemagandam: str
    kuligai: str
    soolam: SoolamParigaram
    parigaram: SoolamParigaram
    chandirashtamam: str
    naal: str
    lagnam: str
    sun_rise: str
    sraardha_thithi: str
    thithi: str
    star: str
    yogam: str
    subakariyam: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class SpecialDay(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: datetime
    type: str  # amavasai, pournami, festival, wedding, holiday, etc.
    tamil_name: str
    english_name: str
    description: Optional[str] = None
    phase: Optional[str] = None  # for wedding days - valarpirai/theipirai
    month: int
    year: int

class RasiPalan(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: datetime
    rasi_name: str
    tamil_rasi_name: str
    type: str  # daily, weekly, monthly, yearly
    prediction: str
    lucky_number: Optional[int] = None
    lucky_color: Optional[str] = None
    lucky_time: Optional[str] = None

class MonthlyCalendar(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    month: int
    year: int
    tamil_month: str
    special_days: List[str] = []  # IDs of special days
    festivals: List[str] = []
    wedding_days: List[str] = []
    govt_holidays: List[str] = []
