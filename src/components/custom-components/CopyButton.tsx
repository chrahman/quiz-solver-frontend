import { IconCopy } from "@tabler/icons-react";
import CustomButton from "./Common/CustomButton";
import toast from "react-hot-toast";
import { useCopyToClipboard } from "usehooks-ts";
import { cn } from "@/lib/utils";

const CopyButton = ({ text, className }: { text: string; className?: string }) => {
  const [_, copy] = useCopyToClipboard();
  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        toast.success("Copied!");
      })
      .catch((error) => {
        toast.error("Failed to copy!", error);
      });
  };
  return (
    <CustomButton variant="transparent" size="xs" className={cn("flex gap-1 items-center p-0", className)} onPress={handleCopy(text)}>
      <p className="truncate">{text}</p>
      <IconCopy size={16} className="text-primary flex-shrink-0" />
    </CustomButton>
  );
};

export default CopyButton;
