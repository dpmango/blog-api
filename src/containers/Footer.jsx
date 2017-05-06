import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <footer className='footer'>
        <div className='container'>
          <div className='footer__wrapper'>
            <div className='footer__copy'>
              @ SK 2017. All right reserved.
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Header;
