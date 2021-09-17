let express = require('express');
let model = require('../models/model1');
let bcrypt = require('bcrypt');

let auth = require('../middleware/autherization');

let router = express.Router();

router.post('/', auth, async (req, res, next) => {
  let { email, password } = req.body;

  let userSearch = await model.findOne({ email });

  if (userSearch) {
    let passDB = userSearch.password;

    let passCheck = await bcrypt.compareSync(password, passDB);

    console.log(passCheck);

    if (passCheck) {
      res.status(200).json({ msg: 'User Authenticated' });
    } else {
      res.status(400).json({ msg: 'Invalid Password' });
    }
  } else if (userSearch == null) {
    res.status(400).json({ msg: 'Invalid Mail Id' });
  }
});

module.exports = router;
