import { useEffect } from "react";
import { useAppSelector, useAppDispatch, type TDispatchAction } from "../services"
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { SELECTION } from "../services/actions";
import { IngredientDetails } from "../components/IngredientDetails/IngredientDetails";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredientState } from "../types";

export function IngredientSinglePage () {
    const { id: ingredientId } = useParams()
    const dispatch = useAppDispatch() as TDispatchAction
    const activeIngredientId = useAppSelector((state: IIngredientState) => state.currentSelection.selectedId)

    useEffect(()=> {
        if (!activeIngredientId) dispatch({ type: `currentSelection/${SELECTION.SET}`, payload: { id: ingredientId } })
    }, []);

    return (<section className="page-wrap _centered _ingredients">
        <div className="page-content">
            <Link to="/" state={null} className="_page-icon-close">
                <CloseIcon type="primary" />
            </Link>
            <IngredientDetails />
        </div>        
    </section>)
}
