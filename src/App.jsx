import { useEffect } from 'react';
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
import { CLEAR_SELECTION } from './services/actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getItems(API_URL)) }, [])  
  
  const showActiveIngredient = useSelector(state => !!state.currentSelection.selectedId)

  function clearCurrentSelection() {
    dispatch({ type: `currentSelection/${CLEAR_SELECTION}` })
  }

  return (
    <main className="App">
      <AppHeader/>
      <div className="app-grid">
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
      {
        showActiveIngredient ? <ModalOverlay closeModal={clearCurrentSelection}>
          <Modal closeModal={clearCurrentSelection}>
            <IngredientDetails />
          </Modal>
        </ModalOverlay> : null
      }
    </main>
  );
}

export default App;
