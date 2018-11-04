import React from 'react'
import './link.scss'
export default class Window extends React.Component {
    openWindow(){
        this.props.openWindow(this.props.appItem.appId);
    }
    render() {
        return (
            <li onTouchEnd={this.openWindow.bind(this)} onDoubleClick={this.openWindow.bind(this)} className="link">
                <a href="javascript:void(0);" app-id={this.props.appItem.appId}>
                    <div data-url="" style={{backgroundImage: 'url(' + this.props.appItem.img + ')'}}></div>
                    <p>{this.props.appItem.name}</p>
                </a>
            </li>
        )
    }
}