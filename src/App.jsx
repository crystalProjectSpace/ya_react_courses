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
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from './services';

function App() {
  const [selection] = useState([]);
  const [activeIngredientId, setActiveIngredientId] = useState('');
  
  const dispatch = useDispatch();
  
  const data = useSelector(state => state.availableItems.items)
  const activeItem = activeIngredientId ? data.find(({ _id }) => _id === activeIngredientId) : {}
  useEffect(() => { dispatch(getItems(API_URL)) }, [])


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
