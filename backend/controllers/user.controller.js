import User from '../models/user.model.js';
import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import bcrypt from 'bcryptjs';

// Get users with conversations.
export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const conversations = await Conversation.find({
      members: loggedInUserId,
    }).populate('members', '-password');

    const friends = [];
    conversations.forEach((conversation) => {
      conversation.members.forEach((member) => {
        if (
          member._id.toString() !== loggedInUserId.toString() &&
          !friends.some((friend) => friend._id.equals(member._id))
        ) {
          friends.push(member);
        }
      });
    });

    res.status(200).json(friends);
  } catch (error) {
    console.log('Error in getUsers controller: ', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Search by userId.
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params._id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log('Error in getUserById controller: ', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete user by ID.
export const deleteUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await User.findByIdAndDelete(userId);
    res.cookie('jwt', '', {
      maxAge: 0,
      httpOnly: true,
    });

    // Send success response
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log('Error in deleteUser controller: ', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
