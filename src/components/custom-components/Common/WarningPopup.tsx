import { useTranslation } from "react-i18next";
import CustomModal from "./CustomModal";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import CustomButton from "./CustomButton";

type PopupWarningProps = {
  openWarningModal: boolean;
  handleClose: () => void;
  handleAction: () => void;
  warningText: string;
  warningTitle?: string;
  confirmText?: string;
  cancelText?: string;
};

const WarningPopup = ({ openWarningModal, handleClose, handleAction, warningText, warningTitle, confirmText, cancelText }: PopupWarningProps) => {
  const { t } = useTranslation();

  return (
    <CustomModal
      openOverride={openWarningModal}
      onClose={handleClose}
      title={
        <div className="text-primary flex gap-2 items-center">
          <IconAlertTriangleFilled size={24} />
          {warningTitle ? warningTitle : t("Confirm Deletion")}
        </div>
      }
      // classNames={{
      //   wrapper: 'z-[10050]',
      //   backdrop: 'z-[10040]',
      //   base: 'z-[10060]',
      // }}
      footer={
        <div className="flex gap-2">
          <CustomButton onPress={handleClose} variant="faded">
            {cancelText ?? t("Cancel")}
          </CustomButton>
          <CustomButton onPress={handleAction} color="danger">
            {confirmText ? confirmText : t("Delete")}
          </CustomButton>
        </div>
      }
    >
      {warningText}
    </CustomModal>
  );
};

export default WarningPopup;
