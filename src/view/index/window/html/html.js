import React from 'react'
import style from './html.scss'
import classnames from 'classnames'
export default class Html extends React.Component{
    constructor(props){
        super(props);
        this.loadFinish = this.loadFinish.bind(this);
        this.loadError = this.loadError.bind(this);
        this.state = {
            loading: true,
            err: false
        }
    }
    loadFinish(){
        this.setState({
            loading: false
        })
    }
    loadError(){
        this.setState({
            loading: false,
            err: true
        })
    }
    componentDidMount(){

    }
    render(){
        return (
            <div className={style["ifr-box"]}>
                <iframe ref="ifr" onError={this.loadError} onLoad={this.loadFinish} className={style.body}  src={this.props.url}>
                </iframe>
                <div className={classnames({[style.loading]: true, [style.hide]: !this.state.loading})}>B</div>
            </div>
        )
    }
}