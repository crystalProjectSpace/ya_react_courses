import type {
   TCheckoutPayload,
   THTTPmethod,
   TRequestPayload,
   TRequestError,
} from "../types";
/**
 * @description расширенный запрос с перехватов ошибок в ответе
 */
export async function request(url: string, payload: TRequestPayload) {
   const raw = await fetch(url, payload)
   const { ok } = raw;
   if (!ok) throw new Error('API_FAIL')
   const parsedData = await raw.json()
   return parsedData
}
/**
 * @description получение произвольных данных по гет-запросу
 */
export async function getData(path: string, fieldName = 'data') {
   try {
      const response = await request(path, { method: 'GET' });
      if (!response?.success) throw new Error('API_FAIL')
      return { data: response[fieldName] }
   } catch(e) {
      console.error(e)
      return { error: e }
   }
}
/**
 * @description запрос на формирование заказа
 */
export async function makeCheckoutRequest({ ingredients, path }: TCheckoutPayload) {
   try {
      const body = JSON.stringify({ ingredients })
      const token = window.sessionStorage.getItem('access') 
      const headers = {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
      }
      const requestData = {
         method: 'POST' as THTTPmethod,
         headers,
         body,
      }
      const { order, success } = await request(path, requestData)
      if (!success) throw new Error('API_FAIL')
      if (order) return { orderId: order.number }      
   } catch (e) {
      console.error(e)
      return { error: e }
   }
}
/**
 * @description сгенерировать временный айди
 */
export function getProvisionalId() {
   const seed = Math.trunc(Math.random() * 1E6)
   const alpha = seed % 113
   const betha = seed % 241
   return (alpha * 100 + betha ^ alpha).toString(16)
}
