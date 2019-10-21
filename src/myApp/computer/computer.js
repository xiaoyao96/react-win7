import React from 'react'
import style from './computer.scss'

export default class Computer extends React.Component{
    state = {
        num: 0
    }
    componentDidMount(){
        this.Ajax('/visited', 'get').then(res => {
            if(res.code === 0){
                this.setState({
                    num: res.data
                })
            }
        })
    }
    render(){
        return (
            <div className={style.content}>
                <div className={style.img}></div>
                <p className={style.name}>React Windows 7</p>
                <p>已被访问 {this.state.num} 次</p>
                {/*<a href='javascript:alert("还没上git呢~")' target="_blank" className={style.btn}>进入项目git</a>*/}
            </div>
        )
    }
}