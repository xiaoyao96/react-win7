import React from 'react'
import style from './link.scss'
import classnames from 'classnames'
import MenuArea from '../../../components/menuArea/menuArea'

export default class Window extends React.Component {
    constructor(props){
        super(props);
        this.openWindow = this.openWindow.bind(this);
        this.checkFocus = this.checkFocus.bind(this)
    }
    openWindow(){
        this.props.openWindow(this.props.appItem.appId);
    }
    checkFocus(e){
        if(e.code === 'Enter' || e.which === 13 || e.keyCode === 13){
            this.openWindow()
        }
    }
    render() {
        this.menu = [
            {
                value: "打开",
                click: this.openWindow
            },
            {
                value: '删除',
                disabled: true
            },
            {
                value: '复制',
                disabled: true
            }
        ]
        let iconEle = <div style={{backgroundImage: 'url(' + this.props.appItem.img + ')'}}></div>;
        if(this.props.appItem.imgType === 'font'){
            iconEle = <div className={classnames({[this.props.appItem.img]: true, iconfont: true})}></div>
        }
        return (
            <li onTouchEnd={this.openWindow} onKeyDown={this.checkFocus} onDoubleClick={this.openWindow} className={style.link}>
                <MenuArea menu={this.menu}>
                    <a href="javascript:void(0);" app-id={this.props.appItem.appId}>
                        {iconEle}
                        <p>{this.props.appItem.name}</p>
                    </a>
                </MenuArea>

            </li>
        )
    }
}