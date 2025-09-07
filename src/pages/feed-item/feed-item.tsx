import { useState } from "react";
import { useParams } from "react-router";
import type { UnknownAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { IIngredientState, TOrderEntity } from "../../types";
import { AppHeader, OrderFullInfo } from "../../components";
import { getData } from "../../utils/data";
import { useEffect } from "react";
import { API_URL, ORDER_BY_NUMBER_URL } from "../../constants";
import { getItems } from "../../services";

export function FeedItem() {
    const { number } = useParams()
    const dispatch = useDispatch()
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
            dispatch(getItems(API_URL) as unknown as UnknownAction)
        }
    }

    useEffect(() => { acquireOrder() }, [])

    return (<div>
        <AppHeader/>
        { activeOrder ? <OrderFullInfo {...(activeOrder as TOrderEntity)} /> : null }
    </div>)
}
