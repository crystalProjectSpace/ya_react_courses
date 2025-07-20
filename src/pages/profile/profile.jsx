import { useEffect, useState } from "react";
import {
    Input,
    EmailInput,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router";
import { fetchProfile, logout } from "../../utils/auth";
import style from './profile.module.css';
import { useNavigate } from "react-router";

function ProfilePage () {
    const [user, setUser] = useState({ name: '', email: ''})
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            const response = await fetchProfile()
            if (response.user) setUser(response.user)
        }
        loadUser()
    }, [user])

    async function logoutUser() {
        await logout()
        navigate('/login')
    }

    return (<section className={style.profileWrap}>
        <div className={style.profile}>
            <div className={style.profileRow}>
                <span className={style.profileItem}>Профиль</span>
                <Input
                    type="text"
                    value={user.name}
                    placeholder="Имя"
                    icon="EditIcon"
                />
            </div>
            <div className={style.profileRow}>
                <Link to="/profile/orders">
                    <span className={style.profileItem}>История заказов</span>
                </Link>                
                <EmailInput
                    type="text"
                    value={user.email}
                    icon="EditIcon"
                />
            </div>
            <div className={style.profileRow}>
                <span
                    class={`${style.profileItem} _button`}
                    role="button"
                    onClick={logoutUser}
                >
                    Выход
                </span>
                <PasswordInput
                    type="text"
                    value={password}
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