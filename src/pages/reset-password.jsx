import { useState } from 'react';
import { Link } from 'react-router';
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { changePassword } from '../utils/auth';


function ResetPasswordPage () {
    const [code, setCode] = useState('')
    const [pass, setPass] = useState('')

    async function resetPass() {
        if(!code || !pass) return
        const formData = { token: code, password: pass }
        const response = await changePassword(formData);
        const { success , error } = response
        if (success) console.log( 'pass changed')
        if (error) console.log('pass change failed')
    }
    
    return (<section class="form-wrap">
        <h3 className="form-title">Восстановление пароля</h3>
        <form className="form">
            <div className="form-row">
                <PasswordInput
                    placeholder="Введите свой новый пароль"
                    value={pass}
                    onChange={evt => setPass(evt.target.value)}
                />
            </div>
            <div className="form-row">
                <Input
                    type="text"
                    value={code}
                    placeholder="Введите код из письма"
                    onChange={evt => setCode(evt.target.value)}
                />
            </div>
        </form>
        <div className="form-row">
            <Button
                htmlType="button"
                type="primary"
                onClick={resetPass}
            >
                Сохранить
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

export default ResetPasswordPage;
