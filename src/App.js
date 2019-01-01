import React, {Component} from 'react';
import {GlobalStyle} from './style.js'
import {GlobalIcon} from './statics/iconfont/iconfont'
import Header from './common/header'
import store from './store'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom'

import Home from './pages/home/index'
import Detail from './pages/detail/loadable'
import Login from './pages/login/index'
import Write from './pages/write/index'


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route exact path="/" component={Home}></Route>
                        <Route path='/login' exact component={Login}></Route>
                        <Route path='/write' exact component={Write}></Route>
                        <Route exact path="/detail" component={Detail}></Route>
                    </div>
                </BrowserRouter>

                <GlobalStyle></GlobalStyle>
                <GlobalIcon></GlobalIcon>
            </Provider>
        );
    }
}

export default App;
