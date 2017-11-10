'use strict';

let SwaggerPetstore = require('swagger_petstore');

function Actor(baseUrl) {

    this.baseUrl = baseUrl;
    this.lastResponse = null;
    let self = this;

    let apiClient = new SwaggerPetstore.ApiClient();
    apiClient.basePath = this.baseUrl;
    let petApi = new SwaggerPetstore.PetApi(apiClient);

    this.addSomePet = function() {

        let pet = new SwaggerPetstore.Pet('Connie', 'http://doesnotexist.org');

        return new Promise(function(resolve, reject) {
            petApi.addPet(pet, function(error, data, response) {
                if (error) {
                    reject(error);
                } else {
                    self.lastResponse = response;
                    resolve(response);
                }
            })
        });
    };
}
module.exports = Actor;
