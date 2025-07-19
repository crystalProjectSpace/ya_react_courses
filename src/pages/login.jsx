import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser } from '../services/reducers/auth.reducer';

function LoginPage () {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const dispatch = useDispatch()

    const isValid = useMemo(() => !!email && !!pass
    , [email, pass])

    function requestUserLog(){
        if(!isValid) return;
        const payload = {
            email,
            password: pass,
        }
        dispatch(loginUser(payload))
    }

    return (<section className="form-wrap">
        <h3 className="form-title">Вход</h3>
        <form className="form">
            <div className="form-row">
                <EmailInput
                    value={email}
                    placeholder="E-mail"
                    onChange={evt => setEmail(evt.target.value)}
                />
            </div>
            <div className="form-row">
                <PasswordInput
                    value={pass}
                    placeholder="Пароль"
                    onChange={evt => setPass(evt.target.value)}
                />
            </div>
        </form>
        <div className="form-buttons">
            <Button
                htmlType="button"
                type="primary"
                onClick={requestUserLog}
            >
                Войти
            </Button>
        </div>
        <div className="form-links">
            <span className="form-link-wrap">
                <span className="text text_type_main-default text_color_inactive">
                    Вы - новый пользователь?
                </span>
                <Link to="./register">Зарегистрироваться</Link>
            </span>
            <span className="form-link-wrap">
                <span className="text text_type_main-default text_color_inactive">
                    Забыли пароль?
                </span>
                <Link to="./restore">Войти</Link>
            </span>
        </div>
    </section>)
}

export default LoginPage;
