import { DateInput } from "@heroui/date-input";
import { I18nProvider } from "@react-aria/i18n";
import { ComponentProps, useEffect, useState } from "react";
import { IconCalendarMonth, IconX } from "@tabler/icons-react";
import { Calendar } from "@heroui/calendar";
import { parseDate, CalendarDate, CalendarDateTime, ZonedDateTime } from "@internationalized/date";
import moment from "moment";
import { cn } from "@/lib/utils";
import CustomPopover from "./CustomPopover";
import CustomButton from "./CustomButton";

type Props = {
  inputClassName?: string;
  innerWrapperClassName?: string;
  value: string | undefined;
  onChange: (value: string | null) => void;
  allowClear?: boolean;
} & Omit<ComponentProps<typeof DateInput>, "value" | "onChange">;

const CustomDateInput = ({ size, inputClassName, innerWrapperClassName, value, onChange, allowClear, variant = "faded", label, ...props }: Props) => {
  const initialDate = value && moment(value).isValid() ? parseDate(moment(value).format("YYYY-MM-DD")) : null;

  const [inputValue, setInputValue] = useState<CalendarDate | CalendarDateTime | ZonedDateTime | null>(initialDate);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (!inputValue || !initialDate) setInputValue(initialDate);
  }, [initialDate]);

  // Handle manual input changes
  const handleInputChange = (newValue: CalendarDate | CalendarDateTime | ZonedDateTime | null) => {
    if (newValue?.toString) {
      const dateValue = newValue.year < 1000 ? new CalendarDate(2000 + newValue.year, newValue.month, newValue.day) : newValue;
      setInputValue(dateValue);

      if (moment(dateValue.toString(), '"YYYY-MM-DD"').isValid()) {
        setIsInvalid(false);
        onChange(moment.utc(dateValue.toString()).toISOString());
      } else {
        setIsInvalid(true);
      }
    } else {
      onChange(null);
    }
  };

  return (
    <I18nProvider locale="en-GB">
      <div className="flex flex-col w-full gap-2 justify-end">
        {label && <p className="font-body-12-600">{label}</p>}
        <DateInput
          isInvalid={isInvalid}
          size={size}
          variant={variant}
          classNames={{
            input: cn("font-body-12-500", inputClassName),
            inputWrapper: cn(innerWrapperClassName),
          }}
          endContent={
            <div className="flex gap-2">
              <CustomPopover
                triggerEl={
                  <CustomButton variant="light" isIconOnly size="xs" radius="full">
                    <IconCalendarMonth size={18} />
                  </CustomButton>
                }
              >
                <Calendar
                  value={inputValue}
                  onChange={handleInputChange}
                  showMonthAndYearPickers
                  classNames={{
                    base: "overflow-hidden",
                    content: "dark:bg-offBlack",
                  }}
                />
              </CustomPopover>
              {allowClear && inputValue && (
                <CustomButton variant="light" isIconOnly size="xs" radius="full" onPress={() => handleInputChange(null)}>
                  <IconX size={18} />
                </CustomButton>
              )}
            </div>
          }
          {...props}
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </I18nProvider>
  );
};

export default CustomDateInput;
