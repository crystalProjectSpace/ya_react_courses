import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd'
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { CHECKOUT_URL, INGREDIENT_TYPE } from '../../constants'
import { ADD_ITEM, SET_BUN } from '../../services/actions';
import { checkoutRequest } from '../../services/reducers/checkout.reducer'
import styles from './burger-constructor.module.css';
import './burger-constructor-global.css';


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

	const { bun, fillings, totalPrice, itemIds } = useSelector(state => {
		const { currentBun, currentItems } = state.currentItems
		const { items } = state.availableItems
		const bun = items.find(item => item._id === currentBun)
		const itemIds = []
		const fillings = []
		let totalPrice = bun?.price || 0
		if (bun) itemIds.push(currentBun)
		currentItems.forEach(({id, qty}) => {
			const item = items.find(item => item._id === id)
			if (!item) return
			fillings.push(item)
			itemIds.push(id)
			totalPrice += qty * item.price
		});

		return {
			bun,
			fillings,
			totalPrice,
			itemIds
		}

	})

	function checkout() {
		dispatch(checkoutRequest({
			path: CHECKOUT_URL,
			ingredients: itemIds,
		}))
	}

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
				onClick={checkout}
			>
				Оформить заказ
			</Button>
		</div>
	</section>)
}
