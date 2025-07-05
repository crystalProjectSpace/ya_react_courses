import { createSlice } from '@reduxjs/toolkit';
import {
    ADD_ITEM,
    REMOVE_ITEM,
    SET_BUN,
    REMOVE_BUN,
    SWAP_ITEMS,
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
            state.currentItems.push(id)
        },
        [REMOVE_ITEM]: (state, action) => {
            const { index } = action
            state.currentItems.splice(index, 1)
        },
        [SWAP_ITEMS]: (state, action) => {
            const { indexNew, indexOld } = action
            if (indexNew === indexOld) return
            const newItemList = state.currentItems.slice()
            newItemList[indexNew] = state.currentItems[indexOld]
            newItemList[indexOld] = state.currentItems[indexNew]
            return { ...state, currentItems: newItemList }
        }
    }
})
