import { OrderStatus } from '../constants';

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
