import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WS_ACTION_TYPE } from "../services/actions";
import { IIngredientState } from "../types";
import { OrderCard } from "../components";

export function FeedList() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: WS_ACTION_TYPE.WS_CONNECT })
        return () => {
            dispatch({ type: WS_ACTION_TYPE.WS_CLOSE })
        }
    }, [])

    const {
        orders,
        totalOrderCount,
        todayOrderCount
    } = useSelector((state: IIngredientState) => state.socketControl)

    return (<main className="feedlist-wrap">
        <section className="feedlist">
            { orders.map(o => <OrderCard key={o._id} {...o} />) }
        </section>
        <section className="feedlist-stats">
            <div className="feedlist-stats-item">

            </div>
            <div className="feedlist-stats-item">
                <span className="feedlist-stats-counter">
                    <span className="">Выполнено за все время</span>
                    <span className="">{ totalOrderCount }</span>
                </span>
                <span className="feedlist-stats-counter">
                    <span className="">Выполнено за сегодня</span>
                    <span className="">{ todayOrderCount }</span>
                </span>
            </div>
        </section>
    </main>)
}
