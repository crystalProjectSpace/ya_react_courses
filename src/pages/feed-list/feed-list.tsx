import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WS_ACTION_TYPE } from "../../services/actions";
import { IIngredientState } from "../../types";
import { AppHeader, OrderCard } from "../../components";
import style from './feed-list.module.css'

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

    return (
        <main>
            <AppHeader/>
            <div className={style.wrap}>
            <section className={style.column}>
                <div className={`_preview-list ${style.list}`}>
                    { orders.map(o => <OrderCard key={o._id} {...o} />) }
                </div>
            </section>
            <section className={style.column}>
                <div className={style.statItem}>

                </div>
                <div className={style.statItem}>
                    <span className={style.counter}>
                        <span className="text text_type_main-medium">Выполнено за все время:</span>
                        <span className="text text_type_digits-large _text-shadow-blue">
                            { totalOrderCount }
                        </span>
                    </span>
                    <span className={style.counter}>
                        <span className="text text_type_main-medium">Выполнено за сегодня:</span>
                        <span className="text text_type_digits-large _text-shadow-blue">
                            { todayOrderCount }
                        </span>
                    </span>
                </div>
            </section>
        </div>    
    </main>)
}
