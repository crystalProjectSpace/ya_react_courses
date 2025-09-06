import { createSlice } from '@reduxjs/toolkit'
import { 
    AVAIL_ITEMS_LOAD,
    AVAIL_ITEMS_FAIL,
    AVAIL_ITEMS_SET,
} from '../actions/'
import { getData } from '../../utils/data'

export const availableItemsSlice = createSlice({
    name: 'availableItems',
    initialState: {
        isLoading: false,
        isError: false,
        items: [],
    },
    reducers: {
        [AVAIL_ITEMS_LOAD]: (state) => ({
            ...state,
            isLoading: true,
        }),
        [AVAIL_ITEMS_FAIL]: (state) => ({
            ...state,
            isLoading: false,
            isError: true,
        }),
        [AVAIL_ITEMS_SET]: (state, action) => ({
            items: action.items.slice(),
            isLoading: false,
            isError: false
        })
    },
})

export const  getItems = (path) => async (dispatch) => {
    console.log('ready to get Items')

    dispatch({ type: `availableItems/${AVAIL_ITEMS_LOAD}`})
    const { data: items, error} = await getData(path)
    const dataAction = (items && !error)
        ? { type: `availableItems/${AVAIL_ITEMS_SET}`, items}
        : { type: `availableItems/${AVAIL_ITEMS_FAIL}`}
    dispatch(dataAction)
}
