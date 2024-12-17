import { Avatar } from "@radix-ui/react-avatar";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import axios from "axios";
import { toast } from "react-toastify";
import { setPosts } from "../redux/postSlice";

const CommentDialog = ({ open, setOpen, onCommentSubmit }) => {
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector(store => store.post)
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  }

  const sendMessageHandler = async () => {

    try {
      const res = await axios.post(`http://localhost:8000/api/v1/post/${selectedPost._id}/comment`, { text }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map(p =>
          p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
        );

        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const [moreDialogOpen, setMoreDialogOpen] = useState(false);

  const handleUnfollow = () => {
    console.log("Unfollowed user");
  };

  const handleAddToFavorites = () => {
    console.log("Added user to favorites");
  };

  const handleSubmitComment = () => {
    const inputText = e.target.value;
    if (inputText.trim() !== "") {
      onCommentSubmit(comment);
      setComment("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="fixed inset-0 bg-black/60 flex items-center justify-center p-4"
        onEscapeKeyDown={() => setOpen(false)}
      >
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full flex flex-row gap-4">
          <div className="flex-1">
            <img
              src={selectedPost?.image}
              alt="post_image"
              className="w-full h-auto rounded"
            />
          </div>

          <div className="flex flex-col justify-between w-1/3">
            <div className="flex items-center gap-2">
              <div className="flex gap-3 items-center">
                <Link className="text-[#3F72AF]">
                  <Avatar>
                    <AvatarImage src={selectedPost?.author?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="mt-4">
                  <Link className="text-[#3F72AF] font-semibold text-medium">
                    {selectedPost?.author?.username}
                  </Link>
                </div>
              </div>

              <Dialog open={moreDialogOpen} onOpenChange={setMoreDialogOpen}>
                <DialogTrigger asChild>
                  <div className="cursor-pointer">
                    <FiMoreHorizontal size={20} className="cursor-pointer" />
                  </div>
                </DialogTrigger>
                <DialogContent
                  className="absolute top-20 right-0 bg-white shadow-lg rounded-md p-2 w-40 text-sm z-50"
                  style={{
                    animation: "fadeIn 0.2s ease-in-out",
                    border: "1px solid #ccc",
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <div
                      className="text-[#ED4956] font-bold hover:bg-gray-100 p-2 rounded cursor-pointer"
                      onClick={handleUnfollow}
                    >
                      Unfollow
                    </div>
                    <div
                      className="hover:bg-gray-100 p-2 rounded cursor-pointer"
                      onClick={handleAddToFavorites}
                    >
                      Add to Favorites
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <hr />
            <div className="flex-1 overflow-y-auto max-h-96 p-4 mb-2">
              {
                comment.map((comment) => <Comment key={comment._id} comment={comment} />)
              }



            </div>

            <div className="p-4">
              <div className="flex item-center gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={text}
                  onChange={changeEventHandler}
                  className="w-full outline-none border border-gray-300 p-2 rounded bg-[#DBE2EF] text-sm placeholder-[#112D4E]"
                />

                <button
                  variant='outline'
                  disabled={!text.trim()}
                  onClick={sendMessageHandler}
                  className="bg-[#3F72AF] size-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;

