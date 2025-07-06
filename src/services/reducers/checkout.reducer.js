import { createSlice } from '@reduxjs/toolkit'
import { 
    CHECKOUT_REQUEST,
    CHECKOUT_FAIL,
    CHECKOUT_SET_ID,
    CHECKOUT_CLEAR,
} from '../actions/'
import { makeCheckoutRequest } from '../../utils/data'

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        isLoading: false,
        isError: false,
        orderId: '',
    },
    reducers: {
        [CHECKOUT_REQUEST]: () => ({
            isLoading: true,
            isError: false,
            orderid: ''
        }),
        [CHECKOUT_FAIL]: () => ({
            isLoading: false,
            isError: true,
            orderId: '',
        }),
        [CHECKOUT_SET_ID]: (state, action) => ({
            isLoading: false,
            isError: false,
            orderId: action.id,
        }),
        [CHECKOUT_CLEAR]: () => ({
            isLoading: false,
            isError: false,
            orderId: '',
        })
    },
})

export const checkoutRequest = ({ path, ingredients }) => async (dispatch) => {
    dispatch({ type: `checkout/${CHECKOUT_REQUEST}`})
    const { orderId, error} = await makeCheckoutRequest({ path, ingredients })
    const dataAction = (orderId && !error)
        ? { type: `checkout/${CHECKOUT_SET_ID}`, id: orderId }
        : { type: `checkout/${CHECKOUT_FAIL}`}
    dispatch(dataAction)
}
