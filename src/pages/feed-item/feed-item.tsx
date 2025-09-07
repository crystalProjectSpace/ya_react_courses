import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { IIngredientState } from "../../types";
import { AppHeader, OrderFullInfo } from "../../components";

export function FeedItem() {
    const { number } = useParams()
    const order = useSelector((state: IIngredientState) => {
        const orderNumber = parseInt(number || '')
        return (!orderNumber || isNaN(orderNumber))
            ? null :state.socketControl.orders.find(o => o.number === orderNumber)
    })

    return (<div>
        <AppHeader/>
        { order? <OrderFullInfo {...order} /> : null }
    </div>)
}
