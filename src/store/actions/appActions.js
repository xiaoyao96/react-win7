/**
 *  action类型
 */
//App操作
export const OPEN_APP = 'OPEN_APP';
export const CLOSE_APP = 'CLOSE_APP';
export const HIDE_APP = 'HIDE_APP';
export const SHOW_APP = 'SHOW_APP';
export const TOGGLE_APP = 'TOGGLE_APP';
export const FOCUS_APP = 'FOCUS_APP';
export const MOVE_APP = 'MOVE_APP';

/*
 * action
 */

/**
 * 打开app
 * @param id
 * @returns {{type: string, id: *}}
 */
export function openApp(id) {
    return {
        type: OPEN_APP,
        id
    }
}

/**
 * 关闭app
 * @param id
 * @returns {{type: string, id: *}}
 */
export function closeApp(id){
    return {
        type: CLOSE_APP,
        id
    }
}

/**
 * 隐藏app
 * @param id
 * @returns {{type: string, id: *}}
 */
export function hideApp(id){
    return {
        type: HIDE_APP,
        id
    }
}

/**
 * 显示app
 * @param id
 * @returns {{type: string, id: *}}
 */
export function showApp(id) {
    return {
        type: SHOW_APP,
        id
    }
}


/**
 * 切换显示隐藏app
 * @param id
 * @returns {{type: string, id: *}}
 */
export function toggleApp(id) {
    return {
        type: TOGGLE_APP,
        id
    }
}


/**
 * 聚焦app
 * @param id
 * @returns {{type: string, id: *}}
 */
export function focusApp(id){
    return {
        type: FOCUS_APP,
        id
    }
}


/**
 * 监听窗口是否正在移动
 * @param id
 * @returns {{type: string, id: *}}
 */
export function changeMoveState(moving) {
    return {
        type: MOVE_APP,
        moving
    }
}