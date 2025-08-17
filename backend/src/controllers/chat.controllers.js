import { generateStreamToken } from "../lib/Stream.js";

export async function getStreamToken(req, res) {
  try {
    const token = generateStreamToken(req.user.id);
    if (!token) {
      return res.status(500).json({ message: "Failed to generate token" });
    }
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating Stream token:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
