import { createSlice } from '@reduxjs/toolkit';
import { CURRENT_ITEMS } from '../actions'
import type { TSelectionItem } from '../../types'

export const currentItemsSlice = createSlice({
    name: 'currentItems',
    initialState: {
        currentItems: [] as ReadonlyArray<TSelectionItem>,
        currentBun: '',
    },
    reducers: {
        [CURRENT_ITEMS.SET_BUN]: (state, action) => ({ ...state, currentBun: action.payload.id }),
        [CURRENT_ITEMS.REMOVE_BUN]: (state) => ({ ...state, currentBun: '' }),
        [CURRENT_ITEMS.ADD]: (state, action) => {
            const { id, provisionalId } = action.payload
            state.currentItems.push({
                itemId: id,
                id: provisionalId
            })
        },
        [CURRENT_ITEMS.REMOVE]: (state, action) => {
            const { id } = action.payload
            state.currentItems = state.currentItems.filter(i => i.id !== id)
        },
        [CURRENT_ITEMS.SWAP]: (state, action) => {
            const { indexNew, indexOld } = action.payload
            if (indexNew === indexOld) return
            const newItemList = state.currentItems.slice()
            newItemList[indexNew] = {...state.currentItems[indexOld]}
            newItemList[indexOld] = {...state.currentItems[indexNew]}
            return { ...state, currentItems: newItemList }
        }
    }
})
