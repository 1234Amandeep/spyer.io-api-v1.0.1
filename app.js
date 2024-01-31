const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const fetchRouter = require("./routes/fetchRoutes");
const authRouter = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/authMiddleware");
require("dotenv").config();

mongoose.set("strictQuery", true);

const db_uri =
  "mongodb+srv://1234amandeep:ilovefootball%401234@spyer.dtt7kqo.mongodb.net/auth?retryWrites=true&w=majority";

console.log(process.env.DB_URI);

const app = express();
var allowlist = ["https://spyer-io-v1-0-1.web.app", "http://example2.com"];

// const corsOptions = {
//   origin: true,
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// middleware
app.use(cors(corsOptionsDelegate));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fetchRouter);
app.use(authRouter);

mongoose
  .connect(db_uri)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `After connecting to auth db, listening at port ${process.env.PORT}...`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

// basic routes
app.get("/root", authMiddleware.checkUser);
