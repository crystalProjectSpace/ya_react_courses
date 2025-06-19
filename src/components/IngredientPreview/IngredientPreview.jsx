import { IngredientCard } from '../IngredientCard/IngredientCard';
import styles from './ingredient-preview.module.css';

export function IngredientPreview(props) {

	const itemCards = props.items.map(ingredientItem => <IngredientCard
	    key={ingredientItem._id}
		{...ingredientItem}
		onClick={() => props.onIngredientClick(ingredientItem._id)}
	/>);

	return (
		<div className={styles.collection}>
			<h3
				id={`category_${props.ingredientType}`}
				className={styles.collectionHeader}
			>
				{props.ingredientLabel}
			</h3>
			<div class={styles.previews}>
				{itemCards}
			</div>
		</div>
	)
}
