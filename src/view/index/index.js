import React from 'react'
import style from './index.scss'
import bg from '../../imgs/img0.jpg'
import Link from './link/link'
import Window from './window/window'
import FooterIcon from './footerIcon/footerIcon'
import Datetime from './datetime/datetime'
import Menu from '../../components/menu/menu'
import MenuArea from '../../components/menuArea/menuArea'
import appList from '../../public/appList.js'
export default class Index extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            appList,
            willMax: false,
            runList: []
        }
        document.onkeypress = (e) => {
            if(e.code === 'Enter' || e.which === 13 || e.keyCode === 13){
                let target = document.querySelector(':focus');
                console.log(target)
                // this.openWindow();
            }
        }
        this.Ajax('users/login', 'post', {
            username: 'admin',
            userpwd: '102014'
        }).then(console.log);
    }
    //打开应用
    openWindow(id) {
        let target = this.state.runList.find(app => app.detail.appId === id);
        if (target) {
            this.winHideCtrl(id, false);
            this.focusWindow(id);
            return;
        }
        let newApp = appList.find(app => app.appId === id);
        let obj = {
            detail: newApp
        }
        this.state.runList.forEach(app => {
            app.focus = false
        });
        obj.zIndex = this.state.runList.length + 1;
        obj.focus = true;
        this.state.runList.push(obj);
        this.setState({
            runList: this.state.runList
        })
    }

    //关闭应用
    closeWindow(id) {
        let target = this.state.runList.find(app => app.detail.appId === id);
        if (!target) {
            return;
        }
        let closeAppIndex = this.state.runList.findIndex(app => app.detail.appId === id);
        this.state.runList.splice(closeAppIndex, 1);
        let nextCurrent = this.state.runList.find(app => app.zIndex === target.zIndex - 1)
        nextCurrent && (nextCurrent.focus = true);
        this.setState({
            runList: this.state.runList
        })
    }

    //应用获取焦点
    focusWindow(id) {
        let target = this.state.runList.find(app => app.detail.appId === id);
        if (!target) {
            return;
        }
        let focusApp = target;
        this.state.runList.filter(app => {
            app.focus = false;
            return app.zIndex > focusApp.zIndex
        }).forEach(app => {
            if (app.detail.appId != focusApp.detail.appId) {
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
    WillMaxCtrl(value) {
        let result = !this.state.willMax;
        if (typeof value !== 'undefined') {
            result = value;
        }
        this.setState({
            willMax: result
        })
    }

    //点击底部图标
    footerIconClick(id) {
        let target = this.state.runList.find(app => app.detail.appId === id);
        if (!target) {
            return;
        }
        if (!target.focus) {
            if (target.hide) {
                this.winHideCtrl(id);
            }
            this.focusWindow(id);
            return;
        }
        this.winHideCtrl(id);
    }

    //隐藏或显示某窗口
    winHideCtrl(appId, value) {
        let target = this.state.runList.find(app => app.detail.appId === appId);
        let result = !target.hide;
        if (typeof value !== 'undefined') {
            result = value;
        }
        target.hide = result;
        if (result === true) {
            target.focus = false;
            let nextCurrent = this.state.runList.find(app => app.zIndex === target.zIndex - 1)
            nextCurrent && (nextCurrent.focus = true);
        }
        this.setState({
            runList: this.state.runList
        })
    }

    //移动中处理
    changeMovingState(state) {
        switch (state) {
            case 'start':
                this.setState({
                    moving: true
                })
                break;
            case 'end':
                this.setState({
                    moving: false
                })
                break;
        }
    }
    static hideMenu(){
        window.getMenu().setState({show: false})
    }
    saveComponent(ele, id){
        let target = this.state.runList.find(app => app.detail.appId === id);
        if(!target){
            return;
        }
        target.ele = ele;
    }
    render() {
        this.menu = [
            {
                value: '刷新',
                click: _ => {
                    this.setState({
                        appList: []
                    })
                    setTimeout(_ => {
                        this.setState({
                            appList
                        })
                    },100)
                }
            },
            {
                value: '进入全屏',
                click: this.requestFullScreen
            },
            {
                value: '退出全屏',
                click: this.exitFullscreen
            }
        ]
        let links = this.state.appList.map(app => (
            <Link openWindow={this.openWindow.bind(this)} key={app.appId} appItem={app}/>
        ))
        let running = this.state.runList;
        let runningWindow = running.map(app => (
            <Window moving={this.state.moving} changeMovingState={this.changeMovingState.bind(this)}
                    focusWindow={this.focusWindow.bind(this)} winHideCtrl={this.winHideCtrl.bind(this)}
                    willMax={this.state.willMax} WillMaxCtrl={this.WillMaxCtrl.bind(this)}
                    closeWindow={this.closeWindow.bind(this)} key={app.detail.appId} appItem={app} saveComponent={this.saveComponent.bind(this)}/>
        ))
        let runningFooter = running.map(app => (
            <FooterIcon footerIconClick={this.footerIconClick.bind(this)} key={app.detail.appId} appItem={app}/>
        ))
        return (
                <div onMouseDown={Index.hideMenu} className={style.main}>

                    {/*图标*/}

                    <div className={style.mydiv}>
                        <MenuArea menu={this.menu}>
                            <div className={style.windows}>
                                <ul>
                                    {links}
                                </ul>
                            </div>
                        </MenuArea>
                    </div>


                    {/*应用窗口*/}
                    <div className={style['app-ceng']}>
                        <div className={style['app-list']}>
                            {this.state.willMax ? <div className={style.premax}></div> : ""}
                            {runningWindow}
                        </div>
                    </div>
                    {/*底部栏*/}
                    <div className={style['win-down']}>
                        <div className={style['win-down-bg']} style={{backgroundImage: `url(${bg})`}}></div>
                        <i></i>
                        <div className={style['win-down-body']}>
                            <Datetime/>
                            <div className={style['win-task']}>
                                {runningFooter}
                            </div>
                            <div className={style['win-start']}>
                                <div className={style['win-start-icon']}>
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Menu />
                </div>
        )
    }
}