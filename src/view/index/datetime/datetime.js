import React from 'react'
import style from './datetime.scss'
export default class Datetime extends React.Component {
    state = {
        date: new Date()
    }
    componentDidMount(){
        setInterval(_ => {
            this.setState({
                date: new Date()
            })
        }, 100)
    }
    static parseTwoNum(num){
        if(num < 10){
            return '0' + num
        }else{
            return num
        }
    }
    render() {

        return (
            <div className={style['win-datetime']}>
                <p>{Datetime.parseTwoNum(this.state.date.getHours())}:{Datetime.parseTwoNum(this.state.date.getMinutes())}</p>
                <p>{this.state.date.getFullYear()}/{this.state.date.getMonth() + 1}/{this.state.date.getDate()}</p>
            </div>
        )
    }
}