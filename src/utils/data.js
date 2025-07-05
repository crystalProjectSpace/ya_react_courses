export async function getData(path) {
   try {
      const raw = await fetch(path, { method: 'GET'});
      const loadedContent = await raw.json();
      const { success, data } = loadedContent;
      if (!success) return { error: {type: 'API_FAIL' }};
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
      if (order) return { orderId: order.number }
      if (!success) return { error: 'API_FAIL'}
   } catch (e) {
      console.error(e)
      return { error: e }
   }
}
