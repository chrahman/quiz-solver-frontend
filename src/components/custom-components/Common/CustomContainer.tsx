import { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const CustomContainer = ({
  children,
  className,
  containerClassName,
  ...props
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
} & ComponentProps<"div">) => (
  <div className={cn("max-w-[1280px] w-full mx-auto px-2 md:px-4", containerClassName)} {...props}>
    <div className={className}>{children}</div>
  </div>
);

export default CustomContainer;
