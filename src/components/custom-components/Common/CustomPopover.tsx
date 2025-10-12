import { ComponentProps, ReactElement, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { cn } from "@heroui/theme";
import CustomModal from "./CustomModal";

type Props = {
  triggerEl: ReactElement | ((open: boolean) => ReactElement);
  children: ((onClose: () => void) => ReactElement) | ReactElement;
  preventClosing?: (() => void) | boolean;
  onClose?: () => void;
  onOpen?: () => void;
  modalOnMobile?: boolean;
  activated?: boolean;
  transformOriginVertical?: number;
  placement?: ComponentProps<typeof Popover>["placement"];
  side?: "top" | "bottom" | "left" | "right";
  openOverride?: boolean;
  setOpenOverride?: (state: boolean) => void;
  className?: string;
  title?: string;
};

const CustomPopover = ({ triggerEl, children, preventClosing, onClose, modalOnMobile, onOpen, activated = true, placement, openOverride, setOpenOverride, className, title }: Props) => {
  const isMobile = useBreakpoint("md", "down") && modalOnMobile;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    if (preventClosing) {
      if (typeof preventClosing === "function") preventClosing();
      return;
    }

    setOpen(false);
    onClose?.();
  };

  const onChange = (open: boolean) => {
    if (open) {
      setOpen(true);
      setOpenOverride?.(true);
      onOpen?.();
    } else handleClose();
  };

  return activated ? (
    !isMobile ? (
      <>
        <Popover isOpen={openOverride ?? open} onOpenChange={onChange} placement={placement}>
          <PopoverTrigger asChild>{typeof triggerEl === "function" ? triggerEl(open) : triggerEl}</PopoverTrigger>
          <PopoverContent className={cn("max-w-[300px] p-0 w-fit rounded-lg text-xs", className)}>{typeof children === "function" ? children(handleClose) : children}</PopoverContent>
        </Popover>
      </>
    ) : (
      <CustomModal
        title={title}
        openOverride={openOverride ?? open}
        triggerEl={triggerEl as ReactElement<{ onClick: () => void }>}
        onClose={() => onChange(false)}
        onOpen={() => onChange(true)}
        preventClosing={preventClosing}
      >
        {typeof children === "function" ? children(handleClose) : children}
      </CustomModal>
    )
  ) : (
    <>{children}</>
  );
};

export default CustomPopover;
