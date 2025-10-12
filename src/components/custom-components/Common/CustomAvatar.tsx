import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import { CSSProperties, forwardRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Button from "./CustomButton";
// import GetFlag from '@/components/get-flag';
import { isValidUrl } from "@/lib/utils/helper-functions";

const Avatar = forwardRef<
  HTMLDivElement,
  {
    onClick?: () => void;
    src: string | undefined | null;
    size?: number | "full";
    seed?: string | null;
    alt?: string | null;
    className?: string;
    country?: string | null;
    style?: CSSProperties;
    wrapperClassName?: string;
    href?: string;
  }
>(({ src, onClick, size = "full", seed, alt, className, wrapperClassName, country, style, href }, ref) => {
  const avatar = createAvatar(initials, {
    seed: seed ?? undefined,
    backgroundType: ["gradientLinear"],
    scale: 85,
  });

  const imageSrc = (src && !src?.includes("freepik") && isValidUrl(src) && src) || avatar.toDataUri();

  return (
    <div ref={ref} className={cn("flex relative", wrapperClassName)}>
      <Button
        as={href ? Link : undefined}
        size="sm"
        isIconOnly
        style={{
          minHeight: size === "full" ? "100%" : size + "px",
          maxHeight: size === "full" ? "100%" : size + "px",
          minWidth: size === "full" ? "100%" : size + "px",
          maxWidth: size === "full" ? "100%" : size + "px",
          ...style,
        }}
        onPress={onClick}
        variant="transparent"
        className={cn("rounded-full p-0 overflow-hidden", className)}
        href={href}
      >
        <img
          alt={alt ?? ""}
          src={imageSrc}
          height={size === "full" ? 100 : size}
          width={size === "full" ? 100 : size}
          style={{
            width: size + "px",
            height: size + "px",
            objectFit: "cover",
          }}
        />
      </Button>
      {/* {country && (
        <GetFlag
          country={country}
          style={{
            position: 'absolute',
            transform: 'translate(-50%, 25%)',
            left: '50%',
            bottom: 0,
            width: size === 'full' ? undefined : (size / 2.5) * 1.6,
            height: size === 'full' ? undefined : size / 2.5,
          }}
        />
      )} */}
    </div>
  );
});

Avatar.displayName = "Avatar";

export const getUserAvatarLink = (src: string, seed: string) => {
  const avatar = createAvatar(initials, {
    seed,
    backgroundType: ["gradientLinear"],
    scale: 85,
  });

  return (src && !src.includes("freepik") && isValidUrl(src) && src) || avatar.toDataUri();
};

export default Avatar;
