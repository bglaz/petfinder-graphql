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
  shelterPetId: String
  age: String!
  name: String!
  sex: AnimalGender!
  size: AnimalSize!
  status: AnimalStatus!
  description: String
  animal: AnimalType!
  breeds: [String!]
}

type Query {
  breedList(animal: AnimalType!): [String!]!
  petGetRandom: Pet!
}
`;


module.exports = makeExecutableSchema({typeDefs, resolvers});
