import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { getResetCode } from '../utils/auth'

function ForgotPasswordPage () {
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    async function acquireCode(evt: FormEvent) {
        evt.preventDefault()
        const response = await getResetCode(email)
        if (response.success) navigate('/reset-password')
    }

    return (<section className="form-wrap">
        <h3 className="form-title">Восстановление пароля</h3>
        <form
            className="form"
            onSubmit={acquireCode}
        >
            <div className="form-row">
                <EmailInput
                    value={email}
                    placeholder="Укажите E-mail"
                    onChange={evt => setEmail(evt.target.value)}
                />
            </div>
            <div className="form-buttons">
                <Button
                    htmlType="submit"
                    type="primary"                
                >
                    Восстановить
                </Button>
            </div>
        </form>

        <div className="form-links">
            <span className="form-link-wrap">
                <span className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль?
                </span>
                <Link to="/login">Войти</Link>
            </span>
        </div>
    </section>)
}

export default ForgotPasswordPage;
