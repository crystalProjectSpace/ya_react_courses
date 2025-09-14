
import { checkoutSlice, checkoutRequest } from './checkout.reducer'
import { configureStore } from '@reduxjs/toolkit'
import { mockFetch } from './apiMockups'

const localStore = configureStore({
    reducer: {
        checkout: checkoutSlice.reducer
    }
})

const TEST_ITEMS = [
    { id: 'aaaa-0000' },
    { id: 'aaab-0001' },
    { id: 'aabb-0002'},
]

describe('Failed request should be handled correctly', () => {
    it ('Failed request should raise FAIL flag and do not fill ORDER_ID field', async () => {
        mockFetch({ failClause: true })
        try {
            await localStore.dispatch(checkoutRequest({ path: '/test-url-api', ingredients: []}))
        } finally {
            const state = localStore.getState().checkout
            expect(state.isError && !state.orderId).toBeTruthy()
        }
    })
})

describe('Correct request should fill order-id field', () => {
    it ('Client should acquire orderId after correct checkout request', async () => {
        const response = { number: 'dead-beef-c0ca-c01a'}
        mockFetch({ data: response, fieldId: 'order' })
        
        await localStore.dispatch(checkoutRequest({
            path: '/test-url-api', 
            ingredients: TEST_ITEMS,
        }))
        const state = localStore.getState().checkout
        expect(!state.isError && state.orderId).toBeTruthy()        
    })
})
