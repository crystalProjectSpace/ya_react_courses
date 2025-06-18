import {
	Button,
	ConstructorElement,
	CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { INGREDIENT_TYPE } from '../../constants'
import styles from './burger-constructor.module.css';

export function BurgerConstructor(props) {
	const bun = props.selection.find(item => item.type === INGREDIENT_TYPE.BUN);
	const fillings = props.selection.filter(item => item.type !== INGREDIENT_TYPE.BUN);
	const totalPrice = props.selection.reduce((total, item) => total + item.price, 0);

	const ingredientsReady = !!bun && fillings.length > 0;

	return (<section className={styles.wrap}>
		{ingredientsReady && <div className={styles.list}>
			<ConstructorElement
				text={bun.name}
				thumbnail={bun.image_mobile}
				price={bun.price}
				type="top"
			/>
			{
				fillings.map(item => {
					const {name, image_mobile, price, _id } = item;
					return <ConstructorElement
						key={_id}
						text={name}
						thumbnail={image_mobile}
						price={price}
					/>
				})
			}
			<ConstructorElement
				text={bun.name}
				thumbnail={bun.image_mobile}
				price={bun.price}
				type="bottom"
			/>
		</div>}
		<div className={styles.listOptions}>
			<span className={styles.priceTotal}>
				<CurrencyIcon />
				<span>{totalPrice}</span>
			</span>
			<Button
				htmlType="submit"
				type="primary"
			>
				Оформить заказ
			</Button>
		</div>
	</section>)
}