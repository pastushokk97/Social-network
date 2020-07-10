const express = require('express');
const app = express();
const routes = require('./router');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
require('./passport');

app.use(cookieParser());
app.use(
  session({
    secret:'Da Vinci code',
    store: new MongoStore({
      url: 'mongodb+srv://Igor:*=$Pf-N5H89QJE.@users-e9wlw.gcp.mongodb.net/pips?retryWrites=true&w=majority',
    }),
    cookie: {
      path:'/',
      httpOnly:true,
      maxAge:60*1000*1200,
    },
    resave:false,
    saveUninitialized:false 
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.use(express.static(__dirname));
app.set('view engine', 'ejs');

app.listen(8080,() => console.log('damn.it'))