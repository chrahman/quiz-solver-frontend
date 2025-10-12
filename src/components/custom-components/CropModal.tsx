import { useState, useCallback, useEffect } from "react";
import { v4 } from "uuid";
import { Slider } from "@heroui/slider";
import { IconArrowsDiagonal } from "@tabler/icons-react";
import Cropper, { Area } from "react-easy-crop";
import { isNumber } from "lodash";
import CustomModal from "./Common/CustomModal";
import CustomButton from "./Common/CustomButton";

type CropModalProps = {
  file: File | null | undefined;
  onSave: (croppedImage: File | undefined) => void;
};

const CropModal = ({ file, onSave }: CropModalProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  useEffect(() => {
    setZoom(1);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  const getCroppedImg = async (imageSrc: string, crop: Area): Promise<File> => {
    const image = new Image();
    image.src = imageSrc;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Failed to get canvas context");

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const file = new File([blob], `${v4()}.png`, {
          type: "image/png",
        });
        resolve(file);
      }, "image/png");
    });
  };

  const handleCrop = async () => {
    if (!croppedAreaPixels || !imageSrc) return;

    try {
      const croppedImageFile = await getCroppedImg(imageSrc, croppedAreaPixels);
      onSave(croppedImageFile);
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  return (
    <CustomModal openOverride={!!file} title="Crop Image" onClose={() => onSave(undefined)} allowClosing={false}>
      <div className="flex flex-col gap-4 h-screen max-h-[500px] justify-between">
        {imageSrc && (
          <div className="relative w-full sm:min-w-[350px] flex-1">
            <Cropper image={imageSrc} crop={crop} zoom={zoom} aspect={1} cropShape="round" onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete} />
          </div>
        )}
        <Slider
          defaultValue={1}
          maxValue={5}
          minValue={1}
          step={0.01}
          onChange={(value) => setZoom(isNumber(value) ? value : 1)}
          showTooltip
          endContent={<IconArrowsDiagonal size={20} />}
          classNames={{ thumb: "[&:after]:dark:bg-offGrey" }}
        />
        <div className="flex w-full gap-2 mb-4 sm:mb-0">
          <CustomButton variant="faded" onPress={() => onSave(undefined)}>
            Cancel
          </CustomButton>
          <CustomButton variant="solid" color="primary" onPress={handleCrop} className="flex-1">
            Save
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  );
};

export default CropModal;
