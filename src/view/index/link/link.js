import React from 'react'
import style from './link.scss'
import classnames from 'classnames'
import MenuArea from '../../../components/menuArea/menuArea'

export default class Window extends React.Component {
    constructor(props){
        super(props);
        this.openWindow = this.openWindow.bind(this);
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
    }
    openWindow(){
        this.props.openWindow(this.props.appItem.appId);
    }
    render() {
        let iconEle = <div style={{backgroundImage: 'url(' + this.props.appItem.img + ')'}}></div>;
        if(this.props.appItem.imgType === 'font'){
            iconEle = <div className={classnames({[this.props.appItem.img]: true, iconfont: true})}></div>
        }
        return (
            <li onTouchEnd={this.openWindow} onDoubleClick={this.openWindow} className={style.link}>
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