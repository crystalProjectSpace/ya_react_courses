import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
    AppHeader,
    Modal,
    ModalOverlay,
    OrderCard,
    OrderFullInfo,
} from "../../components";
import { useAppSelector, useAppDispatch, type TDispatchAction } from "../../services"
import { ProfileNavMenu } from "../../components/ProfileNavMenu/profile-nav-menu";
import { IIngredientState } from "../../types";
import { ORDER_SINGLE_SOCKET_WSS } from "../../constants";
import { WS_ACTION_TYPE } from "../../services/actions";

export function Orders() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch() as TDispatchAction
    const { number } = useParams()

    const activeOrder = useAppSelector((state:IIngredientState) => {
        if(!number) return null
        return state.socketControl.orders.find(o => o.number === parseInt(number)) || null 
    })

    useEffect(() => {
        const accessToken = window.sessionStorage.getItem('access')
        dispatch({ type: WS_ACTION_TYPE.WS_CONNECT, payload: { url: `${ORDER_SINGLE_SOCKET_WSS}?token=${accessToken}` } })
        return () => {
            dispatch({ type: WS_ACTION_TYPE.WS_CLOSE })
        }
    }, [])

    function goToOrder(number: number) {
        navigate(`/profile/orders/${number}`, { state: { isRoot: true } })
    }

    function goToOrderList() {
        navigate('/profile/orders')
    }

    const orders = useAppSelector((state: IIngredientState) => state.socketControl.orders)
    
    return (<main className="profile-wrap">
        <AppHeader />
        <section className="profile-content">
            <aside className="profile-column _sidebar">
                <ProfileNavMenu />
                <div className="profile-column-notice">
                    <span className="text text_type_main-default text_color_inactive">
                        В этом разделе вы можете посмотреть свою историю заказов
                    </span>
                </div>
            </aside>
            <div className="profile-column _list">
                 { orders.map(o => <OrderCard key={o._id} {...o} onClick={goToOrder}/>) }
            </div>
        </section>
        { activeOrder ? <ModalOverlay closeModal={goToOrderList}>
            <Modal closeModal={goToOrderList}>
                <OrderFullInfo {...activeOrder} isModal={ true } />
                    </Modal>
            </ModalOverlay> : null
        }
    </main>)
}