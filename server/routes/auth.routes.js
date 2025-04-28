const express = require('express');
const { register, login, logout, getMyProfile } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth');

const router = express.Router();
router.post('/register', register);
router.post('/login', login);


router.use(protect)
router.get('/',getMyProfile)

router.get('/logout', logout);

module.exports = router;
