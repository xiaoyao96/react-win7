import { combineReducers } from 'redux'

import { appHandler, changeMoveState } from "./reducers/appReducers";
import { menuHandler } from "./reducers/menuReducers";


export default combineReducers({
    runList: appHandler,
    moving: changeMoveState,
    menu: menuHandler
})
