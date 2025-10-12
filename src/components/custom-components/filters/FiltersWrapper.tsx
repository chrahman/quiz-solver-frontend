import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import CustomModal from "../Common/CustomModal";
import { ScrollShadow } from "@heroui/react";
import CustomButton from "../Common/CustomButton";
import { IconAdjustmentsFilled } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const FiltersWrapper = ({ children }: { children: ReactNode }) => {
  const isTablet = useBreakpoint("md", "down");
  const { t } = useTranslation();
  return (
    <>
      {!isTablet && children && (
        <AnimatePresence>
          <motion.div
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              marginBottom: isTablet ? 0 : 16,
            }}
            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
            className={cn("overflow-hidden justify-end")}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
      {isTablet && (
        <CustomModal
          title="Filters"
          triggerEl={
            <CustomButton variant="flat" color="primary" className="min-w-fit w-full text-primary" size="md">
              <IconAdjustmentsFilled size={20} />
              <p>{t("Filters")}</p>
            </CustomButton>
          }
        >
          <ScrollShadow className="w-full flex-1">
            <div className={cn("overflow-hidden flex flex-col gap-2.5")}>{children}</div>
          </ScrollShadow>
        </CustomModal>
      )}
    </>
  );
};

export default FiltersWrapper;
