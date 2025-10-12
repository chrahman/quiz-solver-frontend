import { ChangeEvent, ComponentProps, useEffect, useRef, useState } from "react";
import CustomFormInput from "./CustomFormInput";
import CustomPopover from "./CustomPopover";
import GetFlag from "@/components/get-flag";
import CustomButton from "./CustomButton";
import { parsePhoneNumber } from "awesome-phonenumber";
import { CountryProperty, customArray, findOne } from "country-codes-list";

type Props = Omit<ComponentProps<typeof CustomFormInput>, "onChange" | "ref"> & {
  onChange: (val: string) => void;
};

const CustomPhoneInput = ({ value, onChange, ...props }: Props) => {
  const arr = customArray({
    phoneCode: "{countryCallingCode}",
    countryCode: "{countryCode}",
    countryName: "{countryNameEn}",
    query: "+{countryCallingCode} {countryCode} {countryNameEn} {countryNameLocal}",
  });

  const data = value ? parsePhoneNumber(value) : undefined;
  const [searchValue, setSearchValue] = useState("");

  const [popoverOpen, setPopoverOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchValue("");
    const fetchUserCountry = async () => {
      const res = await fetch("https://ipinfo.io/json?token=38d4068bea17e2");
      const data = await res.json();
      const countryPhoneCode = findOne("countryCode" as CountryProperty, data.country)?.countryCallingCode;

      if (countryPhoneCode) {
        onChange(`+${countryPhoneCode}`);
      }
    };
    if (!value) void fetchUserCountry();
    ref.current?.focus();
  }, []);

  useEffect(() => {
    setSearchValue("");
    if (popoverOpen) {
      ref.current?.focus();
    }
  }, [popoverOpen]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9+]/g, "");
    onChange?.(numericValue);
  };

  return (
    <CustomFormInput
      classNames={{ description: "text-warning" }}
      label={props.label}
      type="tel"
      pattern="^\+?[0-9]*$"
      startContent={
        <CustomPopover
          title="Country codes"
          modalOnMobile
          onOpen={() => setPopoverOpen(true)}
          onClose={() => setPopoverOpen(false)}
          placement="top-start"
          triggerEl={
            <div className="flex">
              <GetFlag
                country={data?.regionCode ?? "RU"}
                style={{
                  width: "1.25rem",
                  borderRadius: "0.125rem",
                  cursor: "pointer",
                }}
              />
            </div>
          }
          className="p-2"
        >
          {(onClose) => (
            <div className="space-y-2 w-full">
              <CustomFormInput value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Start typing..." ref={ref} />
              <div className="flex flex-col gap-1.5 max-h-[200px] h-[50dvh] sm:h-fit overflow-auto">
                {arr
                  .filter((item) => item.query.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((item) => (
                    <CustomButton
                      key={item.query}
                      variant="faded"
                      size="sm"
                      className="flex-shrink-0 justify-between"
                      onPress={() => {
                        onChange?.(`+${item.phoneCode}`);
                        onClose();
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <GetFlag
                          style={{
                            width: "1.25rem",
                            borderRadius: "0.125rem",
                          }}
                          country={item.countryCode}
                        />
                        <p>{item.countryName}</p>
                      </div>
                      <p className="opacity-60">+{item.phoneCode}</p>
                    </CustomButton>
                  ))}
              </div>
            </div>
          )}
        </CustomPopover>
      }
      value={value}
      onChange={handleInputChange}
    />
  );
};
CustomPhoneInput.displayName = "PhoneInput";

export default CustomPhoneInput;
