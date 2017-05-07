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

        // reload
        window.location.href='/admin'
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
  constructor() {
    super();

    this.state = {
      posts: []
    };

  }

  getPosts(){
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts`)
      .then(res => {
        const posts = res.data.data;
        this.setState({ posts });
      });
  }

  handleDeleteClick(e, post){
    e.preventDefault();

    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_ENDPOINT}/posts/${post}`,
      data: {
        access_token: Auth.getToken()
      }
      })
      .then(res => {
        console.log(res);
        const posts = res.data.data[0].id;
        // update the state
        this.setState({
          posts: this.state.posts.filter((val, i) => {
            return val.id !== posts
          })
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleEditClick(e, post){
    e.preventDefault();
    console.log(post);
  }

  // Component lifecycle
  componentDidMount() {
    this.getPosts();
  }


  render(){
    return (
      <div className='container'>
        <h1>Manage posts</h1>
        <h1> All {this.state.posts.length} posts </h1>
        {this.state.posts.map(post =>
          <div key={post.id}>
            <h3>{post.id}: {post.title}</h3>
            <div className=''>
              {post.content}
            </div>
            <div>
              Author: {post.user.username}
            </div>
            <div>
              <a href='#' className='btn btn--primary' onClick={(e) => this.handleDeleteClick(e, post.id)}>удалить</a>
              <a href='#' className='btn btn--primary' onClick={(e) => this.handleEditClick(e, post.id)}>редактировать</a>
            </div>
        </div>
        )}
      </div>
    );
  }
}

class Admin extends Component {
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
