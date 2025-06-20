import PropTypes from 'prop-types';

export const IngredientCardProps = PropTypes.shape({
    type: String,
    price: Number,
    name: String,
    _id: String,
    image: String,
    image_mobile: String,
});

export const IngredientListProps = PropTypes.arrayOf(IngredientCardProps);

export const ComponentPropsCallback = PropTypes.func