async function request(url, payload) {
   const raw = await fetch(url, payload)
   const { ok } = raw;
   if (!ok) throw new Error('API_FAIL')
   const parsedData = await raw.json()
   return parsedData
}

export async function getData(path) {
   try {
      const { success, data } = await request(path, { method: 'GET'});
      if (!success) throw new Error('API_FAIL')
      return { data }
   } catch(e) {
      console.error(e)
      return { error: e }
   }
}

export async function makeCheckoutRequest({ingredients, path}) {
   try {
      const body =  JSON.stringify({ ingredients })
      const headers = { 'Content-Type': 'application/json'}
      const { order, success } = await request(path, { method: 'POST', headers, body })
      if (!success) throw new Error('API_FAIL')
      if (order) return { orderId: order.number }      
   } catch (e) {
      console.error(e)
      return { error: e }
   }
}

export function getProvisionalId() {
   const seed = Math.trunc(Math.random() * 1E6)
   const alpha = seed % 113
   const betha = seed % 241
   return (alpha * 100 + betha ^ alpha).toString(16)
}
