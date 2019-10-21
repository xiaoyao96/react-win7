import React from 'react'
import style from './window.scss'
import classnames from 'classnames'
import Html from './html/html'
import MenuArea from '../../../components/menuArea/menuArea'
import { connect } from 'react-redux'
import {
    focusApp,
    changeMoveState,
    closeApp,
    showApp,
    hideApp,
    maxApp,
    cancelMaxApp
} from "../../../store/actions/appActions";

class Window extends React.Component {
    constructor(props) {
        super(props)
        let bodyStyle = {};
        //内容控制
        let content = '';
        switch (this.props.appItem.detail.type) {
            case 'txt':
                content = <p>{this.props.appItem.detail.content}</p>
                break;
            case 'html':
                bodyStyle.overflow = 'hidden'
                content = <Html url={this.props.appItem.detail.url} />
                break;
            case 'component':
                let App = this.props.appItem.detail.component;
                content = <App />;
                break;
            default:
                content = <p>{this.props.appItem.detail.content}</p>
                break;
        }
        let w = document.documentElement.offsetWidth * 80 / 100,
            h = document.documentElement.offsetHeight * 80 / 100,
            x = document.documentElement.offsetWidth * 10 / 100,
            y = document.documentElement.offsetHeight * 10 / 100,
            size = this.props.appItem.detail.size;
        if (size && document.documentElement.offsetWidth > size.w && document.documentElement.offsetHeight > size.h) {
            w = this.props.appItem.detail.size.w;
            h = this.props.appItem.detail.size.h;
            x = (document.documentElement.offsetWidth - w) / 2;
            y = (document.documentElement.offsetHeight - h) / 2
        }

        this.state = {
            position: {
                x,
                y
            },
            size: {
                w,
                h
            }
        }
        this.customState = {
            bodyStyle,
            content,
        }
    }

    // 开始移动
    windowStartMove = (e) => {
        if (e.button === 0) {
            this.customState.originX = e.pageX;
            this.customState.originY = e.pageY;
            this.customState.startX = this.state.position.x;
            this.customState.startY = this.state.position.y;
            window.addEventListener('mousemove', this.windowMoving);
            window.addEventListener('mouseup', this.windowEndMove);
            this.props.changeMovingState(true);
        }
    }

    //移动过程中
    windowMoving = (e) => {
        //如果已经放大
        if (this.props.appItem.max) {
            let position = this.state.position;
            position.y = -1;
            position.x = e.pageX - this.state.size.w / 2;
            if (position.x < 0) {
                position.x = 0
            }
            if (position.x + this.state.size.w > document.documentElement.offsetWidth) {
                position.x = document.documentElement.offsetWidth - this.state.size.w
            }
            this.props.cancelMaxWindow()
            this.setState({
                position
            })
            this.customState.startX = this.state.position.x;
            this.customState.startY = this.state.position.y;
        } else {
            let position = this.state.position;
            let currentX = e.pageX;
            if (e.pageX > document.documentElement.offsetWidth) {
                currentX = document.documentElement.offsetWidth;
            }
            if (e.pageX < 0) {
                currentX = 0;
            }
            let currentY = e.pageY;
            if (currentY > document.documentElement.offsetHeight - 40) {
                currentY = document.documentElement.offsetHeight - 40;
            }
            if (currentY <= 0) {
                currentY = 0;
                this.props.WillMaxCtrl(true);
            } else {
                this.props.WillMaxCtrl(false);
            }
            position.x = this.customState.startX + currentX - this.customState.originX;
            position.y = this.customState.startY + currentY - this.customState.originY;
            this.setState({
                position
            })
        }

    }

    //结束移动
    windowEndMove = () => {
        if (this.props.moving) {
            //如果将放大
            if (this.props.willMax) {
                this.props.WillMaxCtrl(false);
                this.props.maxWindow();
            }
            this.props.changeMovingState(false);
        }
        window.removeEventListener('mousemove', this.windowMoving);
        window.removeEventListener('mouseup', this.windowEndMove);
    }

    //点击放大缩小
    clickMax = () => {
        let position = this.state.position;
        if (position.y < 0) {
            position.y = 50;
        }
        this.setState({
            position
        })
        this.toggleMaxWindow();
    }

    toggleMaxWindow = () => {
        if (this.props.appItem.max) {
            this.props.cancelMaxWindow();
        } else {
            this.props.maxWindow();
        }
    }

    closeWindow = () => {
        this.props.closeWindow(this.props.appItem.detail.appId)
    }

    focusWindow = () => {
        if (!this.props.isFocus) {
            this.props.focusWindow(this.props.appItem.detail.appId)
        }
    }

    render() {
        this.menu = [
            {
                value: this.props.appItem.max ? '缩小' : '最大化',
                click: this.clickMax
            },
            {
                value: '最小化',
                click: this.props.hideWindow
            },
            {
                value: '关闭',
                click: this.closeWindow
            }
        ]
        //样式控制
        // let winStyle = { transform: `translate(${this.state.position.x}px, ${this.state.position.y}px)`,width: `${this.state.size.w}px`, height: `${this.state.size.h}px`}
        let winStyle = {
            left: `${this.state.position.x}px`,
            top: `${this.state.position.y}px`,
            width: `${this.state.size.w}px`,
            height: `${this.state.size.h}px`
        }

        winStyle.display = this.props.appItem.hide ? "none" : "flex";
        winStyle.zIndex = this.props.appItem.zIndex;
        let maskStyle = {
            display: this.props.moving ? "block" : "none"
        }

        return (
            <div onMouseDown={this.focusWindow} style={winStyle} className={classnames({
                [style['my_win']]: true,
                [style.max]: this.props.appItem.max,
                [style.current]: this.props.appItem.focus
            })}>
                <div className={style['win-cell']}>
                    <div onDoubleClick={this.toggleMaxWindow} onClick={this.windowEndMove}
                        onMouseDown={this.windowStartMove} className={style['win-head']}>
                        <MenuArea menu={this.menu} />
                        <span
                            style={{ backgroundImage: `url(${this.props.appItem.detail.img})` }}>{this.props.appItem.detail.name}</span>
                        <div className={style['win-btn']}>
                            <span onClick={this.props.hideWindow} style={{ background: '#8ec831' }}></span>
                            <span onClick={this.clickMax} style={{ background: '#ffd348' }}></span>
                            <span onClick={this.closeWindow} style={{ background: '#ed4646' }}></span>
                        </div>
                    </div>
                    <div style={this.customState.bodyStyle} className={style['win-body']}>
                        {this.customState.content}
                        <div style={maskStyle} className={style['win-mask']}></div>
                    </div>

                </div>

            </div>
        )
    }
}

export default connect(
    (state, { appItem }) => {
        return {
            isFocus: state.runList.find(item => item.appId === appItem.appId).focus,
            moving: state.moving
        }
    },
    (dispatch, { appItem }) => {
        const { appId } = appItem
        return {
            maxWindow() {
                dispatch(maxApp(appId))
            },
            cancelMaxWindow() {
                dispatch(cancelMaxApp(appId))
            },
            closeWindow() {
                dispatch(closeApp(appId))
            },
            changeMovingState(moving) {
                dispatch(changeMoveState(moving))
            },
            focusWindow() {
                dispatch(focusApp(appId))
            },
            showWindow() {
                dispatch(showApp(appId))
            },
            hideWindow() {
                dispatch(hideApp(appId))
            }
        }
    }
)(Window)
