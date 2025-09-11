import { INGREDIENT_TYPE, OrderStatus } from './enums'

export const MENU_TYPES = [
    { val: INGREDIENT_TYPE.BUN, label: 'Булки' },
    { val: INGREDIENT_TYPE.SAUCE, label: 'Соусы' },
    { val: INGREDIENT_TYPE.MAIN, label: 'Начинки' },
]

export const STATUS_LABELS = new Map([
    [OrderStatus.CREATED, 'Создан'],
    [OrderStatus.PENDING, 'Готовится'],
    [OrderStatus.CANCELLED, 'Отменен'],
    [OrderStatus.DONE, 'Выполнен']
])
