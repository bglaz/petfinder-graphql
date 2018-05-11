"use strict";

const envResult = require('dotenv').config();
if (envResult.error) {
  throw envResult.error
}

const {mockServer, MockList, addMockFunctionToSchema} = require('graphql-tools');
const schema = require('../src/schema');

const server = mockServer(schema, {
  Int: () => 42,
  String: () => 'test string',
  Boolean: () => true,
  Float: () => 123.456
});

describe('breedList', () => {

  it('should return an error when missing required param `animal`', async () => {
    expect.assertions(1);
    const result = await
      server.query(`
        query breedList {
          breedList
        }
      `);

    expect(result).toMatchObject({errors: expect.any(Array)});
  });

  it('should return an error when `animal` param is not of type `AnimalType`', async () => {
    expect.assertions(1);
    const result = await
      server.query(`
        query breedList {
          breedList(animal: batbar)
        }
      `);

    expect(result).toMatchObject({errors: expect.any(Array)});
  });

  it('should return a list of strings', async () => {
    expect.assertions(1);
    const result = await
      server.query(`
        query breedList {
          breedList(animal: cat)
        }
      `);
    const {data: {breedList: res}} = result;

    expect(res).toEqual(['test string', 'test string']);
  });
});

describe('petGet', () => {
  it('should return an error when missing required param `id`', async () => {
    expect.assertions(1);
    const result = await
      server.query(`
        query petGet {
          petGet {
            id
          }
        }
      `);

    expect(result).toMatchObject({errors: expect.any(Array)});
  });

  it('should return an object of type `Pet` with all correct scalar types', async () => {
    expect.assertions(1);
    const result = await
      server.query(`
        query petGet {
          petGet(id: 333) {
            id
            shelterId
            shelterPetId
            name
            mix
            description
            breeds
          }
        }
      `);
    const {data: {petGet: res}} = result;

    expect(res).toMatchObject(
      {
        id: 42,
        shelterId: 'test string',
        shelterPetId: 'test string',
        name: 'test string',
        mix: true,
        description: 'test string',
        breeds: ['test string', 'test string']
      }
    );
  });
});
