import { forwardRef } from "react";
import { Chip as HeroUIChip, ChipProps } from "@heroui/chip";
import { extendVariants } from "@heroui/system";
import { cn } from "@/lib/utils";

type Props = ChipProps;

const ExtendedChip = extendVariants(HeroUIChip, {
  variants: {
    color: {
      success: {
        base: "bg-green-600/20 dark:bg-green-800",
        content: "text-green-800 dark:text-offWhite",
      },
      danger: {
        base: "bg-destructive/20 dark:bg-destructive/50",
        content: "text-destructive dark:text-offWhite",
      },
    },
  },
});

const Chip = forwardRef<HTMLDivElement, Props>(({ children, className, ...props }, ref) => (
  <ExtendedChip ref={ref as any} {...props} className={cn(className)}>
    {children}
  </ExtendedChip>
));

Chip.displayName = "CustomChip";

export default Chip;
