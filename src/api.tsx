// api.ts
import axios, { AxiosError } from 'axios';
import { AppEvent } from './Components/Events'

const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface ApiResponse {
    success: boolean;
    message?: any;
    data?: any;
}

interface LoginData {
    user_ID: string;
    password: string;
}

interface LoginResponse {
    success: boolean;
    data?: any;
    message?: string;
}

interface ErrorResponse {
    message: string;
}

const isErrorResponse = (data: any): data is ErrorResponse => {
    return data && typeof data.message === 'string';
};

interface RegisterData {
    userId: string;
    password: string;
    name: string;
    rsoId: string;
}

interface RegisterResponse {
    success: boolean;
    message?: string;
}

export const register = async (data: RegisterData): Promise<RegisterResponse> => {
    try {
        console.log(data)
        await apiClient.post('/register', data);
        return { success: true };
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && isErrorResponse(axiosError.response.data)) {
            return { success: false, message: axiosError.response.data.message };
        }

        return { success: false, message: axiosError.message };
    }
};

export const logon = async (data: LoginData): Promise<LoginResponse> => {
    try {
        const response = await axios.post('http://localhost:5000/login', data);
        console.log(response)
        return { success: true, data: response.data };
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && isErrorResponse(axiosError.response.data)) {
            return { success: false, message: axiosError.response.data.message };
        }

        return { success: false, message: axiosError.message };
    }
};

export const getEvents = async () => {
    try {
        const response = await axios.get('http://localhost:5000/events');
        return { success: true, data: response.data };
    } catch (error) {
        const axiosError = error as AxiosError;
        return { success: false, message: axiosError.response?.data || 'Unknown error' };
    }
};

export const createEvent = async (event: AppEvent): Promise<ApiResponse> => {
    console.log(event)
    try {
        const response = await axios.post('http://localhost:5000/events', event);
        return { success: true, data: response.data };
    } catch (error) {
        const axiosError = error as AxiosError;
        return { success: false, message: axiosError.response?.data || 'Unknown error' };
    }
};

export const isAdmin = async (user_ID: string): Promise<ApiResponse> => {
    return await checkUserRole(user_ID, 'admin');
};

export const isSuperAdmin = async (user_ID: string): Promise<ApiResponse> => {
    return await checkUserRole(user_ID, 'sadmin');
};

export const checkUserRole = async (user_ID: string, endpoint: string): Promise<ApiResponse> => {
    console.log(endpoint)
    console.log(user_ID)
    try {
        const response = await axios.get(`http://localhost:5000/${endpoint}/${user_ID}`, {

        });
        console.log(response)
        return { success: true, data: response.data };
    } catch (error) {
        const axiosError = error as AxiosError;
        return { success: false, message: axiosError.response?.data || 'Unknown error' };
    }
};