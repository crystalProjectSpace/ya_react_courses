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
	return (<header className={header.wrap}>
		<div className={header.buttonWrap}>
			<Button htmlType="button" type="secondary" size="medium">
				<BurgerIcon type="primary"/>
				<span className={header.buttonLabel}>Конструктор</span>
			</Button>
			<Button htmlType="button" type="secondary" size="medium" >
				<Link to="/feed">
					<ListIcon type="secondary"/>
					<span className={header.buttonLabel}>Лента заказов</span>
				</Link>
			</Button>
		</div>
		<Logo />
		<div className={header.profileWrap}>
			<Button htmlType="button" type="secondary" size="medium">
				<Link to="/profile">
					<ProfileIcon type="secondary"/>
					<span className={header.buttonLabel}>Личный кабинет</span>
				</Link>
			</Button>
		</div>
	</header>)
}
