"use strict";

const axios = require('axios');

const API_KEY = '2e4f2fb330d06494b863066ce7a1b1e6';
const API_ENDPOINT = 'http://api.petfinder.com';

const execQuery = function(method, args)
{
  return axios.get(`${API_ENDPOINT}/${method}`, {
    params: {...args, format: 'json', key: API_KEY}
    }
  );
};

module.exports = {
  Query: {

    async breedList(_, args) {
      const method = 'breed.list',
        results = await execQuery(method, args),
        rawBreedList = results.data.petfinder.breeds.breed;

      return rawBreedList.map( (breed) => breed['$t'] );
    },

    async petGetRandom(_, args) {
      const method = 'pet.getRandom',
        results = await execQuery(method, {output: 'full', ...args}),
        rawData = results.data.petfinder.pet;

        return {
          id: rawData.id['$t'],
          shelterPetId: rawData.shelterPetId['$t'],
          age: rawData.age['$t'],
          name: rawData.name['$t'],
          sex: rawData.sex['$t'],
          size: rawData.size['$t'],
          status: rawData.status['$t'],
          description: rawData.description['$t'],
          animal: rawData.animal['$t'].toLowerCase(),
          breeds: rawData.breeds.breed.length ? rawData.breeds.breed.map( (breed) => breed['$t']) : [rawData.breeds.breed['$t']]
        }
    }
  }
};
