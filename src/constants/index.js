export const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

export const CHECKOUT_URL = 'https://norma.nomoreparties.space/api/orders'

export const AUTH_URL = 'https://norma.nomoreparties.space/api/auth/login'  // эндпоинт для авторизации.

export const REG_URL = 'https://norma.nomoreparties.space/api/auth/register' // эндпоинт для регистрации пользователя.

export const LOGOUT_URL = 'https://norma.nomoreparties.space/api/auth/logout' // эндпоинт для выхода из системы.

export const REFRESH_TOKEN_URL = 'https://norma.nomoreparties.space/api/auth/token' // эндпоинт обновления токена. 

export const PROFILE_URL = 'https://norma.nomoreparties.space/api/auth/user' // GET эндпоинт получения данных о пользователе.

export const UPD_PROFILE_URL = 'https://norma.nomoreparties.space/api/auth/user' // PATCH эндпоинт обновления данных о пользователе.

export const PASS_RESET_URL = 'https://norma.nomoreparties.space/api/password-reset/' // получение кода на сброс пароля

export const PASS_CHANGE_URL = 'https://norma.nomoreparties.space/api/password-reset/reset'

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
