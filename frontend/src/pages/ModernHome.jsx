import React, { useState, useEffect } from 'react';
import ModernHeader from '@/components/ModernHeader';
import ModernDateSelector from '@/components/ModernDateSelector';
import ModernDailyCalendar from '@/components/ModernDailyCalendar';
import ModernRasiPalan from '@/components/ModernRasiPalan';
import ModernSpecialDays from '@/components/ModernSpecialDays';
import ModernFooter from '@/components/ModernFooter';
import LocationSelector from '@/components/LocationSelector';
import { calendarAPI } from '@/services/calendarAPI';

const ModernHome = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  // Default to Chennai for standard Tamil calendar accuracy
  const [location, setLocation] = useState({
    name: 'Chennai',
    lat: '13.0827',
    lon: '80.2707'
  });
  const [calendarData, setCalendarData] = useState(null);
  const [specialDays, setSpecialDays] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();

        // Fetch daily calendar and special days
        const [dailyData, specialData] = await Promise.all([
          calendarAPI.getDailyCalendar(year, month, day, location),
          calendarAPI.getSpecialDays(year, month),
        ]);

        setCalendarData(dailyData);
        setSpecialDays(specialData);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [currentDate, location]);

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    // Data will re-fetch due to useEffect dependency
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div>
                <LocationSelector currentLocation={location} onLocationChange={handleLocationChange} />
            </div>
            <div>
                 {/* Placeholder for alignment or extra tools */}
            </div>
        </div>
        
        <ModernDateSelector currentDate={currentDate} onDateChange={handleDateChange} />
        
        {calendarData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Calendar Section */}
            <div className="lg:col-span-2">
              <ModernDailyCalendar 
                key={currentDate.toISOString()} 
                date={currentDate} 
                calendarData={calendarData} 
              />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <ModernRasiPalan />
              {specialDays && (
                <ModernSpecialDays 
                  specialDays={specialDays} 
                  month={currentDate.getMonth() + 1}
                  year={currentDate.getFullYear()}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No calendar data available for this date.</p>
          </div>
        )}
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default ModernHome;