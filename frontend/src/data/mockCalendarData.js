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

export const getDailyCalendarData = (date) => {
  return {
    date: date,
    tamilDate: '8 - மார்கழி - விசுவாவசு',
    tamilDay: 'செவ்வாய்',
    nallaNeram: {
      morning: '07:45 - 08:45 கா / AM',
      evening: '04:45 - 05:45 மா / PM'
    },
    gowriNallaNeram: {
      morning: '01:45 - 02:45 கா / AM',
      evening: '07:30 - 08:30 மா / PM'
    },
    raahuKaalam: '03.00 - 04.30',
    yemagandam: '09.00 - 10.30',
    kuligai: '12.00 - 01.30',
    soolam: {
      tamil: 'வடக்கு',
      english: 'Vadakku'
    },
    parigaram: {
      tamil: 'பால்',
      english: 'Paal'
    },
    chandirashtamam: 'புனர்பூசம்',
    naal: 'மேல் நோக்கு நாள்',
    lagnam: 'தனுர் லக்னம் இருப்பு நாழிகை 04 வினாடி 13',
    sunRise: '06:25 கா / AM',
    sraardhaThithi: 'சதுர்த்தி',
    thithi: 'இன்று காலை 11:30 AM வரை திரிதியை பின்பு சதுர்த்தி',
    star: 'இன்று அதிகாலை 05:31 AM வரை உத்திராடம் பின்பு திருவோணம்',
    yogam: 'சித்தயோகம் இரவு 02:15 AM வரை பின்பு சாத்தியம்',
    subakariyam: 'சிகிச்சை செய்ய, ஆயுதஞ் செய்ய, யந்திரம் ஸ்தாபிக்க சிறந்த நாள்'
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
