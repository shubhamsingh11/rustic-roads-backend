import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/blogs/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullname, password } = req.body;
  console.log("Registering user:", { username, email, fullname });

  if (
    [username, email, fullname, password].some((field) => field.trim() === "")
  ) {
    throw new APiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    throw new ApiError(
      409,
      "Found an existing user with same username or email"
    );
  }

  const profilePicPath = req.file?.path;

  if (!profilePicPath) {
    throw new ApiError(400, "Profile picture is required");
  }

  const profilePic = await uploadOnCloudinary(profilePicPath);

  if (!profilePic) {
    throw new ApiError(400, "Profile picture is required");
  }

  const user = await User.create({
    fullname,
    profilePic: profilePic.url,
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
