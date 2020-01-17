import { mergeResolvers } from 'merge-graphql-schemas';
import {ApolloServer} from 'apollo-server-express'
import express from 'express';
import bodyParser  from "body-parser";
import { createServer } from 'http';
// environment 
const envJSON = require('./.env.info.json');
var node_env = process.env.NODE_ENV || 'development';
const port =envJSON[node_env].PORT;
var node_env = process.env.NODE_ENV || 'development';
const websocket = envJSON[node_env].WEBSOCKET;
//****************   SCHEMA   ****************** */

import typeDefs from './data/schema';
//********************************************+* */
//********************* RESOLVERS *************+ */
//********************************************+* */
import { resolvers  as resolversUser} from "./data/resolvers/user";

//********************************************+* */
//********************* END RESOLVERS ********** */
//********************************************+* */
const app = express();
const server=new ApolloServer({
  typeDefs:typeDefs,
  resolvers:mergeResolvers([resolversUser]),
})
app.use(express.static('public'));
app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))
server.applyMiddleware({app})
const httpServer = createServer(app);
httpServer.listen(port,()=>{
  console.log(`el servidor is work in  ${server.graphqlPath}`)

})


