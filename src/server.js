const morgan = require("morgan");
const passport = require("./passport");
const schema = require("./schema");
const dotenv = require("dotenv");
const { authenticateJwt } = require('./passport');
const {isAuthenticated, setDate, storeUpload} = require('./middlewares');
const { PrismaClient } = require('@prisma/client');
const { GraphQLServer, PubSub} = require("graphql-yoga");



dotenv.config();
const prisma = new PrismaClient();
const pubsub = new PubSub();
const PORT = process.env.PORT || 4000;



const server = new GraphQLServer({ 
  schema,
  context: ({ request }) => ({ request, isAuthenticated, setDate, storeUpload, prisma, pubsub})
});
// resetPoint;
server.express.use(morgan("dev"));
server.express.use(authenticateJwt);



server.start({ port: PORT }, () => {
  console.log("server start");
});

//Q1: 왜 utils에서 resetPoint 를 이곳에 안가져왔음에도, 계속 실행이 되는가?