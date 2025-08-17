import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = await User.findById(currentUserId).select("friends");

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const recommendedUsers = await User.find({
      _id: { $ne: currentUserId, $nin: currentUser.friends || [] },
      isOnboarded: true,
    }).select("-password");

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyfriends(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName nativeLanguage learningLanguage profilePic"
      );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure friends is always an array
    const safeFriends = Array.isArray(user.friends)
      ? user.friends.filter(Boolean)
      : [];

    res.status(200).json(safeFriends);
  } catch (error) {
    console.error("Error in getMyfriends:", error.message, error.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const friendId = req.params.id;

    if (!myId || !friendId) {
      return res
        .status(400)
        .json({ message: "User ID and Friend ID are required" });
    }
    if (myId === friendId) {
      return res
        .status(400)
        .json({ message: "You cannot be friend of yourself" });
    }

    const recipient = await User.findById(friendId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({ message: "You are already friends" });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, receiver: friendId },
        { sender: friendId, receiver: myId },
      ],
    });
    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already exists" });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      receiver: friendId,
    });

    res.status(201).json({
      message: "Friend request sent successfully",
      friendRequest,
    });
  } catch (error) {
    console.error("Error in sendFriendRequest:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.receiver.toString() !== myId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to accept this request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    await User.findByIdAndUpdate(myId, {
      $addToSet: { friends: friendRequest.sender },
    });
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: myId },
    });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.error("Error in acceptFriendRequest:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingRequests = await FriendRequest.find({
      receiver: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    const acceptedRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate(
      "receiver",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    res.status(200).json({ incomingRequests, acceptedRequests });
  } catch (error) {
    console.error("Error in getFriendRequests:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingRequest = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "receiver",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    res.status(200).json(outgoingRequest);
  } catch (error) {
    console.error("Error in getOutgoingFriendReqs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    // Assuming you have a User model (MongoDB / Sequelize / etc.)
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true, // return the updated document
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
