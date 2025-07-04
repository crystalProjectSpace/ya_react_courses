import PropTypes from 'prop-types';

export const IngredientCardProps = PropTypes.shape({
    type: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    _id: PropTypes.string,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
});

export const IngredientBreakdown = PropTypes.shape({
    name: PropTypes.string,
    image_large: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number
})

export const IngredientListProps = PropTypes.arrayOf(IngredientCardProps)

export const ComponentPropsCallback = PropTypes.func
