# OpenAPI client codegen test framework proof of concept

## Purpose
This framework is intended to act as a proof of concept for building test frameworks in the following tool chain:
- [CucumberJS](https://github.com/cucumber/cucumber-js)
- [swagger-codegen](https://github.com/swagger-api/swagger-codegen) auto generate api client libraries
- Some assertion library (e.g. [Chai](http://chaijs.com/))

## Description
Two tests can be found in `features/pet.feature`. Both tests make http requests to a `/pet` endpoint using the auto generated client library included as an [npm dependency](https://www.npmjs.com/package/swagger_petstore)

To save complication I have simply stubbed the server using [nock](https://github.com/node-nock/nock). The stub can be found in `features/support/world.js`:
```javascript
nock(env.BASE_URL)
        .log(console.log)
        .post('/pet')
        .reply(204);
```
With this stub it is clear that one of the tests should pass and one should fail.

## Actor abstraction
I have added an extra layer of abstraction in the form of `Actor.js` the reason for this to create an actor module which is not coupled to the cucumber framework. The alternative to this would be including properties and methods for api interaction in `World.js` or even in a step-definition directly.

With the extra layer of abstraction it is plausible that the Actor module can be required by other frameworks.

## Running the tests
First install dependencies
```bash
npm install
```

Then use the npm test script to run the tests
```bash
npm test
```

or if you want to use the cucumber runner directly:
```bash
./node_modules/.bin/cucmber.js
```

the output should look something like:
```
..matching http://localhost:5100/pet to POST http://localhost:5100/pet: true
.F

Failures:

1) Scenario: fail case: Post a new pet to the /pet endpoint # features/pet.feature:9
   ✔ When I add a new pet # features/step_definitions/pet_steps.js:8
   ✖ Then the http status should be 200 # features/step_definitions/pet_steps.js:12
       AssertionError
           + expected - actual

           -204
           +200

           at World.<anonymous> (/Users/joseph.hughes/git/other/codegen-client-poc/features/step_definitions/pet_steps.js:13:50)

2 scenarios (1 failed, 1 passed)
4 steps (1 failed, 3 passed)
0m00.025s
npm ERR! Test failed.  See above for more details.
```