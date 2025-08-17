import express from "express";
import { protectRoute } from "../middlewares/auth.middlewares.js";
import {
  getRecommendedUsers,
  getMyfriends,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  getOutgoingFriendReqs,
  updateUserProfile,
} from "../controllers/user.controllers.js";
const router = express.Router();

// apply the middleware to all routes in this file
router.use(protectRoute);

// get the recommended users
router.get("/", getRecommendedUsers);
// get my friends
router.get("/friends", getMyfriends);
// send a friend request
router.post("/friend-request/:id", protectRoute, sendFriendRequest);
// accept a friends request
router.put("/friend-request/:id/accept", protectRoute, acceptFriendRequest);

// get friend requests
router.get("/friend-requests", getFriendRequests);

// get outgoing friend requests
router.get("/outgoing-friend-request", getOutgoingFriendReqs);
router.put("/:id", protectRoute, updateUserProfile);
export default router;
