import { useEffect } from 'react';
import {
  AppHeader,
  BurgerConstructor,
  BurgerIngredients,
  IngredientDetails,
  Modal,
  ModalOverlay,
  OrderCheckout,
} from '../components';
import '../assets/styles/index.css';
import { API_URL } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../services';
import { CHECKOUT_ACTIONS, SELECTION } from '../services/actions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'react-router';

function RootPage() {
  const dispatch = useDispatch();
  const { id: ingredientId } = useParams()

  useEffect(() => {
    dispatch(getItems(API_URL))
    if (ingredientId) dispatch({ type: `currentSelection/${SELECTION.SET}`, payload: { id: ingredientId } })
  }, [])
  
  const showActiveIngredient = useSelector(state => !!state.currentSelection.selectedId)
  const orderId = useSelector(state => state.checkout.orderId)

  function clearCurrentSelection() {
    dispatch({ type: `currentSelection/${SELECTION.CLEAR}` })
  }

  function clearCheckout() {
    dispatch({ type: `checkout/${CHECKOUT_ACTIONS.CLEAR}` })
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

export default RootPage;
