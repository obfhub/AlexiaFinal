import axios from 'axios';

/**
 * Create an axios client with custom configuration
 * @param {Object} config - Configuration object
 * @param {string} config.baseURL - Base URL for API
 * @param {Object} config.headers - Custom headers
 * @param {string} config.token - Auth token
 * @param {boolean} config.interceptResponses - Whether to intercept responses
 * @returns {Object} Axios instance with get/post methods
 */
export const createAxiosClient = (config = {}) => {
  const {
    baseURL = '/api',
    headers = {},
    token = null,
    interceptResponses = false
  } = config;

  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  });

  // Add response interceptor if enabled
  if (interceptResponses) {
    instance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        // Extract error details from response
        const errorData = {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          data: error.response?.data,
          extra_data: error.response?.data?.extra_data
        };
        return Promise.reject(errorData);
      }
    );
  }

  return instance;
};
