const {makeExecutableSchema} = require('graphql-tools');

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

"""
S = Small, M = Medium, L = Large, XL = Extra Large
"""
enum AnimalSize {
  S
  M
  L
  XL
}

enum AnimalOptions {
  specialNeeds
  noDogs
  noCats
  noKids
  noClaws
  hasShots
  housetrained
  altered
}

"""
A = Adoptable, H = Hold, P = Pending, X = Adopted / Removed
"""
enum AnimalStatus {
  A
  H
  P
  X
}

"""
M = Male, F = Female
"""
enum AnimalGender {
  M
  F
}

"""
Age of the animal
"""
enum AnimalAge {
  Baby
  Young
  Adult
  Senior
}

type Pet {
  id: Int!
  shelterId: String
  shelterPetId: String
  options: [AnimalOptions!]
  age: AnimalAge
  name: String!
  mix: Boolean
  sex: AnimalGender!
  size: AnimalSize!
  photos(size: PhotoSize): [Photo!]
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
  country: String
  phone: String
  fax: String
  email: String
  longitude: Float
  latitude: Float
  pets(status: AnimalStatus, offset: Int = 0, count: Int = 25): [Pet!]
}

type Photo {
  id: Int!
  """
  Width of the photo in pixels
  """
  size: Int!
  url: String!
}

"""
Possible photo widths to query
"""
enum PhotoSize {
  WIDTH_500
  WIDTH_300
  WIDTH_95
  WIDTH_60
  WIDTH_50
}


type Query {

  """
  Returns a list of breeds for a particular animal.
  """
  breedList(animal: AnimalType!): [String!]!

  """
  Returns a record for a single pet.
  """
  petGet(id: Int!): Pet!

  """
  Returns a record for a randomly selected pet.
  You can choose the characteristics of the pet you want returned using the various arguments to this method.
  """
  petGetRandom(
    count: Int = 1, animal: AnimalType, breed: String, size: AnimalSize, sex: AnimalGender, location: String, shelterid: String
  ): [Pet!]

  """
  Searches for pets according to the criteria you provide and returns a collection of pet records matching your search.
  The results will contain at most count records per query, and a lastOffset tag.
  To retrieve the next result set, use the lastOffset value as the offset to the next pet.find call.
  """
  petFind(
    animal: AnimalType, breed: String, size: AnimalSize, sex: AnimalGender, location: String!, age: AnimalAge, offset: Int = 0, count: Int = 25
  ): [Pet!]

  """
  Returns a collection of shelter records matching your search criteria.
  """
  shelterFind(
    location: String!, name: String, offset: Int = 0, count: Int = 25
  ): [Shelter!]

  """
  Returns a record for a single shelter.
  """
  shelterGet(id: String!): Shelter!

  """
  Returns a collection of pet records for an individual shelter
  """
  shelterGetPets(id: String!, status: AnimalStatus, offset: Int = 0, count: Int = 25): [Pet!]

}
`;

module.exports = function(apiKey) {
    const resolvers = require('./resolvers')(apiKey);
    return makeExecutableSchema({typeDefs, resolvers})
};
