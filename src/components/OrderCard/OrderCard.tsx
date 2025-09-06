import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import {OrderIngredientMore, OrderIngredientPreview } from '../OrderIngredients'
import { STATUS_LABELS } from "../../constants"
import { type TOrderEntity, type IIngredientState } from "../../types"
import styles from './order-card.module.css'


export function OrderCard(order: TOrderEntity) {

    const orderStatusClass = useMemo(() => `_${order.status}`, [order.status])

    const orderStatus = useMemo(() => STATUS_LABELS.get(order.status) || '', [order.status])
    /**
     * @description получить ингредиент по его id
     */
    const getIngredientById = useSelector((state: IIngredientState) => {
        const { items } = state.availableItems
        return (id: string) => items.find(item => item._id === id)
    })
    /**
     * @description суммарная стоимость заказа
     */
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
    /**
     * @description блок с разметкой иконок превью компонентов
     */
    const orderIngredientIcons = useMemo(() => {
        const getIngredientIcon = (id: string) => {
            const ingredient = getIngredientById(id);
            if (!ingredient) return null
            const { image_mobile: url, name } = ingredient
            return <OrderIngredientPreview name={name} url={url} />
        }
        
        const { ingredients } = order
        if (ingredients.length < 6) return ingredients.map(getIngredientIcon)
        const result = ingredients.slice(0, 5).map(getIngredientIcon)
        result.push(<OrderIngredientMore excess={ingredients.length - 5}/>)
        return result.filter(Boolean)
    }, [order.ingredients])
    /**
     * @description дата создания заказа
     */
    const orderCreationDate = useMemo(() => new Date(order.createdAt).toISOString(), [order.createdAt])

    return <div className={styles.wrap}>
        <header className={styles.header}>
            <div className={styles.meta}>
                <span className={`text text_type_digits-default ${styles.number}`}>
                    #{order.number}
                </span>
                <span className={`text text_type_main-small text_color_inactive${styles.datetime}`}>
                    { orderCreationDate }
                </span>
            </div>
            <h4 className={`text text_type_main-medium ${styles.title}`}>
                { order.name }
            </h4>
            <div className={ orderStatusClass }>{ orderStatus }</div>
        </header>
        <div className={ styles.cardMain}>
            <div className={styles.ingredientList}>
                { orderIngredientIcons }
            </div>
            <div className={styles.priceWrap}>
                <CurrencyIcon type="primary" />
                <span>{ totalPrice }</span>
            </div>
        </div>
    </div>
}
