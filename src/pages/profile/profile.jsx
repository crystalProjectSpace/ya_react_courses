import { useState } from "react";
import {
    Input,
    EmailInput,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router";
import { useAuthContext } from "../../services/use-auth";
import style from './profile.module.css';
import { useNavigate } from "react-router";

function ProfilePage () {
    const { user, signOut } = useAuthContext()
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    async function logoutUser() {
        await signOut()
        navigate('/login')
    }

    return (<section className={style.profileWrap}>
        <div className={style.profile}>
            <div className={style.profileRow}>
                <span className={style.profileItem}>Профиль</span>
                <Input
                    type="text"
                    defaultValue={user?.name}
                    placeholder="Имя"
                    icon="EditIcon"
                />
            </div>
            <div className={style.profileRow}>
                <Link
                    to="/profile/orders"
                    className={style.profileItem}
                >
                    <span >История заказов</span>
                </Link>                
                <EmailInput
                    type="text"
                    defaultValue={user?.email}
                    icon="EditIcon"
                />
            </div>
            <div className={style.profileRow}>
                <span
                    className={`${style.profileItem} _button`}
                    role="button"
                    onClick={logoutUser}
                >
                    Выход
                </span>
                <PasswordInput
                    type="text"
                    defaultValue={password}
                    onChange={setPassword}
                />
            </div>
            <div className={style.profileAttention}>
                <span className="text text_type_main-small text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </span>
            </div>
        </div>
    </section>)
}

export default ProfilePage;