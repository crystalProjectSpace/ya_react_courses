import { useSelector, useDispatch } from "react-redux";
import { IIngredientState } from "../types";


type TAppAction = { type: string, payload?: Record<string, unknown>}

export const useAppSelector = useSelector.withTypes<IIngredientState>()
//export const useAppDispatch = useDispatch.withTypes<TAppAction>()