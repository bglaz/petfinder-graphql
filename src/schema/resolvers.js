"use strict";

const axios = require('axios');

const API_KEY = '2e4f2fb330d06494b863066ce7a1b1e6';
const API_ENDPOINT = 'http://api.petfinder.com';

const execQuery = function(method, args)
{
  return axios.get(`${API_ENDPOINT}/${method}`, {
    params: Object.assign({}, args, {format: 'json', key: API_KEY})
    }
  );
};

module.exports = {
  Query: {
    async allBreeds(_, args) {
      const method = 'breed.list',
        results = await execQuery(method, args),
        rawBreedList = results.data.petfinder.breeds.breed;

      return rawBreedList.map( function(breed) { return  {name: breed['$t'], animalType: args.animal} });
    }
  }
};
