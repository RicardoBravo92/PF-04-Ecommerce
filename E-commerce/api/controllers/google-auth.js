const passport = require('passport');


const loginGoogle = passport.authenticate('google',{scope: ['openid', 'email', 'profile']},{
        successRedirect : process.env.HOST_CLIENT,
        failureRedirect : '/api/auth/login/error',
        passReqToCallback :true //IMPORTANTE para poder recibir por req
    });


const loginCallBackGoogle = passport.authenticate('google', { 
    successRedirect : process.env.HOST_CLIENT, 
    failureRedirect: '/api/auth/login/error' });


module.exports = { loginGoogle, loginCallBackGoogle};