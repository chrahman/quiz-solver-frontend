import { useCallback, ComponentProps, memo, ReactElement } from "react";

import { Select as HeroUISelect, SelectItem } from "@heroui/select";
import { extendVariants, SharedSelection } from "@heroui/system";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import CustomButton from "./CustomButton";
import type { Selection } from "@heroui/react";

export type Option = {
  text: string;
  value: string | null;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
};

type CustomProps = {
  onSelect?: (value: string | Set<string> | null) => void;
  className?: string;
  options: Option[];
  showClear?: boolean;
  selectedValue?: string | number | null;
  selectedValues?: Set<string> | null;
  radius?: string;
  hideSelectedIcon?: boolean;
  fullWidth?: boolean;
  variant?: "faded" | "flat" | "bordered";
  clearOptionTitle?: string;
  enableSelectAll?: boolean;
  noOptionsText?: string;
};

export const ExtendedSelect = extendVariants(
  HeroUISelect,
  {
    variants: {
      color: {
        primary: {
          trigger: "bg-primary/10 border-0",
          value: "text-primary/60 group-data-[has-value=true]:text-primary",
          selectorIcon: "text-primary",
        },
        default: {
          selectorIcon: "text-offBlack dark:text-offWhite",
          label: cn("font-body-12-600"),
        },
      },
    },
  },
  { twMerge: true }
);

type Props = CustomProps & Partial<Omit<ComponentProps<typeof ExtendedSelect>, "onSelect" | "variant">>;

const CLEAR_VALUE = "CLEAR";
const ALL_KEY = "ALL";

const CustomSelectField = memo(
  ({
    selectedValue,
    selectedValues,
    options = [],
    onSelect,
    enableSelectAll = false,
    showClear = true,
    hideSelectedIcon,
    fullWidth,
    variant,
    classNames,
    clearOptionTitle,
    noOptionsText,
    ...props
  }: Props) => {
    const isMultipleMode = props.selectionMode === "multiple";

    const allOptionKeys = options.map((opt) => opt.value ?? "").filter(Boolean);
    const selectedOption = isMultipleMode ? options.filter((val) => (selectedValues as Set<string | number>)?.has(val.value)) ?? [] : options.find((val) => val?.value === selectedValue);

    const isAllSelected = isMultipleMode && enableSelectAll && selectedValues && allOptionKeys.every((key) => selectedValues.has(key));

    const handleValueChange = useCallback(
      (value: SharedSelection) => {
        if (isMultipleMode) {
          const keys = Array.from(value as Selection, (k) => String(k));
          if (enableSelectAll) {
            if (keys.includes(ALL_KEY)) {
              const hasAll = keys.length === allOptionKeys.length + 1;
              onSelect?.(new Set(hasAll ? [] : allOptionKeys));
            } else {
              const allSelected = allOptionKeys.every((key) => keys.includes(key));
              if (allSelected) {
                onSelect?.(new Set([...keys, ALL_KEY]));
              } else {
                onSelect?.(new Set(keys.filter((k) => k !== ALL_KEY)));
              }
            }
          } else {
            onSelect?.(!!keys.length ? new Set(keys) : null);
          }
        } else {
          onSelect?.(value.currentKey === (selectedOption as Option)?.value || value.currentKey === CLEAR_VALUE ? null : value.currentKey || null);
        }
      },
      [onSelect, options, enableSelectAll]
    );

    const allOptions: Option[] = [
      ...(enableSelectAll && isMultipleMode && !!options?.length ? [{ text: "Select All", value: ALL_KEY }] : []),
      ...(clearOptionTitle ? [{ text: clearOptionTitle, value: CLEAR_VALUE }] : []),
      ...options,
    ];

    return (
      <ExtendedSelect
        labelPlacement={props.labelPlacement ?? "outside"}
        variant={variant ?? "faded"}
        selectedKeys={isMultipleMode ? selectedValues : [selectedValue].filter(Boolean)}
        onSelectionChange={handleValueChange}
        className={cn(fullWidth ? "" : "w-fit", props.className, props.errorMessage && "border-danger")}
        classNames={{
          innerWrapper: cn(fullWidth ? "" : "w-full mr-[theme(spacing.6)]", classNames?.innerWrapper, props.errorMessage && "border-danger"),
          popoverContent: cn(fullWidth ? "" : "w-fit", classNames?.popoverContent),
          label: cn("font-body-12-600", classNames?.label, props.errorMessage && "text-danger"),
          value: cn("font-body-12-500", classNames?.value),
          ...classNames,
        }}
        errorMessage={props.errorMessage ? props.errorMessage : undefined}
        renderValue={() => (
          <div className="flex gap-2 items-center w-full overflow-hidden">
            {isMultipleMode ? (
              <p className="truncate w-full text-xs">{isAllSelected ? "All Selected" : (selectedOption as Option[]).map((opt) => opt.text).join(", ")}</p>
            ) : (
              <>
                {!hideSelectedIcon && (selectedOption as Option)?.leftIcon}
                <p className="truncate w-full text-xs">{(selectedOption as Option)?.text}</p>
                {(selectedOption as Option)?.rightIcon ?? ""}
              </>
            )}
          </div>
        )}
        endContent={
          showClear && (selectedValue ?? !!selectedValues?.size) ? (
            <CustomButton variant="light" size="xs" color={props.color ?? "default"} isIconOnly radius="full" onPress={() => onSelect?.(null)}>
              <IconX size={14} />
            </CustomButton>
          ) : (
            <div className="w-2" />
          )
        }
        {...props}
      >
        {allOptions.length > 0 ? (
          allOptions.map((option) => (
            <SelectItem variant="faded" key={option.value}>
              <div className="flex justify-between items-center gap-2 overflow-hidden">
                <div className="flex items-center gap-2 font-body-12-500 text-foreground">
                  {option.leftIcon}
                  {option.text}
                </div>
                {option.rightIcon}
              </div>
            </SelectItem>
          ))
        ) : (
          <SelectItem variant="faded" key="no-options" isDisabled>
            {noOptionsText || "No options available"}
          </SelectItem>
        )}
      </ExtendedSelect>
    );
  }
);

CustomSelectField.displayName = "CustomSelectField";
export default CustomSelectField;
