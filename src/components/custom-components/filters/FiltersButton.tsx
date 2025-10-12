import { IconAdjustmentsFilled, IconChevronDown } from '@tabler/icons-react';
import CustomButton from '../Common/CustomButton';
import { useTranslation } from 'react-i18next';
import { cn } from '@heroui/react';

const FiltersButton = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const { t } = useTranslation();
  return (
    <CustomButton variant="flat" color="primary" className="min-w-fit text-primary" size="md" onPress={() => setOpen(!open)}>
      <IconAdjustmentsFilled size={20} />
      <p>{t('Filters')}</p>
      <IconChevronDown
        size={20}
        className={cn('flex-shrink-0 transition-transform transform', {
          'rotate-180': open,
        })}
      />
    </CustomButton>
  );
};

export default FiltersButton;
