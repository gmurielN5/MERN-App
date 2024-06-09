const express = require('express');

const router = express.Router();
const Article = require('../models/article');
const User = require('../models/user');
const Topic = require('../models/topic');

//redirect to article controller
router.get('/public', async (req, res, next) => {
  res.redirect('/dashboard');
});

module.exports = router;
