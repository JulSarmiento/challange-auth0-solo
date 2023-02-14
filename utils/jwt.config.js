const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const request = require("request");
const jwtDecode = require("jsonwebtoken").decode;

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.BASE_URL}/.well-known/jwks.json`,
  }),
  algorithms: ["RS256"],
});

const createAccount = (email, password, callback) => {
  const options = {
    method: "POST",
    url: `https://${process.env.BASE_URL}/dbconnections/signup`,
    header: {
      "content-type": "application/json",
      authorization: `Bearer ${process.env.AUTH0_API_TOKEN}`,
    },
    body: { email, password },
    json: true,
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    callback(body);
  });
};
