
import { availableItemsSlice, getItems } from './availableItems.reducer'
import { mockFetch } from './apiMockups'
import { configureStore } from '@reduxjs/toolkit'

/**
 * @description
 * @url https://dev.to/bionicjulia/writing-jest-tests-for-a-redux-toolkit-slice-3co3
 */

const localStore = configureStore({
    reducer: {
        items: availableItemsSlice.reducer
    }
})

const DUMMY_RESPONSE = [
    {
        "_id": "643d69a5c3f7b9001cfa093e",
        "name": "Филе Люминесцентного тетраодонтимформа",
        "type": "main",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/meat-03.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
        "__v": 0
    },
]

describe('Test for selection-storage reduces', () => {
    it('Fetching for items should add them to available ingredient list', async () => {
        mockFetch({ data: DUMMY_RESPONSE, failClause: false })
    
        await localStore.dispatch(getItems('/dummy-url'))
        const loadedItems = localStore.getState().items.items
        expect(JSON.stringify(loadedItems) === JSON.stringify(DUMMY_RESPONSE)).toBeTruthy()
    })
})
