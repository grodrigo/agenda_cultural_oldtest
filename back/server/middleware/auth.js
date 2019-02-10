var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://dev-test1.auth0.com/.well-known/jwks.json"
    }),
    getToken: function fromHeaderOrQuerystring (req){
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer'){
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.access_token){
        return req.query.access_token;
      }
      return null;
    },
    audience: 'localhost:3000',
    issuer: "https://dev-test1.auth0.com/",
    algorithms: ['RS256']
});

module.exports = function(){
  return jwtCheck;
}