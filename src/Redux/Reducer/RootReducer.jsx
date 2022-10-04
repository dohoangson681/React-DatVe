import { combineReducers } from "redux";
import { createStore } from 'redux' ; 
import { DatVeReducer } from "./DatVeReducer";
const rootReducer = combineReducers({
    DatVeReducer
}) ; 
const store = createStore(rootReducer) ; 
export default store ; 