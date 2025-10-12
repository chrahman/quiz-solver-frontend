import CustomPaperCard from "./Common/CustomPaperCard";
import { cn } from "@/lib/utils";
import { type Icon as TablerIcon } from "@tabler/icons-react";
import { ReactNode } from "react";

type Mode = "light" | "dark";

type Props = {
  title: string;
  icon?: TablerIcon;
  actions?: ReactNode;
  mode?: Mode;
};
const BottomPanelWrapper = ({ title, icon: Icon, actions, mode = "dark" }: Props) => {
  return (
    <CustomPaperCard
      className={cn("flex flex-col sm:flex-row gap-2 sm:items-center justify-between px-4 py-2 font-body-12-500", {
        "border-offGrey bg-offGrey text-offWhite": mode === "dark",
        "bg-lightGrey text-offGrey": mode === "light",
      })}
    >
      <div className="flex gap-2 items-center">
        {Icon && <Icon size={20} />}
        <span>{title}</span>
      </div>
      {actions}
    </CustomPaperCard>
  );
};

export default BottomPanelWrapper;
