const express = require('express');
const { signup, signin } = require('../controllers/user-controller');
const router = express.Router();
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');


router.post('/signup',validateSignupRequest,isRequestValidated,signup);
router.post('/signin',validateSigninRequest,isRequestValidated, signin);


module.exports = router;