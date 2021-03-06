require("babel-register")({
  presets: ['es2015']
});
import fs from 'fs';
import path from 'path';
import { graphql }  from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';
var schema = require('./schema.js');
// Save JSON of full schema introspection for Babel Relay Plugin to use
  graphql(schema, introspectionQuery).then(function(result){
    if (result.errors) {
      console.error(
        'ERROR introspecting schema: ',
        JSON.stringify(result.errors, null, 2)
      );
    } else {
      fs.writeFileSync(
        path.join(__dirname, './schema.json'),
        JSON.stringify(result, null, 2)
      );
    }
  });


// Save user readable type system shorthand of schema
fs.writeFileSync(
  path.join(__dirname, './schema.graphql'),
  printSchema(schema)
);
