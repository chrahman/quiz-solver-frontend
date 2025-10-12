import { Icon, IconProps } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { ForwardRefExoticComponent, RefAttributes, useEffect, useId, useState } from "react";
import PaperCard from "./Common/CustomPaperCard";
import { cn } from "@/lib/utils";
import { Tooltip } from "@heroui/react";

type PageConfig<PageType> = {
  title: string;
  value: PageType;
  icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  disabled?: boolean;
  tooltip?: string;
};

type ClassNames = {
  motionWrapper?: string;
  base?: string;
  text?: string;
  active?: string;
  mainWrapper?: string;
  button?: string;
};

type Props<PageType> = {
  initialPage: PageType;
  config: Readonly<PageConfig<PageType>[]>;
  onPageChange: (page: PageType) => void;
  fullWidth?: boolean;
  className?: string;
  classNames?: ClassNames;
  type?: "default" | "chip" | "tab";
};
const PageSelector = <PageType,>({ initialPage, config, onPageChange, fullWidth = false, className, classNames, type = "default" }: Props<PageType>) => {
  const [selectedPage, setSelectedPage] = useState(initialPage);

  const cardClass = {
    chip: {
      motionWrapper: "rounded-full bg-primary",
      base: "border bg-transparent rounded-full group-hover:border-primary border-lightGrey",
      text: "group-hover:text-primary",
      active: "text-offWhite group-hover:text-offWhite border-primary",
      mainWrapper: "rounded-full",
      button: "py-2 px-3",
    },
    tab: {
      motionWrapper: "rounded-none border-0 border-b-2 border-primary bg-transparent",
      base: "bg-transparent rounded-none border-0",
      text: "group-hover:text-primary !sm:font-body-14-500 !font-body-12-500 text-default",
      active: "text-primary group-hover:primary border-0 border-primary",
      mainWrapper: "rounded-none",
      button: "py-3 px-3",
    },
    default: {
      motionWrapper: "border border-primary dark:border-primary bg-primary/10",
      base: "border border-primary opacity-0 group-hover:opacity-10 bg-primary",
      text: "group-hover:text-primary",
      active: "text-primary",
      mainWrapper: "rounded-xl",
      button: "py-2.5 px-5",
    },
  };

  const layoutId = useId();
  const handlePageChange = (page: PageType) => {
    setSelectedPage(page);
    onPageChange(page);
  };

  useEffect(() => setSelectedPage(initialPage), [initialPage]);

  const renderButton = (config: PageConfig<PageType>, index: number) => (
    <button
      key={index}
      disabled={config.disabled}
      className={cn("flex items-center relative group", fullWidth && "w-full justify-center", cardClass[type].button)}
      onClick={() => handlePageChange(config.value)}
    >
      {selectedPage === config.value && <MotionCard layoutId={layoutId} className={cn("absolute left-0 top-0 h-full w-full ", cardClass[type].motionWrapper, classNames?.motionWrapper)} />}
      <PaperCard className={cn("absolute left-0 top-0 h-full w-full transition-all ", cardClass[type].base, selectedPage === config.value && cardClass[type].active, classNames?.base)} />
      <motion.p
        className={cn(
          "relative flex gap-2 items-center !font-body-12-600",
          cardClass[type].text,
          selectedPage === config.value ? cardClass[type].active : "",
          config.disabled && "!text-default/60",
          classNames?.text
        )}
      >
        {config.icon && <config.icon size={18} />}
        {config.title}
      </motion.p>
    </button>
  );

  return (
    <MotionCard layout className={cn("p-1 mx-auto gap-2.5 flex", fullWidth ? "w-full" : "w-fit", cardClass[type].mainWrapper, className, classNames?.mainWrapper)}>
      {config.map((item, i) => (!!item.tooltip ? <Tooltip content={item.tooltip}>{renderButton(item, i)}</Tooltip> : renderButton(item, i)))}
    </MotionCard>
  );
};

const MotionCard = motion.create(PaperCard);

export default PageSelector;
