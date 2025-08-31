import { createSlice } from '@reduxjs/toolkit'
import { WS_ACTION_TYPE } from '../actions/'


export const availableItemsSlice = createSlice({
    name: 'socketController',
    initialState: {
        orders: [],
        totalOrderCount: 0,
        todayOrderCount: 0,
    },
    reducers: {
        [WS_ACTION_TYPE.WS_CONNECT]: (state) => ({

        }),
        [WS_ACTION_TYPE.WS_CONNECT_SUCCESS]: (state) => ({

        }),
        [WS_ACTION_TYPE.WS_CONNECT_FAIL]: (state, action) => ({

        }),
        [WS_ACTION_TYPE.WS_MESSAGE]: (state, action) => {
            const newOrder = JSON.parse(action.payload);
            const orders = state.orders.slice().concat([newOrder])
            return {
                ...state,
                orders,
            }
        },
        [WS_ACTION_TYPE.WS_CLOSE]: (state, action) => ({

        })
    },
})
