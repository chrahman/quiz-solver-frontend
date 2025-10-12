"use client";

import { Button as HeroUIButton } from "@heroui/button";
import { extendVariants } from "@heroui/system";
import { ComponentProps, ElementRef, forwardRef } from "react";
import { cn } from "@/lib/utils";

const faded = "[&.active]:border-primary border-default-200";

export const ExtendedButton = extendVariants(
  HeroUIButton,
  {
    variants: {
      color: {
        success: "bg-green-600 dark:bg-green-800 text-[#fff]",
      },
      size: {
        lg: "px-3 ",
        xs: "min-h-6 min-w-6 max-h-6 text-xs px-2 rounded-sm",
        sm: "text-xs",
        md: "text-xs",
      },
      variant: {
        faded,
        light: "[&.active]:bg-primary/10",
        transparent: "[&.active]:text-primary",
        flat: "",
        dot: "text-offBlack dark:text-offWhite dark:bg-opacity-10 bg-opacity-10 gap-0.5 leading-[100%]",
        bordered: "border-opacity-40 bg-offWhite",
        menu: "text-default [&.active]:text-primary [&.active]:bg-primary/10 hover:bg-primary/10 hover:text-primary font-body-12-500",
      },
    },
    compoundVariants: [
      {
        variant: "flat",
        color: "primary",
        className: "text-primary bg-primary/10",
      },
      {
        variant: "flat",
        color: "danger",
        className: "text-red-600 bg-red-600/20",
      },
      {
        variant: "flat",
        color: "success",
        className: "text-green-600 bg-green-600/10",
      },
    ],
  },
  { twMerge: true }
);

type ExtendedButtonProps = ComponentProps<typeof ExtendedButton> & { selected?: boolean; isIconOnly?: boolean };

const CustomButton = forwardRef<ElementRef<typeof ExtendedButton>, ExtendedButtonProps>(({ children, className, selected, isIconOnly, disabled, ...props }, ref) => {
  return (
    <ExtendedButton
      {...props}
      ref={ref}
      disabled={disabled}
      className={cn(
        "items-center",
        "group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-0",
        "group-data-[focus-visible=true]:ring-offset-0",
        "focus-within:!outline-none focus-within:ring-0",
        "group-data-[focus-visible=true]:border-white",
        selected ? "active" : "",
        isIconOnly ? "min-w-fit aspect-square flex-shrink-0 p-0" : "",
        disabled ? "opacity-50 cursor-not-allowed hover:opacity-50" : "",
        className
      )}
    >
      {children}
    </ExtendedButton>
  );
});

export default CustomButton;
