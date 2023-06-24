const {
  signupUser,
  createUser,
  validateOTP,
  showOTPForm,
  renderLogin,
  loginUser,
} = require('../controllers/usersController');
const router = require('express').Router();

router.get('/register', signupUser);

router.get('/login', renderLogin);

router.post('/login', loginUser);

router.post('/register', createUser);

router.get('/validateOTP', showOTPForm);

router.post('/validateOTP', validateOTP);

module.exports = router;
