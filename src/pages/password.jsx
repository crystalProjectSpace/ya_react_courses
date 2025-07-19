import { useState } from 'react';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { restoreUser  } from '../services/reducers/auth.reducer';

function PasswordPage () {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch();

    function requestUserRestore(){
        if(!email) return;
        dispatch(restoreUser(email))
    }

    return (<section class="form-wrap">
        <h3 className="form-title">Восстановление пароля</h3>
        <form className="form">
            <div className="form-row">
                <Input
                    type="email"
                    placeholder="Укажите E-mail"
                    onChange={evt => setEmail(evt.target.value)}
                />
            </div>
        </form>
        <div className="form-row">
            <Button
                htmlType="button"
                type="primary"
                onClick={requestUserRestore}
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
