import React from 'react';
import style from './menu.scss'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { hideMenu, setMenuDom } from "../../store/actions/menuActions";

class Menu extends React.Component{
    componentDidMount(){
        window.addEventListener('mousedown', () => {
            this.hide();
        })
    }
    static stop(e){
        e.stopPropagation()
    }
    click = (m) => {
        m.click()
        this.props.hideMenu()
    }
    //隐藏
    hide = () => {
        this.props.hideMenu()
    }

    getMenuDom = (dom) => {
        this.props.setMenuDom(dom)
    }
    render(){
        let menus = (this.props.menu.list || []).map((m,i) => (
            <div key={i} onMouseUp={ (m.disabled || typeof m.click !== 'function') ? _ => 0 : (ev) => { this.click(m) }} className={classnames({[style['menu-item']]: true, [style.disabled]: m.disabled})}>{m.value}</div>
        ));
        return (
            <div className={style.menu}>
                <div ref={this.getMenuDom} onMouseDown={Menu.stop} onMouseUp={Menu.stop} style={{visibility: this.props.menu.show ? "visible": "hidden", left: this.props.menu.x + 'px', top: this.props.menu.y + 'px'}} className={style['mydiv_body']}>
                    <span className={style.shu}></span>
                    {menus}
                </div>
            </div>
        )
    }
}

export default connect(
    state => {
        return{
            menu: state.menu
        }
    },
    dispatch => {
        return {
            setMenuDom(dom){
                dispatch(setMenuDom(dom));
            },
            hideMenu(){
                dispatch(hideMenu())
            }
        }
    }
)(Menu)