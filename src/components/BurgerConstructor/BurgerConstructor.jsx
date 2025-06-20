import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientListProps } from '../../types';
import { INGREDIENT_TYPE } from '../../constants'
import styles from './burger-constructor.module.css';
import './burger-constructor-global.css';


export function BurgerConstructor(props) {
	const bun = props.selection.find(item => item.type === INGREDIENT_TYPE.BUN);
	const fillings = props.selection.filter(item => item.type !== INGREDIENT_TYPE.BUN);
	const totalPrice = props.selection.reduce((total, item) => total + item.price, 0);

	const ingredientsReady = !!bun && fillings.length > 0;

	return (<section className={styles.wrap}>
		{ingredientsReady && <>
			<ConstructorElement
				text={`${bun.name} (Верх)`}
				thumbnail={bun.image_mobile}
				price={bun.price}
				isLocked={true}
				type="top"
			/>
			<div className={styles.list}>
				{
					fillings.map((item, i) => {
						const {name, image_mobile, price, _id } = item;
						return (<div className="listItemWrap">
							<DragIcon type="primary"/>
							<ConstructorElement
								key={`${_id}_${i}`}
								text={name}
								thumbnail={image_mobile}
								price={price}
							/>
						</div>)
					})
				}
			</div>
			<ConstructorElement
				text={`${bun.name}(низ)`}
				thumbnail={bun.image_mobile}
				price={bun.price}
				isLocked={true}
				type="bottom"
			/>
		</>}
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

BurgerConstructor.propTypes = {
	selection: IngredientListProps
}
