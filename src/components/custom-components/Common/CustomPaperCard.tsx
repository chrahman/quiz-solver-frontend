import { ComponentProps, forwardRef } from 'react';
import { Skeleton } from '@heroui/skeleton';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

type Props = {
  skeleton?: boolean;
} & ComponentProps<'div'>;

const CustomPaperCard = forwardRef<HTMLDivElement, Props>(({ children, skeleton, className = '', ...props }, ref) => {
  const baseStyles = twMerge(clsx('rounded-[8px] overflow-hidden', className));
  const styles = twMerge(clsx('border border-lightBorder bg-white dark:bg-offDark dark:border-darkBorder', baseStyles));

  return skeleton ? (
    <Skeleton className={baseStyles} style={props.style} />
  ) : (
    <div ref={ref} className={styles} {...props}>
      {children}
    </div>
  );
});

CustomPaperCard.displayName = 'PaperCard';

export default CustomPaperCard;
