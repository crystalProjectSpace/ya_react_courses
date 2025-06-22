import { useState, useEffect } from 'react';
import {
  AppHeader,
  BurgerConstructor,
  BurgerIngredients,
  IngredientDetails,
  Modal,
  ModalOverlay,
} from './components';
import './assets/styles/index.css';
import { API_URL } from './constants';
import { setupMocks } from './utils/data';

function App() {
  const [data, setData] = useState([]);
  const [selection, setSelection] = useState([]);
  const [activeIngredientId, setActiveIngredientId] = useState('');

  const activeItem = activeIngredientId ? data.find(({ _id }) => _id === activeIngredientId) : {}

  useEffect(() => {
    const getData = async function(path) {
      try {
        const raw = await fetch(path, { method: 'GET'});
        const loadedContent = await raw.json();
        const { success, data } = loadedContent;
        if (!success) throw new Error('data acquisition error', {cause: 'API_FAIL'})
        setData(data);
        const mocks = setupMocks(data);
        setSelection(mocks);
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

  const showModal = !!activeIngredientId // возможно,что по мере разрастания количества модалок, здесь появится более сложное выражние

  return (
    <main className="App">
      <AppHeader/>
      <div className="app-grid">
        <BurgerIngredients
          data={data}
          displayActiveIngredient={displayActiveIngredient}
        />
        <BurgerConstructor selection={selection} />
      </div>
      {
        showModal ? <ModalOverlay closeModal={closeModal}>
          <Modal closeModal={closeModal}>
            <IngredientDetails ingredient={activeItem} />
          </Modal>
        </ModalOverlay> : null
      }
    </main>
  );
}

export default App;
