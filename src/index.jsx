import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


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
