import { IconChevronDown, IconX } from "@tabler/icons-react";
import CustomButton from "./CustomButton";
import CustomPopover from "./CustomPopover";
import { Slider } from "@heroui/react";
import { ComponentProps, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  placeholder?: string;
  value?: (number | null)[];
  onChange?: (val: (number | null)[]) => void;
} & Omit<ComponentProps<typeof Slider>, "value" | "onChange">;

const CustomRangeField = ({ placeholder, value, minValue, maxValue, step, onChange, label, ...props }: Props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const marks = Array.from({ length: Math.floor((maxValue - minValue) / step) + 1 }, (_, i) => {
    const value = minValue + i * step;
    return { value, label: value?.toString() + (value === maxValue ? "+" : "") };
  });

  const fromValue = (value: number[]) => (value?.[0] === minValue ? null : value?.[0]);
  const toValue = (value: number[]) => (value?.[1] === maxValue ? null : value?.[1]);

  return (
    <div className="flex flex-col w-full gap-2 justify-end">
      {label && <p className={cn("font-body-12-600")}>{label}</p>}
      <CustomPopover
        openOverride={popoverOpen}
        onOpen={() => setPopoverOpen(true)}
        onClose={() => setPopoverOpen(false)}
        placement="bottom-start"
        className="min-w-fit"
        triggerEl={
          <CustomButton variant="faded" size="md" className={cn("p-0 px-3 justify-between", { "text-foreground-500": !value, "text-default-foreground": !!value })}>
            {value ? `${value[0] ?? minValue}-${value[1] ?? maxValue}` : placeholder ?? "Select"}
            <div className="flex gap-2 items-center justify-center">
              {!!value && (
                <CustomButton
                  isIconOnly
                  size="xs"
                  variant="transparent"
                  className="rounded-full"
                  onPress={() => {
                    onChange(null);
                    setPopoverOpen(false);
                  }}
                >
                  <IconX size={16} />
                </CustomButton>
              )}
              <IconChevronDown size={16} stroke={1} />
            </div>
          </CustomButton>
        }
      >
        <div className="p-2 max-w-full">
          <Slider
            className="sm:min-w-[400px] min-w-[90dvw] w-full"
            classNames={{ mark: "font-body-12-500" }}
            onChangeEnd={(value) => {
              if (typeof value === "number") {
                onChange([null, value]);
              } else {
                onChange(fromValue(value) || toValue(value) ? [fromValue(value), toValue(value)] : null);
              }
            }}
            maxValue={maxValue}
            minValue={minValue}
            step={step}
            marks={marks ?? props.marks}
            defaultValue={value ?? [minValue, maxValue]}
            {...props}
          />
        </div>
      </CustomPopover>
    </div>
  );
};

export default CustomRangeField;
