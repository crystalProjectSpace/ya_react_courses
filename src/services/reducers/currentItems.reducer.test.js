
import { currentItemsSlice } from './currentItems.reducer';
import { configureStore } from '@reduxjs/toolkit';

const localStore = configureStore({
    reducer: {
        items: currentItemsSlice.reducer
    }
})

const DUMMY_ID = 'dead-beaf-c0ca-co1a'

describe('Test for selection-storage reduces', () => {
    const selectActions = currentItemsSlice.actions
    
    it('selecting a bun should add it to specific id and not to common selection', () => {
        localStore.dispatch(selectActions.SET_BUN({ id: DUMMY_ID }))
        const items = localStore.getState().items
        expect(items.currentItems).not.toContain(DUMMY_ID)
        expect(items.currentBun).toEqual(DUMMY_ID)
    })

    it('removing a bun from selection should not affect other items and should remove bun', () => {
        const currentItemsCount = localStore.getState().items.currentItems.length
        localStore.dispatch(selectActions.REMOVE_BUN())
        const items = localStore.getState().items
        expect(items.currentItems.length).toEqual(currentItemsCount)
        expect(items.currentBun).toEqual('')
    })
    /**
     * more test tomorrow
     */
})

/**
 * @description
 * @url https://dev.to/bionicjulia/writing-jest-tests-for-a-redux-toolkit-slice-3co3
 */