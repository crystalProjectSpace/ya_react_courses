import PropTypes from 'prop-types'
import { ComponentPropsCallback } from '../../types'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import card from './ingredient-card.module.css'

export function IngredientCard(props) {
    return (<div className={card.wrap} onClick={props.onClick}>
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
    price: PropTypes.number
}
