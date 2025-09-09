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
import { useAppSelector, useAppDispatch, type TDispatchAction } from "../services"
import { CHECKOUT_ACTIONS, SELECTION } from '../services/actions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'react-router';
import { IIngredientState } from '../types';

function RootPage() {
  const dispatch = useAppDispatch() as TDispatchAction;
  const { id: ingredientId } = useParams()

  useEffect(() => {
    if (ingredientId) dispatch({ type: `currentSelection/${SELECTION.SET}`, payload: { id: ingredientId } })
  }, [])
  
  const showActiveIngredient = useAppSelector((state: IIngredientState) => !!state.currentSelection.selectedId)
  const orderId = useAppSelector((state:IIngredientState) => state.checkout.orderId)

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
