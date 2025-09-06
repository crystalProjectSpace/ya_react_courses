import type { Middleware, MiddlewareAPI } from 'redux';
import { WS_ACTION_TYPE } from '../actions/socketControl.actions';

type TSocketAction = {
    type: WS_ACTION_TYPE
    payload: Record<string, unknown>
}

export function socketMiddleware(wsUrl: string) {
    
    return function(store: MiddlewareAPI) {
        let socket: WebSocket | null = (null)

        return (next: (action: TSocketAction) => void) => (action: TSocketAction) => {
            const { dispatch, getState } = store
            const { type, payload } = action;

            console.log('middleware_active', action)

            if ( type === WS_ACTION_TYPE.WS_CONNECT) {
                socket = new WebSocket(wsUrl);
                    
                if(!socket) return

                dispatch({ type: WS_ACTION_TYPE.WS_CONNECT_SUCCESS, payload})

                socket.onclose = (evt) => {
                    dispatch({ type: WS_ACTION_TYPE.WS_CLOSE, payload: evt});
                }

                socket.onerror = (evt) => {
                    dispatch({ type: WS_ACTION_TYPE.WS_CONNECT_FAIL, payload: evt});
                }

                socket.onmessage = (evt) => {
                    const { data } = evt;
                    dispatch({ type: WS_ACTION_TYPE.WS_MESSAGE, payload: data});
                }

                return
            }
            
            if ( type === WS_ACTION_TYPE.WS_MESSAGE) {
                const msg = JSON.stringify(payload)
                socket?.send(msg)
            } else {
                next(action);
            }
            
        }
    }
}
