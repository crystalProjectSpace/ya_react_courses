export const API_URL = 'https://norma.education-services.ru/api/ingredients'

export const CHECKOUT_URL = 'https://norma.education-services.ru/api/orders'

export const AUTH_URL = 'https://norma.education-services.ru/api/auth/login'  // эндпоинт для авторизации.

export const REG_URL = 'https://norma.education-services.ru/api/auth/register' // эндпоинт для регистрации пользователя.

export const LOGOUT_URL = 'https://norma.education-services.ru/api/auth/logout' // эндпоинт для выхода из системы.

export const REFRESH_TOKEN_URL = 'https://norma.education-services.ru/api/auth/token' // эндпоинт обновления токена. 

export const PROFILE_URL = 'https://norma.education-services.ru/api/auth/user' // GET эндпоинт получения данных о пользователе.

export const UPD_PROFILE_URL = 'https://norma.education-services.ru/api/auth/user' // PATCH эндпоинт обновления данных о пользователе.

export const PASS_RESET_URL = 'https://norma.education-services.ru/api/password-reset/' // получение кода на сброс пароля

export const PASS_CHANGE_URL = 'https://norma.education-services.ru/api/password-reset/reset' // смена пароля

export const ORDERS_SOCKET_WSS = 'wss://norma.education-services.ru/orders/all' // сокет для получения заказов

export const ORDER_SINGLE_SOCKET_WSS = 'wss://norma.education-services.ru/orders' // сокет для получения заказов конкретного пользователя

export const ORDER_BY_NUMBER_URL = 'https://norma.education-services.ru/api/orders/%number%' // GET получить заказ по номеру
