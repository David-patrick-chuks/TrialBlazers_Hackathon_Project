const { resendCode, login, register, home, forgotPassword, resetPassword, verifyEmail } = require('../controllers/userController');
const { registerValidator, verifyValidator } = require('../middleware/validator');

const router = require('express').Router();

router.post('/register', registerValidator, register);
router.post('/verify-otp',verifyValidator, verifyEmail);
router.post('/resend-code', resendCode);
router.post('/login', login);
router.get('/', home);
router.post('/password', forgotPassword)
router.post('/reset', resetPassword);

module.exports = router