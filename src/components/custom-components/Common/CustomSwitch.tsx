import { cn } from "@/lib/utils";
import { Switch, SwitchProps } from "@heroui/switch";
import { ElementRef, forwardRef } from "react";

const CustomSwitch = forwardRef<ElementRef<typeof Switch>, SwitchProps>(({ children, className, ...props }, ref) => (
  <Switch
    ref={ref}
    {...props}
    className={cn(className)}
    classNames={{
      base: cn("inline-flex flex-row-reverse max-w-md items-center", "sm:justify-between justify-center cursor-pointer rounded-lg gap-2 p-2 h-[40px]"),
      thumb: cn("z-1"),
    }}
  >
    {children}
  </Switch>
));

export default CustomSwitch;
