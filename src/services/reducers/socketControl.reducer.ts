import { createSlice } from '@reduxjs/toolkit'
import { WS_ACTION_TYPE } from '../actions/'
import { TOrderEntity, TOrderResponse } from '../../types';

export const socketControl = createSlice({
    name: 'socketControl',
    initialState: {
        orders: [] as ReadonlyArray<TOrderEntity>,
        totalOrderCount: 0,
        todayOrderCount: 0,
    },
    reducers: {
        [WS_ACTION_TYPE.WS_CONNECT]: (state) => {
            console.log('ws-connected')
            return { ...state }
        },
        [WS_ACTION_TYPE.WS_CONNECT_SUCCESS]: (state) => ({
            ...state
        }),
        [WS_ACTION_TYPE.WS_CONNECT_FAIL]: () => {
            console.log('fail')
            return {
                orders: [],
                totalOrderCount: 0,
                todayOrderCount: 0,
            }
        },
        [WS_ACTION_TYPE.WS_MESSAGE]: (state, action) => {
            console.log('onmessage trigger fired!')
            const data = JSON.parse(action.payload) as TOrderResponse;
            const { orders, total, totalToday } = data

            return {
                orders,
                totalOrderCount: total,
                todayOrderCount: totalToday,
            }
        },
        [WS_ACTION_TYPE.WS_CLOSE]: () => ({
            orders: [],
            totalOrderCount: 0,
            todayOrderCount: 0,
        })
    },
})
