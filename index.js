const express = require("express");
const jwt = require("express-jwt");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const authRoute = require("./routes/auth");
const booksRoute = require("./routes/books");
const upload = require("express-fileupload");
const formidable = require("formidable");
const bodyParser = require("body-parser");
const { pathToRegexp } = require("path-to-regexp");

require("dotenv").config();

const path = require("path");

mongoose.connect(`${process.env.MONGODB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
// app.use(upload());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));

app.use(express.static("foldertest"));
app.use(
  "/public/files/foldertest",
  express.static(__dirname + "/public/files/foldertest")
);

const regexp = pathToRegexp("/books/:id/reviews");

app.use(
  jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: [
      {
        url: "/allbooks",
        methods: ["GET"],
      },
      {
        url: regexp,
        //  `/books/:id/reviews`
        methods: ["GET"],
      },
      {
        url: "/books/filter",
        methods: ["POST"],
      },
      {
        url: "/books/action",
        methods: ["GET"],
      },
      {
        url: "/books/history",
        methods: ["GET"],
      },
      {
        url: "/books/classic",
        methods: ["GET"],
      },
      {
        url: "/register",
        methods: ["POST"],
      },
      // {
      //   url: "/books/popular",
      //   methods: ["GET"],
      // },
      {
        url: "/books/search",
        methods: ["POST"],
      },
      {
        url: pathToRegexp("/books/rating/:rate"),
        methods: ["GET"],
      },
      {
        url: "/login",
        methods: ["POST"],
      },
    ],
  })
);

app.use(authRoute);
app.use(booksRoute);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.json({ error: "YOU ARE NOT LOGGED IN" });
  }
});

app.listen(port, () => {
  console.log("server is running on port:", port);
});
