import { configureStore, combineReducers } from "@reduxjs/toolkit";
import * as RR from "react-redux";
import { reducer as search } from "./search";

const reducer = combineReducers({
  search,
});

export type RootState = ReturnType<typeof reducer>;
type AppDispatch = ReturnType<typeof create>["dispatch"];

const create = () => configureStore({ reducer });

export default create;

export const useSelector: RR.TypedUseSelectorHook<RootState> = RR.useSelector;
export const useDispatch = () => RR.useDispatch<AppDispatch>();
