import { CANCELLED } from 'dns';
import { INGREDIENT_TYPE } from '../constants';
import { ReactNode } from 'react';

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

export type TAuthContext = {
    user: TUser
    signed: boolean
    signIn: (formData: TAuthPayload) => Promise<void>
    signOut: () => Promise<void>
    getUser: () => Promise<void>
}

export enum OrderStatus {
    CREATED = 'created',
    PENDING = 'pending',
    DONE = 'done',
    CANCELLED = 'cancelled'
}

export type TOrderEntity = {
    ingredients: Array<string>
    _id: string
    status: OrderStatus
    number: number
    createdAt: string
    updatedAt: string
    name: string
}

export type TOrderResponse = {
    success: boolean
    orders: Array<TOrderEntity>
    total: number
    totalToday: number
}
