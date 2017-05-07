import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Auth from '../modules/Auth';

class Header extends Component {
  render() {
    return (
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__logo'>
              SK
            </div>
            <ul className='header__menu'>
              <li><NavLink exact to='/'>Home</NavLink></li>
              <li><NavLink to='/category'>Category</NavLink></li>
              <li><NavLink to='/post'>Post</NavLink></li>
              <li><NavLink to='/admin'>Admin</NavLink></li>
              {Auth.isUserAuthenticated() ? (
                <li><Link to='/logout'>Logout</Link></li>
              ) : (
                <span></span>
              )}
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
