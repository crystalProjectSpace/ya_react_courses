import {INGREDIENT_TYPE} from '../constants'

function getRndIndex(count) {
   return Math.round(Math.random() * (count - 1))
}

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

export function setupMocks(data) {
   const buns = []
   const main = []
   const sauce = []
   const result = []

   data.forEach(item => {
      switch(item.type) {
         case INGREDIENT_TYPE.BUN:
            buns.push(item); break;
         case INGREDIENT_TYPE.MAIN:
            main.push(item); break;
         case INGREDIENT_TYPE.SAUCE:
            sauce.push(item); break;
         default: return;
      }
   });

   const bunCount = buns.length
   const mainCount = buns.length
   const sauceCount = buns.length
   result.push(buns[getRndIndex(bunCount)])
   for(let i = 0; i < 3; i++) {
      const mainIndex = getRndIndex(mainCount)
      const sauceIndex = getRndIndex(sauceCount)
      result.push(main[mainIndex], sauce[sauceIndex])
   }

   return result
}
