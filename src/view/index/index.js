import React from 'react'
import './index.scss'
import bg from '../../imgs/img0.jpg'
import Link from './link/link'
import Window from './window/window'
import FooterIcon from './footerIcon/footerIcon'
import Datetime from './datetime/datetime'
import appList from '../../public/appList.js'

export default class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            appList,
            willMax: false
        }
    }
    //打开应用
    openWindow(appId){
        let target = this.state.appList.find(app => app.appId == appId);
        if(target.isRuning){
            return;
        }
        target.isRuning = true;
        this.setState({
            appList
        })
    }
    //关闭应用
    closeWindow(appId){
        let target = this.state.appList.find(app => app.appId == appId);
        if(!target.isRuning){
            return;
        }
        target.isRuning = false;
        this.setState({
            appList
        })
    }
    //展示将全屏
    WillMaxCtrl(value){
        let result = !this.state.willMax;
        if(typeof value !== 'undefined'){
            result = value;
        }
        this.setState({
            willMax: result
        })
    }
    //隐藏或显示某窗口
    winHideCtrl(appId, value){
        let target = this.state.appList.find(app => app.appId == appId);

        let result = !target.hide;
        if (typeof value !== 'undefined'){
            result = value;
        }
        target.hide = result;
        console.log(this.state.appList)
        this.setState({
            appList
        })
    }
    render(){
        let links = this.state.appList.map(app => (
            <Link openWindow={this.openWindow.bind(this)} key={app.appId} appItem={app} />
        ))
        let running = this.state.appList.filter(app => app.isRuning);

        let runningWindow = running.map(app => (
            <Window winHideCtrl={this.winHideCtrl.bind(this)} hide={app.hide} willMax={this.state.willMax} WillMaxCtrl={this.WillMaxCtrl.bind(this)} closeWindow={this.closeWindow.bind(this)} key={app.appId} appItem={app} />
        ))
        let runningFooter = running.map(app => (
            <FooterIcon winHideCtrl={this.winHideCtrl.bind(this)} key={app.appId} appItem={app}  />
        ))
        return (
            <div className="main" style={{backgroundImage: 'url('+ bg +')'}} id="main">
                {/*图标*/}
                <div className="mydiv">
                    <div className="windows">
                        <ul>
                            {links}
                        </ul>
                    </div>
                </div>
                {/*应用窗口*/}
                <div className="app-ceng">
                    <div className="app-list">
                        {this.state.willMax ? <div className="premax"></div> : ""}
                        {runningWindow}
                    </div>
                </div>
                {/*底部栏*/}
                <div className="win-down">
                    <div className="win-down-bg" style={{backgroundImage: `url(${bg})`}}></div>
                    <i></i>
                    <div className="win-down-body">
                        <Datetime />
                        <div className="win-task">
                            {runningFooter}
                        </div>
                        <div className="win-start">
                            <div className="win-start-icon">
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}