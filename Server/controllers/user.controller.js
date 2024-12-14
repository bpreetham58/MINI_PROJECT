import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import getDataUri from "../utils/datauri";
import cloudinary from "../utils/cloudinary";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Please fill in all fields",
                success: false,
            });
        }
        const user = await user.findOne({ email });
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
            password: hashedPassword
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

        }

        user={
            _id:user._id,
            username:user.username,
            email:user.email,
            ProfilePicture:user.ProfilePicture,
            bio:user.bio,
            followers:user.followers,
            following:user.following,
            posts:user.posts
        }

        const token = await jwt.sign({userId:user._id}, process.env.SECRET_KEY,{expiresIn:'1d'});
        return res.cookie('token',token, {httpOnly:true, sameSite:'strict', maxAge: 1*24*60*60*1000}).json({
            message:`welcome back ${user,username}`,
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

export const getProfile=async(rew,res)=>{
    try{
        const userId=req.params.id;
        let user=await User.findById(userId);
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
        const ProfilePicture=req.file;

        let cloudResponse;
        if(ProfilePicture){
            const fileUri=getDataUri(ProfilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }

        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        if(bio) user.bio=bio;
        if(gender) user.gender=gender;
        if(ProfilePicture) user.ProfilePicture=cloudResponse.secure_url;

        await user.save();
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

export const getSuggestedusers=async (req,res)=>{
    try{
        const suggestedUsers=await User.find({_id:{$ne:req.id}}).select("-password");
        if(suggestedUsers){
            return res.status(400).json({
                message:"currently do not have any users",
            })
        };
        return res.status(200).json({
            success:true,
            users:suggestedUsers
        }) 

    }
    catch(error){
        console.log(error);
    }
};

export const followOrUnfollow = async(req,res)=>{
    try{
        const followKrnewala=req.id;
        const followUser=req.params.id;
        if(followKrnewala === followUser){
            return res.status(400).json({
                message: "You can't follow yourself",
                success:false
            });
        }

        const user = await user.findById(followKrnewala);
        const targetUser=await user.findById(followUser);

        if(!user || !targetUser){
            return res.status(400).json({
                message: "User not found",
                success:false
            });
        }

        const isFollowing =user.following.includes(followUser);
        if(isFollowing){
            await Promise.all([
                user.updateOne({_id:followKrnewala},{$pull:{following:followUser}}),
                user.updateOne({_id:followUser},{$pull:{following:followKrnewala}}),
            ])
            return res.status(200).json({
                message: "Unfollowed successfully",
                success:true
            });


        }else{
            await Promise.all([
                user.updateOne({_id:followKrnewala},{$push:{following:followUser}}),
                user.updateOne({_id:followUser},{$push:{following:followKrnewala}}),
            ])
            return res.status(200).json({
                message: "followed successfully",
                success:true
            });
        }

    }
    catch(error){
        console.log(error);
    }
}