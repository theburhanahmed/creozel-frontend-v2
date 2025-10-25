import React from 'react';
export interface SkipLinkProps {
  targetId: string;
  className?: string;
  label?: string;
}
export const SkipLink: React.FC<SkipLinkProps> = ({
  targetId,
  className = '',
  label = 'Skip to content'
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.tabIndex = -1;
      target.focus();
      // Reset tabIndex after a short delay
      setTimeout(() => {
        target.removeAttribute('tabindex');
      }, 1000);
    }
  };
  return <a href={`#${targetId}`} onClick={handleClick} className={`
        sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 
        focus:px-4 focus:py-2 focus:bg-green-600 focus:text-white focus:rounded-md 
        focus:outline-none focus:shadow-lg
        ${className}
      `}>
      {label}
    </a>;
};