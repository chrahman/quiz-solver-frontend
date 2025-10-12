import { ReactNode } from "react";
import CustomModal from "./Common/CustomModal";
import { cn } from "@/lib/utils";

const CustomImagePopup = ({ src, children, alt, className }: { src: string; alt?: string; children: ReactNode; className?: string }) => (
  <CustomModal triggerEl={<div className={cn("h-full w-full flex justify-center items-center cursor-zoom-in", className)}>{children}</div>} size="md">
    <img src={src} alt={alt ?? "Tournament-cover"} width={600} height={600} className="w-full h-max m-auto rounded-large min-w-[250px]" />
  </CustomModal>
);

export default CustomImagePopup;
