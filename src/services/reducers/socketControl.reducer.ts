import { createSlice } from '@reduxjs/toolkit'
import { WS_ACTION_TYPE } from '../actions/'
import { TOrderEntity } from '../../types';

export const socketControl = createSlice({
    name: 'socketControl',
    initialState: {
        orders: [] as ReadonlyArray<TOrderEntity>,
        totalOrderCount: 0,
        todayOrderCount: 0,
    },
    reducers: {
        [WS_ACTION_TYPE.WS_CONNECT]: (state) => ({
            ...state
        }),
        [WS_ACTION_TYPE.WS_CONNECT_SUCCESS]: (state) => ({
            ...state
        }),
        [WS_ACTION_TYPE.WS_CONNECT_FAIL]: (state, action) => ({
            orders: [],
            totalOrderCount: 0,
            todayOrderCount: 0,
        }),
        [WS_ACTION_TYPE.WS_MESSAGE]: (state, action) => {
            const newOrder = JSON.parse(action.payload) as TOrderEntity;
            const orders = state.orders.slice().concat([newOrder])
            return {
                ...state,
                orders,
            }
        },
        [WS_ACTION_TYPE.WS_CLOSE]: (state, action) => ({
            orders: [],
            totalOrderCount: 0,
            todayOrderCount: 0,
        })
    },
})
