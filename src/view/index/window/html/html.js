import React from 'react'
import style from './html.scss'
import classnames from 'classnames'
export default class Html extends React.Component{
    state = {
        loading: true,
        err: false
    }
    loadFinish = () => {
        this.setState({
            loading: false
        })
    }
    loadError = () => {
        this.setState({
            loading: false,
            err: true
        })
    }

    render(){
        let isPc = false;
        let s = {}
        if(window.navigator && window.navigator.userAgent.toLocaleLowerCase().indexOf('windows') > -1){
            s = {
                overflow: 'hidden'
            }
            isPc = true
        }
        return (
            <div className={style["ifr-box"]}>
                <div style={s} className={style["ifr-scroll"]}>
                    <iframe title="window" style={{height: isPc ? "auto" : "100000px"}} ref="ifr" onError={this.loadError} onLoad={this.loadFinish} className={style.body}
                            scrolling="auto" frameBorder="0" src={this.props.url}>
                    </iframe>
                </div>
                <div className={classnames({[style.loading]: true, [style.hide]: !this.state.loading})}>B</div>
            </div>
        )
    }
}