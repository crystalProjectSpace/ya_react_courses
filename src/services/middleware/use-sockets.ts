import type { Middleware, MiddlewareAPI } from 'redux';
import { WS_ACTION_TYPE } from '../actions/socketControl.actions';

export function socketMiddleware(): Middleware {
    
    return function(store: MiddlewareAPI) {
        let socket: WebSocket | null = null

        return (next: (action: unknown) => void) => (action: unknown) => {
            const { dispatch } = store
            const { type, payload } = action as Record<string, unknown>;

            switch (type) {
                case WS_ACTION_TYPE.WS_CONNECT: {
                    socket = new WebSocket((payload as Record<string, string>).url)                        
                    if (!socket) return

                    socket.onclose = () => {
                        socket?.close();
                        dispatch({ type: `socketControl/${WS_ACTION_TYPE.WS_CLOSE}`});
                    }

                    socket.onerror = () => {
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
