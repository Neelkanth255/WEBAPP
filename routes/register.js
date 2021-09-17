let express = require('express');
let router = express.Router();
let model = require('../models/model1');
let bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
let jwt = require('jsonwebtoken');

router.post(
  '/',
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  async (req, res, next) => {
    try {
      console.log('Request for User Registration', req.body);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let { name, email, phone, password, city, designation } = req.body;

      let salt = 10;

      password = await bcrypt.hashSync(password, salt);

      let search = await model.findOne({ email });

      console.log('Search result for email check ', search);

      if (search !== null) {
        console.log('Email id exist already in the database');
        res.status(400).json({ msg: 'Email id exist already in the database' });
      }

      let user = new model({ name, email, phone, password, city, designation });

      let result = await user.save(); //

      console.log('Result of Saving User in DB ==> ', result);

      let payload = { user: { id: result.id } };

      let t = await jwt.sign(payload, 'secret', { expiresIn: 36000 });

      res.status(200).json({
        msg: `User Saved succesfully with ID ==> ${result.id}`,
        token: t,
      });
    } catch (err) {
      console.error('Error in User registration Try block ==> ', err); //
      res.status(500).json({ msg: 'Internal Error' });
    }
  }
);

module.exports = router;
