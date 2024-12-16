import cloudinary from 'cloudinary';
import sharp from "sharp";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import dotenv from 'dotenv';

// Initialize dotenv to access environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'ddmzxnzla', // Your Cloud Name
    api_key: '981682434249325', // Your API Key
    api_secret: 'fohAAi27zgHsLXQpFhPUoDCqECM' // Your API Secret
  
});
export const addNewPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file;
        const authorId = req.id;

        // Log the received data
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);
        console.log("Author ID:", authorId);

        if (!image) {
            console.log("No image provided");
            return res.status(400).json({ message: 'Image required' });
        }

        // Optimize the image
        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({ width: 800, height: 800, fit: 'inside' })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();

        console.log("Optimized Image Buffer:", optimizedImageBuffer);

        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        console.log("File URI:", fileUri);

        // Upload to Cloudinary
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        console.log("Cloudinary Response:", cloudResponse);

        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: authorId,
        });
        console.log("Post Created:", post);

        // Associate post with user
        const user = await User.findById(authorId);
        if (user) {
            user.posts.push(post._id);
            await user.save();
        }

        // Populate author info and send response
        await post.populate({ path: 'author', select: '-password' });

        return res.status(201).json({
            message: 'New post added',
            post,
            success: true
        });

    } catch (error) {
        console.error("Error in addNewPost:", error);
        return res.status(500).json({
            message: 'An error occurred while adding the post',
            success: false,
            error: error.message,
        });
    }
};

//displays feed on urself feed
export const getAllPost = async (req, res) => {
    try {
        const post = await Post.find().sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'username,ProfilePicture' })
            .populate({
                path: 'comments',
                sort: { createdAt: -1 },
                populate: {
                    path: 'author',
                    select: 'username,ProfilePicture'
                }
            });
        return res.status(200).json({
            posts,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};
//
export const getUserPost = async (req, res) => {
    try {
        const authorId = req.id;
        const posts = await Post.find({ author: authorId }).sort({ createdAt: -1 }).populate({
            path: 'author',
            select: 'username,ProfilePicture'
        }).populate({
            path: 'comments',
            sort: { createdAt: -1 },
            populate: {
                path: 'author',
                select: 'username,ProfilePicture'
            }
        });
        return res.status(200).json({
            posts,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (req, res) => {
    try {
        const likerid = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found', success: false });

        //like 
        await post.updateOne({ $addToSet: { likes: likerid } });
        await post.save();

        //implement socket io for realtime 

        return res.status(200).json({ message: 'Post liked', success: true });
    } catch (error) {
        console.log(error);
    }
}

export const dislikePost = async (req, res) => {
    try {
        const likerid = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found', success: false });

        //like 
        await post.updateOne({ $pull: { likes: likerid } });
        await post.save();

        //implement socket io for realtime 

        return res.status(200).json({ message: 'Post disliked', success: true });
    } catch (error) {
        console.log(error);
    }
}

export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const commentorid = req.id;

        const { text } = req.body;
        const post = await Post.findById(postId);
        if (!text) return res.status(400).json({ message: 'text is required', success: false });

        const comment = await Comment.create({
            text,
            author: commentorid,
            post: postId
        }).populate({
            path: 'author',
            select: "username,ProfilePicture"
        });

        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({
            message: 'Comment Added',
            comment,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
};
export const getCommentOfPost = async (req, res) => {
    try {
        const postId = req.params.id;

        const comments = await Comment.find({ post: postId }).populate('author', 'username', 'ProfilePicture');

        if (!comments) return res.status(404).json({ message: 'No Comments found for this post', success: false });

        return res.status(200).json({ success: true, comments });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found', success: false });

        if (post.author.toString() !== authorId) return res.status(403).json({ message: 'Unauthorized' });

        //delete post
        await Post.findByIdAndDelete(postId);

        //remove the post id from user post
        let user = await User.findById(authorId);
        user.posts = user.posts.filter(id => id.toString() !== postId);
        await user.save();

        //delete associated comments
        await Comment.deleteMany({ post: postId });

        return res.status(200).json({
            success: true,
            message: 'Post deleted'
        })

    } catch (error) {
        console.log(error);
    }
}

export const bookmarkPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found', success: false });

        const user = await User.findById(authorId);
        if (user.bookmarks.includes(post._id)) {
            //already marked -> remove
            await user.updateOne({ $pull: { bookmarks: post._id } });
            await user.save();
            return res.status(200).json({ type: 'unsaved', message: 'Post removed from bookmark', success: true });

        } else {
            //bookmarking
            await user.updateOne({ $addToSet: { bookmarks: post._id } });
            await user.save();
            return res.status(200).json({ type: 'saved', message: 'Post bookmarked', success: true });

        }
    } catch (error) {
        console.log(error);
    }
}