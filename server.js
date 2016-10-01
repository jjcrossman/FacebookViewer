const express = require( "express" );
const session = require( "express-session" );
const cors = require( 'cors' );
const corsOptions = {
  origin: "http://localhost:3000"
};
const passport = require( "passport" );
const FacebookStrategy = require( "passport-facebook" ).Strategy;
const config = require( "./config.js" );

const app = express();
const port = 3000;
app.use( cors( corsOptions ) );

app.use( session( { secret: config.mySecrets.secret, resave: false, saveUninitialized: false } ) );
app.use( passport.initialize() );
app.use( passport.session() );
app.use( express.static( `${ __dirname }/public/` ) );

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.secret,
    callbackURL: config.facebook.cbUrl
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }));

app.get( "/auth/facebook", passport.authenticate( "facebook" ) );
app.get( "/auth/facebook/callback", passport.authenticate( "facebook", {
  successRedirect: "/me"
  , failureRedirect: "/login"
} ) );

passport.serializeUser( ( user, done ) => {
  done( null, user );
} );

passport.deserializeUser( ( obj, done ) => {
  done( null, obj );
} );

//endpoints
app.get( "/me", ( req, res ) => {
  res.send( req.user );
} );

app.listen( port, () => console.log( `Facebook Viewer is listening on port: ${ port }` ) );
