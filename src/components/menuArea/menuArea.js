import React from 'react'
import style from './menuArea.scss'
import { connect } from 'react-redux'
import { showMenu, setPosition } from "../../store/actions/menuActions";

class MenuArea extends React.Component{
    constructor(props){
        super(props);
        this.show = this.show.bind(this);
    }
    show(e){

        console.log(this.props.menu)
        let y = e.pageY;
        let x = e.pageX;
        if(e.button === 2){
            this.props.setMenuPosition(x, y)
            this.props.showMenu(this.props.menu);
            setTimeout(_ => {
                if(this.props.menuDom.offsetHeight + y > document.documentElement.offsetHeight){
                    y = y - this.props.menuDom.offsetHeight
                }
                this.props.setMenuPosition(x, y)
            }, 0)
        }
    }
    render(){
        return (
            <div className={style['menu-area']} onMouseUp={this.show}>
                {this.props.children}
            </div>
        )
    }
}

export default connect(
    state => {
        return {
            menuDom: state.menu.dom
        }
    },
    (dispatch,props) => {
        return {
            showMenu(){
                return dispatch(showMenu(props.menu))
            },
            setMenuPosition(x,y){
                dispatch(setPosition(x,y))
            }
        }
    }
)(MenuArea)