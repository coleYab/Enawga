import User from '../models/user.model.js';
import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import bcrypt from 'bcryptjs';

// Get users with conversations.
export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const conversations = await Conversation.find({
      members: loggedInUserId, // Find all conversations where the user is a member
    }).populate('members', '-password'); // Populate member details, excluding passwords

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
    // Fetch user by ID
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

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user
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

// Update user by ID.
export const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { username, fullName, password, bio, profilePic } = req.body;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update fields if provided
    if (username) user.username = username;
    if (fullName) user.fullName = fullName;
    if (bio) user.bio = bio;
    if (profilePic) user.profilePic = profilePic;

    // Update password if provided, with encryption
    if (password && password.length < 8) {
      return res
        .status(400)
        .json({ error: 'Password must be at least 8 characters' });
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save updated user
    const updatedUser = await user.save();

    // Send updated user details (excluding password)
    res.status(200).json({
      message: 'User updated successfully',
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        fullName: updatedUser.fullName,
        bio: updatedUser.bio,
        profilePic: updatedUser.profilePic,
      },
    });
  } catch (error) {
    console.log('Error in updateUser controller: ', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// TODO Not working
export const getUsersWithRecentMessages = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const conversations = await Conversation.find({
      members: { $in: [loggedInUserId] },
    })
      .populate('members', 'fullName username profilePic')
      .populate({
        path: 'messages',
        model: 'Message',
        options: {
          sort: { createdAt: -1 },
          limit: 1,
        },
        populate: {
          path: 'senderId',
          model: 'User',
          select: 'fullName username',
        },
      });

    const usersWithRecentMessages = conversations
      .filter((conversation) => conversation.messages.length > 0) // Ensure there is at least one message
      .map((conversation) => {
        const members = conversation.members.filter(
          (member) => member._id.toString() !== loggedInUserId.toString(),
        );
        const lastMessage = conversation.messages[0];
        return {
          user: members[0] || null, // Return null if no other user
          lastMessage: lastMessage
            ? {
                content: lastMessage.message_content,
                sender: lastMessage.senderId,
                createdAt: lastMessage.createdAt,
              }
            : null,
        };
      });

    res.status(200).json(usersWithRecentMessages);
  } catch (error) {
    console.log(
      'Error in getUsersWithRecentMessages controller: ',
      error.message,
    );
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
