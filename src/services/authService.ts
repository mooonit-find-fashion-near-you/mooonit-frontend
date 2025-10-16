// services/authService.ts
import apiClient from "./apiClient";

export interface SendOTPRequest {
    phone_number: string;
}

export interface VerifyOTPRequest {
    phone_number: string;
    otp_code: string;
}

export interface CompleteProfileRequest {
    first_name: string;
    last_name: string;
    email: string;
    date_of_birth: string;
}

export interface UpdateGenderRequest {
    gender: string;
}

export interface AuthResponse {
    success: boolean;
    message?: string;
    data?: {
        user_id?: string;
        access_token?: string;
        user_type?: string;
    };
}

export const authService = {
    // Send OTP
    sendOTP: async (phoneNumber: string): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/api/user/auth/send-otp', {
            phone_number: phoneNumber
        });
        return response.data;
    },

    // Verify OTP
    verifyOTP: async (phoneNumber: string, otpCode: string): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/api/user/auth/verify-otp', {
            phone_number: phoneNumber,
            otp_code: otpCode
        });

        // Store token if available
        if (response.data.data?.access_token) {
            localStorage.setItem('auth_token', response.data.data.access_token);
            localStorage.setItem('user_id', response.data.data.user_id || '');
        }

        return response.data;
    },

    // Complete Profile
    completeProfile: async (profileData: CompleteProfileRequest): Promise<AuthResponse> => {
        const response = await apiClient.put<AuthResponse>('/api/user/auth/complete-profile', profileData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        });
        return response.data;
    },

    // Update Gender
    updateGender: async (gender: string): Promise<AuthResponse> => {
        const response = await apiClient.put<AuthResponse>('/api/user/auth/update-gender', {
            gender: gender
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        });
        return response.data;
    },

    // Get User Profile
    getProfile: async (): Promise<AuthResponse> => {
        const response = await apiClient.get<AuthResponse>('/api/user/auth/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        });
        return response.data;
    }
};

// Helper function to get auth token
export const getAuthToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
};

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
    return !!getAuthToken();
};

// Helper function to logout
export const logout = (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
};