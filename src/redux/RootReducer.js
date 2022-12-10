import {combineReducers} from "redux"
import { HomeReducer } from "./reducers/HomeReducer"
const rootReducer=combineReducers({
    HomeReducer:HomeReducer,
})
export {rootReducer}