import { configureStore, Tuple } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/use-sockets';
import {
  availableItemsSlice,
  currentSelectionSlice,
  currentItemsSlice,
  checkoutSlice,
  socketControl,
} from './';

export function storeIntegration() {
    const socketHandler = socketMiddleware()

    const store = configureStore({
        reducer: {
            availableItems: availableItemsSlice.reducer,
            currentSelection: currentSelectionSlice.reducer,
            currentItems: currentItemsSlice.reducer,
            checkout: checkoutSlice.reducer,
            socketControl: socketControl.reducer,
        },
        middleware: (getDefaultMiddleware) => new Tuple(...getDefaultMiddleware(), socketHandler),
    })

    return store
}
