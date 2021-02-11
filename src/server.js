const morgan = require("morgan");
const passport = require("./passport");
const schema = require("./schema");
const dotenv = require("dotenv");
const { authenticateJwt } = require('./passport');
const { PrismaClient } = require('@prisma/client');
const { GraphQLServer} = require("graphql-yoga");


dotenv.config();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;


const server = new GraphQLServer({ 
  schema,
  context: ({ request }) => ({ request, prisma })
});

server.express.use(morgan("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () => {
  console.log("server start");
});