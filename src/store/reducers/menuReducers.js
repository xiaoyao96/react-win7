import {HIDE_MENU, SHOW_MENU, SET_POSITION, SET_MENU_DOM} from "../actions/menuActions";

export function menuHandler(state = {}, action){
    switch (action.type){
        case SHOW_MENU:
            return {
                ...state,
                list: action.menu,
                show: true
            }
        case HIDE_MENU:
            return {
                ...state,
                show: false,
                x: 0,
                y: 0
            }
        case SET_POSITION:
            return {
                ...state,
                x: action.x,
                y: action.y
            }
        case SET_MENU_DOM:
            return {
                ...state,
                dom: action.dom
            }
        default:
            return state
    }
}