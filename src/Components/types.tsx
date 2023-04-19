export interface Comment {
    comment_ID: number;
    event_ID: any; // Add this line
    user_ID: any;
    text: string;
    rating: any;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string | undefined;
}

