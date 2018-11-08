import React from 'react';
import style from './menu.scss'
import classnames from 'classnames'
export default class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            x: 0,
            y: 0,
            menu: []
        }
        this.click = this.click.bind(this);
        window.getMenu = function () {
            return this;
        }.bind(this)
    }
    static stop(e){
        e.stopPropagation()
    }
    click(m){
        m.click()
        this.setState({
            show: false
        })
    }
    //隐藏
    hide(){
        this.setState({
            show: false
        })
    }
    //显示
    show(){
        this.setState({
            show: true
        }, _ => {
            if(this.refs.menu.offsetHeight + this.state.y > document.documentElement.offsetHeight){
                this.setState({
                    y: this.state.y - this.refs.menu.offsetHeight
                })
            }
        })
    }
    render(){
        let menus = (this.state.menu || []).map((m,i) => (
            <div key={i} onMouseUp={ m.disabled ? _ => 0 : (ev) => { this.click(m) }} className={classnames({[style['menu-item']]: true, [style.disabled]: m.disabled})}>{m.value}</div>
        ));
        return (
            <div className={style.menu}>
                <div ref="menu" onMouseDown={Menu.stop} onMouseUp={Menu.stop} style={{visibility: this.state.show ? "visible": "hidden", left: this.state.x + 'px', top: this.state.y + 'px'}} className={style['mydiv_body']}>
                    <span className={style.shu}></span>
                    {menus}
                </div>
            </div>
        )
    }
}