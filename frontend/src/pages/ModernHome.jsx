import React, { useState } from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernDateSelector from '../components/ModernDateSelector';
import ModernDailyCalendar from '../components/ModernDailyCalendar';
import ModernRasiPalan from '../components/ModernRasiPalan';
import ModernSpecialDays from '../components/ModernSpecialDays';
import ModernFooter from '../components/ModernFooter';
import { getDailyCalendarData, getMonthlySpecialDays } from '../data/mockCalendarData';

const ModernHome = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarData = getDailyCalendarData(currentDate);
  const specialDays = getMonthlySpecialDays(currentDate.getMonth() + 1, currentDate.getFullYear());

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ModernDateSelector currentDate={currentDate} onDateChange={handleDateChange} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Calendar Section */}
          <div className="lg:col-span-2">
            <ModernDailyCalendar date={currentDate} calendarData={calendarData} />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <ModernRasiPalan />
            <ModernSpecialDays 
              specialDays={specialDays} 
              month={currentDate.getMonth() + 1}
              year={currentDate.getFullYear()}
            />
          </div>
        </div>
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default ModernHome;
