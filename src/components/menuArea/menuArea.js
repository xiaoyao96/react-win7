import React from 'react'
import style from './menuArea.scss'
export default class MenuArea extends React.Component{
    constructor(props){
        super(props);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }
    hide(e){
        if(e.button === 2){
            window.getMenu().hide()
        }
    }
    show(e){
        if(window.getMenu().bubble){
            return
        }
        window.getMenu().bubble = true;
        if(e.button === 2){
            window.getMenu().show()
            window.getMenu().setState({
                x: e.pageX,
                y: e.pageY,
                menu: this.props.menu
            })
        }
        setTimeout(_ => {
            window.getMenu().bubble = false
        },0)
    }
    render(){
        return (
            <div className={style['menu-area']} onMouseDown={this.hide} onMouseUp={this.show}>
                {this.props.children}
            </div>
        )
    }
}