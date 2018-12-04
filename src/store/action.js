/**
 *  action类型
 */
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
export function openApp(id) {
    return {
        type: OPEN_APP,
        id
    }
}

export function closeApp(id){
    return {
        type: CLOSE_APP,
        id
    }
}

export function hideApp(id){
    return {
        type: HIDE_APP,
        id
    }
}

export function showApp(id) {
    return {
        type: SHOW_APP,
        id
    }
}

export function toggleApp(id) {
    return {
        type: TOGGLE_APP,
        id
    }
}

export function focusApp(id){
    return {
        type: FOCUS_APP,
        id
    }
}

export function changeMoveState(moving) {
    return {
        type: MOVE_APP,
        moving
    }
}