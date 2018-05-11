"use strict";

const envResult = require('dotenv').config();
if (envResult.error) {
  throw envResult.error
}

const {mockServer} = require('graphql-tools');
const schema = require('../src/schema');

const mockedTypes = {
  Int: 42,
  String: 'test string',
  Boolean: true,
  Float: 123.456,
  AnimalOptions: 'noDogs',
  AnimalAge: 'Senior',
  AnimalGender: 'F',
  AnimalSize: 'L'
}

const server = mockServer(schema, {
  Int: () => mockedTypes['Int'],
  String: () => mockedTypes['String'],
  Boolean: () => mockedTypes['Boolean'],
  Float: () => mockedTypes['Float'],
  AnimalOptions: () => mockedTypes['AnimalOptions'],
  AnimalAge: () => mockedTypes['AnimalAge'],
  AnimalGender: () => mockedTypes['AnimalGender'],
  AnimalSize: () => mockedTypes['AnimalSize']
});

module.exports = {
    server,
    mockedTypes
}