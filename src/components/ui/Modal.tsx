import React, { useEffect, useRef, Fragment } from 'react';
import { XIcon } from 'lucide-react';
import { Portal, FocusTrap } from './AccessibilityUtils';
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnEsc?: boolean;
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  position?: 'center' | 'top';
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
  initialFocus?: React.RefObject<HTMLElement>;
  onAfterOpen?: () => void;
  preventScroll?: boolean;
}
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  closeOnEsc = true,
  closeOnOutsideClick = true,
  showCloseButton = true,
  size = 'md',
  position = 'center',
  className = '',
  contentClassName = '',
  overlayClassName = '',
  initialFocus,
  onAfterOpen,
  preventScroll = true
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  // Handle modal open effect
  useEffect(() => {
    if (isOpen) {
      // Call onAfterOpen callback
      if (onAfterOpen) {
        onAfterOpen();
      }
      // Prevent body scrolling when modal is open
      if (preventScroll) {
        document.body.style.overflow = 'hidden';
      }
    }
    // Cleanup
    return () => {
      if (preventScroll) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, onAfterOpen, preventScroll]);
  // Handle click outside
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && e.target === overlayRef.current) {
      onClose();
    }
  };
  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4'
  };
  // Position classes
  const positionClasses = {
    center: 'items-center',
    top: 'items-start pt-10'
  };
  // Don't render if not open
  if (!isOpen) return null;
  return <Portal>
      <FocusTrap isActive={isOpen} onEscape={closeOnEsc ? onClose : undefined}>
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div ref={overlayRef} className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${overlayClassName}`} onClick={handleOverlayClick} aria-hidden="true" />
          {/* Modal positioning container */}
          <div className={`fixed inset-0 flex justify-center ${positionClasses[position]}`}>
            {/* Modal content */}
            <div ref={contentRef} role="dialog" aria-modal="true" aria-labelledby={title ? 'modal-title' : undefined} aria-describedby={description ? 'modal-description' : undefined} className={`
                relative w-full ${sizeClasses[size]} my-8 mx-auto
                bg-white dark:bg-gray-800 rounded-lg shadow-xl
                transform transition-all duration-300
                animate-in fade-in zoom-in-95
                ${className}
              `}>
              {/* Close button */}
              {showCloseButton && <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800" onClick={onClose} aria-label="Close">
                  <XIcon size={20} />
                </button>}
              {/* Modal header */}
              {(title || description) && <div className="px-6 pt-6 pb-0">
                  {title && <h3 id="modal-title" className="text-lg font-medium text-gray-900 dark:text-white">
                      {title}
                    </h3>}
                  {description && <p id="modal-description" className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {description}
                    </p>}
                </div>}
              {/* Modal body */}
              <div className={`p-6 ${contentClassName}`}>{children}</div>
              {/* Modal footer */}
              {footer && <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 rounded-b-lg border-t border-gray-200 dark:border-gray-700">
                  {footer}
                </div>}
            </div>
          </div>
        </div>
      </FocusTrap>
    </Portal>;
};
export interface ConfirmDialogProps extends Omit<ModalProps, 'children'> {
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: 'default' | 'danger' | 'warning';
  message: React.ReactNode;
  confirmButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  cancelButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  title = 'Confirm Action',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  variant = 'default',
  message,
  size = 'sm',
  confirmButtonProps,
  cancelButtonProps,
  ...props
}) => {
  // Button variant classes
  const buttonVariants = {
    default: 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white',
    warning: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 text-white'
  };
  // Handle confirm action
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title={title} size={size} footer={<div className="flex justify-end space-x-3">
          <button type="button" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800" onClick={onClose} {...cancelButtonProps}>
            {cancelText}
          </button>
          <button type="button" className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${buttonVariants[variant]}`} onClick={handleConfirm} {...confirmButtonProps}>
            {confirmText}
          </button>
        </div>} {...props}>
      <div className="text-sm text-gray-600 dark:text-gray-300">{message}</div>
    </Modal>;
};