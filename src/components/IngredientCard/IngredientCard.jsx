import PropTypes from 'prop-types'
import { ComponentPropsCallback } from '../../types'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import card from './ingredient-card.module.css'
import { useDispatch } from 'react-redux'
import { SET_SELECTION } from '../../services/actions'
export function IngredientCard(props) {
    const dispatch = useDispatch()

    
    function selectIngredient () {
        dispatch({ type: `currentSelection/${SET_SELECTION}`, id: props._id })
    }

    return (<div className={card.wrap} onClick={selectIngredient}>
        <figure className={card.figure}>
            <img
                className={card.figureImage}
                src={props.image}
                alt={props.name}
            />
        </figure>
        <span className={card.priceLabel}>
            <CurrencyIcon type="primary" />
            <span>{props.price}</span>
        </span>
        <span className={card.nameLabel}>
            {props.name}
        </span>
    </div>)
}

IngredientCard.propTypes = {
    onClick: ComponentPropsCallback,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    _id: PropTypes.string
}
