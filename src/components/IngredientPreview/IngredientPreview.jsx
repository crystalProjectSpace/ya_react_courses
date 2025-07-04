import PropTypes from 'prop-types';
import { IngredientListProps } from '../../types';
import { IngredientCard } from '../IngredientCard/IngredientCard';
import styles from './ingredient-preview.module.css';

export function IngredientPreview(props) {

	const itemCards = props.items.map((ingredientItem, i) => <IngredientCard
	    key={ingredientItem._id}
		{...ingredientItem}
	/>);

	return (
		<div className={styles.collection}>
			<h3
				id={`category_${props.ingredientType}`}
				className={styles.collectionHeader}
			>
				{props.ingredientLabel}
			</h3>
			<div className={styles.previews}>
				{itemCards}
			</div>
		</div>
	)
}

IngredientPreview.propTypes = {
	ingredientType: PropTypes.string,
	ingredientLabel: PropTypes.string,
	items: IngredientListProps,
}
