import {useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientCard } from '../IngredientCard/IngredientCard';
import { INGREDIENT_TYPE, MENU_TYPES } from '../../constants';
import styles from './burger-ingredients.module.css'

export function BurgerIngredients(props) {
	const [currentTab, setCurrentTab] = useState(MENU_TYPES[0].val);

	const ingredients = props.data.reduce((res, item) => {
		const { type } = item
		res[type].push(item)
		return res
	}, {
		[INGREDIENT_TYPE.BUN]: [],
		[INGREDIENT_TYPE.SAUCE]: [],
		[INGREDIENT_TYPE.MAIN]: [],
	});

	const menuTabs = MENU_TYPES.map(({ val, label }) => {
		return (<li
			className={styles.menuItem}
			key={val}
		>
			<Tab
				value={val}
				active={val === currentTab}
				onClick={() => setCurrentTab(val)}
			>
				<span>{label}</span>
			</Tab>
		</li>)	
	});

	const aciveIngredients = (ingredients[currentTab] || [])
		.map(ingredientItem => <IngredientCard
			key={ingredientItem._id}
			{...ingredientItem}
			onClick={() => props.displayActiveIngredient(ingredientItem._id)}
		/>);

	return (<section className={styles.wrap}>
		<menu className={styles.menu}>
			{menuTabs}
		</menu>
		<div className={styles.grid}>
			{ aciveIngredients }
		</div>
	</section>)
}