import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WS_ACTION_TYPE } from "../../services/actions";
import { IIngredientState } from "../../types";
import { AppHeader, OrderCard } from "../../components";
import { getItems } from "../../services";
import style from './feed-list.module.css'
import { API_URL } from "../../constants";
import { UnknownAction } from "redux";
import { useNavigate } from "react-router";

export function FeedList() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        orders,
        totalOrderCount,
        todayOrderCount
    } = useSelector((state: IIngredientState) => state.socketControl)

    const hasLoadedIngredients = useSelector((state: IIngredientState) => state.availableItems.items.length > 0)
    
    useEffect(() => {
        dispatch({ type: WS_ACTION_TYPE.WS_CONNECT })
        if (!hasLoadedIngredients) dispatch(getItems(API_URL) as unknown as UnknownAction)
        return () => {
            dispatch({ type: WS_ACTION_TYPE.WS_CLOSE })
        }
    }, [])

    function goToOrder(orderNumber: number) {
        navigate(`/feed/${orderNumber}`)
    }

    return (
        <main>
            <AppHeader/>            
            <div className={style.container}>
                <h3 className={`${style.header} text text_type_main-large`}>
                    Лента заказов
                </h3>
                <div className={style.wrap}>
                    <section className={style.column}>
                        <div className={`_preview-list ${style.list}`}>
                            { orders.map(o => <OrderCard key={o._id} {...o} onClick={goToOrder}/>) }
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
            </div>
    </main>)
}
