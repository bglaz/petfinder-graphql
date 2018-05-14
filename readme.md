This package provides a GraphQL schema for the [Petfinder.com](https://www.petfinder.com/developers/api-docs). You will need to register an account to get an API key [Here](https://www.petfinder.com/developers/api-key)

# Installation

```javascript
$ npm install petfinder-graphql
```

# Usage

```javascript
const schema = require('petfinder-graphql')('API_KEY_HERE');

//Sample using apollo-server-express
const express = require('express');

// This package automatically parses JSON requests.
const bodyParser = require('body-parser');

// This package will handle GraphQL server requests and responses
// for you, based on your schema.
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');

var app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`GraphQL server running on port ${PORT}.`)
});
````

# Testing
````javascript
$ npm test
````