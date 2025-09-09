import { useSelector, useDispatch } from "react-redux";
import { IIngredientState } from "../types";
import { Action, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";

export type TDispatchAction = Dispatch<Action>
export type TDispatchThunkAction = ThunkDispatch<StaticRange, unknown, Action>

export type TAppAction = TDispatchAction | TDispatchThunkAction

export const useAppSelector = useSelector.withTypes<IIngredientState>()
export const useAppDispatch = useDispatch.withTypes<TAppAction>()
