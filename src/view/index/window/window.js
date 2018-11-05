import React from 'react'
import './window.scss'
import classnames from 'classnames'

export default class Window extends React.Component {
    constructor(props) {
        super(props)
        this.windowStartMove = this.windowStartMove.bind(this)
        this.maxWin = this.maxWin.bind(this)
        this.closeWindow = this.closeWindow.bind(this)
        this.windowEndMove = this.windowEndMove.bind(this)
        this.windowMoving = this.windowMoving.bind(this)
        this.clickMax = this.clickMax.bind(this)
        this.hiddenHandler = this.hiddenHandler.bind(this)
        this.state = {
            max: false,
            position: {
                x: 0,
                y: 0
            },
            size: {
                w: 600,
                h: 400
            },
            hide: false
        }
        this.customState = {}
    }
    // 显示或隐藏窗口
    hiddenHandler(){
        this.props.winHideCtrl(this.props.appItem.appId)
    }
    // 开始移动
    windowStartMove(e) {
        this.customState.originX = e.pageX;
        this.customState.originY = e.pageY;
        this.customState.startX = this.state.position.x;
        this.customState.startY = this.state.position.y;
        document.addEventListener('mousemove', this.windowMoving);
    }

    //移动过程中
    windowMoving(e) {
        //如果已经放大
        if(this.state.max){
            let position = this.state.position;
            position.y = -1;
            position.x = e.pageX - this.state.size.w / 2;
            if(position.x < 0){
                position.x = 0
            }
            if(position.x > document.documentElement.offsetWidth){
                position.x = document.documentElement.offsetWidth
            }
            this.setState({
                max: !this.state.max,
                position
            })
            this.customState.startX = this.state.position.x;
            this.customState.startY = this.state.position.y;
        }
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
        if(currentY < 0){
            currentY = 0;
            this.props.WillMaxCtrl(true);
        }else{
            this.props.WillMaxCtrl(false);
        }
        position.x = this.customState.startX + currentX - this.customState.originX;
        position.y = this.customState.startY + currentY - this.customState.originY;
        this.setState({
            position
        })
        document.addEventListener('mouseup', this.windowEndMove);
    }

    //结束移动
    windowEndMove() {
        //如果将放大
        if(this.props.willMax){
            this.props.WillMaxCtrl(false);
            this.setState({
                max: !this.state.max
            })

        }
        document.removeEventListener('mousemove', this.windowMoving);
        document.removeEventListener('mouseup', this.windowEndMove);
    }
    //点击放大缩小
    clickMax(){
        let position = this.state.position;
        if(position.y < 0){
            position.y = 50;
        }
        this.setState({
            position
        })
        this.maxWin();
    }
    //全屏
    maxWin() {
        this.setState({
            max: !this.state.max
        })
    }

    closeWindow() {
        this.props.closeWindow(this.props.appItem.appId)
    }

    render() {
        let style = {transform: `translate3d(${this.state.position.x}px,${this.state.position.y}px,0)`, width: `${this.state.size.w}px`, height: `${this.state.size.h}px`}
        style.display = this.props.hide ? "none" : "block";
        return (
            <div style={style}
                 className={classnames({my_win: true, max: this.state.max, current: true})}>
                <div onDoubleClick={this.maxWin} onClick={this.windowEndMove} onMouseDown={this.windowStartMove}
                     className="win-head">
                    <span style={{backgroundImage: `url(${this.props.appItem.img})`}}>{this.props.appItem.name}</span>
                    <div className="win-btn">
                        <span onClick={this.hiddenHandler} style={{background: '#8ec831'}}></span>
                        <span onClick={this.clickMax} style={{background: '#ffd348'}}></span>
                        <span onClick={this.closeWindow} style={{background: '#ed4646'}}></span>
                    </div>
                </div>
                <div className="win-body"><p>{this.props.appItem.content}</p></div>
            </div>
        )
    }
}