import {useState } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientPreview } from '../IngredientPreview/IngredientPreview';
import { INGREDIENT_TYPE, MENU_TYPES } from '../../constants';
import styles from './burger-ingredients.module.css'
import './burger-ingredients-global.css'; // ближайший аналог не-scoped стилей из vue, не sfc, но лучшего способа пока не видно

export function BurgerIngredients() {
	const [currentTab, setCurrentTab] = useState(MENU_TYPES[0].val);
	const ingredients = useSelector(state => {
		const {items} = state.availableItems;

		return Object.entries(items.reduce((res, item) => {
			const { type } = item
			res[type].push(item)
			return res
		}, {
			[INGREDIENT_TYPE.BUN]: [],
			[INGREDIENT_TYPE.SAUCE]: [],
			[INGREDIENT_TYPE.MAIN]: [],
		}))
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
				<a
					className="tabAnchor"
					href={`#category_${val}`}
				>
					{label}
				</a>
			</Tab>
		</li>)	
	});

	const ingredientsMap = ingredients.map(category => {
		const [key, items] = category;
		const ingredientLabel = MENU_TYPES.find(mType => mType.val === key)?.label;

		return <IngredientPreview
			key={key}
			ingredientType={key}
			ingredientLabel={ingredientLabel}
			items={items}
		/>
	})

	return (<section className={styles.wrap}>
		<menu className={styles.menu}>
			{menuTabs}
		</menu>
		<div className={styles.grid}>
			{ ingredientsMap }
		</div>
	</section>)
}
