import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

import {OrderIngredientMore, OrderIngredientCard} from '../OrderIngredients'

import { OrderStatus, type TOrderEntity, type IIngredientState } from "../../types"
import styles from './order-card-module.css'


export function OrderCard(order: TOrderEntity) {

    const orderStatusClass = useMemo(() => `_${order.status}`, [order.status])

    const orderStatus = useMemo(() => {
        switch(order.status) {
            case OrderStatus.CREATED: return 'Создан';
            case OrderStatus.PENDING: return 'Готовится';
            case OrderStatus.CANCELLED: return 'Отменен';
            case OrderStatus.DONE: return 'Выполнен';
        }
    }, [order.status])

    const totalPrice = useSelector((state: IIngredientState) => {
		const { items } = state.availableItems
        const count = order.ingredients.length
        let result = 0
        for(let i = 0; i < count; i++) {
            const itemId = order.ingredients[i]
            result += (items.find(i => i._id === itemId)?.price || 0)
        }
		return  result
	})

    const orderIngredientIcons = useMemo(() => {
        const { ingredients } = order
        if (ingredients.length < 6) return ingredients.map(itemId => <OrderIngredientPreview itemId={itemId}/>);
        const result = ingredients.slice(0, 5).map(itemId => <OrderIngredientPreview itemId={itemId}/>);
        const excess = ingredients.length - 5
        result.push(<OrderIngredientMore excess={excess}/>)
        return result
    }, [order.ingredients])

    return <div className={styles.wrap}>
        <header className={styles.header}>
            <div className={styles.meta}>
                <span className={styles.number}></span>
                <span className={styles.datetime}></span>
            </div>
            <h4 className={ styles.title }>{ order.name }</h4>
            <div className={ orderStatusClass }>{ orderStatus }</div>
        </header>
        <div className={ styles.cardMain}>
            <div className={styles.ingredientList}>
                {order.ingredients.slice(0, 5).map}
                {
                   order.ingredients.length > 5 ? <OrderIngredientMore/> : null
                }
            </div>
            <div className={styles.priceWrap}>
                <CurrencyIcon/>
                <span>{ totalPrice }</span>
            </div>
        </div>
    </div>
}