const router = require('express').Router();
const { getMessages, sendMessage } = require('../controllers/messageController');
const { authenticated } = require('../middleware/authenticate');

router.get('/messages/:userId', authenticated, getMessages);

router.post('/write/message', authenticated, sendMessage)


module.exports = router;