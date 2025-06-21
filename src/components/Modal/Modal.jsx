import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modal from './modal.module.css';

export function Modal(props) {
    const modalBox = useRef();


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
        document.addEventListener('pointerup', closeOnClickOutside)
    
        return () => {
            document.removeEventListener('pointerup', closeOnClickOutside)
        }
    }, []);

    return (<div className={modal.wrap} ref={modalBox}>
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
    </div>)
}

Modal.propTypes = {
    name: PropTypes.string,
    closeModal: PropTypes.func,
    children: PropTypes.element,
}
