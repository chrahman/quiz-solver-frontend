import { Checkbox } from '@heroui/checkbox';
import { ReactNode } from 'react';
import CustomButton from './Common/CustomButton';

type Props = {
  isSelected?: boolean;
  onClick?: () => void;
  labelElement: ReactNode;
  isDisabled?: boolean;
  endContent?: ReactNode;
};

const CheckboxButton = ({ isSelected, labelElement, onClick, isDisabled, endContent }: Props) => {
  return (
    <CustomButton selected={isSelected} variant="faded" className="w-full h-[70px] justify-between" isDisabled={isDisabled} size="lg" onPress={onClick}>
      <Checkbox
        isSelected={isSelected}
        className="pointer-events-none flex-1 overflow-hidden"
        classNames={{
          label: 'overflow-ellipsis overflow-hidden !font-body-14-400 whitespace-normal text-start',
        }}
      >
        {labelElement}
      </Checkbox>
      {endContent}
    </CustomButton>
  );
};

export default CheckboxButton;
