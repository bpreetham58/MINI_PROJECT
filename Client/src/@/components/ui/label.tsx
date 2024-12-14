// src/components/ui/label.tsx
import { cn } from "../../lib/utils";


type LabelProps = {
  text: string;
  className?: string;
};

function Label({ text, className }: LabelProps) {
  return <label className={cn("text-base font-medium", className)}>{text}</label>;
}

export default Label;