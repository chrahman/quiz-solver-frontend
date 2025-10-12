import { Checkbox, CheckboxProps } from "@heroui/checkbox";
import { ElementRef, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CustomCheckboxProps = CheckboxProps & {
  label?: ReactNode;
  helperText?: string;
  error?: boolean;
  className?: string;
};

const CustomCheckbox = forwardRef<ElementRef<typeof Checkbox>, CustomCheckboxProps>(({ children, className, label, helperText, error, ...props }, ref) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Checkbox
        ref={ref}
        {...props}
        classNames={{
          base: cn("inline-flex max-w-md items-center justify-start cursor-pointer rounded-lg p-2"),
          label: cn("font-body-12-500", error && "text-danger"),
          ...props.classNames,
        }}
      >
        {label || children}
      </Checkbox>
      {helperText && <p className={cn("text-xs ml-6", error ? "text-danger" : "text-default-500")}>{helperText}</p>}
    </div>
  );
});

CustomCheckbox.displayName = "CustomCheckbox";

export default CustomCheckbox;
