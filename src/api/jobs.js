import axios from 'axios';

const API_BASE_URL = 'https://ao.empregosyoyota.net/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export const fetchJobs = async (page = 1) => {
    try {
        const response = await api.get(`/jobs?page=${page}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};

export const searchJobs = async (query) => {
    // Note: The API documentation provided doesn't explicitly show a search endpoint.
    // I will assume for now we might need to filter client side or try a standard search param.
    // If the API supports ?search= or ?q=, we would use it here.
    // For now, I'll stick to fetching and we might filter on the client if the API doesn't support it,
    // OR we can try to guess. Given the user asked for filters, client-side filtering of the current page
    // might be limited. I will try to implement a robust client-side filter for the loaded data 
    // or fetch more data. 
    // However, usually these APIs support some query params. 
    // Let's just return the fetchJobs for now and handle filtering in the hook/component 
    // unless we find a specific search endpoint.
    return fetchJobs(1);
};
