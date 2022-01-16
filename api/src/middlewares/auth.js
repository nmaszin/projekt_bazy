import passport from 'passport'

export function loginAuth(req, res, next) {
    return passport.authenticate('local', { session: false })(req, res, next)
}

export function jwtAuth(req, res, next) {
    return passport.authenticate('jwt', { session: false })(req, res, next)
}
