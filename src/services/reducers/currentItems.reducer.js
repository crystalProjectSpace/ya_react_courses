import { createSlice } from '@reduxjs/toolkit';
import { ADD_ITEM, REMOVE_ITEM } from '../actions'

export const currentItemsSlice = createSlice({
    name: 'currentItems',
    initialState: {
        currentItems: [],
    },
    reducers: {
        [ADD_ITEM]: (state, action) => {
            const { id } = action
            const currentIndex = state.currentItems.findIndex(i => i.id === id)
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
