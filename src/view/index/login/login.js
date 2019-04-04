import React from 'react';
import style from './login.scss';
import classnames from 'classnames';
export default class Login extends React.Component{
    state = {
        num: 0
    }
    componentDidMount(){
        this.barLoad();
    }
    barLoad = () => {
        if(this.state.num < 100){
            this.setState({
                num: this.state.num + 1
            }, _ => {
                setTimeout(this.barLoad,10)
            })
        }else{
            setTimeout(_ => {
                this.setState({
                    hide: true
                });
                // setTimeout(_ => {
                //     this.props.removeLogin();
                // }, 1000)
            }, 1000)
        }
    }
    render(){
        return (
            <div className={classnames({[style.loading]: true, [style.hide]: this.state.hide})}>
                <div className={style["loadding-content"]}>
                    <div className={style.spinner}>
                        <div style={{backgroundColor: '#F36422'}}></div>
                        <div style={{backgroundColor: '#8DC53E'}}></div>
                        <div style={{backgroundColor: '#00ADEF'}}></div>
                        <div style={{backgroundColor: '#FFC30D'}}></div>
                    </div>
                    <div className={style["loading-bar"]}>
                        <p>{this.state.num === 100 ? '欢迎使用' : '正在加载资源'}</p>
                        <div style={{width: this.state.num + '%'}} className={style.bar}>
						<span>
                            {this.state.num}%
						</span>
                        </div>
                    </div>
                    <p><span>Windows7 Web版</span>&nbsp;&nbsp;&nbsp;正在启动</p>
                </div>
            </div>
        )
    }
}