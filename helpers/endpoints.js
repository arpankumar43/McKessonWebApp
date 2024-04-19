const baseUrl = "https://localhost:44351/api/";
const bingUrl = "https://api.bing.microsoft.com/v7.0/";

//Backend & Bing api API Endpoints
export const API_ENDPOINTS = { 
    GET_LOCATIONS: baseUrl + 'location/AvailableLocation',
    ADD_LOCATION: baseUrl + 'location/AddLocation',
    BING_SEARCH: bingUrl
}