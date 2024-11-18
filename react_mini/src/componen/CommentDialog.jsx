import { Avatar } from "@radix-ui/react-avatar";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";

const CommentDialog = ({ open, setOpen, onCommentSubmit }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const [comment, setComment] = useState("");
  const [moreDialogOpen, setMoreDialogOpen] = useState(false);

  const handleUnfollow = () => {
    console.log("Unfollowed user");
  };

  const handleAddToFavorites = () => {
    console.log("Added user to favorites");
  };

  const handleSubmitComment = () => {
    if (comment.trim() !== "") {
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
              src="https://images.unsplash.com/photo-1561489401-fc2876ced162?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="post_image"
              className="w-full h-auto rounded"
            />
          </div>

          <div className="flex flex-col justify-between w-1/3">
            <div className="flex items-center gap-2">
              <div className="flex gap-3 items-center">
                <Link className="text-[#3F72AF]">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="mt-4">
                  <Link className="text-[#3F72AF] font-semibold text-medium">
                    Username
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
            <div className="flex-1 overflow-y-auto max-h-96 p-4">
              <div className="mb-2">
                <p>Comment 1</p>
                <p>Comment 2</p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex item-center gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={handleChange}
                  className="w-full outline-none border border-gray-300 p-2 rounded bg-[#DBE2EF] text-[#112D4E] placeholder-[#112D4E]"
                />

                <button
                  variant='outline'
                  disabled={comment.trim() === ""}
                  onClick={handleSubmitComment}
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