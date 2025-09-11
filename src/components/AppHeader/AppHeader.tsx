import { Link } from 'react-router'
import header from './app-header.module.css'
import {
	Button,
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

export function AppHeader() {
	const buttonLinkUrl = `text text_type_main-default ${header.buttonLabel}`

	return (<header className={header.wrap}>
		<div className={header.buttonWrap}>
			<Button htmlType="button" type="secondary" size="medium">
				<Link to="/" className={header.linkContent}>
					<BurgerIcon type="primary"/>
					<span className={buttonLinkUrl}>
						Конструктор
					</span>
				</Link>
			</Button>
			<Button htmlType="button" type="secondary" size="medium" >
				<Link to="/feed" className={header.linkContent}>
					<ListIcon type="secondary"/>
					<span className={buttonLinkUrl}>
						Лента заказов
					</span>
				</Link>
			</Button>
		</div>
		<Logo />
		<div className={header.profileWrap}>
			<Button htmlType="button" type="secondary" size="medium">
				<Link to="/profile" className={header.linkContent}>
					<ProfileIcon type="secondary"/>
					<span className={buttonLinkUrl}>
						Личный кабинет
					</span>
				</Link>
			</Button>
		</div>
	</header>)
}
