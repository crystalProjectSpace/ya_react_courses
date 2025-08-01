import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { SET_SELECTION } from "../services/actions";
import { IngredientDetails } from "../components/IngredientDetails/IngredientDetails";
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

    return (<section className="page-wrap _ingredients">
        <IngredientDetails />
    </section>)
}
