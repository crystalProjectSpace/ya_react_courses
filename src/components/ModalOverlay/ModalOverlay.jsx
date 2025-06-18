import { createPortal } from 'react-dom';
import modalOverlay from './modal-overlay.module.css';

export function ModalOverlay(props) {
    return createPortal(<div className={modalOverlay.modalWrap}>
        {props.children}
    </div>,
    document.body)
} 