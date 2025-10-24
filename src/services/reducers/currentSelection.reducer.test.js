
import { currentSelectionSlice } from './currentSelection.reducer';
import { configureStore } from '@reduxjs/toolkit';

const localStore = configureStore({
    reducer: {
        selection: currentSelectionSlice.reducer
    }
})

const DUMMY_ID = 'dead-beaf-c0ca-co1a'

describe('Test for selection-storage reduces', () => {
    const selectActions = currentSelectionSlice.actions
    
    it('initial selection should be empty string', () => {
        const selection = localStore.getState().selection        
        expect(selection).toEqual({ selectedId: ''})
    })

    it('applying select-action should set selectedId to applied test value', () => {        
        localStore.dispatch(selectActions.SET({ id: DUMMY_ID }))     
        const selection = localStore.getState().selection
        expect(selection).toEqual({ selectedId: DUMMY_ID})
    })

    it('applying select-clear should set selectedId to empty string', () => {        
        localStore.dispatch(selectActions.CLEAR())     
        const selection = localStore.getState().selection
        expect(selection).toEqual({ selectedId: '' })
    })
})

/**
 * @description
 * @url https://dev.to/bionicjulia/writing-jest-tests-for-a-redux-toolkit-slice-3co3
 */