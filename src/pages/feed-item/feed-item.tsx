import { useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { IIngredientState, TOrderEntity } from "../../types";
import { AppHeader, OrderFullInfo } from "../../components";
import { getData } from "../../utils/data";
import { useEffect } from "react";
import { ORDER_BY_NUMBER_URL } from "../../constants";

export function FeedItem() {
    const { number } = useParams()
    const [activeOrder, setActiveOrder] = useState<TOrderEntity | null>(null)

    const order = useSelector((state: IIngredientState) => {
        const orderNumber = parseInt(number || '')
        return (!orderNumber || isNaN(orderNumber))
            ? null :state.socketControl.orders.find(o => o.number === orderNumber)
    })

    async function acquireOrder() {
        if (!number) return
        if (order) {
            setActiveOrder(order)
        } else {
            const orderUrl = ORDER_BY_NUMBER_URL.replace('%number%', number)
            const response = await getData(orderUrl, 'orders')
            const { data } = response
            if (data?.length) setActiveOrder({ ...(data[0]) })
        }
    }

    useEffect(() => { acquireOrder() }, [])

    return (<div>
        <AppHeader/>
        { activeOrder ? <OrderFullInfo {...(activeOrder as TOrderEntity)} /> : null }
    </div>)
}
