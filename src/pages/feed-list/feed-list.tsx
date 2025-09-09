import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { WS_ACTION_TYPE } from "../../services/actions"
import { IIngredientState } from "../../types"
import {
    AppHeader,
    ModalOverlay,
    Modal,
    OrderCard,
    OrderFullInfo,
} from "../../components"
import style from './feed-list.module.css'
import { ORDERS_SOCKET_WSS } from "../../constants"

export function FeedList() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { number } = useParams()

    const {
        orders,
        totalOrderCount,
        todayOrderCount
    } = useSelector((state: IIngredientState) => state.socketControl)

    const activeOrder = useSelector((state:IIngredientState) => {
        if(!number) return null
        return state.socketControl.orders.find(o => o.number === parseInt(number)) || null 
    })
    
    useEffect(() => {
        dispatch({ type: WS_ACTION_TYPE.WS_CONNECT, payload: { url: ORDERS_SOCKET_WSS } })
        return () => {
            dispatch({ type: WS_ACTION_TYPE.WS_CLOSE })
        }
    }, [])

    function goToOrder(orderNumber: number) {
        navigate(`/feed/${orderNumber}`, { state: { isRoot: true }})
    }

    function goToOrderList() {
        navigate('/feed')
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
            { activeOrder ? <ModalOverlay closeModal={goToOrderList}>
                <Modal closeModal={goToOrderList}>
                    <OrderFullInfo {...activeOrder} isModal={ true } />
                </Modal>
            </ModalOverlay> : null
            }
    </main>)
}
