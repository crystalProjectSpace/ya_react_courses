import PropTypes from 'prop-types';

export const IngredientCardProps = PropTypes.shape({
    type: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    _id: PropTypes.string,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
});

export const IngredientListProps = PropTypes.arrayOf(IngredientCardProps)
