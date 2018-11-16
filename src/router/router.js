import {HashRouter, Route, Switch} from 'react-router-dom'
import React, {Component} from 'react'

//所有页面
import Index from '../view/index/index'

export default class Router extends Component{
    render(){
        return (
            <HashRouter>
                <Switch>
                    {/*<Route redirect='/' path='/*'/>*/}
                    <Route exact path='/' component={Index} />

                </Switch>
            </HashRouter>)
    }
}

