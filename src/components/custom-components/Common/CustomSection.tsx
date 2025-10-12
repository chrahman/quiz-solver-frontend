import { ReactElement, ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import CustomTooltip from "@/components/custom-components/CustomTooltip";

type Props = {
  children: ReactNode;
  title: ReactElement<HTMLSpanElement> | string;
  subtitle?: ReactElement<HTMLSpanElement> | string;
  titleRightSideElement?: ReactNode;
  icon?: ReactElement;
  underTitleElement?: ReactNode;
  gap?: number;
  className?: string;
  footer?: ReactNode;
  tooltipOnTitle?: boolean;
};
const CustomSection = ({ children, title, subtitle, icon, titleRightSideElement, underTitleElement, className, footer, gap = 10, tooltipOnTitle }: Props) => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const isMobile = useBreakpoint("md", "down");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      style={{ overflow: animationFinished ? undefined : "hidden" }}
      onAnimationComplete={() => setAnimationFinished(true)}
    >
      <div style={{ gap: isMobile ? 6 : gap }} className={cn(`flex flex-col w-full mt-[15px]`, className)}>
        <div
          className="
      flex min-h-[40px] items-center justify-between gap-4"
        >
          <div className="items-center flex gap-1.5 dark:text-offWhite">
            {icon}
            <div className="flex flex-col gap-1">
              {tooltipOnTitle ? (
                <CustomTooltip
                  mobileFriendly
                  content={title}
                  //   content={title}
                  // modalOnMobile
                >
                  <h2 className="font-heading-20-600 line-clamp-2">{title}</h2>
                </CustomTooltip>
              ) : (
                <h2 className="font-heading-20-600">{title}</h2>
              )}
              <h3 className="font-body-12-400 text-default">{subtitle}</h3>
            </div>
          </div>
          {titleRightSideElement && <div className="flex-1">{titleRightSideElement}</div>}
        </div>
        {underTitleElement}
        {children}
        {footer && <div className="w-full flex justify-center">{footer}</div>}
      </div>
    </motion.div>
  );
};

export default CustomSection;
