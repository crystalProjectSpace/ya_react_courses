import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router";
import { SELECTION } from "../services/actions";
import { IngredientDetails } from "../components/IngredientDetails/IngredientDetails";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function IngredientSinglePage () {
    const { id: ingredientId } = useParams();
    const dispatch = useDispatch();
    const activeIngredientId = useSelector(state => state.currentSelection.selectedId)

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
