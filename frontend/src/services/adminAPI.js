import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

export const adminAPI = {
  // Login
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, {
        username,
        password
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get calendar for edit
  getCalendar: async (year, month, day, token) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/admin/calendar/${year}/${month}/${day}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update calendar
  updateCalendar: async (year, month, day, updates, token) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/calendar/${year}/${month}/${day}`,
        updates,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get stats
  getStats: async (token) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/admin/stats`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Search calendar
  searchCalendar: async (year, month, token) => {
    try {
      const params = {};
      if (year) params.year = year;
      if (month) params.month = month;
      
      const response = await axios.get(
        `${API_URL}/api/admin/calendar/search`,
        {
          params,
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get special days for a month
  getSpecialDays: async (year, month, token) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/admin/special-days/${year}/${month}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Add special day
  addSpecialDay: async (dayData, token) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/special-days`,
        dayData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete special day
  deleteSpecialDay: async (dayId, token) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/admin/special-days/${dayId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get analytics
  getAnalytics: async (token) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/admin/analytics`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default adminAPI;
