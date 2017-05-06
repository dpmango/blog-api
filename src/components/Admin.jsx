import React, { Component } from 'react';
import axios from 'axios';
import Auth from '../modules/Auth';

class AdminLoginForm extends Component {
  constructor(){
    super();

    this.state = {
      error: '',
      user: {
        username: '',
        password: ''
      }
    }

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  // Change user object and set state
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  createAuthToken() {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/access_tokens`, {
        grant_type: 'password',
        username: this.state.user.username,
        password: this.state.user.password
      })
      .then(res => {
        this.setState({
          error: ''
        });

        // save the token
        Auth.authenticateUser(res.data.data[0].access_token);

      })
      .catch(err => {
        if (err.response) {
          const error = err.response.data.meta.error.message;
          console.log(error);
          this.setState({
            error
          });
        }

      });
  }
  // Form submit handler
  processForm(event) {
    event.preventDefault();

    this.createAuthToken();
  }

  render() {
    return (
      <div className="container">
        <div className='admin-login'>
          <h2>Login to admin section</h2>
          {this.state.error}
          <form onSubmit={this.processForm} onChange={this.changeUser}>
            <div className='ui-input'>
              <label>Username</label>
              <input type='text' name='username' />
            </div>
            <div className='ui-input'>
              <label>Password</label>
              <input type='password' name='password' />
            </div>
            <button type='submit' className='btn btn--primary'>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

class AdminDashboard extends Component {
  render(){
    return (
      <h1>Hello admin</h1>
    );
  }
}

class Admin extends Component {
  constructor(){
    super()
    this.state = {
      isLoggedIn: false
    };
  }

  render() {
    let renderSubject = <AdminLoginForm/>

    if ( Auth.isUserAuthenticated() ) {
      renderSubject = <AdminDashboard/>
    }
    return (
      renderSubject
    );
  }
}

export default Admin;
