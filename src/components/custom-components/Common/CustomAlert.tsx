import { Alert } from "@heroui/alert";
import { extendVariants } from "@heroui/system";
import { IconAlertTriangleFilled, IconCheck, IconCircleCheckFilled, IconInfoCircleFilled, IconRosetteDiscountCheck } from "@tabler/icons-react";
import { AnimatePresence, motion, warning } from "framer-motion";
import { ReactNode, useState } from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { cn } from "@/lib/utils";

type Severity = "info" | "success" | "warning" | "error";

type Props = {
  title: string;
  description?: string;
  icon?: ReactNode;
  severity: Severity;
  showCloseButton?: boolean;
  onClose?: () => void;
  endContent?: ReactNode;
};

const ExtendedAlert = extendVariants(Alert, {
  variants: {
    color: {
      primary: {
        base: "bg-primary/10  text-primary",
        closeButton: "data-[hover]:bg-primary/20 text-primary",
      },
      success: {
        base: "bg-green-600/10 text-green-600",
        closeButton: "data-[hover]:bg-green-600/20 text-green-600",
      },
      danger: {
        base: "bg-red-600/10 text-red-600",
        closeButton: "data-[hover]:bg-red-600/20 text-red-600",
      },
      warning: {
        base: "bg-yellow-400/10 text-yellow-500 ",
        closeButton: "data-[hover]:bg-yellow-400/20 text-yellow-500",
      },
    },
  },
});

const alertIcons = {
  info: {
    icon: <IconInfoCircleFilled size={24} />,
  },
  success: {
    icon: <IconCircleCheckFilled size={24} />,
  },
  error: {
    icon: <IconAlertTriangleFilled size={24} />,
  },
  warning: {
    icon: <IconAlertTriangleFilled size={24} />,
  },
};
const CustomAlert = ({ title, description, icon, severity, onClose, showCloseButton = true, endContent }: Props) => {
  const [open, setOpen] = useState(true);
  const getColor = (severity: Severity) => {
    if (severity === "info") return "primary";
    if (severity === "error") return "danger";
    return severity;
  };

  const isMobile = useBreakpoint("sm", "down");
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
          <ExtendedAlert
            icon={icon ?? alertIcons[severity]?.icon}
            color={getColor(severity)}
            description={description}
            endContent={<div className={cn(isMobile && "order-last col-span-3")}>{endContent}</div>}
            title={title}
            classNames={{
              base: cn("items-center border-0 p-2", isMobile && "grid grid-cols-[auto,auto,auto]", !!endContent && "grid-rows-2"),
              iconWrapper: "bg-transparent border-0 shadow-none",
              title: "font-body-12-500",
            }}
            variant="faded"
            onClose={
              showCloseButton
                ? () => {
                    setOpen(false);
                    onClose?.();
                  }
                : undefined
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomAlert;
