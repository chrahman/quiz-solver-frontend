import { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';
import { useDropzone } from 'react-dropzone';
import { IconPhoto, IconTrash, IconX } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import CustomAvatar from './Common/CustomAvatar';
import CustomButton from './Common/CustomButton';
import CropModal from './CropModal';

const MAX_SIZE_MB = 2;

const AvatarUpload = ({
  onChange,
  hideDescription = true,
  size,
  seed,
  avatar,
  croppedImage,
  setCroppedImage,
}: {
  onChange: (file: File | null | undefined) => void;
  hideDescription?: boolean;
  size?: number;
  seed?: string;
  avatar?: string | null;
  croppedImage?: File | null | undefined;
  setCroppedImage: Dispatch<SetStateAction<File | null | undefined>>;
}) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedImage(file);

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });

  useEffect(() => {
    fileRejections.forEach((file) => toast.error(file.errors[0].code === 'file-too-large' ? `File is larger than ${MAX_SIZE_MB}MB` : 'Unknown error'));
  }, [fileRejections]);

  const handleSave = (file: File | undefined) => {
    setUploadedImage(undefined);
    if (file) {
      setCroppedImage(file);
      onChange(file);
    }
  };

  const getCroppedImageUrl = (file: File | null | undefined): string | null => {
    return file ? URL.createObjectURL(file) : null;
  };

  const handleAvatarClick = () => {
    inputRef.current?.click();
  };

  return (
    <section className="space-y-2">
      <div className="flex relative w-fit" {...getRootProps()}>
        <input {...getInputProps()} ref={inputRef} />
        <CustomAvatar src={croppedImage === null ? undefined : (getCroppedImageUrl(croppedImage) ?? avatar)} size={size ?? 100} seed={seed} onClick={handleAvatarClick} />
        <div className="absolute right-0 bottom-0 flex flex-col gap-1 items-end">
          {croppedImage ? (
            <CustomButton
              variant="faded"
              className="p-1 min-w-fit h-fit w-fit rounded-full aspect-square translate-x-1.5"
              onPress={() => {
                setCroppedImage(undefined);
                onChange(undefined);
              }}
            >
              <IconX size={14} />
            </CustomButton>
          ) : avatar && !avatar?.includes('freepik') && croppedImage !== null ? (
            <CustomButton
              variant="faded"
              className="p-1 min-w-fit h-fit w-fit rounded-full aspect-square translate-x-1.5"
              onPress={() => {
                setCroppedImage(null);
                onChange(null);
              }}
            >
              <IconTrash className="text-danger" size={14} />
            </CustomButton>
          ) : null}
          <CustomButton variant="faded" className="p-1.5 min-w-fit w-fit h-fit rounded-full aspect-square" onPress={handleAvatarClick}>
            <IconPhoto size={16} />
          </CustomButton>
        </div>
      </div>
      {hideDescription && <p className="font-body-11-400 opacity-50">We recommend an image that is 256 x 256 pixels, max 2MB</p>}

      <CropModal file={uploadedImage} onSave={handleSave} />
    </section>
  );
};

export default AvatarUpload;
