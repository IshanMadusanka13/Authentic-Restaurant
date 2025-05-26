const API_URL = 'http://localhost:3001/api'; // Replace with your actual API URL

// Helper function for making API requests
const fetchApi = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    // Handle 401 Unauthorized
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
      return null;
    }

    // Check if the response has content before trying to parse JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      // Only try to parse JSON if there's content and it's JSON type
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(data.msg || 'Something went wrong');
      }

      return data;
    } else {
      // Handle non-JSON responses
      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      return { success: true };
    }
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// API methods
export const api = {
  // Auth
  login: (credentials) =>
    fetchApi('/user/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),

  register: (userData) =>
    fetchApi('/user/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  // Menu Items
  getMenuItems: () => fetchApi('/item'),
  
  getMenuItemById: (itemId) => fetchApi(`/item/${itemId}`),
  
  createMenuItem: (itemData) =>
    fetchApi('/item', {
      method: 'POST',
      body: JSON.stringify(itemData)
    }),

  updateMenuItem: (itemId, itemData) =>
    fetchApi(`/item/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(itemData)
    }),

  deleteMenuItem: (itemId) =>
    fetchApi(`/item/${itemId}`, {
      method: 'DELETE'
    })
};

export default api;
