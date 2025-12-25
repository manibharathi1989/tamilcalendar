// Mock data for Tamil Daily Calendar

export const getTamilMonth = (monthNum) => {
  const tamilMonths = {
    1: { tamil: 'சித்திரை', english: 'Chithirai' },
    2: { tamil: 'வைகாசி', english: 'Vaigasi' },
    3: { tamil: 'ஆனி', english: 'Aani' },
    4: { tamil: 'ஆடி', english: 'Aadi' },
    5: { tamil: 'ஆவணி', english: 'Aavani' },
    6: { tamil: 'புரட்டாசி', english: 'Purattasi' },
    7: { tamil: 'ஐப்பசி', english: 'Ippasi' },
    8: { tamil: 'கார்த்திகை', english: 'Kaarthigai' },
    9: { tamil: 'மார்கழி', english: 'Maargazhi' },
    10: { tamil: 'தை', english: 'Thai' },
    11: { tamil: 'மாசி', english: 'Maasi' },
    12: { tamil: 'பங்குனி', english: 'Panguni' }
  };
  return tamilMonths[monthNum] || tamilMonths[1];
};

// Tamil day names
const TAMIL_DAYS = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];

// Soolam (direction) based on day of week
const SOOLAM_BY_DAY = {
  0: { tamil: 'மேற்கு', english: 'Merkku (West)' },        // Sunday
  1: { tamil: 'கிழக்கு', english: 'Kizhakku (East)' },     // Monday
  2: { tamil: 'வடக்கு', english: 'Vadakku (North)' },      // Tuesday
  3: { tamil: 'வடக்கு', english: 'Vadakku (North)' },      // Wednesday
  4: { tamil: 'தெற்கு', english: 'Therkku (South)' },      // Thursday
  5: { tamil: 'மேற்கு', english: 'Merkku (West)' },        // Friday
  6: { tamil: 'கிழக்கு', english: 'Kizhakku (East)' }      // Saturday
};

// Parigaram (remedy) based on day of week
const PARIGARAM_BY_DAY = {
  0: { tamil: 'கடலை', english: 'Kadalai (Gram)' },              // Sunday
  1: { tamil: 'வெல்லம்', english: 'Vellam (Jaggery)' },         // Monday
  2: { tamil: 'கோதுமை', english: 'Gothumai (Wheat)' },          // Tuesday
  3: { tamil: 'பச்சைப்பயறு', english: 'Pachaipayaru (Green Gram)' }, // Wednesday
  4: { tamil: 'தைலம்', english: 'Thailam (Oil)' },              // Thursday
  5: { tamil: 'அரிசி', english: 'Arisi (Rice)' },               // Friday
  6: { tamil: 'உளுந்து', english: 'Ulundhu (Black Gram)' }      // Saturday
};

// Raahu Kaalam timings by day (Sunday=0)
const RAAHU_KAALAM = {
  0: '04:30 - 06:00 மா / PM',
  1: '07:30 - 09:00 கா / AM',
  2: '03:00 - 04:30 மா / PM',
  3: '12:00 - 01:30 மா / PM',
  4: '01:30 - 03:00 மா / PM',
  5: '10:30 - 12:00 கா / AM',
  6: '09:00 - 10:30 கா / AM'
};

// Yemagandam timings by day
const YEMAGANDAM = {
  0: '12:00 - 01:30 மா / PM',
  1: '10:30 - 12:00 கா / AM',
  2: '09:00 - 10:30 கா / AM',
  3: '07:30 - 09:00 கா / AM',
  4: '06:00 - 07:30 கா / AM',
  5: '03:00 - 04:30 மா / PM',
  6: '01:30 - 03:00 மா / PM'
};

// Kuligai timings by day
const KULIGAI = {
  0: '03:00 - 04:30 மா / PM',
  1: '01:30 - 03:00 மா / PM',
  2: '12:00 - 01:30 மா / PM',
  3: '10:30 - 12:00 கா / AM',
  4: '09:00 - 10:30 கா / AM',
  5: '07:30 - 09:00 கா / AM',
  6: '06:00 - 07:30 கா / AM'
};

