import { Input, InputProps, TextAreaProps, Textarea } from "@heroui/input";
import { forwardRef, Ref } from "react";
import { cn } from "@/lib/utils";

type CustomProps = {
  innerWrapperClassName?: string;
  inputClassName?: string;
};

type TextAreaPr = { textarea: true } & TextAreaProps;
type InputPr = { textarea?: false } & InputProps;

const CustomFormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, CustomProps & (TextAreaPr | InputPr)>(
  ({ className, innerWrapperClassName, inputClassName, size = "md", variant = "faded", textarea, label, classNames, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col w-full gap-2 justify-end", { "text-danger": props.isInvalid, "opacity-60": props.isDisabled })}>
        {label && <p className={cn("font-body-12-600", classNames?.label)}>{label}</p>}
        {textarea ? (
          <Textarea ref={ref as Ref<HTMLTextAreaElement>} size={size} variant={variant} {...(props as TextAreaProps)} />
        ) : (
          <Input
            ref={ref as Ref<HTMLInputElement>}
            size={size}
            variant={variant}
            classNames={{
              input: cn("!ring-0 font-body-12-500 outline-none", inputClassName),
              inputWrapper: cn("!ring-0", innerWrapperClassName),
              ...classNames,
            }}
            className={cn("", className)}
            {...(props as InputProps)}
          />
        )}
      </div>
    );
  }
);

CustomFormInput.displayName = "CustomFormInput";

export default CustomFormInput;
