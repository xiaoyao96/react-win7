/**
 *  action类型
 */
//App操作
export const OPEN_APP = 'OPEN_APP'; // 打开app
export const CLOSE_APP = 'CLOSE_APP'; // 关闭
export const HIDE_APP = 'HIDE_APP'; // 隐藏
export const SHOW_APP = 'SHOW_APP'; // 显示
export const FOCUS_APP = 'FOCUS_APP'; // 聚焦
export const MOVE_APP = 'MOVE_APP'; // 是否正在移动
export const MAX_APP = 'MAX_APP'; // 全屏APP
export const CANCEL_MAX_APP = 'CANCEL_MAX_APP'; // 取消全屏APP

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

/**
 * 最大化窗口
 * @param id
 * @returns {{type: string, id: *}}
 */
export function maxApp(id) {
    return {
        type: MAX_APP,
        id
    }
}

/**
 * 取消最大化
 * @param id
 * @returns {{type: string, id: *}}
 */
export function cancelMaxApp(id) {
    return {
        type: CANCEL_MAX_APP,
        id
    }
}