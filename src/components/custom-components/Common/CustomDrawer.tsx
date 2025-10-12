import { createPortal } from "react-dom";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { cloneElement, ReactElement, ReactNode, useEffect, useRef, useState } from "react";

import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import CustomButton from "./CustomButton";
import CustomPaperCard from "./CustomPaperCard";

type Props = {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerEl?: ReactElement;
  children?: ReactNode;
  className?: string;
  title?: ReactNode;
  preventClosing?: boolean;
  footer?: ReactNode;
  isMobileFalse?: boolean;
};

const CustomDrawer = ({ isOpen, onOpenChange, triggerEl, children, title, preventClosing, footer, className, isMobileFalse }: Props) => {
  const [localOpen, setLocalOpen] = useState(false);
  const portal = document.getElementById("drawer-portal");
  const initialDragDistance = useRef<number | null>(null);
  const controls = useDragControls();
  const [visible, setVisible] = useState<boolean>(false);

  const handleClose = () => {
    if (preventClosing) return;

    setLocalOpen(false);
    onOpenChange?.(false);
    initialDragDistance.current = null;
  };
  const open = isOpen !== undefined ? isOpen : localOpen;
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      onOpenChange?.(open);
    } else {
      hasMounted.current = true;
    }

    return () => {
      hasMounted.current = false;
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setVisible(true);
      return;
    }

    const timeout = setTimeout(() => {
      setVisible(false);
    }, 250);

    return () => clearTimeout(timeout);
  }, [open]);

  if (!portal) return;

  return (
    <>
      {triggerEl && cloneElement(triggerEl, { onClick: () => setLocalOpen(true) })}
      {createPortal(
        <AnimatePresence>
          {visible && (
            <div className={cn("fixed top-0 left-0 h-[100dvh] w-[100dvw] grid z-50 text-offGrey", { "place-items-center px-6": isMobileFalse, "place-items-end": !isMobileFalse })}>
              <AnimatePresence>
                {open && (
                  <motion.div
                    onClick={handleClose}
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(2px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    className="h-full w-full absolute left-0 top-0 bg-black/20 backdrop-blur-sm"
                  />
                )}
              </AnimatePresence>
              <MotionPaper
                initial={{ y: "100%" }}
                animate={{ y: open ? "0%" : "100%" }}
                className={cn("max-h-[95dvh] min-h-[20dvh] h-fit w-full relative rounded-xl p-4 flex flex-col", className)}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.7}
                drag={preventClosing ? false : "y"}
                dragControls={controls}
                dragListener={false}
                onDragStart={(e: any) => {
                  initialDragDistance.current = e.y;
                }}
                onDragEnd={(e: any) => {
                  if (initialDragDistance.current && e.y - initialDragDistance.current >= 80) {
                    handleClose();
                  }
                }}
                transition={{
                  type: "spring",
                  damping: 10,
                  stiffness: 150,
                  mass: 0.2,
                }}
              >
                <div className="w-14 h-2 bg-lightBorder  pointer-events-none dark:bg-darkBorder rounded-full absolute top-2 left-1/2 -translate-x-1/2" />
                <div style={{ touchAction: "none" }} onPointerDown={(e) => controls.start(e)} className="absolute left-1/2 top-0 h-10 w-1/2 -translate-x-1/2 opacity-0 bg-red-500" />
                <div className="flex justify-between w-full items-center nb-2">
                  <p className="font-heading-16-500">{title}</p>
                  {!preventClosing && (
                    <CustomButton variant="light" isIconOnly size="sm" radius="full" className="ml-auto" onPress={handleClose}>
                      <IconX size={20} className="opacity-60" />
                    </CustomButton>
                  )}
                </div>
                <div className="pb-2 flex-1 overflow-y-auto flex flex-col">{children}</div>
                {footer && <div className="mt-2">{footer}</div>}
              </MotionPaper>
            </div>
          )}
        </AnimatePresence>,
        portal
      )}
    </>
  );
};

export default CustomDrawer;

const MotionPaper = motion.create(CustomPaperCard);
