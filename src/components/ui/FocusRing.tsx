import React from 'react';
interface FocusRingProps {
  children: React.ReactNode;
  className?: string;
}
export const FocusRing: React.FC<FocusRingProps> = ({
  children,
  className = ''
}) => {
  return <div className={`focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-1 dark:focus-within:ring-offset-gray-800 rounded-lg ${className}`}>
      {children}
    </div>;
};