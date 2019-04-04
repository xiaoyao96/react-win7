import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import lazy from '../public/lazy'
//所有页面
import Index from '../view/index/index'
const ministore = lazy('mymd/mymd', {})
export default class extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {/*<Route redirect='/' path='/*'/>*/}
                    <Route exact path='/' component={Index} />
                    <Route exact path='/ministore' component={ministore} />
                </Switch>
            </BrowserRouter>)
    }
}

