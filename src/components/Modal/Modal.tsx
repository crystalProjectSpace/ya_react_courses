import { useEffect, useRef } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { type IModalProps } from '../../types';
import modal from './modal.module.css';

export function Modal(props: IModalProps) {
    const modalBox = useRef<HTMLDivElement | null>(null);


    function closeOnClickOutside(evt: PointerEvent) {
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
        <div className={modal.closeWrap}>
            <button
                type="button"
                className={modal.сlose}
                onClick={props.closeModal}
            >
                <CloseIcon type="primary" />
           </button>
        </div>
        <section className={modal.content}>
            { props.children}
        </section>
    </div>)
}
