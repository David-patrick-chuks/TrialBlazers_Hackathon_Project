const Message = require('../models/message');

//chat between logged-in user and another user
exports.getMessages = async (req, res) => {
  try {
    const currentUserId = String(req.user.id); // ensure string
    const otherUserId = String(req.params.userId); 

    const messages = await Message.findAll({
      where: {
        [Sequelize.Op.or]: [
          { senderId: currentUserId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: currentUserId },
        ],
      },
      order: [['createdAt', 'ASC']]
    });

    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get messages" });
  }
};



// Optional: Send a message (for REST API use)
exports.sendMessage = async (req, res) => {
  const { receiverId, text } = req.body;
  const senderId = req.user.id;

  if (!receiverId || !text) {
    return res.status(400).json({ error: "Missing receiverId or text" });
  }

  try {
    const message = await Message.create({ senderId, receiverId, text });
    res.status(201).json(message);
  } catch (err) {
    console.error(" Error sending message:", err.message);
    res.status(500).json({ error: "Failed to send message" });
  }
};