import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created sucessfully!!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //check user
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    
    //check password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    
    // authenticate user by adding cookie inside browser and create hash token containing id/email of user and save token inside the browser cookie. So, when user want to change passwrod, etc, we can use cookie for that.
    // The data saved in the cookie should also be hashed for security. We use JWT(json web token) package for it
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    
    //destructuring the validUser to remove password.
    const {password: hashed, ...rest} = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest); //this is a session cookie cause we have no start and end time for the cookie
  } catch (error) {
    next(error);
  }
};
