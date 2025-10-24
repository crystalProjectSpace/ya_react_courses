
import { Link } from "react-router-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function ErrorPage () {
    return (<section className="page-wrap _centered _ingredients">
        <div className="page-content _error">
            <Link to="/" state={null} className="_page-icon-close">
                <CloseIcon type="primary" />
            </Link>
            <header className="page-header">
                <h3 className="text text_type_main-medium">Произошла ошибка</h3>
            </header>
            <p className="text text_type_main-default text_color_inactive">
                Запрашиваемая страница не найдена, или же при ее запросе возникли недопустимые ошибки.<br/>Вернитесь на главную страницу и попытайтесь снова
            </p>            
        </div>        
    </section>)
}
