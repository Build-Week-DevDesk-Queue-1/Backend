const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express')
const Users = require('../../data/helpers/usersModel');
const Roles = require('../../data/helpers/rolesModel');

const router = express.Router();

router.post('/register', validateRegister, (req, res) => {
  const userInfo = req.body;
  const hash = bcrypt.hashSync(userInfo.password, 12);
  userInfo.password = hash;

  Users
    .add(userInfo)
    .then(user => {
      delete user.password;
      const token = signToken(user);
      const response = {
        user,
        token
      }
      res.status(201).json(response);
    })
    .catch(error => res.status(500).json(error));
});

router.post('/login', validateLogin, (req, res) => {
  const { email, password } = req.body;

  Users
    .findBy({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        delete user.password;
        const token = signToken(user);
        const response = {
          user,
          token
        }
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: 'username or password is invalid' });
      }
    })
    .catch(error => res.status(500).json(error));
})

async function validateRegister(req, res, next) {
  const { email, password, role_id, first_name, last_name } = req.body;
  const entries = Object.entries(req.body);

  if (!entries.length) {
    return res.status(400).json({ message: 'no request body attached' });
  }

  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!email || !emailPattern.test(email)) {
    return res.status(400).json({ message: 'must include a valid email' });
  }

  if (!password) {
    return res.status(400).json({ message: 'must include password' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'password must include a number, special character, and be a minimum of 6 characters' });
  }

  if (!first_name || !first_name.length) {
    return res.status(400).json({ message: 'must include first name' });
  }

  if (!last_name || !last_name.length) {
    return res.status(400).json({ message: 'must include last name' });
  }

  if (!role_id) {
    return res.status(400).json({ message: 'must include a role id' });
  }

  if (!await Roles.findBy({ id: role_id })) {
    return res.status(404).json({ message: 'the provided role id was not found' });
  }

  next();

}

async function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const entries = Object.entries(req.body);

  if (!entries.length) {
    return res.status(400).json({ message: 'no request body attached' });
  }

  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!email || !emailPattern.test(email)) {
    return res.status(400).json({ message: 'must include a valid email' });
  }

  if (!password) {
    return res.status(400).json({ message: 'must include password' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'password must include a number, special character, and be a minimum of 6 characters' });
  }

  next();

}

function signToken(user) {
  const payload = {
    id: user.id,
    role_id: user.role_id
  }

  const secret = process.env.JWT_SECRET;

  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secret, options);
}

module.exports = router;