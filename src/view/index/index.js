import React from 'react'
import style from './index.scss'
import bg from '../../imgs/img0.jpg'
import Link from './link/link'
import Window from './window/window'
import FooterIcon from './footerIcon/footerIcon'
import Datetime from './datetime/datetime'
import Login from './login/login'
import Menu from '../../components/menu/menu'
import MenuArea from '../../components/menuArea/menuArea'
import appList from '../../public/appList.js'
import { connect } from 'react-redux'
import querystring from 'querystring';
console.log(1)
class Index extends React.Component {
    state = {
        appList,
        willMax: false,
        runList: []
    }
    componentDidMount(){
        let query = querystring.parse(window.location.hash.split('?').pop());
        this.Ajax('/visited', 'post', {
            from: query.from
        })
    }
    WillMaxCtrl(result){
        this.setState({
            willMax: result
        })
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
            <Link key={app.appId} appItem={app}/>
        ))
        let running = this.props.runList;
        let runningWindow = running.map(app => (
            <Window WillMaxCtrl={this.WillMaxCtrl.bind(this)} willMax={this.state.willMax} key={app.detail.appId} appItem={app}/>
        ))
        let runningFooter = running.map(app => (
            <FooterIcon key={app.detail.appId} appItem={app}/>
        ))
        return (
                <div className={style.main}>
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
                    {/*欢迎页*/}
                    <Login />
                </div>
        )
    }
}


export default connect(
    state => {
        return {
            runList: state.runList
        }
    },null)(Index)