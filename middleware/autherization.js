let jwt = require('jsonwebtoken');

let autherization = async (req, res, next) => {
  let token = req.header('x-auth-token');

  if (!token) {
    res.status(401).json({ msg: 'Authorization Token unavailable' });
  }

  try {
    let authCheck = await jwt.verify(token, 'secret');

    console.log('Result of authorization Token Verification ==> ', authCheck);
  } catch (err) {
    res.status(401).json({ msg: 'Inavild Authorization Token', error: err });
  }

  next();
};

module.exports = autherization;
