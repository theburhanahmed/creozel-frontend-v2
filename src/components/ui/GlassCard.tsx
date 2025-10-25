import React from 'react';
import { cn } from '../../lib/utils';
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  onClick
}) => {
  return <div className={cn('glass-effect rounded-xl overflow-hidden', 'transition-all duration-300 ease-in-out', onClick && 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5', className)} onClick={onClick}>
      {children}
    </div>;
};
export const GlassCardHeader = ({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={cn('px-6 py-4 border-b border-white/[0.05]', className)}>
    {children}
  </div>;
export const GlassCardContent = ({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={cn('px-6 py-4', className)}>{children}</div>;
export const GlassCardFooter = ({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={cn('px-6 py-4 border-t border-white/[0.05]', className)}>
    {children}
  </div>;