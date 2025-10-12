import { motion } from "framer-motion";
import type { Tab } from "./CustomTabs";
import CustomButton from "../Common/CustomButton";
import { cn } from "@/lib/utils";

type TabItemProps = {
  tab: Tab;
  currentTab?: string;
  onChange: (value: string) => void;
  layoutId: string;
  labelClassName?: string;
};

const TabItem = ({ tab, currentTab, onChange, layoutId, labelClassName }: TabItemProps) => {
  return (
    <div id={`${layoutId}-${tab.value}`}>
      <CustomButton
        variant="transparent"
        size="md"
        value={tab.value}
        selected={currentTab === tab.value}
        onPress={() => onChange(tab.value)}
        className="rounded-none !w-fit hover:text-primary px-0 min-w-0 "
        disableRipple
      >
        {tab?.Icon && <tab.Icon size={18} />}
        <span className={cn("font-body-12-400", labelClassName)}>{tab.label}</span>
        {!!tab.badge && (
          <div className="h-4 min-w-4 px-1 transition-all flex items-center justify-center font-body-10-400 bg-lightGrey dark:bg-offBlack dark:text-offWhite rounded-full group-data-[selected=true]:text-white group-data-[selected=true]:bg-primary">
            {tab.badge}
          </div>
        )}
      </CustomButton>
      {currentTab === tab.value && <motion.div layoutId={layoutId} className="h-[1px] w-full bg-primary" />}
    </div>
  );
};

export default TabItem;
