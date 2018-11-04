import React from 'react'
import './footerIcon.scss'
export default class FooterIcon extends React.Component {
    render() {
        return (
            <div className="win-task-app">
                <i style={{backgroundImage: `url(${this.props.appItem.img})`}}></i>
                <div style={{backgroundImage: `url(${this.props.appItem.img})`}} className="task-img"></div>
            </div>
        )
    }
}