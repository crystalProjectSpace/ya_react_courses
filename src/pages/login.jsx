import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser } from '../services/reducers/auth.reducer';

function LoginPage () {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const dispatch = useDispatch()

    const isValid = useMemo(() => !!email && !pass
    , [email, pass])

    function requestUserLog(){
        if(!isValid) return;
        const payload = {
            email,
            password: pass,
        }
        dispatch(loginUser(payload))
    }

    return (<section class="page-wrap">
        <h3 className="">Вход</h3>
        <form className="">
            <div className="">
                <Input
                    type="email"
                    placeholder="E-mail"
                    onChange={setEmail}
                />
            </div>
            <div className="">
                <Input
                    type="password"
                    placeholder="Пароль"
                    onChange={setPass}
                />
            </div>
            <div className="">
                <Button
                    htmlType="button"
                    type="primary"
                    onClick={requestUserLog}
                >
                    Войти
                </Button>
            </div>
            <div className="">
                <span>Вы - новый пользователь?</span>
                <Link to="./register">Зарегистрироваться</Link>
            </div>
            <div className="">
                <span>Забыли пароль?</span>
                <Link to="./restore">Войти</Link>
            </div>
        </form>
    </section>)
}

export default LoginPage;
