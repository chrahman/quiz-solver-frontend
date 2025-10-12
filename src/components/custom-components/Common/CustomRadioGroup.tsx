import { cn, Radio, RadioGroup } from "@heroui/react";
import { ComponentProps, ReactNode } from "react";
import CustomButton from "./CustomButton";
import { useTranslation } from "react-i18next";
import { useBreakpoint } from "@/hooks/useBreakpoint";

type Option = { label: ReactNode; value: string; disabled?: boolean } & ComponentProps<typeof Radio>;
type Props = ComponentProps<typeof RadioGroup> & { options: Option[]; selectedValue?: string | null; hideControl?: boolean; onDeselect?: () => void };

const CustomRadioGroup = ({ options, selectedValue, classNames, hideControl = false, onDeselect, ...props }: Props) => {
  const { t } = useTranslation();
  const isMobile = useBreakpoint("sm", "down");
  return (
    <div className="flex flex-col gap-2">
      <RadioGroup
        value={selectedValue}
        color="primary"
        orientation={isMobile ? "vertical" : "horizontal"}
        className="w-full"
        classNames={{ label: "font-body-12-600 text-inherit", wrapper: "flex-nowrap", ...classNames }}
        {...props}
      >
        {options.map((opt) => (
          <Radio
            key={opt.value}
            size="sm"
            isDisabled={opt.disabled}
            value={opt.value}
            classNames={{
              base: cn(
                "border-1 border-lightGrey data-[selected=true]:border-primary hover:border-primary hover:bg-primary/10 data-[selected=true]:bg-primary/10 rounded-lg w-full max-w-full m-0 p-3 py-4",
                opt.classNames?.base
              ),
              label: cn("font-body-12-500 ml-2", opt.classNames?.label),
              wrapper: cn(hideControl && "hidden"),
            }}
          >
            {opt.label}
          </Radio>
        ))}
      </RadioGroup>
      {onDeselect && (
        <CustomButton size="xs" variant="transparent" className="w-fit text-primary p-0" color="primary" isDisabled={!selectedValue?.length} onPress={onDeselect}>
          {t("Deselect")}
        </CustomButton>
      )}
    </div>
  );
};

export default CustomRadioGroup;
