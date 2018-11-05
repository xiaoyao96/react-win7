import React from 'react'
import './footerIcon.scss'
export default class FooterIcon extends React.Component {
    constructor(props){
        super(props);
        this.winHideCtrl = this.winHideCtrl.bind(this);
    }
    winHideCtrl(){
        this.props.winHideCtrl(this.props.appItem.appId)
    }

    render() {
        return (
            <div className="win-task-app" onClick={this.winHideCtrl}>
                <i style={{backgroundImage: `url(${this.props.appItem.img})`}}></i>
                <div style={{backgroundImage: `url(${this.props.appItem.img})`}} className="task-img"></div>
            </div>
        )
    }
}