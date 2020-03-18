const express = require("express");
const server = express();
const authRouter = require("./auth/authRouter");
const userRouter = require("./users/usersRouter");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
dbConfig = require("./data/config");
const logger = require("./middleware/Goldberg");

server.use(express.json());
server.use(logger);

server.use(
  session({
    name: "token",
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET || "secret",
    cookie: {
      httpOnly: true
    },
    store: new KnexSessionStore({
      knex: dbConfig,
      createtable: true
    })
  })
);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Possible endpoints; /auth , /users" });
});

server.use("/auth", authRouter);
server.use("/users", userRouter);

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}...`);
});
