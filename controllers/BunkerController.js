import BunkerModel from "../models/Bunker.js";
import bcrypt from "bcrypt";
import auth from "../middleware/auth.js";
import dotenv from "dotenv";
dotenv.config();

// post a bunker to the db

const create = async (req, res) => {
  const { id, author, title, linkedMedia, thumbnail } = req.body;
  try {
    let bunker = await BunkerModel.findOne({ id });
    if (bunker) {
      return res.status(400).send("Failed to send the bunker");
    }
    const newBunker = new BunkerModel({
      id,
      author,
      title,
      linkedMedia,
      thumbnail,
    });

    await newBunker.save();

    const payload = {
      user: { id: user.id },
      bunker: { id: newBunker.id },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
};

export { create };
