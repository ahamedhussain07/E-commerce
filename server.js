const express = require("express");
const app = express();

const server = require("http").Server(app);
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });

const handle = nextApp.getRequestHandler();

require("dotenv").config({ path: "./config.env" });

const connectDb = require("./utilsServer/connectDb");
const PORT = process.env.PORT || 3000;

app.use(express.json()); // body parser

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

connectDb();

nextApp.prepare().then(() => {
  app.use("/api/signup", require("./api/signup"));
  app.use("/api/login", require("./api/login"));

  app.all("*", (req, res) => handle(req, res)); // if we dont type this our pages folder will not work

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Express server running on ${PORT}`);
  });
});
