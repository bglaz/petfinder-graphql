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

type Breed {
  name: String!
  animalType: AnimalType!
}

type Query {
  allBreeds(animal: AnimalType): [Breed!]!
}
`;


module.exports = makeExecutableSchema({typeDefs, resolvers});
