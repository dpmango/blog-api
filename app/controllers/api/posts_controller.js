'use strict';

const Nodal = require('nodal');
const Post = Nodal.require('app/models/post.js');
const AuthController = Nodal.require('app/controllers/auth_controller.js')

class PostsPostsController extends AuthController {

  index() {

    Post.query()
      .join('user')
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models, ['id', 'content', 'title', 'created_at', {user: ['id', 'username', 'created_at']} ]);

      });

  }

  show() {

    Post.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    this.authorize((accessToken, user) => {

      // get user id for auth param
      this.params.body.user_id = user.get('id');

      Post.create(this.params.body, (err, model) => {

        this.respond(err || model);

      });

    });

  }

  update() {

    Post.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    this.authorize((accessToken, user) => {

      // get user id for auth param
      this.params.body.user_id = user.get('id');

      Post.find(this.params.route.id, (err, model) => {

        if ( model.get('user_id') == user.get('id') ){
          Post.destroy(this.params.route.id, (err, model) => {
            this.respond(err || model);
          });
        } else {
          this.respond('not permited')
        }
      } )

    });

  }

}

module.exports = PostsPostsController;
