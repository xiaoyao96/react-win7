import React from 'react'
import style from './footerIcon.scss'
import classnames from 'classnames'
import MenuArea from '../../../components/menuArea/menuArea'
import  { connect } from 'react-redux'
import { closeApp, showApp, hideApp, maxApp, cancelMaxApp} from "../../../store/actions/appActions";

class FooterIcon extends React.Component {
    state = {
        active: false
    }
    footerIconClick = () => {
        this.props.toggleWindow()
    }
    iconMousedown = () => {
        this.setState({
            active: true
        })
        document.addEventListener('mouseup', this.iconMouseup)
    }
    iconMouseup = () => {
        this.setState({
            active: false
        })
        document.removeEventListener('mouseup', this.iconMouseup)
    }
    render() {
        this.menu = [
            {
                value: this.props.appItem.max ? '还原' : '最大化',
                click: this.props.toggleMaxWindow
            },
            {
                value: '关闭',
                click: this.props.closeWindow
            }
        ]
        return (
            <div onMouseDown={this.iconMousedown} className={classnames({[style['win-task-app']]: true, [style.down]: this.state.active})} onClick={this.footerIconClick}>
                <MenuArea menu={this.menu}>
                    <i style={{background: `-webkit-linear-gradient(top,rgba(255,255,255,1.2),rgba(255,255,255,0.9)) content-box,url(${this.props.appItem.detail.img}) no-repeat`}}></i>
                    <div style={{backgroundImage: `url(${this.props.appItem.detail.img})`}} className={style['task-img']}></div>
                </MenuArea>

            </div>
        )
    }
}

export default connect(
    state => {
        return {

        }
    },
    (dispatch, {appItem}) => {
        return {
            closeWindow(){
                dispatch(closeApp(appItem.appId))
            },
            toggleWindow(){
                if(appItem.hide){
                    dispatch(showApp(appItem.appId))
                }else{
                    dispatch(hideApp(appItem.appId))
                }
            },
            toggleMaxWindow(){
                if(appItem.max){
                    dispatch(cancelMaxApp(appItem.appId))
                }else{
                    dispatch(maxApp(appItem.appId))
                }
            }
        }
    }
)(FooterIcon)