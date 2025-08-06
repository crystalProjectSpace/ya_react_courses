import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import modal from './modal-overlay.module.css';
import { type IModalProps } from '../../types';

export function ModalOverlay(props: IModalProps) {
    function closeOnEscape(evt: KeyboardEvent) {
        const { key } = evt;
        if (key.toLowerCase() === 'escape') props.closeModal()
    }

   
    useEffect(() => {
        document.addEventListener('keyup', closeOnEscape)
    
        return () => {
            document.removeEventListener('keyup', closeOnEscape)
        }
    }, []);

    return createPortal(<div className={modal.lightbox}>
        {props.children}
    </div>,
    document.getElementById('modals') as HTMLElement)
}
