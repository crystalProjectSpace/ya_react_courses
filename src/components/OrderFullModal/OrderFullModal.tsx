import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { OrderIngredientSummary } from '../OrderIngredients'
import { STATUS_LABELS } from "../../constants"
import { type TOrderEntity, type IIngredientState } from "../../types"
import styles from './order-card.module.css'

type TIngredientInfo = {
    name: string
    url: string
    count: number
    price: number
}

export function OrderCard(order: TOrderEntity) {

    const orderStatusClass = useMemo(() => `_${order.status}`, [order.status])

    const orderStatus = useMemo(() => STATUS_LABELS.get(order.status), [order.status])

    const getIngredientById = useSelector((state: IIngredientState) => {
        const { items } = state.availableItems
        return (id: string) => items.find(item => item._id === id)
    })

    const ingredientData = useMemo(() => {
        const ingredientCount = order.ingredients.length
        const result: Record<string, TIngredientInfo> = {}
        for(let i = 0; i < ingredientCount; i++) {
            const id = order.ingredients[i]
            if (result[id]) {
                result[id].count += 1
            } else {
                const ingredient = getIngredientById(id)
                if (!ingredient) continue;
                result[id] = {
                    name: ingredient.name,
                    url: ingredient.image_mobile,
                    count: 1,
                    price: ingredient.price,
                }
            }
        }
        return result
    }, [order.ingredients])

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

    const orderIngredientsList = useMemo(() => {
        const ingredientList = Object.values(ingredientData)
        return ingredientList.map(item => <OrderIngredientSummary {...item}/>)
    }, [order.ingredients])

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
        <div className={ styles.cardFooter}>
            <div className={styles.orderDatetime}>
                { orderIngredientsList }
            </div>
            <div className={styles.priceWrap}>
                <span>{ totalPrice }</span>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    </div>
}
