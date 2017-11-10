'use strict';
let {defineSupportCode} = require('cucumber');
let env = require('./env');
let Actor = require('./actor');
let nock = require('nock');

let World = function World() {

  nock(env.BASE_URL)
    .log(console.log)
    .post('/pet')
    .reply(204);

  let actor = new Actor(env.BASE_URL);

  this.addPet = function() {
    return actor.addSomePet();
  };

  this.lastResponseStatusCode = function () {
    if (!assertResponse()) { return null}
    return actor.lastResponse.status
  };

  function assertResponse() {
    return actor.lastResponse
  }
};

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(World)
});