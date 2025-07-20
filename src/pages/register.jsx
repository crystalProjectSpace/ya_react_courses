import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
    Input,
    EmailInput,
    PasswordInput,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { register } from "../utils/auth";

function RegisterPage () {
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')

    const isValid = useMemo(() => !!email && !!login && !!pass
    , [email, login, pass])

    function requestUserReg() {

        if (!isValid) return;
        const payload = {
            email,
            password: pass,
            name: login
        }
        register(payload)
    }

    return (<section className="form-wrap">
        <h3 className="form-title">Регистрация </h3>
        <form className="form">
            <div className="form-row">
                <Input
                    type="text"
                    value={login}
                    placeholder="Имя"
                    onChange={evt => setLogin(evt.target.value)}
                />
            </div>
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
                onClick={requestUserReg}
            >
                Зарегистрироваться
            </Button>
        </div>
        <div className="form-links">
            <span className="form-link-wrap">
                <span className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы?
                </span>
                <Link to="/login" className="form-link">Войти</Link>
            </span>
        </div>
    </section>)
}

export default RegisterPage;
