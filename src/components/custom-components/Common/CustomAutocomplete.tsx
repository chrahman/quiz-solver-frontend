import { ComponentProps, ReactElement, ReactNode, useEffect, useState } from 'react';
import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { useIntersectionObserver } from 'usehooks-ts';
import { Key } from '@react-types/shared';

export type Option = {
  text: string;
  filterBy?: string;
  value: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
};

type CustomProps = {
  onOpen?: () => void;
  onSelect?: (value: string | null) => void;
  onType?: (value: string | null) => void;
  variant?: 'faded' | 'flat' | 'bordered';
  options: Option[];
  showClear?: boolean;
};

type Props = CustomProps &
  Partial<Omit<ComponentProps<typeof Autocomplete>, 'onSelect' | 'value'>> & {
    placeholder?: string;
    onLoadMore?: () => void;
    hasMore?: boolean;
    className?: string;
    defaultInputValue?: string | number;
    size?: string;
    wrapperClassName?: string;
    selectedValue?: string | null;
  };

export type FieldState = {
  selectedKey: Key | null | undefined;
  inputValue: string;
  startContent: ReactNode | null;
};

const CustomAutocomplete = ({ options, placeholder = 'Select an option...', variant = 'faded', onSelect, onType, selectedValue, onLoadMore, hasMore, label, ...props }: Props) => {
  const [open, setOpen] = useState(false);

  const [fieldState, setFieldState] = useState<FieldState>({
    selectedKey: selectedValue ?? '',
    inputValue: options.find((option) => option.value === selectedValue)?.text ?? '',
    startContent: options.find((option) => option.value === selectedValue)?.leftIcon,
  });

  useEffect(() => {
    if (selectedValue) {
      onSelectionChange(selectedValue);
    }
  }, [selectedValue]);

  const onSelectionChange = (key: Key | null) => {
    setFieldState(() => {
      const selectedItem = options.find((option) => option.value === key);

      return {
        inputValue: selectedItem?.text || '',
        selectedKey: key,
        startContent: selectedItem?.leftIcon,
      };
    });
    onSelect?.(key?.toString() ?? null);
  };

  const onInputChange = (value: string) => {
    setFieldState((prevState) => ({
      inputValue: value,
      selectedKey: value === '' ? null : prevState.selectedKey,
      startContent: null,
    }));
    onType?.(value?.toString() ?? null);
  };

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    if (isIntersecting && hasMore && !props.isLoading && open) {
      onLoadMore?.();
    }
  }, [isIntersecting, hasMore, props.isLoading, open]);

  return (
    <div className="flex flex-col w-full gap-2 justify-end">
      {label && <p className="font-body-12-600">{label}</p>}
      <Autocomplete
        onOpenChange={setOpen}
        variant={variant}
        selectedKey={fieldState.selectedKey}
        inputValue={fieldState.inputValue}
        startContent={fieldState.startContent}
        onSelectionChange={onSelectionChange}
        onInputChange={onInputChange}
        placeholder={placeholder}
        {...props}
      >
        {options.map((option, i) => (
          <AutocompleteItem variant="faded" key={option.value} startContent={option.leftIcon} textValue={option.filterBy ?? option.text} className="flex-shrink-0 relative truncate">
            {option.text}
            {i === options.length - 1 && <div key={option.value} ref={ref} className="absolute h-1 w-1 opacity-0 bottom- left-0" />}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
};

export default CustomAutocomplete;
