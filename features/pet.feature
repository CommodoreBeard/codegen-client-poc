Feature: Adding a pet
  As a service actor
  I want a success response for the add pet endpoint

  Scenario: success case: Post a new pet to the /pet endpoint
    When I add a new pet
    Then the http status should be 204

  Scenario: fail case: Post a new pet to the /pet endpoint
    When I add a new pet
    Then the http status should be 200