import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import {Post} from "../models/post.model.js";


export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Please fill in all fields",
                success: false,
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "Try different email",
                success: false,
            });
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true,
        });
    }
    catch (error) {
        console.log(error);
    }
}

export const login=async(req,res)=>{
    try{
        const {email, password}=req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Please fill in all fields",
                success: false,
            });
        }
        let user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });

        }

        const isPasswordMatch=await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });

        };
        const token = await jwt.sign({userId:user._id}, process.env.SECRET_KEY,{expiresIn:'1d'});
        
        const populatedPosts= await Promise.all(
            user.posts.map(async(postId) => {
                const post=await Post.findById(postId);
                if(post.author.equals(user._id)){
                    return post;
                }
                return null;
            })
        )

        user={
            _id:user._id,
            username:user.username,
            email:user.email,
            ProfilePicture:user.ProfilePicture,
            bio:user.bio,
            followers:user.followers,
            following:user.following,
            posts:populatedPosts

        }

        
        return res.cookie('token',token, {httpOnly:true, sameSite:'strict', maxAge: 1*24*60*60*1000}).json({
            message:`welcome back ${user.username}`,
            success: true,
            user
        });
    }
    catch(error){
        console.log(error);

    }
};

export const logout=async (_,res)=>{
    try{
        return res.cookie("token","",{maxAge:0}).json({
            message: "logged out successfully",
            success: true
        });
    }
    catch(error){
        console.log(error);
    }
};

export const getProfile=async(req,res)=>{
    try{
        const userId=req.params.id;
        let user=await User.findById(userId).populate({path:'posts',createdAt:-1}).populate('bookmarks');
        return res.status(200).json({
            user,
            success: true
        });
    }
    catch(error){
        console.log(error);
    }
};

export const editProfile =async (req,res)=>{
    try{
        const userId=req.id;
        const {bio, gender}=req.body;
        const ProfilePhoto=req.file;

        let cloudResponse;
        if (ProfilePhoto) {
            const fileUri = getDataUri(ProfilePhoto);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
            console.log('Cloudinary upload response:', cloudResponse);
        }        

        const user=await User.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            }); 
        }

        if(bio) user.bio=bio;
        if(gender) user.gender=gender;
        if (ProfilePhoto) user.ProfilePicture = cloudResponse.secure_url;
        console.log('User profile picture URL:', user.ProfilePicture);

        await user.save();
        console.log(user);
        return res.status(200).json({
            message: "Profile updated",
            success: true,
            user
        }) 
    }
    catch(error){
        console.log(error);
    }
};

export const getSuggestedusers = async (req, res) => {
    try {
        const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select("-password");

        if (suggestedUsers.length === 0) {
            return res.status(200).json({
                message: "Currently do not have any users",
                success: false,
            });
        }

        return res.status(200).json({
            success: true,
            users: suggestedUsers,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const followOrUnfollow = async (req, res) => {
    try {
        const followerId = req.id; // Logged-in user's ID (from middleware)
        const followedId = req.params.id; // ID of the user to follow/unfollow

        console.log(`followerId: ${followerId}, followedId: ${followedId}`);

        // Prevent self-following
        if (followerId === followedId) {
            return res.status(400).json({
                message: "You can't follow yourself",
                success: false,
            });
        }

        // Fetch both users
        const user = await User.findById(followerId);
        const targetUser = await User.findById(followedId);

        // Validate users exist
        if (!user || !targetUser) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Check if already following
        const isFollowing = user.following.includes(followedId);
        console.log(`isFollowing: ${isFollowing}`);

        if (isFollowing) {
            // Unfollow logic
            await Promise.all([
                user.updateOne({ $pull: { following: followedId } }),
                targetUser.updateOne({ $pull: { followers: followerId } }),
            ]);
            console.log("Unfollowed successfully");

            return res.status(200).json({
                message: "Unfollowed successfully",
                success: true,
            });
        } else {
            // Follow logic
            await Promise.all([
                user.updateOne({ $push: { following: followedId } }),
                targetUser.updateOne({ $push: { followers: followerId } }),
            ]);
            console.log("Followed successfully");

            return res.status(200).json({
                message: "Followed successfully",
                success: true,
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message,
        });
    }
};
