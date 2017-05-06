import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts`)
      .then(res => {
        const posts = res.data.data;
        this.setState({ posts });
      });
  }

  render() {
    return (
      <div className='container'>
        <h1> All {this.state.posts.length} posts </h1>
        {this.state.posts.map(post =>
          <div key={post.id}>
            <h3>{post.title}</h3>
            <div className=''>
              {post.content}
            </div>
            Author: {post.user.username}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
