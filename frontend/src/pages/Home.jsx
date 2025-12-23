import React, { useState } from 'react';
import Header from '../components/Header';
import DateSelector from '../components/DateSelector';
import DailyCalendarSheet from '../components/DailyCalendarSheet';
import RasiPalanLinks from '../components/RasiPalanLinks';
import MonthlySpecialDays from '../components/MonthlySpecialDays';
import Footer from '../components/Footer';
import { getDailyCalendarData, getMonthlySpecialDays } from '../data/mockCalendarData';

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarData = getDailyCalendarData(currentDate);
  const specialDays = getMonthlySpecialDays(currentDate.getMonth() + 1, currentDate.getFullYear());

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <DateSelector currentDate={currentDate} onDateChange={handleDateChange} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DailyCalendarSheet date={currentDate} calendarData={calendarData} />
          </div>
          
          <div className="space-y-6">
            <RasiPalanLinks />
            <MonthlySpecialDays 
              specialDays={specialDays} 
              month={currentDate.getMonth() + 1}
              year={currentDate.getFullYear()}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
