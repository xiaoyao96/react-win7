import React from 'react'
import style from './link.scss'
import classnames from 'classnames'
export default class Window extends React.Component {
    openWindow(){
        this.props.openWindow(this.props.appItem.appId);
    }
    render() {
        let iconEle = <div style={{backgroundImage: 'url(' + this.props.appItem.img + ')'}}></div>;
        if(this.props.appItem.imgType === 'font'){
            iconEle = <div className={classnames({[this.props.appItem.img]: true, iconfont: true})}></div>
        }
        return (
            <li onTouchEnd={this.openWindow.bind(this)} onDoubleClick={this.openWindow.bind(this)} className={style.link}>
                <a href="javascript:void(0);" app-id={this.props.appItem.appId}>
                    {iconEle}
                    <p>{this.props.appItem.name}</p>
                </a>
            </li>
        )
    }
}