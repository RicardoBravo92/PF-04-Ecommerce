require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dbConnectNoSql = require("./config/mongo");
const cookieParser = require('cookie-parser');
const morgan= require('morgan');
app.use(cors({
  origin: "http://localhost:3000", // <-- location of the react app were connecting to
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
dbConnectNoSql();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const sessionSecret = process.env.SESSION_SECRET
const uriFrontHome = process.env.frontUrl;
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', uriFrontHome); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
//strategy passport Google-Auth
require('./auth-passport/strategis/google-auth');
require('./auth-passport/strategis/local-auth');

const store = new MongoDBStore({
  uri: process.env.uri,
  collection: 'mySessions'
});
store.on('error', function(error) {
  console.log(error);
});
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
//express-session configuration
app.use(session({
  secret: sessionSecret, 
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge:24 * 60 * 60 * 1000 },
  store: store,
}));

app.use(passport.initialize()); //iniciamos passport
app.use(passport.session());  //se ejecuta sesion para guardar los datos del user

app.use("/api", require("./routes"));

app.listen(port, () =>
  console.log(`linsten port ${port}`)
);
