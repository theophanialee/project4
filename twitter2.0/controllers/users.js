import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import Debug from 'debug'
import { createRequire } from 'module';
import UserDetail from '../models/UserDetail.js';
const require = createRequire(import.meta.url);
const bcrypt = require('bcrypt');

const debug = Debug('app:usersCtrl:')

function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}

async function create(req, res) {
    try {
        const user = await User.create(req.body);
        const token = createJWT(user);
        const response = await UserDetail.create({
          name: "",
          contactNo: 0,
          address: "",
          customerId: user._id,
          favourites: [],
        });
        res.json(token);
    } catch (err) {
        if (err.message.match(/^E11000/)) {
            debug("Duplicate Email")
            res.status(400).json({ message: "Email already in use" })
        } else {
            res.status(400).json({ message: err.message })
        }
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(401).json({ message: "No user associated with this e-mail!" })
            return
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            res.status(401).json({ message: "E-mail and password do not match!" })
            return
        }
        res.json(createJWT(user));
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

function checkToken(req, res) {
    // req.user will always be there for you when a token is sent
    console.log('req.user', req.user);
    res.json(req.exp);
  }

  async function changePassword(req, res) {
    try {
      const userId = req.user._id;
      console.log(userId);
      const user = await User.findById(userId);
      console.log(user);
      console.log("body", req.body);
      const match = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!match) {
        res.status(401).json({ message: "Incorrect password" });
      }
      if (match) {
        const newPassword = req.body.newPassword;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ _id: userId }, { password: hashedPassword });
        res.json("Successfully updated password");
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  export { create, login, checkToken, changePassword }; 