import { ComponentProps, ReactNode, useState } from "react";
import CustomButton from "./CustomButton";
import { IconChevronDown } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import CustomPaperCard from "./CustomPaperCard";

type Props = {
  titleEl: ReactNode;
  children: ReactNode;
  className?: string;
  rightElement?: ReactNode;
  hideChevron?: boolean;
  openOverride?: boolean;
  defaultOpen?: boolean;
  chevronSize?: number;
  onPress?: (state: boolean) => void;
  fullClickable?: boolean;
} & ComponentProps<"div">;
const CustomAccordion = ({ titleEl, children, className, rightElement, hideChevron, openOverride, onPress, chevronSize, fullClickable, defaultOpen, ...props }: Props) => {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const isOpen = openOverride ?? open;

  const handlePress = (state: boolean) => {
    setOpen(state);
    onPress?.(state);
  };

  return (
    <CustomPaperCard className={cn("p-3 md:p-5 flex flex-col", className)} {...props}>
      <div className={cn("grid grid-cols-[1fr_auto] gap-y-4 items-center", fullClickable && "cursor-pointer")} onClick={fullClickable ? () => handlePress(!isOpen) : undefined}>
        {titleEl}
        <div className="flex gap-2 items-center">
          <CustomButton size="sm" className="min-w-fit w-fit h-fit px-0 rounded-full place-self-center" variant="transparent" onPress={() => handlePress(!isOpen)}>
            {!hideChevron && (
              <motion.div className="flex" animate={{ rotateZ: isOpen ? 180 : 0 }}>
                <IconChevronDown size={chevronSize} />
              </motion.div>
            )}
          </CustomButton>
          {rightElement}
        </div>
      </div>
      <motion.div
        className="overflow-hidden h-0"
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? 10 : 0,
        }}
      >
        {children}
      </motion.div>
    </CustomPaperCard>
  );
};

export default CustomAccordion;
