import { HashRouter, Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import lazy from '../public/lazy'

const ministore = lazy(() => import(`../myApp/mymd/mymd`), {})
const Index = lazy(() => import(`../view/index/index`), {})
export default class extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={Index} />
                    <Route exact path='/ministore' component={ministore} />
                </Switch>
            </HashRouter>)
    }
}

