import { createSlice } from '@reduxjs/toolkit';
import { SELECTION } from '../actions'

export const currentSelectionSlice = createSlice({
    name: 'currentSelection',
    initialState: {
        selectedId: ''
    },
    reducers: {
        [SELECTION.SET]: (state, action) => ({ selectedId: action.payload.id }),
        [SELECTION.CLEAR]: () => ({ selectedId: '' }),
    }
})
