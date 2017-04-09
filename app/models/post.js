'use strict';

const Nodal = require('nodal');
const User = Nodal.require('app/models/user.js');

class Post extends Nodal.Model {}

Post.setDatabase(Nodal.require('db/main.js'));
Post.setSchema(Nodal.my.Schema.models.Post);

Post.joinsTo(User, {multiple: true}); // belongs_to && has_many

Post.validates('content', 'must me at least 10 characters', v => v && v.length >= 10 );
Post.validates('title', 'must me at least 10 characters', v => v && v.length >= 10 );

module.exports = Post;
