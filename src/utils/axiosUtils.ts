import { URLSearchParams } from 'url';
import axios, { AxiosRequestConfig } from 'axios';
import { HUBSPOT_BASE_URL } from './hubspotUtils';

const axiosInstance = axios.create({ baseURL: HUBSPOT_BASE_URL, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

export const axiosUtil = async (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', data?: URLSearchParams) => {
    try {
        const response = await axiosInstance.request({ url: endpoint, method, data } as AxiosRequestConfig);
        return response;
    } catch (error) {
        console.error('Request Error:', error);
        throw error;
    }
};
