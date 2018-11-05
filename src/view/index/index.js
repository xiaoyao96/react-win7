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
            willMax: false,
            runList: []
        }
    }
    //打开应用
    openWindow(id){
        let target = this.state.runList.find(app => app.appId === id);
        if(target){
            this.winHideCtrl(id, false);
            this.focusWindow(id);
            return;
        }
        let newApp = JSON.parse(JSON.stringify(this.state.appList.find(app => app.appId === id)))
        this.state.runList.forEach(app => {app.focus = false});
        newApp.zIndex = this.state.runList.length + 1;
        newApp.focus = true;
        this.state.runList.push(newApp);
        this.setState({
            runList: this.state.runList
        })
    }
    //关闭应用
    closeWindow(id){
        let target = this.state.runList.find(app => app.appId === id);
        if(!target){
            return;
        }
        let closeAppIndex = this.state.runList.findIndex(app => app.appId === id);
        this.state.runList.splice(closeAppIndex,1);
        let nextCurrent = this.state.runList.find(app => app.zIndex === target.zIndex - 1)
        nextCurrent && (nextCurrent.focus = true);
        this.setState({
            runList: this.state.runList
        })
    }
    //应用获取焦点
    focusWindow(id){
        let target = this.state.runList.find(app => app.appId === id);
        if(!target){
            return;
        }
        let focusApp = target;

        this.state.runList.filter(app => {
            app.focus = false;
            return app.zIndex > focusApp.zIndex
        }).forEach(app => {
            if(app.appId != focusApp.appId){
                app.zIndex--;
            }
        })
        focusApp.focus = true;
        focusApp.zIndex = this.state.runList.length;
        this.setState({
            runList: this.state.runList
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
        let target = this.state.runList.find(app => app.appId === appId);
        let result = !target.hide;
        if (typeof value !== 'undefined'){
            result = value;
        }
        target.hide = result;
        this.setState({
            runList: this.state.runList
        })
    }
    render(){
        let links = this.state.appList.map(app => (
            <Link openWindow={this.openWindow.bind(this)} key={app.appId} appItem={app} />
        ))
        let running = this.state.runList;

        let runningWindow = running.map(app => (
            <Window focusWindow={this.focusWindow.bind(this)} winHideCtrl={this.winHideCtrl.bind(this)} willMax={this.state.willMax} WillMaxCtrl={this.WillMaxCtrl.bind(this)} closeWindow={this.closeWindow.bind(this)} key={app.appId} appItem={app} />
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