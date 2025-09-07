import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { OrderIngredientSummary } from '../OrderIngredients'
import { STATUS_LABELS } from "../../constants"
import { type TOrderEntity, type IIngredientState } from "../../types"
import styles from './order-full-info.module.css'

type TIngredientInfo = {
    name: string
    url: string
    count: number
    price: number
}

export function OrderFullInfo(order: TOrderEntity & { isModal?: boolean} ) {

    const orderStatusClass = useMemo(() => `_${order.status}`, [order.status])

    const orderStatus = useMemo(() => STATUS_LABELS.get(order.status), [order.status])

    const getIngredientById = useSelector((state: IIngredientState) => {
        const { items } = state.availableItems
        return (id: string) => items.find(item => item._id === id)
    })

    const ingredientData = useMemo(() => {
        const ingredientCount = order.ingredients.length
        const result: Record<string, TIngredientInfo> = {}
        for (let i = 0; i < ingredientCount; i++) {
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
        return ingredientList.map((item, i) => <OrderIngredientSummary key={`${item.name}_${i}`} {...item}/>)
    }, [order.ingredients])

    const orderCreationDate = useMemo(() => new Date(order.createdAt).toISOString(), [order.createdAt])

    return <div className={`${styles.wrap} ${order.isModal ? styles.wrapModal : ''}`}>
        <header className={styles.header}>
            <h4 className={`text text_type_digits-medium ${styles.number}`}>
                #{order.number}
            </h4>
            <h4>
                <span className="text text_type_main-medium">{ order.name }</span>
                <div className={ orderStatusClass }>{ orderStatus }</div>
            </h4>
        </header>
        <div className={ styles.cardBodyWrap}>
            <div className={`text text_type_main-medium ${styles.title}`}>Состав:</div>
            <div className={styles.orderContent}>
                { orderIngredientsList }
            </div>
            <div className={styles.cardFooter}>
                <span className={`text text_type_main-small text_color_inactive ${styles.datetime}`}>
                    { orderCreationDate }
                </span>
                <span className="summary-item">
                    <span className="text text_type_digits-default">{ totalPrice }</span>
                    <CurrencyIcon type="primary" />
                </span>
            </div>
        </div>
    </div>
}
