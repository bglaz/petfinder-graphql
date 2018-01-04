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

const parsePetfinderObj = function(obj) {
  let result = {};

  if(obj) {
    Object.keys(obj).forEach(function (key) {
      result[key] = obj[key] ? obj[key]['$t'] : null;
    });
  }

  return result ? result : null;
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
          shelterId: rawData.shelterId['$t'],
          age: rawData.age['$t'],
          name: rawData.name['$t'],
          mix: rawData.mix['$t'] === 'yes',
          sex: rawData.sex['$t'],
          size: rawData.size['$t'],
          status: rawData.status['$t'],
          description: rawData.description['$t'],
          animal: rawData.animal['$t'].toLowerCase(),
          breeds: rawData.breeds.breed.length ? rawData.breeds.breed.map( (breed) => breed['$t']) : [rawData.breeds.breed['$t']],
          contact: parsePetfinderObj(rawData.contact)
        }
    }
  },

  Pet: {
    async shelter({shelterId}) {
      if( ! shelterId )
      {
        return null;
      }
      const method = 'shelter.get',
        results = await execQuery(method, {id: shelterId}),
        requestStatus = results.data.petfinder.header.status.code['$t'],
        rawData = results.data.petfinder.shelter;

      if(requestStatus !== '100')
      {
        return null;
      }

      return parsePetfinderObj(rawData);
    }
  }
};
