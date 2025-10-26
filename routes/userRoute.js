const { resendCode, login, register, home, forgotPassword, resetPassword, verifyEmail, verifyResetPasswordOtp, changePassword, getOneUser, getAll, update, deleteUser, auth, user, success, failure } = require('../controllers/userController');
const { authenticated } = require('../middleware/authenticate');
const { registerValidator, verifyValidator } = require('../middleware/validator');

const router = require('express').Router();

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account, hashes the password, generates an OTP for email verification, and sends a verification email.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Tony
 *               lastName:
 *                 type: string
 *                 example: Fasube
 *               email:
 *                 type: string
 *                 format: email
 *                 example: tonyfasube@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPass123!
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: StrongPass123!
 *               role:
 *                 type: string
 *                 enum: [Client, Runner]
 *                 example: user
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 verify_account:
 *                   type: string
 *                   example: Click on Verification link sent to tonyfasube@example.com
 *                 data:
 *                   type: object
 *                   properties:
 *                     firstNameCase:
 *                       type: string
 *                       example: Tony
 *                     lastNameCase:
 *                       type: string
 *                       example: Fasube
 *                     email:
 *                       type: string
 *                       example: tonyfasube@example.com
 *                     role:
 *                       type: string
 *                       example: user
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Bad request (e.g. Email already registered or passwords do not match)
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', registerValidator, register);

/**
 * @swagger
 * /api/v1/verify-otp:
 *   post:
 *     summary: Verify user's email using OTP
 *     description: Validates the OTP sent to a user's email address and updates their account verification status.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's registered email address
 *                 example: tonyfasube@example.com
 *               otp:
 *                 type: string
 *                 description: One-time password sent to the user's email
 *                 example: "482936"
 *     responses:
 *       200:
 *         description: User verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User verified successfully
 *       400:
 *         description: Invalid or expired OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     expired:
 *                       summary: OTP expired
 *                       value: OTP expired
 *                     invalid:
 *                       summary: Invalid OTP
 *                       value: Invalid OTP
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user not found
 
 */
router.post('/verify-otp', verifyValidator, verifyEmail);

/**
 * @swagger
 * /api/v1/resend-code:
 *   post:
 *     summary: Resend OTP verification code
 *     description: Resends a new OTP to the user's registered email for account verification.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's registered email address
 *                 example: tonyfasube@example.com
 *     responses:
 *       200:
 *         description: OTP resent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP resent successfully, kindly check your email.
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user not found
 */
router.post('/resend-code', resendCode);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a registered user, verifies their email status, and returns a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: tonyfasube@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPass123!
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 1
 *                     firstName:
 *                       type: string
 *                       example: Tony
 *                     lastName:
 *                       type: string
 *                       example: Fasube
 *                     email:
 *                       type: string
 *                       example: tonyfasube@example.com
 *                     role:
 *                       type: string
 *                       example: user
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid credentials or unverified email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     invalid:
 *                       summary: Invalid credentials
 *                       value: Invalid credentials
 *                     unverified:
 *                       summary: Email not verified
 *                       value: This email tonyfasube@example.com is not verified yet
 *       
 */
router.post('/login', login);

/**
 * @swagger
 * /api/v1/:
 *   get:
 *     summary: Home route (protected)
 *     description: Returns a welcome message for authenticated users. Requires a valid JWT token in the Authorization header.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Welcome message returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome Fasube, we are happy to have you here
 *       401:
 *         description: Missing, invalid, or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     missing:
 *                       summary: No token
 *                       value: Login required. No token provided.
 *                     invalid:
 *                       summary: Invalid token
 *                       value: Invalid or expired token
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 */
router.get('/', home);

/**
 * @swagger
 * /api/v1/password:
 *   post:
 *     summary: Request password reset (OTP-based)
 *     description: Sends a one-time password (OTP) to the user's registered email address to initiate a password reset process.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kindly check your email for instructions
 *       400:
 *         description: Invalid email address provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email address provided
 */
router.post('/password', forgotPassword);

/**
 * @swagger
 * /api/v1/reset-otp:
 *   post:
 *     summary: Verify OTP for password reset
 *     description: Validates the one-time password (OTP) sent to the user's email during the forgot password process.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP verified successfully!
 *       400:
 *         description: Invalid or expired OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP expired
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 */
router.post('/reset-otp', verifyResetPasswordOtp);

/**
 * @swagger
 * /api/v1/reset:
 *   post:
 *     summary: Reset user password
 *     description: Resets the user's password after successful OTP verification.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: MyStrongP@ssword1
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: MyStrongP@ssword1
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset successful
 *       400:
 *         description: Passwords do not match or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Passwords do not match
 *       404:
 *         description: User not found or OTP not verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or OTP not verified
 
 */
router.post('/reset', resetPassword);

/**
 * @swagger
 * /api/v1/password:
 *   put:
 *     summary: Change user password
 *     description: Allows an authenticated user to change their password by providing the old password, new password, and confirmation.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []   # JWT-based authentication required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 format: password
 *                 example: OldPass@123
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: NewPass@456
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: NewPass@456
 *     responses:
 *       200:
 *         description: Password successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password successfully changed
 *       400:
 *         description: Validation or password mismatch error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: New passwords must match
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login required
 */

router.get('/google', auth);

router.get('/google/callback', user)

router.get('/success', success)

router.get('/failure', failure)

router.put('/password', authenticated, changePassword);

router.get('/user/:id', getOneUser);

router.get('/users', getAll);

router.put('/update-profile', update );

router.delete('/delete-user', deleteUser);

module.exports = router
