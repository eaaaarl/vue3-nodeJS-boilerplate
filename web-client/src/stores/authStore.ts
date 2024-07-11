// authStore.ts
import { defineStore } from 'pinia';
import apiClient from '../libs/api-client';

export interface AuthLoginPayload {
    username: string;
    password: string;
}

export interface AuthResponse {
    user: Record<string, any>;
    token: string;
    message: string;
    success: any;
    data: any;
    error: string;
}

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        isAuthenticated: false,
        token: null as string | null,
        user: null as Record<string, any> | null,
    }),
    actions: {
        async login(payload: AuthLoginPayload): Promise<AuthResponse> {
            try {
                const response = await apiClient.post({
                    route: 'auth/login',
                    body: payload
                }) as AuthResponse;
                const { user, token } = response.data;
                this.isAuthenticated = true;
                this.token = token;
                this.user = user;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                return apiClient.toReadableResponse('complete', response);
            } catch (error) {
                return apiClient.toReadableResponse('error', error);
            }
        },
        logout() {
            this.isAuthenticated = false;
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        async checkAuth(): Promise<boolean> {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');

            if (!token || !user) {
                this.logout();
                return false;
            }

            try {
                await apiClient.get({
                    route: 'auth/check'
                });
                this.isAuthenticated = true;
                this.token = token;
                this.user = JSON.parse(user);
                return true;
            } catch (error) {
                console.error('Auth check failed:', error);
                this.logout();
                return false;
            }
        },
    },
});
