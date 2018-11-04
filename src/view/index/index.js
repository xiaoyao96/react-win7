import React from 'react'
import './index.scss'
import bg from '../../imgs/img0.jpg'
import Link from '../../components/link/link'
import Window from '../../components/window/window'
import FooterIcon from  '../../components/footerIcon/footerIcon'
import appList from '../../public/appList'
export default class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            appList
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
    render(){
        console.log('update')
        let links = this.state.appList.map(app => (
            <Link openWindow={this.openWindow.bind(this)} key={app.appId} appItem={app} />
        ))
        let running = this.state.appList
            .filter(app => app.isRuning);

        let runningWindow = running.map(app => (
            <Window closeWindow={this.closeWindow.bind(this)} key={app.appId} appItem={app} />
        ))
        let runningFooter = running.map(app => (
            <FooterIcon key={app.appId} appItem={app}  />
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
                        {runningWindow}
                    </div>
                </div>
                {/*底部栏*/}
                <div className="win-down">
                    <div className="win-down-bg"></div>
                    <i></i>
                    <div className="win-down-body">
                        <div className="win-datetime">
                            <p>

                            </p>
                            <p>

                            </p>
                        </div>
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