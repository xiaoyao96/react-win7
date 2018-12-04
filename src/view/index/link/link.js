import React from 'react'
import style from './link.scss'
import classnames from 'classnames'
import MenuArea from '../../../components/menuArea/menuArea'
import { connect } from 'react-redux'
import { openApp } from "../../../store/action";

class Window extends React.Component {
    constructor(props){
        super(props);
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
            <li onTouchEnd={this.openWindow} onKeyDown={this.checkFocus} onDoubleClick={this.props.openWindow} className={style.link}>
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

export default connect(
    null,
    (dispatch, props) => {
        return {
            openWindow(){
                dispatch(openApp(props.appItem.appId))
            }
        }
    }
)(Window)