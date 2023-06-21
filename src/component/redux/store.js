import { theReducer } from "./reducer";
import {createStore} from "redux"

const store=createStore(
    theReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store

