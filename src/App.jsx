import { useEffect } from 'react';
import {
  AppHeader,
  BurgerConstructor,
  BurgerIngredients,
  IngredientDetails,
  Modal,
  ModalOverlay,
  OrderCheckout,
} from './components';
import './assets/styles/index.css';
import { API_URL } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from './services';
import { CHECKOUT_CLEAR, CLEAR_SELECTION } from './services/actions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getItems(API_URL)) }, [])
  
  const showActiveIngredient = useSelector(state => !!state.currentSelection.selectedId)
  const orderId = useSelector(state => state.checkout.orderId)

  function clearCurrentSelection() {
    dispatch({ type: `currentSelection/${CLEAR_SELECTION}` })
  }

  function clearCheckout() {
    dispatch({ type: `checkout/${CHECKOUT_CLEAR}` })
  }

  return (
    <main className="App">
      <AppHeader/>
      <div className="app-grid">
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
      {
        showActiveIngredient ? <ModalOverlay closeModal={clearCurrentSelection}>
          <Modal closeModal={clearCurrentSelection}>
            <IngredientDetails />
          </Modal>
        </ModalOverlay> : null
      }
      { !!orderId ? <ModalOverlay closeModal={clearCheckout}>
          <Modal closeModal={clearCheckout}>
            <OrderCheckout />
          </Modal>
        </ModalOverlay> : null
      }
    </main>
  );
}

export default App;
