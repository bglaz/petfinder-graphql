"use strict";

const axios = require('axios');
const API_ENDPOINT = 'http://api.petfinder.com';

const createResolvers = function(API_KEY) {

  if( ! API_KEY )
  {
    throw new Error("You must provide an API");
  }

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

  const parsePetfinderPet = function(pet) {
    return {
      id: pet.id['$t'],
      shelterPetId: pet.shelterPetId['$t'],
      shelterId: pet.shelterId['$t'],
      options: pet.options.option ? ( pet.options.option.length ? pet.options.option.map( (option) => option['$t']) : [pet.options.option['$t']] ) : null,
      age: pet.age['$t'],
      name: pet.name['$t'],
      mix: pet.mix['$t'] === 'yes',
      sex: pet.sex['$t'],
      size: pet.size['$t'],
      photos: parsePetPhotos(pet.media.photos),
      status: pet.status['$t'],
      description: pet.description['$t'],
      animal: pet.animal['$t'].toLowerCase(),
      breeds: pet.breeds.breed.length ? pet.breeds.breed.map( (breed) => breed['$t']) : [pet.breeds.breed['$t']],
      contact: parsePetfinderObj(pet.contact)
    }
  };

  const parsePetPhotos = function(photosObj)
  {
    const sizeMap = {
      'pnt': 60,
      'fpm': 95,
      'x': 500,
      'pn': 300,
      't': 50
    };

    if(photosObj.photo.length)
    {
      return photosObj.photo.map( function(photo) {
        return {id: photo['@id'], size: sizeMap[ photo['@size'] ], url: photo['$t']}
      });
    } else {
      return [ {id: photosObj.photo['@id'], size: sizeMap[ photosObj.photo['@size'] ], url: photosObj.photo['@t'] } ];
    }
  };


  const queries = {
    async breedList(_, args) {
      const method = 'breed.list',
        results = await execQuery(method, args),
        rawBreedList = results.data.petfinder.breeds.breed;

      return rawBreedList.map( (breed) => breed['$t'] );
    },

    async petGet(_, args) {
      const method = 'pet.get',
        results = await execQuery(method, args),
        rawData = results.data.petfinder.pet;

      return parsePetfinderPet(rawData);
    },

    async petGetRandom(_, args) {
      const method = 'pet.getRandom',
        results = await execQuery(method, {output: 'full', ...args}),
        rawData = results.data.petfinder.pet;

      return parsePetfinderPet(rawData);
    },

    async petFind(_, args)
    {
      const method = 'pet.find',
        results = await execQuery(method, {output: 'full', ...args}),
        rawData = results.data.petfinder.pets.pet;

      return rawData.length ? rawData.map( (pet) => parsePetfinderPet(pet) ) : [parsePetfinderPet(rawData)];
    },

    async shelterFind(_, args)
    {
      const method = 'shelter.find',
        results = await execQuery(method, args),
        rawData = results.data.petfinder.shelters.shelter;

      return rawData.length ? rawData.map( (shelter) => parsePetfinderObj(shelter) ) : [parsePetfinderObj(rawData)];
    },

    async shelterGet(_, args) {
      const method = 'shelter.get',
        results = await execQuery(method, args),
        requestStatus = results.data.petfinder.header.status.code['$t'],
        rawData = results.data.petfinder.shelter;

      if(requestStatus !== '100')
      {
        return null;
      }

      return parsePetfinderObj(rawData);
    },

    async shelterGetPets(_, args) {
      const method = 'shelter.getPets',
        results = await execQuery(method, args),
        rawData = results.data.petfinder.pets.pet;

      return rawData.length ? rawData.map( (pet) => parsePetfinderPet(pet) ) : [parsePetfinderPet(rawData)];
    }
  }

  return {
    Query: queries,
    Pet: {
      async shelter({shelterId}) {
        if( ! shelterId )
        {
          return null;
        }
  
        return queries.shelterGet(null, {id: shelterId});
      },
  
      photos({photos}, {size}) {
        if( ! size )
        {
          return photos;
        }
        return photos.filter( (photo) => photo.size == size.replace('WIDTH_', ''));
      }
    },
  
    Shelter: {
      async pets({id}, args) {
        return queries.shelterGetPets(null, {id, ...args});
      }
    }
  };
};


module.exports = function(apiKey) {
    return createResolvers(apiKey);
};
