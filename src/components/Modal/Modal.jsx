import { useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modal from './modal.module.css';


export function Modal(props) {
    function closeOnEscape(evt) {
        const { key } = evt;
        if (key.toLowerCase() === 'escape') props.closeModal()
    }

    useEffect(() => {
        document.addEventListener('keyup', closeOnEscape)

        return () => {
            document.removeEventListener('keyup', closeOnEscape)
        }
    }, [])

    return (<div className={modal.wrap}>
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
            <figure className={modal.figure}>
                <img
                    className={modal.image}
                    src={props.image_large}
                    alt={props.name}
                />
            </figure>
            <table className={modal.info}>
                <thead>
                    <tr>
                        <th>Калории, г</th>
                        <th>Белки, г</th>
                        <th>Жиры, г</th>
                        <th>Углеводы, г</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.calories}</td>
                        <td>{props.proteins}</td>
                        <td>{props.fat}</td>
                        <td>{props.carbohydrates}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>)
}