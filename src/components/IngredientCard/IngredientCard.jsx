import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useDrag } from 'react-dnd'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import card from './ingredient-card.module.css'

import { SET_SELECTION } from '../../services/actions'
import { INGREDIENT_TYPE } from '../../constants'
export function IngredientCard(props) {
    const dispatch = useDispatch()

    const[, dragRef] = useDrag({
		type: 'ingredient',
        item: {
            id: props._id,
            type: props.type,
        }
	})

    const count = useSelector(state => {
        return props.type === INGREDIENT_TYPE.BUN
            ? (state.currentItems.currentBun === props._id ? 1 : 0)
            : state.currentItems.currentItems.filter(i => i.itemId === props._id).length
    })
    
    function selectIngredient () {
        dispatch({ type: `currentSelection/${SET_SELECTION}`, id: props._id })
    }

    return (<div className={card.wrap} ref={dragRef}>
        <figure className={card.figure}>
            <img
                className={card.figureImage}
                src={props.image}
                alt={props.name}
                onClick={selectIngredient}
            />
        </figure>
        <span className={card.priceLabel}>
            <CurrencyIcon type="primary" />
            <span>{props.price}</span>
        </span>
        <span className={card.nameLabel}>
            {props.name}
        </span>
        {
            count > 0 ? (<span className={card.count}>{ count }</span>) : null
        }
    </div>)
}

IngredientCard.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    _id: PropTypes.string,
    type: PropTypes.string
}
