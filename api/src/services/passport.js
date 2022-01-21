import passport from 'passport'
import passportLocal from 'passport-local'
import passportJwt from 'passport-jwt'
import User from '@/models/user'
import bcrypt from 'bcrypt'

async function verifyLoginAndPassword(username, password, done) {
    const user = await User.verify(username, password)
    if (user === undefined) {
        return done(null, false)
    }

    return done(null, user)
}

async function verifyAuthToken(payload, done) {
    const { id } = payload
    const user = await User.selectById(id)
    if (user === undefined) {
        return done('User does not exist');
    }

    return done(null, user)
}

export default () => {
    passport.use(new passportLocal.Strategy(verifyLoginAndPassword))
    passport.use(
        new passportJwt.Strategy({
            jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        verifyAuthToken
    ))
}
