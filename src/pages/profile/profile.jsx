import { useEffect, useState } from "react";
import {
    Input,
    EmailInput,
    PasswordInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { fetchProfile, logout } from "../../utils/auth";
import style from './profile.module.css';

function ProfilePage () {
    const [user, setUser] = useState({ name: '', email: ''})
    const [password, setPassword] = useState('')

    useEffect(() => {
        const loadUser = async () => {
            const response = await fetchProfile()
            if (response.user) setUser(response.user)
        }
        loadUser()
    }, [user])

    return (<section className={style.profileWrap}>
        <div className={style.profileRow}>
            <span className="">Профиль</span>
            <Input type="text" value={user.name} />
        </div>
        <div className={style.profileRow}>
            <span className="">История заказов</span>
            <EmailInput type="text" value={user.email} />
        </div>
        <div className={style.profileRow}>
            <Button
                htmlType="button"
                type="secondary"
                size="medium"
                onClick={logout}
            >
                Выход
            </Button>
            <PasswordInput type="text" value={password} />
        </div>
        <div className={style.profileAttention}>
            <span className="">
                В этом разделе вы можете изменить свои персональные данные
            </span>
        </div>
    </section>)
}

export default ProfilePage;