// Specific date data (Verified from tamilnaalkaati.com and prokerala.com)
const SPECIFIC_DATES = {
  // April 17, 2025 - Thursday (Verified from tamilnaalkaati.com)
  '2025-4-17': {
    tamilDate: '04 - சித்திரை - விசுவாவசு',
    tamilDay: 'வியாழன்',
    nallaNeram: {
      morning: '----------',
      evening: '12:00 - 01:00 ப / PM'
    },
    gowriNallaNeram: {
      morning: '----------',
      evening: '06:30 - 07:30 இ / PM'
    },
    raahuKaalam: '01:30 - 03:00',
    yemagandam: '06:00 - 07:30',
    kuligai: '09:00 - 10:30',
    soolam: { tamil: 'தெற்கு', english: 'Therkku (South)' },
    parigaram: { tamil: 'தைலம்', english: 'Thailam (Oil)' },
    chandirashtamam: 'கார்த்திகை',
    naal: 'சம நோக்கு நாள்',
    lagnam: 'மேஷ லக்னம் இருப்பு நாழிகை 3 வினாடி 50',
    sunRise: '06:03 கா / AM',
    sraardhaThithi: 'பஞ்சமி',
    thithi: 'பஞ்சமி',
    star: 'கேட்டை',
    yogam: 'வரியான்',
    subakariyam: 'குரு வழிபாடு, தான தர்மம், புதிய முயற்சிகள் தொடங்க, கல்வி கற்க சிறந்த நாள்'
  },
  // December 3, 2025 - Wednesday (Verified from prokerala.com)
  '2025-12-3': {
    tamilDate: '17 - கார்த்திகை - விசுவாவசு',
    tamilDay: 'புதன்',
    nallaNeram: {
      morning: '09:09 - 10:34 கா / AM',
      evening: '02:47 - 04:12 மா / PM'
    },
    gowriNallaNeram: {
      morning: '07:45 - 09:09 கா / AM',
      evening: '01:23 - 02:47 மா / PM'
    },
    raahuKaalam: '11:58 - 01:23',
    yemagandam: '07:45 - 09:09',
    kuligai: '10:34 - 11:58',
    soolam: { tamil: 'வடக்கு', english: 'Vadakku (North)' },
    parigaram: { tamil: 'பச்சைப்பயறு', english: 'Pachaipayaru (Green Gram)' },
    chandirashtamam: 'உத்திரட்டாதி, ரேவதி',
    naal: 'கீழ் நோக்கு நாள்',
    lagnam: 'விருச்சிக லக்னம் இருப்பு நாழிகை 4 வினாடி 28',
    sunRise: '06:20 கா / AM',
    sraardhaThithi: 'திரயோதசி',
    thithi: 'திரயோதசி மதியம் 12:26 PM வரை பின்பு சதுர்த்தசி',
    star: 'பரணி மாலை 06:00 PM வரை பின்பு கார்த்திகை',
    yogam: 'பரிகம் மாலை 04:57 PM வரை பின்பு சிவம்',
    subakariyam: 'புதன் வழிபாடு, வியாபாரம் தொடங்க, கணக்கு பார்க்க, கல்வி கற்க சிறந்த நாள்'
  }
};

export const getDailyCalendarData = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = date.getDay();
  
  // Check for specific date data
  const dateKey = `${year}-${month}-${day}`;
  if (SPECIFIC_DATES[dateKey]) {
    return {
      date: date,
      ...SPECIFIC_DATES[dateKey]
    };
  }
  
  // Calculate Tamil month (approximate)
  const tamilMonthMap = {
    1: 'தை', 2: 'மாசி', 3: 'பங்குனி', 4: 'சித்திரை',
    5: 'வைகாசி', 6: 'ஆனி', 7: 'ஆடி', 8: 'ஆவணி',
    9: 'புரட்டாசி', 10: 'ஐப்பசி', 11: 'கார்த்திகை', 12: 'மார்கழி'
  };
  
  const tamilMonth = tamilMonthMap[month];
  const tamilYear = year >= 2025 ? 'விசுவாவசு' : 'குரோதி';
  
  return {
    date: date,
    tamilDate: `${day} - ${tamilMonth} - ${tamilYear}`,
    tamilDay: TAMIL_DAYS[dayOfWeek],
    nallaNeram: {
      morning: '07:30 - 09:00 கா / AM',
      evening: '03:00 - 04:30 மா / PM'
    },
    gowriNallaNeram: {
      morning: '06:00 - 07:30 கா / AM',
      evening: '01:30 - 03:00 மா / PM'
    },
    raahuKaalam: RAAHU_KAALAM[dayOfWeek],
    yemagandam: YEMAGANDAM[dayOfWeek],
    kuligai: KULIGAI[dayOfWeek],
    soolam: SOOLAM_BY_DAY[dayOfWeek],
    parigaram: PARIGARAM_BY_DAY[dayOfWeek],
    chandirashtamam: 'புனர்பூசம்',
    naal: 'மேல் நோக்கு நாள்',
    lagnam: 'மேஷ லக்னம் இருப்பு நாழிகை 04 வினாடி 13',
    sunRise: '06:15 கா / AM',
    sraardhaThithi: 'சதுர்த்தி',
    thithi: 'இன்று காலை 10:30 AM வரை திரிதியை பின்பு சதுர்த்தி',
    star: 'இன்று மாலை 04:30 PM வரை உத்திராடம் பின்பு திருவோணம்',
    yogam: 'சித்த யோகம் மாலை 05:00 PM வரை பின்பு சாத்தியம்',
    subakariyam: 'சிறந்த நாள்'
  };
};

