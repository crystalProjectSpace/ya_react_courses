import { useNavigate } from "react-router";
import { AppHeader } from "../../components";
import { ProfileNavMenu } from "../../components/ProfileNavMenu/profile-nav-menu";
import { OrderCard } from "../../components";
import { useSelector } from "react-redux";
import { IIngredientState } from "../../types";

export function Orders() {
    const navigate = useNavigate()

    function goToOrder(number: number) {
        navigate(`/orders/${number}`, { state: { isRoot: true } })
    }

    const orders = useSelector((state: IIngredientState) => state.socketControl.orders)
    
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
    </main>)
}