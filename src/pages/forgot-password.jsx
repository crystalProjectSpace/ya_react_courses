import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { fetchProfile } from '../utils/auth';

function PasswordPage () {
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const response = await fetchProfile()
            if (response.success) navigate('/')
        }

        checkAuth();
    }, [navigate])

    async function acquireCode() {

    }

    return (<section class="form-wrap">
        <h3 className="form-title">Восстановление пароля</h3>
        <form className="form">
            <div className="form-row">
                <Input
                    type="email"
                    value={email}
                    placeholder="Укажите E-mail"
                    onChange={evt => setEmail(evt.target.value)}
                />
            </div>
        </form>
        <div className="form-row">
            <Button
                htmlType="button"
                type="primary"
                onClick={acquireCode}
            >
                Восстановить
            </Button>
        </div>
        <div className="form-links">
            <span className="form-link-wrap">
                <span className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль?
                </span>
                <Link to="./login">Войти</Link>
            </span>
        </div>
    </section>)
}

export default PasswordPage;
