import { motion } from 'framer-motion';
import { IconShare } from '@tabler/icons-react';
import type { Tab } from './CustomTabs';
import CustomButton from '../Common/CustomButton';
import CustomPopover from '../Common/CustomPopover';
import SharePopoverContent from './SharePopoverContent';

type ScrollableShareOptionsProps = {
  tabs?: Tab[];
  currentTab?: string;
  onChange: (value: string) => void;
  onClose: () => void;
  shareColor: string;
};

const Menu = ({ tabs, currentTab, onChange, onClose, shareColor }: ScrollableShareOptionsProps) => {
  return (
    <motion.div layout className="flex flex-col items-start gap-2 min-w-[160px] overflow-auto">
      {tabs?.map(({ Icon, ...tab }) => (
        <CustomButton
          key={tab.value}
          selected={currentTab === tab.value}
          onClick={() => {
            onChange(tab.value);
            onClose();
          }}
          size="sm"
          variant="light"
          className="gap-1 w-full justify-start"
        >
          {Icon && <Icon size={18} />}
          {tab.label}
        </CustomButton>
      ))}
      <div className="w-full h-px bg-lightBorder dark:bg-darkBorder" />
      <CustomPopover
        onClose={onClose}
        modalOnMobile
        transformOriginVertical={-20}
        placement="right"
        triggerEl={
          <CustomButton size="sm" variant="light" className="gap-2 w-full justify-start">
            <IconShare size={18} />
            Share
          </CustomButton>
        }
      >
        <SharePopoverContent shareColor={shareColor} />
      </CustomPopover>
    </motion.div>
  );
};

export default Menu;
