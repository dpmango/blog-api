'use strict';

const Nodal = require('nodal');

class CreatePosts extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017040911444982;
  }

  up() {

    return [
      this.createTable("posts", [{"name":"user_id","type":"int"},{"name":"content","type":"text"},{"name":"title","type":"string"}])
    ];

  }

  down() {

    return [
      this.dropTable("posts")
    ];

  }

}

module.exports = CreatePosts;
