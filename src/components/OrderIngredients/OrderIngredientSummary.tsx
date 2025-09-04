import { useMemo } from "react";
import { OrderIngredientPreview } from "./OrderIngredientPreview";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function OrderIngredientSummary(props: { name: string, url: string, count: number, price: number }) {
    const { name, url, count, price } = props

    const totalPrice = useMemo(() => `${price} * ${count}`, [price, count])
    
    return <div className="summary-wrap">
        <span>
            <OrderIngredientPreview url={url} name={name}/>
            <span className="text text_type_main-small">
                { name }
            </span>
        </span>
        <span className="summary-price-wrap">
            <span className="text text_type_digits-default">
                { totalPrice }
            </span>
            <CurrencyIcon type="primary" />
        </span>
    </div>
}
