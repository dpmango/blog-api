'use strict';

const Nodal = require('nodal');
const AccessToken = Nodal.require('app/models/access_token.js');

class ApiAccessTokensController extends Nodal.Controller {

  index(){
    AccessToken.query()
      .where(this.params.query)
      .end((err, models) => {
        this.respond(err || models);
      });
  }

  create() {
    AccessToken.login(this.params, (err, accessToken) => {
      this.respond(err || accessToken)
    });
  }

  destroy() {
    AccessToken.logout(this.params, (err, accessToken) => {
      this.respond(err || accessToken);
    });
  }

}

module.exports = ApiAccessTokensController;
