const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient('mongodb+srv://Igor:*=$Pf-N5H89QJE.@users-e9wlw.gcp.mongodb.net/pips?retryWrites=true&w=majority',{ useUnifiedTopology: true });
const bcrypt = require('bcrypt');

passport.serializeUser((user,done) => {
  done(null,user);
});

passport.deserializeUser((user,done) => {
  done(null,user);
});

passport.use(new LocalStrategy({
  usernameField: 'userName',
  passwordField: 'userPassword' },

function(username, password, done) {
  mongoClient.connect((err,client) => {
    if(err) throw err;

    const check_password = password;
    const db = client.db('pips');
    const collection = db.collection('users');

    collection.findOne({'email': username}, function(err, user) {
    if (err) { return done(err); }

    bcrypt.compare(check_password,user.password,(err,result) => {
      if(result) return done(null, user);
      return done(null, false, { message: 'Incorrect username.' })
      });
    });
  });
}
));

