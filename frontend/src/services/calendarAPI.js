import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

export const calendarAPI = {
  // Get daily calendar data
  getDailyCalendar: async (year, month, day, location = null) => {
    try {
      const params = {};
      if (location) {
        params.lat = location.lat;
        params.lon = location.lon;
      }
      const response = await axios.get(
        `${API_URL}/api/calendar/daily/${year}/${month}/${day}`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching daily calendar:', error);
      return null;
    }
  },

  // Get special days for a month
  getSpecialDays: async (year, month) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/calendar/special-days/${year}/${month}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching special days:', error);
      return null;
    }
  },

  // Get monthly calendar
  getMonthlyCalendar: async (year, month) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/calendar/monthly/${year}/${month}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching monthly calendar:', error);
      return null;
    }
  },

  // Get Rasi Palan
  getRasiPalan: async (type, date = null) => {
    try {
      const params = date ? { date } : {};
      const response = await axios.get(
        `${API_URL}/api/calendar/rasi-palan/${type}`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching rasi palan:', error);
      return null;
    }
  },

  // Get available years
  getAvailableYears: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/calendar/years`);
      return response.data.years;
    } catch (error) {
      console.error('Error fetching years:', error);
      return Array.from({ length: 22 }, (_, i) => 2005 + i);
    }
  },

  // Search calendar events
  searchCalendar: async (startDate, endDate, eventType = null) => {
    try {
      const params = {
        start_date: startDate,
        end_date: endDate,
      };
      if (eventType) params.event_type = eventType;
      
      const response = await axios.get(
        `${API_URL}/api/calendar/search`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error searching calendar:', error);
      return [];
    }
  },
};

export default calendarAPI;
