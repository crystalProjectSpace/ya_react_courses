import { useState, useEffect } from 'react';
import {
  AppHeader,
  BurgerConstructor,
  BurgerIngredients,
  Modal,
  ModalOverlay,
} from './components';
import './assets/styles/index.css';
import { API_URL } from './constants';
import { setupMocks } from './utils/data';

function App() {
  //const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([]);
  const [loadState, setLoadState] = useState(false);
  const [selection, setSelection] = useState([]);
  const [activeIngredientId, setActiveIngredientId] = useState('');

  const activeItem = activeIngredientId ? data.find(({ _id }) => _id === activeIngredientId) : {}

  useEffect(() => {
    const getData = async function(path) {
      try {
        const raw = await fetch(path, { method: 'GET'});
        const loadedContent = await raw.json();
        const { success, data } = loadedContent;
        setData(data);
        const mocks = setupMocks(data);
        setSelection(mocks);
        setLoadState(success);
      } catch(e) {
        console.error(e)
      }
    }
    getData(API_URL);
  }, [])


  function displayActiveIngredient(ingredientId) {
    setActiveIngredientId(ingredientId);
  }

  function closeModal() {
    setActiveIngredientId('');
  }

  return (
    <div className="App">
      <AppHeader/>
      <div className="app-grid">
        <BurgerIngredients
          data={data} displayActiveIngredient={displayActiveIngredient}
        />
        <BurgerConstructor selection={selection} />
      </div>
      {
        activeIngredientId ? <ModalOverlay>
            <Modal
              closeModal={closeModal}
              {...activeItem}
            />
          </ModalOverlay> : null
      }
    </div>
  );
}

export default App;
