const express = require('express');
const { submitMessage } = require('../controllers/contactController');
const { check } = require('express-validator');

const router = express.Router();

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty().trim(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('message', 'Message is required').not().isEmpty().trim()
  ],
  submitMessage
);

module.exports = router;