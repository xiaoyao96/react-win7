
//右键Menu操作
export const SHOW_MENU = 'SHOW_MENU';
export const HIDE_MENU = 'HIDE_MENU';
export const SET_POSITION = 'SET_POSITION';
export const SET_MENU_DOM = 'SET_MENU_DOM';
export function setMenuDom(dom) {
    return {
        type: SET_MENU_DOM,
        dom
    }
}
export function showMenu(menu) {
    return {
        type: SHOW_MENU,
        menu
    }
}

export function hideMenu() {
    return {
        type: HIDE_MENU
    }
}

export function setPosition(x,y) {
    return {
        type: SET_POSITION,
        x,
        y
    }
}