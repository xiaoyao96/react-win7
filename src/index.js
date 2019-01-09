import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router/router';
import * as serviceWorker from './serviceWorker';
import './public/public.scss';
import 'babel-polyfill';
import Ajax from './public/request';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './store/index'
import { fromJS } from 'immutable'
let store = createStore(reducer)
//全屏
Object.defineProperty(React.Component.prototype, 'requestFullScreen', {
    value: function (element) {
        var de = document.querySelector(element) || document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
    }
})
//退出全屏
Object.defineProperty(React.Component.prototype, 'exitFullscreen', {
    value: function () {
        var de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    }
})
Object.defineProperty(React.Component.prototype, 'Ajax', {
    value: Ajax
})

Ajax('/visited', 'post');

//禁用右键菜单
document.oncontextmenu = function() {
    return false;
}

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
