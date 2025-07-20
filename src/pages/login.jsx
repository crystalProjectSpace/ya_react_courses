import { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { authorize, fetchProfile } from '../utils/auth';

function LoginPage () {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const navigate = useNavigate()

    const isValid = useMemo(() => !!email && !!pass
    , [email, pass])


    async function requestUserLog(){
        if (!isValid) return;
        const payload = {
            email,
            password: pass,
        }
        const response = await authorize(payload)
        if (response.success) navigate('/')
    }

    useEffect(() => {
        const checkAuth = async () => {
            const response = await fetchProfile()
            if (response.success) navigate('/')
        }

        checkAuth();
    }, [navigate])

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
