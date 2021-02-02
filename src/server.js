const { GraphQLServer } = require("graphql-yoga");
const morgan = require("morgan");
const schema = require("./schema");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(morgan("dev"));

server.start({ port: PORT }, () => {
  console.log("server start");
});
