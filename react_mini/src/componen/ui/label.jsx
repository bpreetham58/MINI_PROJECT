import { cn } from "../../lib/utils";
function Label({ text, className }) {
    return <label className={cn("text-base font-medium", className)}>{text}</label>;
  }
  
  export default Label;
  