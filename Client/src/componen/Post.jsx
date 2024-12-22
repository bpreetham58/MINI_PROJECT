import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import { toast } from 'react-toastify'; // Import toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from './ui/avatar';
import { FiBookmark, FiHeart, FiMessageCircle, FiSend, FiMoreHorizontal } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import CommentDialog from './CommentDialog';
import { setPosts, setSelectedPost } from '../redux/postSlice'; // Redux actions
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Badge } from './ui/badge';

const Post = ({ post }) => {
    // Validate the `post` object and its `_id`
    if (!post || typeof post !== 'object' || !post._id) {
        console.error("Invalid post object:", post); // Debugging log
        return null; // Safeguard: Render nothing if the post is invalid
    }

    // State and Redux setup
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const { posts } = useSelector((store) => store.post);
    const dispatch = useDispatch();

    const [liked, setLiked] = useState(post.likes?.includes(user?._id) || false);
    const [postLike, setPostLike] = useState(post.likes?.length || 0);
    const [comment, setComment] = useState(post.comments || []);

    // Handlers
    const handleCommentInput = (e) => setText(e.target.value.trim() ? e.target.value : '');

    const likeOrDislikeHandler = async () => {
        try {
            const action = liked ? 'dislike' : 'like';
            const res = await axios.get(`http://localhost:8000/api/v1/post/${post._id}/${action}`, { withCredentials: true });

            if (res.data.success) {
                const updatedLikes = liked ? postLike - 1 : postLike + 1;
                setPostLike(updatedLikes);
                setLiked(!liked);

                // Update Redux store
                const updatedPostData = posts.map((p) =>
                    p._id === post._id
                        ? {
                              ...p,
                              likes: liked ? p.likes.filter((id) => id !== user._id) : [...p.likes, user._id],
                          }
                        : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Error in like/dislike handler:", error);
            toast.error("Failed to update like status.");
        }
    };

    const commentHandler = async () => {
        if (!text) return; // Guard: Ensure comment text is not empty
        try {
            const res = await axios.post(
                `http://localhost:8000/api/v1/post/${post._id}/comment`,
                { text },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );

            if (res.data.success) {
                const updatedComments = [...comment, res.data.comment];
                setComment(updatedComments);

                const updatedPostData = posts.map((p) =>
                    p._id === post._id ? { ...p, comments: updatedComments } : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                setText('');
            }
        } catch (error) {
            console.error("Error in comment handler:", error);
            toast.error("Failed to add comment.");
        }
    };

    const deletePostHandler = async () => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/post/delete/${post._id}`, { withCredentials: true });

            if (res.data.success) {
                const updatedPostData = posts.filter((postItem) => postItem._id !== post._id);
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Error in delete post handler:", error);
            toast.error("Failed to delete post.");
        }
    };

    const isPostOwner = user && user._id === post.author?._id;

    return (
        <div className="my-2 w-full h-full max-w-small mx-auto">
            {/* Post Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={post.author?.profilePicture} alt="Profile" />
                        <AvatarFallback>{post.author?.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex item-center gap-3">
                        <h6>{post.author?.username || 'Unknown User'}</h6>
                        {isPostOwner && <Badge variant="default">Author</Badge>}
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <FiMoreHorizontal className="cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="flex flex-col bg-[#F3F3E0] items-center text-sm text-center">
                        <button className="cursor-pointer w-fit text-[#FAB12F] font-bold">Unfollow</button>
                        <button className="cursor-pointer w-fit text-[#CBDCEB]">Add to favourites</button>
                        {isPostOwner && (
                            <button onClick={deletePostHandler} className="cursor-pointer w-fit text-red-500">
                                Delete
                            </button>
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            {/* Post Image */}
            {post.image ? (
                <img
                    className="rounded-sm my-2 w-full aspect-[3/2] object-cover"
                    src={post.image}
                    alt="Post"
                />
            ) : (
                <div className="rounded-sm my-2 w-full aspect-[3/2] bg-gray-300 flex items-center justify-center">
                    <p className="text-gray-500">No image available</p>
                </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between my-2">
                <div className="flex items-center gap-3">
                    {liked ? (
                        <FaHeart onClick={likeOrDislikeHandler} size={24} className="cursor-pointer text-red-600" />
                    ) : (
                        <FaRegHeart onClick={likeOrDislikeHandler} size={22} className="cursor-pointer hover:text-gray-600" />
                    )}
                    <FiMessageCircle
                        size={22}
                        onClick={() => {
                            dispatch(setSelectedPost(post));
                            setOpen(true);
                        }}
                        className="cursor-pointer hover:text-gray-600"
                    />
                    <FiSend size={22} className="cursor-pointer hover:text-gray-600" />
                </div>
                <FiBookmark size={22} className="cursor-pointer hover:text-gray-600" />
            </div>

            {/* Post Info */}
            <span className="text-start font-medium block mb-2">{postLike} likes</span>
            <p className="text-start">
                <span className="font-medium mr-2">{post.author?.username || 'Unknown User'}</span>
                {post.caption || ''}
            </p>
            {comment.length > 0 && (
                <span
                    onClick={() => {
                        dispatch(setSelectedPost(post));
                        setOpen(true);
                    }}
                    className="text-start cursor-pointer text-sm text-gray-400"
                >
                    View all {comment.length} comments
                </span>
            )}

            {/* Comment Dialog */}
            <CommentDialog open={open} setOpen={setOpen} />

            {/* Add Comment */}
            <div className="flex items-center justify-between mt-2">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={text}
                    onChange={handleCommentInput}
                    className="bg-[#F9F7F7] text-black outline-none text-sm w-full"
                />
                {text && (
                    <span onClick={commentHandler} className="text-[#3F72AF] cursor-pointer">
                        Post
                    </span>
                )}
            </div>
        </div>
    );
};

export default Post;
