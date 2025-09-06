import { INGREDIENT_TYPE } from '../constants';
import { TOrderEntity } from './orders.types';

export * from './auth.types'
export * from './utils.types'
export * from './orders.types'

export type TSelectionItem = {
    id: string
    itemId: string
}

export type TIngredientItem = {
    _id: string
    name: string
    image: string
    image_large: string
    image_mobile: string
    calories: number
    proteins: number
    fat: number
    carbohydrates: number
    type: INGREDIENT_TYPE
    price: number
}

export interface IIngredientState {
    currentSelection: {
        selectedId: string
    }
    currentItems: {
        currentBun?: string        
        currentItems: Array<TSelectionItem>
    }
    availableItems: {
        items: ReadonlyArray<TIngredientItem>
    }
    checkout: {
        orderId: string
    },
    socketControl: {
        orders: ReadonlyArray<TOrderEntity>,
        totalOrderCount: number,
        todayOrderCount: number,
    }
}

export type TCheckoutPayload = {
    ingredients: ReadonlyArray<string>
    path: string
}
