import { createSlice } from '@reduxjs/toolkit';
import {
    ADD_ITEM,
    REMOVE_ITEM,
    SET_BUN,
    REMOVE_BUN,
 } from '../actions'

export const currentItemsSlice = createSlice({
    name: 'currentItems',
    initialState: {
        currentItems: [],
        currentBun: '',
    },
    reducers: {
        [SET_BUN]: (state, action) => ({ ...state, currentBun: action.id }),
        [REMOVE_BUN]: (state) => ({ ...state, currentBun: '' }),
        [ADD_ITEM]: (state, action) => {
            const { id } = action
            const currentIndex = state.currentItems.findIndex(i => i.id === id)
            console.log('1')
            if (currentIndex === -1) {
                state.currentItems.push({ id, qty: 1 })
            } else {
                const {qty, id: itemId} = state.currentItems[currentIndex]
                state.currentItems.splice(currentIndex, 1, { id: itemId, qty: qty + 1 })
            }
        },
        [REMOVE_ITEM]: (state, action) => {
            const { id } = action
            const currentIndex = state.currentItems.findIndex(i => i.id === id)
            if (currentIndex === -1) return
            const { id: itemId, qty } = state.currentItems[currentIndex]
            if ( qty > 1) {
                state.currentItems.splice(currentIndex, 1, { id:itemId, qty: qty - 1 })
            } else {
                state.currentItems.splice(currentIndex, 1)
            }
        }
    }
})
