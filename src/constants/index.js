export const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

export const CHECKOUT_URL = 'https://norma.nomoreparties.space/api/orders'

export const AUTH_URL = 'https://norma.nomoreparties.space/api/auth/login'  // эндпоинт для авторизации.

export const REG_URL = 'https://norma.nomoreparties.space/api/auth/register' // эндпоинт для регистрации пользователя.

export const LOGOUT_URL = 'https://norma.nomoreparties.space/api/auth/logout' // эндпоинт для выхода из системы.

export const REFRESH_TOKEN_URL = 'https://norma.nomoreparties.space/api/auth/token' // эндпоинт обновления токена. 

export const INGREDIENT_TYPE = {
    BUN: 'bun',
    SAUCE: 'sauce',
    MAIN: 'main',
}

export const MENU_TYPES = [
    { val: INGREDIENT_TYPE.BUN, label: 'Булки' },
    { val: INGREDIENT_TYPE.SAUCE, label: 'Соусы' },
    { val: INGREDIENT_TYPE.MAIN, label: 'Начинки' },
]
