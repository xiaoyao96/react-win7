import {OPEN_APP, HIDE_APP, CLOSE_APP, FOCUS_APP, MOVE_APP, SHOW_APP, MAX_APP, CANCEL_MAX_APP} from "../actions/appActions";
import { fromJS, Map } from 'immutable'
import appList from '../../public/appList'

export function appHandler(state = [], action){
    let runApp = fromJS(state);
    switch (action.type){
        case OPEN_APP:
            if(state.findIndex(item => item.appId === action.id) > -1){
                // return appHandler(state, {...action, type: FOCUS_APP})
                return appHandler(state, {
                    ...action,
                    type: SHOW_APP
                })
            }else{
                let target = appList.find(item => item.appId === action.id);
                return appHandler(runApp.push(fromJS({
                    appId: target.appId,
                    detail: target
                })).toJS(), {
                    ...action,
                    type: FOCUS_APP
                })
            }
            break;
        case FOCUS_APP:
        {
            let index = state.findIndex(item => item.appId === action.id);
            if(index > -1){
                let orizIndex = state[index].zIndex || state.length;
                runApp = runApp.setIn([index, 'zIndex'], state.length);
                state.forEach((item,i) => {
                    runApp = runApp.setIn([i, 'focus'], i === index);
                    if(i !== index && orizIndex < item.zIndex){
                        runApp = runApp.setIn([i, 'zIndex'], item.zIndex - 1);
                    }
                })
            }
            return runApp.toJS();
        }
        case CLOSE_APP:
        {
            let index = state.findIndex(item => item.appId === action.id);
            if(index > -1){
                runApp = runApp.remove(index);
                if(runApp.size > 0){
                    runApp = runApp.setIn([index - 1, 'focus'], true);
                }
            }
            return runApp.toJS()
        }
        case SHOW_APP:
        {
            let index = state.findIndex(item => item.appId === action.id)
            if(index > -1){
                return appHandler(runApp.setIn([index, 'hide'], false).toJS(), {
                    ...action,
                    type: FOCUS_APP
                })
            }
            return state
        }
        case HIDE_APP: {
            let index = state.findIndex(item => item.appId === action.id)
            if (index > -1) {
                runApp = runApp.setIn([index, 'hide'], true)
                if (runApp.size > 1) {
                    runApp = runApp.setIn([index - 1, 'focus'], true);
                }
                return runApp.toJS()
            }
            return state
        }
        case MAX_APP: {
            let index = state.findIndex(item => item.appId === action.id);
            if(index > -1){
                return appHandler(runApp.setIn([index, 'max'], true).toJS(), {
                    ...action, type: SHOW_APP
                })
            }
            return state
        }
        case CANCEL_MAX_APP: {
            let index = state.findIndex(item => item.appId === action.id);
            if(index > -1){
                return appHandler(runApp.setIn([index, 'max'], false).toJS(), {
                    ...action, type: SHOW_APP
                })
            }
            return state
        }
        default:
            return state
    }
}
export function changeMoveState(state = false, action) {
    switch (action.type){
        case MOVE_APP:
            return !!action.moving
        default:
            return state
    }
}
