import { OrderIngredientPreview } from "./OrderIngredientPreview";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function OrderIngredientSummary(props: { name: string, url: string, count: number, price: number }) {
    const { name, url, count, price } = props
    
    return <div className="summary-wrap">
        <span className="summary-item">
            <OrderIngredientPreview url={url} name={name}/>
            <span className="text text_type_main-default">
                { name }
            </span>
        </span>
        <span className="summary-item">
            <span className="text text_type_digits-default">
                { price }&nbsp;x&nbsp;{ count }
            </span>
            <CurrencyIcon type="primary" />
        </span>
    </div>
}
