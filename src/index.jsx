import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// modules
import Auth from './modules/Auth';

// blocks
import Header from './containers/Header'
import Footer from './containers/Footer'

import Home from './components/Home'
import Category from './components/Category'
import Post from './components/Post'
import Admin from './components/Admin'
import NotFound from './components/NotFound'

// CSS
import './bower/normalize-css/normalize.css'

import './css/style.sss';

class Logout extends Component {
  componentWillMount(){
    Auth.deauthenticateUser();
  }
  render() {
    return (
      <Redirect to="/"/>
    )
  }
}
class App extends Component {
  render() {
    return (
      <Router>
        <div className='page'>
          <Header/>
          <div className='page__content'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/category' component={Category} />
              <Route path='/post' component={Post} />
              <Route path='/admin' component={Admin} />
              <Route path='/logout' component={Logout}/>
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'));
