const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const {
  userValidation,
  validate,
} = require('../Middleware/ValidationSchema');
const { check, body } = require('express-validator');

const AuthRouter = express.Router();

// add a logout route

AuthRouter.post(
  '/signup',
  userValidation(),
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .custom((value) => {
      return UserModel.find({ username: value }).then((user) => {
        if (user) {
          return Promise.reject('Username already taken');
        }
      });
    }),
  validate,
  async (req, res, next) => {
    try {
      const { email, username, password, passwordConfirmation } =
        req.body;
      if (password !== passwordConfirmation)
        return res.status(400).json({
          message: {
            msgBody: 'Passwords do not match',
            msgError: true,
          },
        });
      const user = await UserModel.findOne(
        { email, username },
        (err, user) => {
          if (err) {
            const error = new Error('An error occurred.');
            return next(error);
          }
          if (user) {
            return res.status(400).json({
              message: {
                msgBody: 'An account with this email already exists.',
                msgError: true,
              },
            });
          }
          const newUser = new UserModel({
            email,
            password,
            username,
          });
          newUser.save((err) => {
            if (err)
              res.status(500).json({
                message: {
                  msgBody: 'Error has occured',
                  msgError: true,
                },
              });
            else
              res.status(201).json({
                message: {
                  msgBody: 'account succesfully created',
                  msgError: false,
                },
              });
          });
        }
      );
    } catch (error) {
      return next(error);
    }
  }
);

AuthRouter.post(
  '/login',
  userValidation(),
  validate,
  async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
      try {
        if (err) {
          res.status(500).json({
            message: {
              msgBody: 'Authentication failed',
              msgError: true,
            },
          });
        }
        if (!user) {
          res.status(401).json({
            message: {
              msgBody: 'Email or Password is wrong',
              msgError: true,
            },
          });
        }
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);
          if (req.isAuthenticated()) {
            const data = { _id: user._id, email: user.email };
            const token = jwt.sign(
              { user: data },
              process.env.JWT_SECRET,
              {
                expiresIn: 86400 * 30,
              }
            );
            return res.status(200).json({
              token,
              isAuthenticated: true,
              user: {
                email: req.body.email,
                username: user.username,
                _id: user._id,
                avatar: user.avatar,
              },
              message: {
                msgBody: 'Logged in Successfully',
                msgError: false,
              },
            });
          }
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  }
);

AuthRouter.get('/user/profile', async (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
    async (err, user, info) => {
      try {
        if (err) {
          res.status(500).json({
            message: {
              msgBody: 'Error has occured',
              msgError: true,
            },
          });
        }
        if (!user) {
          res.status(401).json({
            isAuthenticated: false,
            user: {},
            message: { msgBody: 'user not found', msgError: true },
          });
        } else {
          res.status(200).json({
            isAuthenticated: true,
            user: {
              email: user.email,
              _id: user._id,
              username: user.username,
              avatar: user.avatar,
            },
            message: {
              msgBody: 'user authenticated successfully',
              msgError: false,
            },
          });
        }
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
});

module.exports = AuthRouter;
