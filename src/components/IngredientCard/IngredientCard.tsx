import { Link } from 'react-router'
import { useDrag } from 'react-dnd'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { SELECTION } from '../../services/actions'
import { useAppSelector, useAppDispatch, type TDispatchAction } from "../../services"
import { INGREDIENT_TYPE } from '../../constants'
import type { TIngredientItem, IIngredientState } from '../../types'

import card from './ingredient-card.module.css'

export function IngredientCard(props: TIngredientItem) {
    const dispatch = useAppDispatch() as TDispatchAction

    const[, dragRef] = useDrag({
		type: 'ingredient',
        item: {
            id: props._id,
            type: props.type,
        }
	})

    const count = useAppSelector((state: IIngredientState) => {
        return props.type === INGREDIENT_TYPE.BUN
            ? (state.currentItems.currentBun === props._id ? 1 : 0)
            : state.currentItems.currentItems.filter(i => i.itemId === props._id).length
    })
    
    function selectIngredient () {
        dispatch({ type: `currentSelection/${SELECTION.SET}`, payload: { id: props._id } })
    }

    return (<Link
        to={`/ingredients/${props._id}`}
        state={{isRoot: true }}
        className={card.wrap}
        ref={dragRef}        
    >
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
            <span className="text text_type_main-default">
                {props.price}
            </span>
        </span>        
        <span className={`${card.nameLabel} text text_type_main-default text_color_inactive`}>
            {props.name}
        </span>
        {
            count > 0 ? (<span className={card.count}>{ count }</span>) : null
        }
    </Link>)
}
