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

    return (<section class="page-wrap">
        <h3 className="">Восстановление пароля</h3>
        <form className="">
            <div className="">
                <Input
                    type="email"
                    placeholder="Укажите E-mail"
                    onChange={setEmail}
                />
            </div>
            <div className="">
                <Button
                    htmlType="button"
                    type="primary"
                    onClick={requestUserRestore}
                >
                    Восстановить
                </Button>
            </div>
            <div className="">
                <span>Вспомнили пароль?</span>
                <Link to="./login">Войти</Link>
            </div>
        </form>
    </section>)
}

export default PasswordPage;