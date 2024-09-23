import { response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler( async (req, res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username and email
    // check for images and avatar
    // upload them to cloudinary
    // create user object entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const {fullname, email, username, password} = req.body
    console.log(email)

    if(
        [fullname, email, username, password].some((field)=>
        field?.trim() === "")
    ){
        throw new ApiError(400, "all fields are required")
    }

    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existingUser){
        throw new ApiError(409, "Email or username already exists")
    }
    
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    
    if(!avatarLocalPath){
        throw new ApiError(400, "avatar file is required")
    }
    
    const avatar = await uploadToCloudinary(avatarLocalPath)
    const coverImage = await uploadToCloudinary(coverImageLocalPath)

   

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    );
} )

export {registerUser}