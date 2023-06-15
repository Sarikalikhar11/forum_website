const { signupUser, createUser } = require('../controllers/usersController');
const router = require('express').Router();

router.get('/', signupUser);

router.post('/', createUser);

module.exports = router;
