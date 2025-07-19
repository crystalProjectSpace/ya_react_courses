import { createSlice } from '@reduxjs/toolkit';
import { 
    AUTH_SET_TOKEN,
    AUTH_SET_REFRESH,
    AUTH_SET_USER,
    AUTH_LOGOUT,
} from '../actions'
import { authorize, register, refresh, logout } from '../../utils/auth';

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
        [AUTH_SET_TOKEN]: (state, action) => ({
            ...state,
            accessToken: action.accessToken,
        }),
        [AUTH_SET_REFRESH]: (state, action) => ({
            ...state,
            refreshToken: action.refreshToken,
        }),
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
    const { user, accessToken, refreshToken } = response;
    dispatch(`authorization/${AUTH_SET_TOKEN}`, accessToken)
    dispatch(`authorization/${AUTH_SET_REFRESH}`, refreshToken)
    dispatch(`authorization/${AUTH_SET_USER}`, user)
}

export const loginUser = (loginData) => async (dispatch) => {
    const response = await authorize(loginData)
    if (response.error) return
    const { user, accessToken, refreshToken } = response;
    dispatch(`authorization/${AUTH_SET_TOKEN}`, accessToken)
    dispatch(`authorization/${AUTH_SET_REFRESH}`, refreshToken)
    dispatch(`authorization/${AUTH_SET_USER}`, user)
}

export const refreshUser = () => async (dispatch, getState) => {
    const state = getState();
    const { refreshToken } = state;
    const response = await refresh(refreshToken);
    if (response.error) return
    const { accessToken, refreshToken: newRefreshToken } = response;
    dispatch(`authorization/${AUTH_SET_TOKEN}`, accessToken);
    dispatch(`authorization/${AUTH_SET_REFRESH}`, newRefreshToken);
}

export const logoutUser = () => async (dispatch, getState) => {
    const state = getState();
    const { accessToken } = state;
    await logout(accessToken);
    dispatch(`authorization/${AUTH_LOGOUT}`)
}

export const restoreUser = (email) => async (dispatch) => {

}
