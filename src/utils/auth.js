import {
    AUTH_URL,
    REG_URL,
    LOGOUT_URL,
    REFRESH_TOKEN_URL,
    PROFILE_URL,
} from '../constants';
import {
    setCookieItem,
    clearCookieItem,
    getCookieItem,
} from './cookie-utils';

import { request } from './data'

export async function authorize(authForm) {
    try {
        const payload = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(authForm)
        }
        const result = await request(AUTH_URL, payload);
        const {
            success,
            accessToken: rawAccessToken,
            refreshToken
        } = result;
        
        if (!success) return { error: 'auth failed' }
        const accessToken = rawAccessToken.replace(/^Bearer\s*/, '');
        setCookieItem('access', accessToken);
        setCookieItem('refresh', refreshToken);
        return { success: true }
    } catch (e) {
        return { error: e }
    }
}

export async function register(regForm) {
    try {
        const payload = {
            method: 'POST',
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
        setCookieItem('access', accessToken);
        setCookieItem('refresh', refreshToken);
        return { user }
    } catch (e) {
        return { error: e }
    }
}

export async function logout() {
    try {
        const token = getCookieItem('access')
        const payload = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        }
        const result = await request(LOGOUT_URL, payload)
        clearCookieItem('access');
        clearCookieItem('refresh');
        return { logout: result.success }
    } catch (e) {
        return { error: e }
    }
}

export async function refresh() {
    try {
        const token = getCookieItem('refresh')
        const payload = {
            method: 'POST',
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
        setCookieItem('access', accessToken);
        setCookieItem('refresh', refreshToken);
        return { success: true }
    } catch (e) {
        return { error: e }
    }
}

export async function fetchProfile() {
    const setPayload = () => {
        const token = getCookieItem('access');
        return {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
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
        return { error: e }
    }
}