export const getMonthlySpecialDays = (month, year) => {
  return {
    amavasai: ['19-Dec-2025 Friday'],
    pournami: ['04-Dec-2025 Thursday'],
    karthigai: ['03-Dec-2025 Wednesday', '31-Dec-2025 Wednesday'],
    sashtiViradham: ['25-Dec-2025 Thursday'],
    sankatharaChathurthi: ['08-Dec-2025 Monday'],
    chathurthi: ['24-Dec-2025 Wednesday'],
    pradosham: ['02-Dec-2025 Tuesday', '17-Dec-2025 Wednesday'],
    thiruvonam: ['23-Dec-2025 Tuesday'],
    maadhasivarathiri: ['18-Dec-2025 Thursday'],
    ekadhasi: ['01-Dec-2025 Monday', '15-Dec-2025 Monday', '30-Dec-2025 Tuesday'],
    ashtami: ['12-Dec-2025 Friday', '27-Dec-2025 Sunday'],
    navami: ['13-Dec-2025 Saturday', '28-Dec-2025 Monday'],
    govtHolidays: [
      { date: '25-Dec-2025 Thursday', tamil: 'கிறிஸ்துமஸ் பண்டிகை', english: 'Christmas Day' }
    ],
    weddingDays: [
      { date: '01-Dec-2025 Monday', phase: 'வளர்பிறை Valarpirai' },
      { date: '08-Dec-2025 Monday', phase: 'தேய்பிறை Theipirai' },
      { date: '10-Dec-2025 Wednesday', phase: 'தேய்பிறை Theipirai' },
      { date: '14-Dec-2025 Sunday', phase: 'தேய்பிறை Theipirai' },
      { date: '15-Dec-2025 Monday', phase: 'தேய்பிறை Theipirai' }
    ],
    festivals: [
      { date: '03-Dec-2025 Wednesday', tamil: 'திருக்கார்த்திகை', english: 'Karthigai' },
      { date: '19-Dec-2025 Friday', tamil: 'அனுமன் ஜெயந்தி', english: 'Hanuman Jayanthi' },
      { date: '25-Dec-2025 Thursday', tamil: 'கிறிஸ்துமஸ் பண்டிகை', english: 'Christmas' },
      { date: '30-Dec-2025 Tuesday', tamil: 'வைகுண்ட ஏகாதசி', english: 'Vaigunda Egadasi' }
    ]
  };
};

export const rasiPalanLinks = [
  { tamil: 'இன்றைய ராசி பலன்', english: 'Daily Rasi Palan', link: '/rasi-palan/daily' },
  { tamil: 'வார ராசி பலன்', english: 'Weekly Rasi Palan', link: '/rasi-palan/weekly' },
  { tamil: 'மாத ராசி பலன்', english: 'Monthly Rasi Palan', link: '/rasi-palan/monthly' },
  { tamil: 'ஆண்டு ராசி பலன்', english: 'Yearly Rasi Palan', link: '/rasi-palan/yearly' },
  { tamil: 'குரு பெயர்ச்சி பலன்', english: 'Guru Peyarchi Palan', link: '/rasi-palan/guru' },
  { tamil: 'ராகு கேது பெயர்ச்சி பலன்', english: 'Raagu Kethu Peyarchi Palan', link: '/rasi-palan/ragu-kethu' },
  { tamil: 'சனி பெயர்ச்சி பலன்', english: 'Sani Peyarchi Palan', link: '/rasi-palan/sani' }
];

export const yearLinks = Array.from({ length: 22 }, (_, i) => 2005 + i);
