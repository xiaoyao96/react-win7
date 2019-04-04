import React from 'react'
import style from './link.scss'
import classnames from 'classnames'
import MenuArea from '../../../components/menuArea/menuArea'
import { connect } from 'react-redux'
import { openApp } from "../../../store/actions/appActions";

class Window extends React.Component {
    constructor(props){
        super(props);
        this.iconEle = <div style={{backgroundImage: 'url(' + this.props.appItem.img + ')'}}></div>;
        if(this.props.appItem.imgType === 'font'){
            this.iconEle = <div className={classnames({[this.props.appItem.img]: true, iconfont: true})}></div>
        }
    }
    state = {
        menu: [
            {
                value: "打开",
                click: this.props.openWindow
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
    checkFocus = e => {
        if(e.code === 'Enter' || e.which === 13 || e.keyCode === 13){
            this.props.openWindow()
        }
    }
    render() {
        return (
            <li onTouchEnd={this.props.openWindow} onKeyDown={this.checkFocus} onDoubleClick={this.props.openWindow} className={style.link}>
                <MenuArea menu={this.state.menu}>
                    <button app-id={this.props.appItem.appId}>
                        {this.iconEle}
                        <p>{this.props.appItem.name}</p>
                    </button>
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