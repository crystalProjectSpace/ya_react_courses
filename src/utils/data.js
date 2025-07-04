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
