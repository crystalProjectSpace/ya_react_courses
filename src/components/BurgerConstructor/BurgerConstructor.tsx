import { useDrop } from 'react-dnd'
import { useNavigate } from 'react-router';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ActiveIngredientWrap } from '../index';
import { useAppSelector, useAppDispatch, type TDispatchAction } from "../../services"
import { CHECKOUT_URL, INGREDIENT_TYPE } from '../../constants'
import { CURRENT_ITEMS } from '../../services/actions';
import { checkoutRequest } from '../../services/reducers/checkout.reducer'
import { getProvisionalId } from '../../utils/data';
import { useAuthContext } from '../../services/use-auth';

import styles from './burger-constructor.module.css';
import './burger-constructor-global.css';
import { IIngredientState, TIngredientItem, TAuthContext } from '../../types';

type TExpandedIngredient = TIngredientItem & { provisionalId: string }

export function BurgerConstructor() {
	const dispatch = useAppDispatch() as TDispatchAction
	const navigate = useNavigate()
	const { signed } = useAuthContext() as TAuthContext

	const [, dropRef] = useDrop({
		accept: 'ingredient',
		drop(item: { id: string, type: INGREDIENT_TYPE}) {
			const { id, type } = item
			if (type === INGREDIENT_TYPE.BUN) {
				dispatch({ type: `currentItems/${CURRENT_ITEMS.SET_BUN}`, payload: { id } })
			} else {
				const provisionalId = getProvisionalId()
				dispatch({ type: `currentItems/${CURRENT_ITEMS.ADD}`, payload: { id, provisionalId } })
			}
		}
	})

	const { bun, fillings, totalPrice, itemIds } = useAppSelector((state: IIngredientState) => {
		const { currentBun, currentItems } = state.currentItems
		const { items } = state.availableItems
		const bun = items.find(item => item._id === currentBun)
		const itemIds: Array<string> = []
		const fillings: Array<TExpandedIngredient> = []
		let totalPrice = bun?.price || 0
		if (bun) itemIds.push(currentBun as string)
		currentItems.forEach(({ itemId, id: provisionalId }) => {
			const item = items.find(item => item._id === itemId)
			if (!item) return
			fillings.push({...item, provisionalId })
			itemIds.push(itemId)
			totalPrice += item.price
		});

		return {
			bun,
			fillings,
			totalPrice,
			itemIds
		}
	})

	function checkout() {
		signed
			? dispatch((checkoutRequest({ path: CHECKOUT_URL, ingredients: itemIds }) as any))
			: navigate('/login')
	}

	function deleteIngredient(id: string){
		dispatch({ type: `currentItems/${CURRENT_ITEMS.REMOVE}`, payload: { id } })
	}

	function detectMU(evt: unknown) {
		console.log('mouse-up detected', (evt as MouseEvent).clientX, (evt as MouseEvent).clientY)
	}

	const ingredientsReady = bun || fillings.length > 0;

	return (<section className={styles.wrap} ref={dropRef} onMouseUp={detectMU}>
		{ingredientsReady && <>
			{
				!!bun ? <ConstructorElement
					text={`${bun.name} (Верх)`}
					thumbnail={bun.image_mobile}
					price={bun.price}
					isLocked={true}
					type="top"
				/> : null
			}
			<div className={styles.list}>
				{
					fillings.map((item, i) => {
						const {name, image_mobile, price, provisionalId } = item;
						return (<ActiveIngredientWrap index={i} key={provisionalId}>
							<ConstructorElement								
								text={name}
								thumbnail={image_mobile}
								price={price}
								handleClose={() => { deleteIngredient(provisionalId)}}
							/>
						</ActiveIngredientWrap>)
					})
				}
			</div>
			{
				!!bun ? <ConstructorElement
					text={`${bun.name}(низ)`}
					thumbnail={bun.image_mobile}
					price={bun.price}
					isLocked={true}
					type="bottom"
				/> : null
			}
		</>}
		<div className={styles.listOptions}>
			<span className={styles.priceTotal}>
				<CurrencyIcon type="primary" />
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
