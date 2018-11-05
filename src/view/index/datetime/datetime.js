import React from 'react'
import './datetime.scss'
export default class Datetime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
        setInterval(_ => {
            this.setState({
                date: new Date()
            })
        }, 100)
    }
    render() {
        return (
            <div className='win-datetime'>
                <p>{this.state.date.getHours()}:{this.state.date.getMinutes()}</p>
                <p>{this.state.date.getFullYear()}/{this.state.date.getMonth() + 1}/{this.state.date.getDate()}</p>
            </div>
        )
    }
}