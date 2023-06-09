// api.ts
import axios, { AxiosError } from 'axios';
import { AppEvent } from './Components/Events'
import { Organization } from './Components/OrganizationForm';

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

interface Comment {
    comment_ID?: number;
    event_ID: any; // Add this line
    user_ID: string | null;
    text: string;
    rating: number;
    time?: any;
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
    console.log(endpoint);
    console.log(user_ID);
    try {
        const response = await axios.get(`http://localhost:5000/${endpoint}/${user_ID}`);
        console.log(response)
        if (response.status === 200) {
            console.log(response);
            return { success: true, data: response.data };
        } else {
            return { success: false, message: 'User is not the specified role' };
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
            return { success: false, message: 'User is not the specified role' };
        } else {
            return { success: false, message: axiosError.response?.data || 'Unknown error' };
        }
    }
};

export const fetchOrganizations = async (): Promise<ApiResponse> => {
    try {
        const response = await axios.get('http://localhost:5000/rso');
        return { success: true, data: response.data };
    } catch (error) {
        const axiosError = error as AxiosError;
        return { success: false, message: axiosError.response?.data || 'Unknown error' };
    }
};

export const addOrganization = async (organization: Organization): Promise<ApiResponse> => {
    delete organization.status
    console.log(organization)
    try {
        const response = await axios.post('http://localhost:5000/rso', organization);
        console.log(response)
        return { success: true, data: response.data };
    } catch (error) {
        const axiosError = error as AxiosError;
        return { success: false, message: axiosError.response?.data || 'Unknown error' };
    }
};

export const fetchEventComments = async (event_ID: number): Promise<ApiResponse> => {
    try {
        const response = await axios.get(`http://localhost:5000/comments/${event_ID}`);
        console.log(response)
        return { success: true, data: response.data };
    } catch (error) {
        const axiosError = error as AxiosError;
        return { success: false, message: axiosError.response?.data || 'Unknown error' };
    }
};

export const addComment = async (comment: Comment): Promise<ApiResponse> => {
    console.log(comment)
    try {
        const response = await axios.post("http://localhost:5000/comments", comment);
        return { success: true, data: response.data };
    } catch (error) {
        const axiosError = error as AxiosError;
        return { success: false, message: axiosError.response?.data || 'Unknown error' };
    }
};


