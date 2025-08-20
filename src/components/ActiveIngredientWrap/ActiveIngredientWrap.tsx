import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { SWAP_ITEMS } from '../../services/actions';
import ingredientWrap from './active-ingredient-wrap.module.css';
import { ReactNode } from 'react';

interface IActiveIngredientProps {
    children: ReactNode | Array<ReactNode>
    index: number
}

export function ActiveIngredientWrap(props: IActiveIngredientProps) {
    const dispatch = useDispatch()

    const [, dragRef] = useDrag({
		type: 'active-ingredient',
		item: { index: props.index }
	})

    const [, dropIngredientRef] = useDrop({
		accept: 'active-ingredient',
		drop(item: { index: number}) {
			const { index: indexNew } = item
			dispatch({ type:`currentItems/${SWAP_ITEMS}`, indexNew, indexOld: props.index })
		}
	})

    return (<div className={ingredientWrap.listItem} ref={dropIngredientRef}>
        <span className={ingredientWrap.listItemHandle} ref={dragRef}>
            <DragIcon type="primary"/>
        </span>        
        { props.children}
    </div>)
}
