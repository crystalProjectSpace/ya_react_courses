import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import orderCheckout from './order-checkout.module.css'

export function OrderCheckout() {
    const orderId = useSelector((state) => state.checkout.orderId)

    return (<div className={orderCheckout.wrap}>
        <h1 className={`text text_type_digits-large ${orderCheckout.order}`}>
            {orderId}
        </h1>
        <p className="text text_type_main-small">Идентификатор заказа</p>
        <figure className={orderCheckout.figure}>
            <CheckMarkIcon type="primary"/>
        </figure>
        <p className="text text_type_main-small">Ваш заказ начали готовить</p>
        <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>)
}
