import { useMemo, useState } from "react";
import { Link } from "react-router";
import { useDispatch/*, useSelector*/ } from "react-redux";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { registerUser } from '../services/reducers/auth.reducer'


function RegisterPage () {
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    //const userLogin = useSelector(state => state.authorization.user.name)

    const dispatch = useDispatch()

    const isValid = useMemo(() => !!email && !!login && !pass
    , [email, login, pass])

    function requestUserReg() {
        if (!isValid) return;
        const payload = {
            email,
            password: pass,
            name: login
        }
        dispatch(registerUser(payload))
    }

    return (<section className="">
        <h3 className="">Регистрация </h3>
        <form className="">
            <div className="">
                <Input
                    type="text"
                    placeholder="Имя"
                    onChange={setLogin}
                />
            </div>
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
                    onClick={requestUserReg}
                >
                    Зарегистрироваться
                </Button>
            </div>
            <div className="">
                <span>Уже зарегистрированы?</span>
                <Link to="./login">Войти</Link>
            </div>
        </form>
    </section>)
}

export default RegisterPage;
