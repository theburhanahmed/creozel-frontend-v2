import React, { Component } from 'react';
import { cn } from '../../lib/utils';
interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}
export const Heading1: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'h1'
}) => {
  return <Component className={cn('text-3xl font-bold text-gray-900 dark:text-white', className)}>
      {children}
    </Component>;
};
export const Heading2: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'h2'
}) => {
  return <Component className={cn('text-2xl font-bold text-gray-900 dark:text-white', className)}>
      {children}
    </Component>;
};
export const Heading3: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'h3'
}) => {
  return <Component className={cn('text-xl font-semibold text-gray-900 dark:text-white', className)}>
      {children}
    </Component>;
};
export const Heading4: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'h4'
}) => {
  return <Component className={cn('text-lg font-medium text-gray-900 dark:text-white', className)}>
      {children}
    </Component>;
};
export const BodyLarge: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'p'
}) => {
  return <Component className={cn('text-base text-gray-800 dark:text-gray-200', className)}>
      {children}
    </Component>;
};
export const BodyText: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'p'
}) => {
  return <Component className={cn('text-sm text-gray-700 dark:text-gray-300', className)}>
      {children}
    </Component>;
};
export const Caption: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'p'
}) => {
  return <Component className={cn('text-sm text-gray-600 dark:text-gray-400', className)}>
      {children}
    </Component>;
};
export const Label: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'label'
}) => {
  return <Component className={cn('text-sm font-medium text-gray-700 dark:text-gray-300', className)}>
      {children}
    </Component>;
};
export const Hint: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'p'
}) => {
  return <Component className={cn('text-xs text-gray-500 dark:text-gray-500', className)}>
      {children}
    </Component>;
};