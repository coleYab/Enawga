import User from '../models/user.model.js';
import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';

// Search users by username.
export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select('-password');

    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.status(200).json(user);
  } catch (error) {
    console.log('Error in getUserByUsername controller: ', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Search messages by keyword.
export const getMessageByKeyword = async (req, res) => {
  try {
    const receiverId = req.user._id;
    const senderId = req.params.id;
    const { keyword } = req.query;

    const conversation = await Conversation.findOne({
      members: { $all: [receiverId, senderId] },
    }).populate({
      path: 'messages',
      match: { message_content: { $regex: keyword, $options: 'i' } }, // Filter messages by keyword
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const matchingMessages = conversation.messages;

    res.status(200).json(matchingMessages);
  } catch (error) {
    console.log('Error in getMessageByKeyword controller: ', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

