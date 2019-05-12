import { Router } from 'express';
import passport from 'passport';
// import passportGoogle from '../passport/googleConfig';
import SocialController from '../controllers/SocialController';

const socialRoutes = Router();

/* GOOGLE ROUTER */
socialRoutes.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] }));

socialRoutes.get('/auth/google/callback',
  passport.authenticate('google', { session: false }), SocialController.signUser);

export default socialRoutes;
