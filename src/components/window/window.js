import React from 'react'
import './window.scss'
import classnames from 'classnames'
export default class Window extends React.Component {
    constructor(props){
        super(props)
        this.windowStartMove = this.windowStartMove.bind(this)
        this.maxWin = this.maxWin.bind(this)
        this.closeWindow = this.closeWindow.bind(this)
        this.state = {
            max: false
        }
    }
    windowStartMove(e){
        console.log(e.button)
    }
    maxWin(){
        this.setState({
            max: !this.state.max
        })
    }
    closeWindow(){
        console.log(this)
        this.props.closeWindow(this.props.appItem.appId)
    }
    render() {
        console.log(this.state.max)
        return (
            <div className={classnames({my_win : true, max: this.state.max})}>
                <div onDoubleClick={this.maxWin} onMouseDown={this.windowStartMove} className="win-head">
                    <span style={{backgroundImage: `url(${this.props.appItem.img})`}}>{this.props.appItem.name}</span>
                    <div className="win-btn">
                        <span style={{background: '#8ec831'}}></span>
                        <span onClick={this.maxWin} style={{background: '#ffd348'}}></span>
                        <span onClick={this.closeWindow} style={{background: '#ed4646'}}></span>
                    </div>
                </div>
                <div className="win-body"><p>{this.props.appItem.content}</p></div>
            </div>
        )
    }
}