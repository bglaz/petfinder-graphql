const {makeExecutableSchema} = require('graphql-tools');
const resolvers = require('./resolvers');

// Define your types here.
const typeDefs = `

enum AnimalType {
  barnyard
  bird
  cat
  dog
  horse
  reptile
  smallfurry
}

enum AnimalSize {
  S
  M
  L
  XL
}

enum AnimalStatus {
  A
  H
  P
  X
}

enum AnimalGender {
  M
  F
}

type Pet {
  id: Int!
  shelterId: String
  shelterPetId: String
  age: String!
  name: String!
  mix: Boolean
  sex: AnimalGender!
  size: AnimalSize!
  status: AnimalStatus!
  description: String
  animal: AnimalType!
  breeds: [String!]
  contact: Contact!
  shelter: Shelter
}

type Contact {
  phone: String
  fax: String
  address1: String
  address2: String
  city: String
  state: String
  zip: String
  email: String
}

type Shelter {
  id: String!
  name: String!
  address1: String
  address2: String
  city: String
  state: String
  zip: String
  phone: String
  fax: String
  email: String
  longitude: Float
  latitude: Float
}


type Query {
  breedList(animal: AnimalType!): [String!]!
  petGetRandom(
    animal: AnimalType, breed: String, size: AnimalSize, sex: AnimalGender, location: String, shelterid: String
  ): Pet!
}
`;

module.exports = makeExecutableSchema({typeDefs, resolvers});
