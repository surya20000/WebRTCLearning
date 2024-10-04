import { OAuth2Client } from "google-auth-library";
import User from "../../../models/User.Schema.js";


export const handleGoogleLogin = async (req, res) => {
  try {
    const { credential, clientID } = req.body;
    const client = new OAuth2Client(clientID);
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: clientID,
      });

      const payload = ticket.getPayload();
      const foundUser = await User.findOne({ email: payload.email });

      if (foundUser) {
        res.status(200).json({ user: foundUser });
        return;
      }
      const createdUser = await User.create({
        name: payload.name,
        profilePicURL: payload.picture,
        email: payload.email,
      });

      res.status(201).json({ user: createdUser });
    }
    verify().catch(console.error);
  } catch (error) {
    res.status(500).send(error);
  }
};
