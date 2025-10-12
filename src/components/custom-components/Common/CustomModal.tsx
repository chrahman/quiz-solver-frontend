import { cloneElement, ComponentProps, isValidElement, ReactElement, ReactNode, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { IconArrowLeft } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import CustomDrawer from "./CustomDrawer";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import Button from "./CustomButton";

type Props = {
  onClose?: () => void;
  onOpen?: () => void;
  triggerEl?: ReactElement<{ onClick: () => void }> | ((open: boolean) => ReactElement<{ onClick: () => void }>);
  children: ((onClose?: () => void, open?: boolean, backButtonClickCounter?: number, setBackButtonClickCounter?: (state: number) => void) => ReactNode) | ReactNode;
  title?: ReactNode;
  handleBack?: () => void;
  openOverride?: boolean;
  preventClosing?: (() => void) | boolean;
  allowClosing?: boolean;
  showDialog?: boolean;
  footer?: ReactNode;
  className?: string;
  isMobileFalse?: boolean;
  size?: ComponentProps<typeof Modal>["size"];
  isDissmissable?: boolean;
  classNames?: ComponentProps<typeof Modal>["classNames"];
};

const CustomModal = ({
  onClose,
  onOpen,
  triggerEl,
  children,
  title,
  handleBack,
  openOverride,
  preventClosing,
  allowClosing = true,
  showDialog,
  footer,
  className,
  isMobileFalse,
  size,
  isDissmissable = true,
  classNames,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpoint("sm", "down");

  const open = openOverride ?? isOpen;

  const closeModal = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      onOpen?.();
      setIsOpen(true);
    } else {
      if (preventClosing || !allowClosing) {
        if (typeof preventClosing === "function") preventClosing();
        return;
      }

      if (showDialog) {
        // Implement alert dialog
        return;
      }
      closeModal();
    }
  };

  const renderContent = () => (typeof children === "function" ? children(closeModal) : children);

  const element = typeof triggerEl === "function" ? triggerEl(open) : triggerEl;

  const trigger = isValidElement(element)
    ? cloneElement(
        element,
        element.type === Button
          ? {
              // @ts-expect-error CustomButton accepts onPress
              onPress: () => handleOpenChange(true),
            }
          : {
              onClick: () => handleOpenChange(true),
            }
      )
    : undefined;

  const backButton = handleBack && (
    <Button onPress={handleBack} variant="light" isIconOnly size="xs" className="rounded-full opacity-60">
      <IconArrowLeft size={20} />
    </Button>
  );
  return (
    <>
      {triggerEl && trigger}
      {isMobile ? (
        <CustomDrawer
          isOpen={open}
          isMobileFalse={isMobileFalse}
          onOpenChange={handleOpenChange}
          footer={footer}
          title={
            <div className="flex items-center gap-1 font-body-14-600">
              {backButton}
              {title}
            </div>
          }
          preventClosing={!!preventClosing}
          className={className}
        >
          {renderContent()}
        </CustomDrawer>
      ) : (
        <Modal
          isOpen={open}
          onOpenChange={handleOpenChange}
          className={cn("max-h-[80dvh] text-offGrey", className)}
          classNames={{
            ...classNames,
          }}
          scrollBehavior="inside"
          size={size}
          isDismissable={isDissmissable}
        >
          <ModalContent>
            <>
              <ModalHeader className="flex items-center gap-1 pb-2 font-body-14-600">
                {backButton}
                {title}
              </ModalHeader>
              <ModalBody className="py-4 mr-2">{renderContent()}</ModalBody>
              {footer && <ModalFooter className="h-fit pt-4">{footer}</ModalFooter>}
            </>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default CustomModal;
