import type { Middleware, MiddlewareAPI } from 'redux';
import { WS_ACTION_TYPE } from '../actions/socketControl.actions';

export function socketMiddleware(wsUrl: string): Middleware {
    
    return function(store: MiddlewareAPI) {
        let socket: WebSocket | null = null

        return (next: (action: unknown) => void) => (action: unknown) => {
            const { dispatch } = store
            const { type } = action as Record<string, unknown>;

            switch (type) {
                case WS_ACTION_TYPE.WS_CONNECT: {
                    socket = new WebSocket(wsUrl);
                        
                    if (!socket) return

                    socket.onclose = () => {
                        socket?.close();
                        dispatch({ type: `socketControl/${WS_ACTION_TYPE.WS_CLOSE}`});
                    }

                    socket.onerror = (evt) => {
                        console.log(evt)
                        dispatch({ type: `socketControl/${WS_ACTION_TYPE.WS_CONNECT_FAIL}`});
                    }

                    socket.onmessage = (evt) => {
                        const { data } = evt;
                        dispatch({ type: `socketControl/${WS_ACTION_TYPE.WS_MESSAGE}`, payload: data});
                    }
                    return                    
                }
                default: next(action);
            }
        }
    }
}
