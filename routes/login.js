let express = require('express');
let model = require('../models/model1');
let bcrypt = require('bcrypt');
let jwt = require("jsonwebtoken");

let auth = require('../middleware/autherization');

let router = express.Router();

router.post('/', async (req, res, next) => {
  let { email, password } = req.body;

  let userSearch = await model.findOne({ email });

  console.log("User Search result => ",userSearch);

  if (userSearch) {
    let passDB = userSearch.password;

    let passCheck = await bcrypt.compareSync(password, passDB);

    console.log(passCheck);

    if (passCheck) {
      let payload = {user:{id:userSearch.id}};
 
      let token = await jwt.sign(payload,"secret",{expiresIn:36000})

      console.log("jwt token ",token);

      res.status(200).json({ msg: 'User Authenticated', token });
    } else {
      res.status(400).json({ msg: 'Invalid Password' });
    }
  } else if (userSearch == null) {
    res.status(400).json({ msg: 'Invalid Mail Id' });
  }
});

module.exports = router;
