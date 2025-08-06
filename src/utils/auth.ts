import {
    AUTH_URL,
    REG_URL,
    LOGOUT_URL,
    REFRESH_TOKEN_URL,
    PROFILE_URL,
    PASS_RESET_URL,
    PASS_CHANGE_URL,
    UPD_PROFILE_URL,
} from '../constants';
import {
    TAuthPayload,
    TChangePassPayload,
    THTTPmethod,
    TRegPayload,
    TRequestPayload,
    TFetchUserResult,
} from '../types';
import { request } from './data'

export async function authorize(authForm: TAuthPayload) {
    try {
        const payload = {
            method: 'POST' as THTTPmethod,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(authForm)
        }
        const result = await request(AUTH_URL, payload);
        const {
            success,
            accessToken: rawAccessToken,
            refreshToken,
            user
        } = result;
        
        if (!success) return { error: 'auth failed' }
        const accessToken = rawAccessToken.replace(/^Bearer\s*/, '');
        window.sessionStorage.setItem('access', accessToken)
        window.sessionStorage.setItem('refresh', refreshToken)
        return { success: true, user }
    } catch (e) {
        return { error: e }
    }
}

export async function register(regForm: TRegPayload) {
    try {
        const payload = {
            method: 'POST' as THTTPmethod,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regForm)
        }
        const result = await request(REG_URL, payload);
        const {
            success,
            user,
            accessToken: rawAccessToken,
            refreshToken
        } = result;
        
        if (!success) return { error: 'auth failed' }
        const accessToken = rawAccessToken.replace(/^Bearer\s*/, '');
        window.sessionStorage.setItem('access', accessToken)
        window.sessionStorage.setItem('refresh', refreshToken)
        return { user }
    } catch (e) {
        return { error: e }
    }
}

export async function logout() {
    try {
        const token = window.sessionStorage.getItem('refresh')
        const payload = {
            method: 'POST' as THTTPmethod,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        }
        const result = await request(LOGOUT_URL, payload)
        window.sessionStorage.removeItem('access')
        window.sessionStorage.removeItem('refresh')
        return { logout: result.success }
    } catch (e) {
        return { error: e }
    }
}

export async function refresh() {
    try {
        const token = window.sessionStorage.getItem('refresh')
        const payload = {
            method: 'POST' as THTTPmethod,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        }
        const result = await request(REFRESH_TOKEN_URL, payload)
        const {
            success,
            accessToken: rawAccessToken,
            refreshToken
        } = result;
        if (!success) return { error: 'refresh failed'}
        const accessToken = rawAccessToken.replace(/^Bearer\s*/, '');
        window.sessionStorage.setItem('access', accessToken)
        window.sessionStorage.setItem('refresh', refreshToken)
        return { success: true }
    } catch (e) {
        return { error: e }
    }
}

export async function fetchProfile(): Promise<TFetchUserResult | undefined> {
    const setPayload: () => TRequestPayload = () => {
        const token = window.sessionStorage.getItem('access')
        return {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    }

    try {
        const result = await request(PROFILE_URL, setPayload())
        if (result.success) return { user: result.user, success: true }
        const refreshResult = await refresh();
        if (refreshResult.success) {
            const result = await request(PROFILE_URL, setPayload())
            if (!result.error) return { user: result.user, success: true }
        }
    } catch (e) {
        console.error(e);
        return { error: e as string }
    }
}

export async function getResetCode(email: string) {
    try {
        const payload = {
            method: 'POST' as THTTPmethod,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        }
        const response = await request(PASS_RESET_URL, payload);
        if (response.success) return { success: true }
        return { error: 'reset failed' }
    } catch (e) {
        console.error(e)
        return { error: e}
    }
}

export async function changePassword(formData: TChangePassPayload) {
    try {
        const payload = {
            method: 'POST' as THTTPmethod,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }

        const response = await request(PASS_CHANGE_URL, payload)
        const { success } = response
        if (success) return { success }
        return { error: 'pass change failed' }
    } catch (e) {
        console.error(e)
        return { error: e}
    }
}

export async function editUser(formData: Record<string, string>) {
    try {
        const payload = {
            method: 'PATCH' as THTTPmethod,
            header: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem('access')}`
            },
            body: JSON.stringify(formData)
        }

        const result = await request(UPD_PROFILE_URL, payload)
        const { success, user } = result;
        return success ? { user } : { error: 'user profile update failed' }
    } catch (e) {
        return { error: e }
    }
}
