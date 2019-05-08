import fs from 'fs';
import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import session from 'express-session';
import logger from 'morgan';
import passport from 'passport';
// import facebookStrategy from './src/passport/facebookconfig';
import indexRoute from './src/routes/indexRoute';


config();

// create an instance of express
const app = express();

const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// passport.use(facebookStrategy);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


const logStream = fs.createWriteStream(`${__dirname}/log`, { flags: 'a' });
app.use(logger('dev', { stream: logStream }));

/* route */
app.use('/api/v1', indexRoute);

app.listen(port, () => {
  console.log(`server listening to port http://${host}:${port}`);
});

export default app;
