import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CURRENT_ITEMS } from '../../services/actions';
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
            const payload = {indexNew, indexOld: props.index}
			dispatch({ type:`currentItems/${CURRENT_ITEMS.SWAP}`, payload })
		}
	})

    return (<div className={ingredientWrap.listItem} ref={dropIngredientRef}>
        <span className={ingredientWrap.listItemHandle} ref={dragRef}>
            <DragIcon type="primary"/>
        </span>        
        { props.children}
    </div>)
}
