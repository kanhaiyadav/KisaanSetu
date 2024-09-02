import passport from "passport";

//importing the jwt strategy
import { Strategy as JWTStrategy } from "passport-jwt";

//importing a module which will help us to extract the token from the header and also validate(wheher)
//it is jwt
import { ExtractJwt as ExtractJWT } from "passport-jwt";

import Farmer from "../Models/Farmer.js";
import Consumer from "../Models/Consumer.js";

let opts = {
    //extracting the token from the header
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    //the secret or key used to sign the token
    secretOrKey: 'KisaanSetu'
}

//payload contains all the info about the user obtained by decoding the token
passport.use(new JWTStrategy(opts, async (payload, done) => {
    try {
        if (payload.isfarmer) {
            let user = await Farmer.findById(payload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }
        else {
            let user = await Consumer.findById(payload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }
    } catch (err) {
        return done(err, false);
    }
}));

export default passport;