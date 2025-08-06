import PropTypes from 'prop-types';
import { INGREDIENT_TYPE } from '../constants';
import { ReactNode } from 'react';

export const IngredientCardProps = PropTypes.shape({
    type: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    _id: PropTypes.string,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
});

export const IngredientListProps = PropTypes.arrayOf(IngredientCardProps)

export type TUser = {
    name: string
    email: string
} | null

export type TSelectionItem = {
    id: string
    itemId: string
}

export type TIngredientItem = {
    _id: string
    name: string
    image: string
    image_large: string
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
}

export type THTTPmethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export type TCheckoutPayload = {
    ingredients: ReadonlyArray<string>
    path: string
}

export type TRequestPayload = {
    method: THTTPmethod
    headers?: Record<string, string>
    body?: string
}

export type TAuthPayload = {
    email: string
    password: string
}

export type TRegPayload = TAuthPayload & { name?: string }

export type TChangePassPayload = {
    token: string
    password: string
}

export type TFetchUserResult = {
    success?: boolean,
    user?: TUser
    error?: string
}

export interface IModalProps {
    children: ReactNode | Array<ReactNode>
    closeModal: () => void
}
