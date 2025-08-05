import PropTypes, { string } from 'prop-types';

export const IngredientCardProps = PropTypes.shape({
    type: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    _id: PropTypes.string,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
});

export const IngredientListProps = PropTypes.arrayOf(IngredientCardProps)

export type TIngredientType = 'BUN' | 'SAUCE' | 'MAIN'

export type TUser = {
    name: string
    email: string
} | null

export type TSelectionItem = {
    id: string
    itemId: string
}

export type TIngredientItem = {
    _id: string
    name: string
    image: string
    image_large: string
    calories: number
    proteins: number
    fat: number
    carbohydrates: number
    type: TIngredientType
    price: number
}

export interface IIngredientState {
    currentSelection: {
        selectedId: string
    }
    currentItems: {
        currentBun?: string        
        currentItems: Array<TSelectionItem>
    }
    availableItems: {
        items: ReadonlyArray<TIngredientItem>
    }
}
