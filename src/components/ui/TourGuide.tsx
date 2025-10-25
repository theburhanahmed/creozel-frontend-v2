import React, { useEffect, useState, useRef } from 'react';
import { Button } from './Button';
import { XIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon } from 'lucide-react';
import { FocusTrap } from './AccessibilityUtils';
export interface TourStep {
  target: string;
  title: string;
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  offset?: number;
  highlight?: boolean;
}
interface TourGuideProps {
  steps: TourStep[];
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  startAt?: number;
  showProgress?: boolean;
  showCloseButton?: boolean;
  showSkipButton?: boolean;
  closeOnEsc?: boolean;
  closeOnOutsideClick?: boolean;
  className?: string;
  disableOverlay?: boolean;
  disableScrolling?: boolean;
  disableInteraction?: boolean;
  highlightClass?: string;
}
export const TourGuide: React.FC<TourGuideProps> = ({
  steps,
  isOpen,
  onClose,
  onComplete,
  startAt = 0,
  showProgress = true,
  showCloseButton = true,
  showSkipButton = true,
  closeOnEsc = true,
  closeOnOutsideClick = false,
  className = '',
  disableOverlay = false,
  disableScrolling = false,
  disableInteraction = false,
  highlightClass = 'ring-4 ring-green-500/50 dark:ring-green-500/30'
}) => {
  const [currentStep, setCurrentStep] = useState(startAt);
  const [tooltipPosition, setTooltipPosition] = useState({
    top: 0,
    left: 0
  });
  const [highlightPosition, setHighlightPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const highlightedElementRef = useRef<HTMLElement | null>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);
  // Update position when step changes or window resizes
  useEffect(() => {
    if (!isOpen) return;
    const updatePosition = () => {
      const step = steps[currentStep];
      if (!step) return;
      const targetElement = document.querySelector(step.target) as HTMLElement;
      if (!targetElement) return;
      highlightedElementRef.current = targetElement;
      // Calculate target element position
      const targetRect = targetElement.getBoundingClientRect();
      const {
        scrollX,
        scrollY
      } = window;
      // Set highlight position
      setHighlightPosition({
        top: targetRect.top + scrollY,
        left: targetRect.left + scrollX,
        width: targetRect.width,
        height: targetRect.height
      });
      // Calculate tooltip position
      if (!tooltipRef.current) return;
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const offset = step.offset || 15;
      let top = 0;
      let left = 0;
      switch (step.position) {
        case 'top':
          top = targetRect.top + scrollY - tooltipRect.height - offset;
          left = targetRect.left + scrollX + targetRect.width / 2 - tooltipRect.width / 2;
          break;
        case 'right':
          top = targetRect.top + scrollY + targetRect.height / 2 - tooltipRect.height / 2;
          left = targetRect.right + scrollX + offset;
          break;
        case 'bottom':
          top = targetRect.bottom + scrollY + offset;
          left = targetRect.left + scrollX + targetRect.width / 2 - tooltipRect.width / 2;
          break;
        case 'left':
          top = targetRect.top + scrollY + targetRect.height / 2 - tooltipRect.height / 2;
          left = targetRect.left + scrollX - tooltipRect.width - offset;
          break;
        default:
          // Default to bottom
          top = targetRect.bottom + scrollY + offset;
          left = targetRect.left + scrollX + targetRect.width / 2 - tooltipRect.width / 2;
      }
      // Ensure tooltip stays within viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = 10;
      if (left < padding) left = padding;
      if (top < padding) top = padding;
      if (left + tooltipRect.width > viewportWidth - padding) left = viewportWidth - tooltipRect.width - padding;
      if (top + tooltipRect.height > viewportHeight - padding) top = viewportHeight - tooltipRect.height - padding;
      setTooltipPosition({
        top,
        left
      });
      // Scroll target element into view if needed
      if (!disableScrolling) {
        const isInViewport = targetRect.top >= 0 && targetRect.left >= 0 && targetRect.bottom <= window.innerHeight && targetRect.right <= window.innerWidth;
        if (!isInViewport) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
      // Apply highlight class to target element
      if (step.highlight !== false) {
        targetElement.classList.add(...highlightClass.split(' '));
      }
    };
    // Add highlight class
    updatePosition();
    // Update position on window resize
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    // Set initial focus
    setTimeout(() => {
      if (initialFocusRef.current) {
        initialFocusRef.current.focus();
      }
    }, 100);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
      // Remove highlight class from current element
      if (highlightedElementRef.current) {
        highlightedElementRef.current.classList.remove(...highlightClass.split(' '));
        highlightedElementRef.current = null;
      }
    };
  }, [isOpen, currentStep, steps, highlightClass, disableScrolling]);
  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc) {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrev();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStep, closeOnEsc, onClose]);
  // Handle outside clicks
  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node) && highlightedElementRef.current && !highlightedElementRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, closeOnOutsideClick, onClose]);
  // Navigation handlers
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
    onClose();
  };
  const handleSkip = () => {
    onClose();
  };
  // Don't render if not open or no steps
  if (!isOpen || steps.length === 0) return null;
  const currentTourStep = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  return <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Overlay */}
      {!disableOverlay && <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm pointer-events-auto" onClick={closeOnOutsideClick ? onClose : undefined} />}

      {/* Highlight mask */}
      {!disableOverlay && currentTourStep.highlight !== false && <div className="absolute bg-transparent pointer-events-none" style={{
      top: highlightPosition.top,
      left: highlightPosition.left,
      width: highlightPosition.width,
      height: highlightPosition.height,
      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
      borderRadius: '4px'
    }} />}

      {/* Tooltip */}
      <FocusTrap isActive={isOpen} onEscape={closeOnEsc ? onClose : undefined}>
        <div ref={tooltipRef} className={`
            absolute bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-72 pointer-events-auto
            border border-gray-200 dark:border-gray-700
            ${className}
          `} style={{
        top: tooltipPosition.top,
        left: tooltipPosition.left
      }} role="dialog" aria-modal="true" aria-labelledby="tour-step-title">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <h3 id="tour-step-title" className="text-lg font-semibold text-gray-900 dark:text-white">
              {currentTourStep.title}
            </h3>
            {showCloseButton && <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full p-1" aria-label="Close tour">
                <XIcon size={16} />
              </button>}
          </div>

          {/* Content */}
          <div className="mb-4 text-gray-600 dark:text-gray-300">
            {currentTourStep.content}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Progress indicator */}
            {showProgress && <div className="text-xs text-gray-500 dark:text-gray-400">
                {currentStep + 1} of {steps.length}
              </div>}

            {/* Navigation buttons */}
            <div className="flex items-center gap-2">
              {showSkipButton && !isLastStep && <Button variant="ghost" size="sm" onClick={handleSkip}>
                  Skip
                </Button>}
              {!isFirstStep && <Button variant="outline" size="sm" leftIcon={<ChevronLeftIcon size={14} />} onClick={handlePrev}>
                  Back
                </Button>}
              <Button variant="primary" size="sm" rightIcon={isLastStep ? <CheckIcon size={14} /> : <ChevronRightIcon size={14} />} onClick={handleNext} ref={initialFocusRef}>
                {isLastStep ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </FocusTrap>
    </div>;
};