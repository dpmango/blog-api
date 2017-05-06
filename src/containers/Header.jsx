import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/category'>Category</Link></li>
              <li><Link to='/post'>Post</Link></li>
              <li><Link to='/admin'>Admin</Link></li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
