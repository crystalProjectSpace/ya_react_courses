export async function getData(path) {
   try {
      const raw = await fetch(path, { method: 'GET'});
      const loadedContent = await raw.json();
      const { success, data } = loadedContent;
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
      const data = await fetch(path, { method: 'POST', headers, body })
      const { order, success } = await data.json();
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
