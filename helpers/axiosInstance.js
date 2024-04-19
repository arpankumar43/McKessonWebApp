import axios from 'axios';
import { API_ENDPOINTS } from './endpoints';

// Create an instance of Axios with custom configurations
const axiosInstance = axios.create({
    baseURL: API_ENDPOINTS.BING_SEARCH, // Base URL for the Bing Search API
    headers: {
      'Content-Type': 'application/json',
      //'Access-Control-Allow-Origin': '*',  // CORS header
      //'Access-Control-Allow-Headers': '*',
    },
  });

// Function to handle Bing Search GET requests
export const getBingSearch = async (query, apiKey) => {
  try {
    const response = await axiosInstance.get('search', {
      params: { q: query },
      headers: { 'Ocp-Apim-Subscription-Key': apiKey },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch locations from .NET Backend API
export const fetchLocations = async () => {
  try {
    const response = await get(API_ENDPOINTS.GET_LOCATIONS);
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to add a new location to .NET Backend API
export const addLocation = async (newLocation) => {
  try {
    await post(API_ENDPOINTS.ADD_LOCATION, newLocation);
  } catch (error) {
    throw error;
  }
};

// General function to handle GET requests
export const get = async (url, params = {}, headers = {}) => {
  try {
    const response = await axiosInstance.get(url, { params, headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// General function to handle POST requests
export const post = async (url, data = {}, headers = {}) => {
  try {
    const response = await axiosInstance.post(url, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default axiosInstance;
