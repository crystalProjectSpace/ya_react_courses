import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd'
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { INGREDIENT_TYPE } from '../../constants'
import styles from './burger-constructor.module.css';
import './burger-constructor-global.css';
import { ADD_ITEM, SET_BUN } from '../../services/actions';


export function BurgerConstructor() {
	const dispatch = useDispatch()

	const [, dropRef] = useDrop({
		accept: 'ingredient',
		drop(item) {
			const { id, type } = item
			const nextAction = type === INGREDIENT_TYPE.BUN ? `currentItems/${SET_BUN}` : `currentItems/${ADD_ITEM}`
			console.log(id, type)
			dispatch({ type: nextAction, id })
		}
	})

	const { bun, fillings, totalPrice } = useSelector(state => {
		const { currentBun, currentItems } = state.currentItems
		const { items } = state.availableItems
		const bun = items.find(item => item._id === currentBun)

		const fillings = []
		let totalPrice = bun?.price || 0
		currentItems.forEach(({id, qty}) => {
			const item = items.find(item => item._id === id)
			if (!item) return
			fillings.push(item)
			totalPrice += qty * item.price
		});

		return {
			bun,
			fillings,
			totalPrice
		}

	})

	const ingredientsReady = !!bun && fillings.length > 0;

	return (<section className={styles.wrap} ref={dropRef}>
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
