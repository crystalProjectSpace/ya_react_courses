
import { currentItemsSlice } from './currentItems.reducer'
import { configureStore } from '@reduxjs/toolkit'

/**
 * @description
 * @url https://dev.to/bionicjulia/writing-jest-tests-for-a-redux-toolkit-slice-3co3
 */

const localStore = configureStore({
    reducer: {
        items: currentItemsSlice.reducer
    }
})

const DUMMY_ID = 'dead-beaf-c0ca-co1a'

const TEST_ITEMS = [
    { id: 'aaaa', provisionalId: '0000' },
    { id: 'aaab', provisionalId: '0001' },
    { id: 'aabb', provisionalId: '0002'},
]

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

    it('swapping items should exchange their positions and should not exchange their values', () => {
        function getItemHash(item) {
            return (parseInt(`${item.id}${item.provisionalId}`, 16) + parseInt(item.id, 16))/(1 + parseInt(item.itemId, 16))
        }

        const I_START = 0
        const I_END = 2

        TEST_ITEMS.forEach(item => localStore.dispatch(selectActions.ADD_ITEM(item)))
        const preState = localStore.getState()
        const hashFirst = getItemHash(preState.items.currentItems[I_START])
        const hashLast = getItemHash(preState.items.currentItems[I_END])

        localStore.dispatch(selectActions.SWAP_ITEMS({ indexNew: I_START, indexOld: I_END }))
        const nowState = localStore.getState()
        const firstToLast = hashFirst === getItemHash(nowState.items.currentItems[I_END])
        const lastToFirst = hashLast === getItemHash(nowState.items.currentItems[I_START])
        
        expect(firstToLast && lastToFirst).toBeTruthy()
    })
})
