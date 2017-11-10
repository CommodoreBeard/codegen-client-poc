'use strict';

let expect = require('chai').expect
let defineSupportCode = require('cucumber').defineSupportCode;

defineSupportCode(function({ Then, When }) {

    When('I add a new pet', function () {
        return this.addPet();
    });

    Then('the http status should be {int}', function (status) {
        expect(this.lastResponseStatusCode()).to.equal(status);
    });
});