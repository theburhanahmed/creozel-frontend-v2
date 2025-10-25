import React, { useEffect, useState, useRef } from 'react';
import { PlusIcon, XIcon, FileTextIcon, ImageIcon, VideoIcon, MicIcon, RocketIcon, SparklesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
interface ActionItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  color?: string;
  onClick?: () => void;
}
interface FloatingActionMenuProps {
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}
export const FloatingActionMenu: React.FC<FloatingActionMenuProps> = ({
  className,
  position = 'bottom-right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const actions: ActionItem[] = [{
    icon: <FileTextIcon size={18} />,
    label: 'Text Content',
    href: '/content/text',
    color: 'from-blue-500 to-cyan-500'
  }, {
    icon: <ImageIcon size={18} />,
    label: 'Image Content',
    href: '/content/image',
    color: 'from-purple-500 to-pink-500'
  }, {
    icon: <VideoIcon size={18} />,
    label: 'Video Content',
    href: '/content/video',
    color: 'from-orange-500 to-red-500'
  }, {
    icon: <MicIcon size={18} />,
    label: 'Audio Content',
    href: '/content/audio',
    color: 'from-amber-500 to-yellow-500'
  }, {
    icon: <RocketIcon size={18} />,
    label: 'New Pipeline',
    href: '/autopilot/create',
    color: 'from-indigo-500 to-violet-500'
  }];
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);
  // Position classes
  const positionClasses = {
    'bottom-right': 'right-6 bottom-6',
    'bottom-left': 'left-6 bottom-6',
    'top-right': 'right-6 top-24',
    'top-left': 'left-6 top-24'
  };
  return <div ref={menuRef} className={cn('fixed z-50 flex flex-col items-center', positionClasses[position], className)}>
      {/* Action Menu Items with enhanced animations and visual feedback */}
      {isOpen && <div className="flex flex-col-reverse gap-3 mb-5 items-center">
          {actions.map((action, index) => <Link key={action.label} to={action.href} onClick={() => {
        if (action.onClick) action.onClick();
        setIsOpen(false);
      }} className={cn('relative flex items-center group', 'animate-in fade-in slide-in-from-bottom-5', 'transition-all duration-200')} style={{
        animationDelay: `${index * 50}ms`
      }} aria-label={action.label}>
              {/* Enhanced label tooltip with improved styling */}
              <span className={cn('absolute right-16 px-3 py-2 rounded-lg whitespace-nowrap', 'bg-gray-800 dark:bg-gray-700 text-white text-sm font-medium', 'opacity-0 group-hover:opacity-100 transition-all duration-200', 'pointer-events-none shadow-lg scale-95 group-hover:scale-100', 'before:content-[""] before:absolute before:top-1/2 before:-translate-y-1/2', 'before:right-[-8px] before:border-[8px] before:border-transparent', 'before:border-l-gray-800 dark:before:border-l-gray-700')}>
                {action.label}
              </span>
              {/* Enhanced action button with improved visual feedback */}
              <div className={cn('w-14 h-14 rounded-full flex items-center justify-center', 'shadow-lg hover:shadow-xl transition-all duration-200', 'transform hover:scale-105 active:scale-95', 'bg-gradient-to-r', action.color || 'from-[#3FE0A5] to-[#38B897]', 'text-white')}>
                {action.icon}
              </div>
            </Link>)}
        </div>}
      {/* Enhanced main toggle button with improved animations and visual feedback */}
      
    </div>;
};