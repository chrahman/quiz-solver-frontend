import { ElementType, forwardRef, useEffect, useId, useRef, useState } from "react";
import { IconDotsVertical, IconShare } from "@tabler/icons-react";
import ScrollContainer from "react-indiana-drag-scroll";
import { motion } from "framer-motion";
import { Skeleton } from "@heroui/skeleton";
import CustomPopover from "../Common/CustomPopover";
import { cn } from "@/lib/utils";
import CustomButton from "../Common/CustomButton";
import { useTranslation } from "react-i18next";
import Menu from "./Menu";
import TabItem from "./TabItem";
import SharePopoverContent from "./SharePopoverContent";
export type Tab = {
  value: string;
  label: string;
  Icon?: ElementType;
  badge?: number;
};

type Props = {
  tabs: Tab[] | undefined;
  hideTabs?: boolean;
  onChange: (value: string) => void;
  currentTab?: string;
  shareColor?: string;
  isShare?: boolean;
  labelClassName?: string;
};

const CustomTabs = forwardRef<HTMLDivElement, Props>(({ tabs, hideTabs, onChange, currentTab, shareColor = "#FF720B", isShare, labelClassName }, ref) => {
  const { t } = useTranslation();
  const layoutId = `custom-tabs-${useId()}`;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      const container = containerRef.current;
      if (container) {
        setIsScrollable(container.scrollWidth > container.clientWidth);
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, []);

  useEffect(() => {
    const tabEl = document.getElementById(`${layoutId}-${currentTab}`);
    const container = containerRef.current;

    if (tabEl && container && isScrollable) {
      const scrollLeft = tabEl.offsetLeft - (container.offsetWidth - tabEl.offsetWidth) / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [currentTab, layoutId, isScrollable]);

  if (hideTabs) {
    return (
      <div className="max-w-full h-10 flex gap-2 items-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-16 rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <div ref={ref} className="max-w-full flex gap-4 items-center group">
        <ScrollContainer
          innerRef={containerRef}
          className="flex-1"
          horizontal={true}
          style={{
            maskImage: "linear-gradient(to right, black 95%, transparent)",
          }}
        >
          <motion.div layout className="flex gap-4 transition-all duration-200">
            {tabs?.map((tab) => (
              <TabItem key={tab.value} tab={tab} currentTab={currentTab} onChange={onChange} layoutId={layoutId} labelClassName={labelClassName} />
            ))}
          </motion.div>
        </ScrollContainer>
        {isShare && (
          <div className="flex justify-end w-fit md:w-auto">
            <CustomPopover
              modalOnMobile
              transformOriginVertical={-20}
              placement="bottom-end"
              className="p-2"
              triggerEl={
                <CustomButton
                  size="sm"
                  variant="solid"
                  className={cn(
                    "bg-[#e6e9ec] border-[#86909f] dark:bg-offBlack border dark:border-offGrey hover:border-primary hover:text-primary text-[#86909f] flex-grow-0 h-7",
                    isScrollable ? "aspect-square min-w-0 px-0" : "px-2"
                  )}
                >
                  {isScrollable ? (
                    <IconDotsVertical size={16} />
                  ) : (
                    <>
                      <IconShare className="flex-shrink-0" size={16} />
                      {t("Share")}
                    </>
                  )}
                </CustomButton>
              }
            >
              {(onClose) =>
                isScrollable ? <Menu tabs={tabs} currentTab={currentTab} onChange={onChange} onClose={onClose} shareColor={shareColor} /> : <SharePopoverContent shareColor={shareColor} />
              }
            </CustomPopover>
          </div>
        )}
      </div>
    </div>
  );
});

CustomTabs.displayName = "CustomTabs";

export default CustomTabs;
