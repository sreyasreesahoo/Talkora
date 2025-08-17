import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;
if (!apiKey || !apiSecret) {
  throw new Error(
    "STREAM_API_KEY and STREAM_API_SECRET must be set in .env file"
  );
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser({
      id: userData.id, // REQUIRED: unique ID (same as your MongoDB _id or email)
      name: userData.name, // optional but recommended
      image: userData.image, // optional profile image
    });
    return userData;
  } catch (error) {
    console.error("Error creating Stream user:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await streamClient.deleteUser(userId);
  } catch (error) {
    console.error("Error deleting Stream user:", error);
  }
};
export const generateStreamToken = (userId) => {
  try {
    // ensure userid is string
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
    return null;
  }
};
