import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import modal from './modal-overlay.module.css';

export function ModalOverlay(props) {
    function closeOnEscape(evt) {
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
    document.getElementById('modals'))
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func,
    children: PropTypes.element,
}
