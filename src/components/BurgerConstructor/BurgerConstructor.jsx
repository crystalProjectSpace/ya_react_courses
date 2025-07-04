import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { INGREDIENT_TYPE } from '../../constants'
import styles from './burger-constructor.module.css';
import './burger-constructor-global.css';
import { useSelector } from 'react-redux';


export function BurgerConstructor() {
	const { bun, fillings, totalPrice } = useSelector(state => {
		const {currentItems} = state.currentItems
		const {items} = state.availableItems
		let bun = null
		const fillings = []
		let totalPrice = 0
		currentItems.forEach(({id, qty}) => {
			const item = items.find(item => item._id === id)
			if (!item) return
			if(item.type === INGREDIENT_TYPE.BUN) {
				bun = item
			} else {
				fillings.push(item)
			}
			totalPrice += qty * item.price
		});

		return {
			bun,
			fillings,
			totalPrice
		}

	})

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
						return (<div className="listItemWrap" key={`${_id}_${i}`}>
							<DragIcon type="primary"/>
							<ConstructorElement								
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
