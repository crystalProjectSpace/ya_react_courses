import { createSlice } from '@reduxjs/toolkit';
import { SET_SELECTION , CLEAR_SELECTION } from '../actions'

export const currentSelectionSlice = createSlice({
    name: 'currentSelection',
    initialState: {
        selectedId: ''
    },
    reducers: {
        [SET_SELECTION]: (state, action) => ({ selectedId: action.id }),
        [CLEAR_SELECTION]: () => ({ selectedId: '' }),
    }
})
