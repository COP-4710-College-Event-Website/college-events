// api.ts
import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

interface LoginData {
    user_ID: string;
    password: string;
}

interface LoginResponse {
    success: boolean;
    token?: string;
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
        console.log(data)
        const response = await apiClient.post('/login', data);
        return { success: true, token: response.data.token };
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && isErrorResponse(axiosError.response.data)) {
            return { success: false, message: axiosError.response.data.message };
        }

        return { success: false, message: axiosError.message };
    }
};
