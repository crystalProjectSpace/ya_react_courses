import { createSlice } from '@reduxjs/toolkit'
import { AVAIL_ITEM_ACTIONS } from '../actions/'
import { getData } from '../../utils/data'
import { TRequestError, type TIngredientItem } from '../../types'

type TavailItemDispatch = (arg: {type: string, payload?: unknown }) => void

export const availableItemsSlice = createSlice({
    name: 'availableItems',
    initialState: {
        isLoading: false,
        isError: false,
        items: [] as ReadonlyArray<TIngredientItem>,
    },
    reducers: {
        [AVAIL_ITEM_ACTIONS.LOAD]: (state) => ({
            ...state,
            isLoading: true,
        }),
        [AVAIL_ITEM_ACTIONS.FAIL]: (state) => ({
            ...state,
            isLoading: false,
            isError: true,
        }),
        [AVAIL_ITEM_ACTIONS.SET]: (state, action) => ({
            items: action.payload.items.slice(),
            isLoading: false,
            isError: false,
        })
    },
})

export const  getItems = (path: string) => async (dispatch: TavailItemDispatch) => {
    dispatch({ type: `availableItems/${AVAIL_ITEM_ACTIONS.LOAD}`})
    const response = await getData(path)
    const dataAction = (response instanceof TRequestError)
        ? { type: `availableItems/${AVAIL_ITEM_ACTIONS.FAIL}`}
        : { type: `availableItems/${AVAIL_ITEM_ACTIONS.SET}`, payload: {items: response.data } }
    dispatch(dataAction)
}
