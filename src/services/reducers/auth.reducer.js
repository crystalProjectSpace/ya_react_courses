import { createSlice } from '@reduxjs/toolkit';
import { 
    AUTH_SET_USER,
    AUTH_LOGOUT,
} from '../actions'
import { authorize, register, refresh, logout, fetchProfile } from '../../utils/auth';
import { getCookieItem } from '../../utils/cookie-utils';

export const authorizationSlice = createSlice({
    name: 'authorization',
    initialState: {
        accessToken: '',
        refreshToken: '',
        user: {
            name: '',
            email: '',
        },        
    },
    reducers: {
        [AUTH_SET_USER]: (state, action) => ({
            ...state,
            user: action.user
        }),
        [AUTH_LOGOUT]: () => ({
            accessToken: '',
            refreshToken: '',
            user: {
                name: '',
                email: '',
            },        
        })
    }
})

export const registerUser = (regData) => async (dispatch) => {
    const response = await register(regData)
    if (response.error) return
    const { user } = response;
    dispatch({ type: `authorization/${AUTH_SET_USER}`, user })
}

export const loginUser = (loginData) => async (dispatch) => {
    const response = await authorize(loginData)
    if (response.error) return
    const { user } = response;
    dispatch({ type: `authorization/${AUTH_SET_USER}`, user })
}

export const logoutUser = () => async (dispatch) => {
    const accessToken = getCookieItem('access')
    await logout(accessToken);
    dispatch({ type: `authorization/${AUTH_LOGOUT}` })
}

export const getUserProfile = () => async (dispatch) => {
    const refreshToken = getCookieItem('refresh')
    const response = await fetchProfile()
    if (response.error || response.expired) {
        const refreshResponse = await refresh(refreshToken);
        if (refreshResponse.error) return
        const response = await fetchProfile()
        const { user } = response
        dispatch({ type: `authorization/${AUTH_SET_USER}`, user })
    } else {
        const { user } = response
        dispatch({ type: `authorization/${AUTH_SET_USER}`, user })
    }
}

export const restoreUser = (email) => async (dispatch) => {

}
