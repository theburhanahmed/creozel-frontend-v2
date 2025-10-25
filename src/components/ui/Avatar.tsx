import React, { useState, Children, cloneElement, isValidElement } from 'react';
import { UserIcon } from 'lucide-react';
export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  shape?: 'circle' | 'square' | 'rounded';
  status?: 'online' | 'offline' | 'away' | 'busy' | 'none';
  statusPosition?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
  bordered?: boolean;
  borderColor?: string;
  className?: string;
  fallback?: React.ReactNode;
  onClick?: () => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  initials,
  size = 'md',
  shape = 'circle',
  status = 'none',
  statusPosition = 'bottom-right',
  bordered = false,
  borderColor,
  className = '',
  fallback,
  onClick,
  onError
}) => {
  const [imgError, setImgError] = useState(false);
  // Handle image load error
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImgError(true);
    if (onError) {
      onError(e);
    }
  };
  // Size classes
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };
  // Shape classes
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-md'
  };
  // Status color classes
  const statusColorClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400 dark:bg-gray-600',
    away: 'bg-amber-500',
    busy: 'bg-red-500',
    none: ''
  };
  // Status position classes
  const statusPositionClasses = {
    'top-right': '-top-0.5 -right-0.5',
    'bottom-right': '-bottom-0.5 -right-0.5',
    'bottom-left': '-bottom-0.5 -left-0.5',
    'top-left': '-top-0.5 -left-0.5'
  };
  // Calculate size styles for custom size
  const getSizeStyle = () => {
    if (typeof size === 'number') {
      return {
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${Math.max(size / 2.5, 10)}px`
      };
    }
    return {};
  };
  // Calculate status badge size based on avatar size
  const getStatusBadgeSize = () => {
    if (typeof size === 'number') {
      return Math.max(size / 6, 6);
    }
    switch (size) {
      case 'xs':
        return 6;
      case 'sm':
        return 8;
      case 'md':
        return 10;
      case 'lg':
        return 12;
      case 'xl':
        return 14;
      default:
        return 10;
    }
  };
  // Get border classes or styles
  const getBorderStyles = () => {
    if (!bordered) return {};
    if (borderColor) {
      return {
        boxShadow: `0 0 0 2px ${borderColor}`
      };
    }
    return {
      boxShadow: '0 0 0 2px var(--border-color, rgba(255, 255, 255, 0.8))'
    };
  };
  // Determine what to render inside the avatar
  const renderAvatarContent = () => {
    // If image src is provided and no error, render the image
    if (src && !imgError) {
      return <img src={src} alt={alt} onError={handleError} className={`w-full h-full object-cover ${shapeClasses[shape]}`} />;
    }
    // If custom fallback is provided, render it
    if (fallback) {
      return fallback;
    }
    // If initials are provided, render them
    if (initials) {
      return <span className="flex items-center justify-center w-full h-full font-medium text-gray-700 dark:text-gray-300">
          {initials.substring(0, 2).toUpperCase()}
        </span>;
    }
    // Default fallback is a user icon
    return <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700">
        <UserIcon className="text-gray-500 dark:text-gray-400" size={typeof size === 'number' ? size / 2 : undefined} />
      </div>;
  };
  return <div className={`
        relative inline-flex flex-shrink-0
        ${typeof size === 'string' ? sizeClasses[size] : ''}
        ${shapeClasses[shape]}
        ${onClick ? 'cursor-pointer hover:opacity-90' : ''}
        ${className}
      `} style={{
    ...getSizeStyle(),
    ...getBorderStyles()
  }} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      {renderAvatarContent()}
      {/* Status indicator */}
      {status !== 'none' && <span className={`
            absolute ${statusPositionClasses[statusPosition]} 
            ${statusColorClasses[status]} 
            rounded-full
            ${bordered ? 'border-2 border-white dark:border-gray-800' : ''}
          `} style={{
      width: `${getStatusBadgeSize()}px`,
      height: `${getStatusBadgeSize()}px`
    }} />}
    </div>;
};
export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: AvatarProps['size'];
  overlap?: 'small' | 'medium' | 'large';
  className?: string;
  overflowLabel?: (overflowCount: number) => React.ReactNode;
}
export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max,
  size = 'md',
  overlap = 'medium',
  className = '',
  overflowLabel
}) => {
  // Calculate overlap amount based on size and overlap prop
  const getOverlapAmount = () => {
    const baseAmount = typeof size === 'number' ? size / 3 : 8;
    switch (overlap) {
      case 'small':
        return baseAmount / 2;
      case 'large':
        return baseAmount * 1.5;
      default:
        return baseAmount;
    }
  };
  // Get avatars and handle max limit
  const avatars = Children.toArray(children);
  const visibleAvatars = max ? avatars.slice(0, max) : avatars;
  const overflowCount = max && avatars.length > max ? avatars.length - max : 0;
  // Style for avatar container
  const containerStyle = {
    marginLeft: `-${getOverlapAmount()}px`
  };
  return <div className={`flex items-center ${className}`}>
      {visibleAvatars.map((avatar, index) => <div key={index} className="relative" style={index > 0 ? containerStyle : undefined}>
          {isValidElement(avatar) ? cloneElement(avatar as React.ReactElement<AvatarProps>, {
        size,
        bordered: true,
        borderColor: 'var(--avatar-border-color, white)'
      }) : avatar}
        </div>)}
      {/* Overflow counter */}
      {overflowCount > 0 && <div className="relative flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium border-2 border-white dark:border-gray-800 rounded-full" style={{
      ...containerStyle,
      width: typeof size === 'number' ? `${size}px` : undefined,
      height: typeof size === 'number' ? `${size}px` : undefined,
      ...(typeof size === 'string' ? {
        width: sizeClasses[size].split(' ')[0].replace('w-', ''),
        height: sizeClasses[size].split(' ')[1].replace('h-', '')
      } : {})
    }}>
          {overflowLabel ? overflowLabel(overflowCount) : `+${overflowCount}`}
        </div>}
    </div>;
};