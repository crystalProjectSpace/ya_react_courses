import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router";
import { SET_SELECTION } from "../services/actions";
import { IngredientDetails } from "../components/IngredientDetails/IngredientDetails";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getItems } from "../services";
import { API_URL } from "../constants";

export function IngredientSinglePage () {
    const { id: ingredientId } = useParams();
    const dispatch = useDispatch();
    const activeIngredientId = useSelector(state => state.currentSelection.selectedId)
    const hasItems = useSelector(state => state.availableItems.items.length > 0)

    useEffect(()=> {
        if (!activeIngredientId) dispatch({ type: `currentSelection/${SET_SELECTION}`, id: ingredientId })
        if (!hasItems) dispatch(getItems(API_URL))
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
