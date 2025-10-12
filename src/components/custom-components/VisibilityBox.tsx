import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import CustomPaperCard from "./Common/CustomPaperCard";
import { cn } from "@/lib/utils";
import CustomSwitch from "./Common/CustomSwitch";

const VisibilityBox = ({ hidden, isIconOnly, isDisabled, onChange }: { hidden: boolean; onChange?: (value: boolean) => void; isIconOnly?: boolean; isDisabled?: boolean }) => {
  const { t } = useTranslation();
  return (
    <CustomPaperCard
      className={cn("border-0 flex gap-1 items-center justify-center font-body-12-500 ", {
        "bg-green-600/10 text-green-600": !hidden,
        "bg-yellow-500/10 text-yellow-600": hidden,
        "px-1": isIconOnly,
        "pr-2": !isIconOnly,
      })}
    >
      <CustomSwitch size="sm" isSelected={!hidden} isDisabled={isDisabled} onValueChange={onChange} color={hidden ? "warning" : "success"} className={cn("print:hidden", { "h-8 p-0": isIconOnly })} />
      {!isIconOnly && <span>{hidden ? t("Hidden") : t("Published")}</span>}
      {hidden ? <IconEyeOff size={18} /> : <IconEye size={18} />}
    </CustomPaperCard>
  );
};

export default VisibilityBox;
