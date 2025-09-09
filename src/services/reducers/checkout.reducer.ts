import { createSlice } from '@reduxjs/toolkit'
import { CHECKOUT_ACTIONS } from '../actions/'
import { makeCheckoutRequest } from '../../utils/data'
import { TRequestError } from '../../types'

type TCheckoutPayload = { path: string, ingredients: ReadonlyArray<string> }

type TCheckoutDispatch = (arg: { type: string, payload?: unknown}) => void

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        isLoading: false,
        isError: false,
        orderId: '',
    },
    reducers: {
        [CHECKOUT_ACTIONS.REQUEST]: () => ({
            isLoading: true,
            isError: false,
            orderId: ''
        }),
        [CHECKOUT_ACTIONS.FAIL]: () => ({
            isLoading: false,
            isError: true,
            orderId: '',
        }),
        [CHECKOUT_ACTIONS.SET_ID]: (state, action) => ({
            isLoading: false,
            isError: false,
            orderId: action.payload.id,
        }),
        [CHECKOUT_ACTIONS.CLEAR]: () => ({
            isLoading: false,
            isError: false,
            orderId: '',
        })
    },
})

export const checkoutRequest = ({ path, ingredients }: TCheckoutPayload) => async (dispatch: TCheckoutDispatch) => {
    dispatch({ type: `checkout/${CHECKOUT_ACTIONS.REQUEST}`})
    const response = await makeCheckoutRequest({ path, ingredients })
    const dataAction = (response instanceof TRequestError)
        ? { type: `checkout/${CHECKOUT_ACTIONS.FAIL}`}
        : { type: `checkout/${CHECKOUT_ACTIONS.SET_ID}`, payload: { id: response?.orderId } }
    dispatch(dataAction)
}
