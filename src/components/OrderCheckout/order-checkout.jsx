import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import orderCheckout from './order-checkout.module.css'

export function OrderCheckout() {
    const checkoutId = ''

    return (<div className={orderCheckout.wrap}>
        <h1 className="text text_type_digits-large">{checkoutId}</h1>
        <p className="text text_type_main-small">Идентификатор заказа</p>
        <figure className={orderCheckout.figure}>
            <CheckMarkIcon type="primary"/>
        </figure>
        <p className="text text_type_main-small">Идентификатор заказа</p>
        <p className="text text_type_main-small text_color_inactive">Идентификатор заказа</p>
    </div>)
}
