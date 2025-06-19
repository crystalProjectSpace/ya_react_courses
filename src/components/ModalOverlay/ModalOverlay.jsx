import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modal from './modal-overlay.module.css';

export function ModalOverlay(props) {
    const modalBox = useRef();

    function closeOnEscape(evt) {
        const { key } = evt;
        console.log(modalBox.current)
        if (key.toLowerCase() === 'escape') props.closeModal()
    }

    function closeOnClickOutside(evt) {
        const modalBoundBox = modalBox.current
        if (!modalBoundBox) return;
        const { top, left, bottom, right } = modalBoundBox.getBoundingClientRect()
        const {clientX, clientY} = evt;
        if (clientX < left || clientX > right) {
            props.closeModal();
            return
        }
        if (clientY < top || clientY > bottom) {
            props.closeModal();
            return
        }
    }
    
    useEffect(() => {
        document.addEventListener('keyup', closeOnEscape)
        document.addEventListener('pointerup', closeOnClickOutside)
    
        return () => {
            document.removeEventListener('keyup', closeOnEscape)
            document.removeEventListener('pointerup', closeOnClickOutside)
        }
    }, []);

    return createPortal(<div className={modal.lightbox}>
        <div className={modal.wrap} ref={modalBox}>
        <header className={modal.header}>
            { props.name && <h3 className={modal.headerTitle}>{props.name}</h3> }
            <button
                type="button"
                className={modal.сlose}
                onClick={props.closeModal}
            >
                <CloseIcon type="primary" />
           </button>
        </header>
        <section className={modal.content}>
            { props.children}
        </section>
    </div>
    </div>,
    document.body)
} 