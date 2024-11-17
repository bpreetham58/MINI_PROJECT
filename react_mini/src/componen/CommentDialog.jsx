import { Avatar } from "@radix-ui/react-avatar";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import React from "react";
import { AvatarFallback, AvatarImage } from "./ui/avatar";

const CommentDialog = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}
    onInteractOutside={() => setOpen(false)}>
      <DialogContent
        className="fixed inset-0 bg-black/60 flex items-center justify-center p-4"
        onEscapeKeyDown={() => setOpen(false)}
      >
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full">
          <img
            src="https://images.unsplash.com/photo-1561489401-fc2876ced162?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="post_image"
            className="w-full h-auto rounded"
          />
          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex item-center justify-between">
              <Avatar>
                <AvatarImage src=""/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
