"use client";

import { useMediaQuery } from "usehooks-ts";
import { Tooltip, TooltipProps } from "@heroui/tooltip";
import { ReactElement } from "react";
import CustomPopover from "./Common/CustomPopover";
import { cn } from "@/lib/utils";

const CustomTooltip = ({
  mobileFriendly = true,
  modalOnMobile,
  disabled,
  children,
  disableInteractive,
  contentClassName,
  content,
  onOpenChange,
  wrapperClassName,
  ...props
}: Omit<TooltipProps, "children"> & {
  mobileFriendly?: boolean;
  disabled?: boolean;
  modalOnMobile?: boolean;
  children: ReactElement;
  disableInteractive?: boolean;
  contentClassName?: string;
  wrapperClassName?: string;
}) => {
  const { ref: _ref, ...otherProps } = props;

  const isMobile = useMediaQuery("(hover: none) and (pointer: coarse)") && mobileFriendly;

  return disabled ? (
    children
  ) : !isMobile ? (
    <Tooltip
      content={content}
      onOpenChange={onOpenChange}
      classNames={{
        content: cn("max-w-[280px]", contentClassName),
        base: cn({ "pointer-events-none": disableInteractive }),
      }}
      showArrow={props.showArrow ?? true}
      {...otherProps}
    >
      <div className={cn("flex max-w-full", wrapperClassName)}>{children}</div>
    </Tooltip>
  ) : (
    <CustomPopover modalOnMobile={modalOnMobile} triggerEl={children} onOpen={() => onOpenChange?.(true)} onClose={() => onOpenChange?.(false)} {...otherProps}>
      <div className="p-2">{content}</div>
    </CustomPopover>
  );
};

export default CustomTooltip;
