const envResult = require('dotenv').config();
if (envResult.error) {
  throw envResult.error
}

const express = require('express');

// This package automatically parses JSON requests.
const bodyParser = require('body-parser');

// This package will handle GraphQL server requests and responses
// for you, based on your schema.
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');

const schema = require('./schema')(process.env.API_KEY);

var app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`GraphQL server running on port ${PORT}.`)
});
