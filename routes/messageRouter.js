const router = require('express').Router();
const { getMessages, sendMessage } = require('../controllers/messageController');
const { authenticated } = require('../middleware/authenticate');

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API for sending and retrieving chat messages
 */

/**
 * @swagger
 * /api/v1/messages/{userId}:
 *   get:
 *     summary: Get all messages between the logged-in user and another user
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the other user to fetch messages with
 *     responses:
 *       200:
 *         description: List of messages successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Message ID
 *                   senderId:
 *                     type: string
 *                     description: Sender's user ID
 *                   receiverId:
 *                     type: string
 *                     description: Receiver's user ID
 *                   text:
 *                     type: string
 *                     description: Message text
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */

router.get('/messages/:userId', authenticated, getMessages);

/**
 * @swagger
 * /api/v1/write/message:
 *   post:
 *     summary: Send a message to another user
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiverId
 *               - text
 *             properties:
 *               receiverId:
 *                 type: string
 *                 description: The ID of the user you want to send a message to
 *               text:
 *                 type: string
 *                 description: Message content
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 senderId:
 *                   type: string
 *                 receiverId:
 *                   type: string
 *                 text:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Missing receiverId or text
 *       500:
 *         description: Failed to send message
 */

router.post('/write/message', authenticated, sendMessage)


module.exports = router;