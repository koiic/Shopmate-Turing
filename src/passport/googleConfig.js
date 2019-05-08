/* eslint max-len: ["error", { "code": 500 }] */

import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { config } from 'dotenv';
import Model from '../db/models';

const { Customer } = Model;
config();

const strategyObject = {
  clientID: process.env.GOOGLE_APP_ID,
  clientSecret: process.env.GOOGLE_APP_SECRET,
  callbackURL: `${process.env.BASE_URL}/api/v1/auth/google/callback`,
};

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
const googleStrategy = passport.use(new GoogleStrategy(strategyObject, (accessToken, refreshToken, profile, done) => {
  console.log('=====>', profile);
  const customer = { name: profile.displayName, email: profile.emails[0].value };
  try {
    Customer.findOrCreate({
      where: { email: customer.email },
      defaults: { name: customer.name, password: 'password' }
    })
      .spread((foundCustomer, created) => {
        const { customer_id: customerId, name, email } = foundCustomer.dataValues;
        done(null, {
          email, customerId, name, created
        });
      });
  } catch (error) {
    done(null, null);
  }
}));

export default googleStrategy;
