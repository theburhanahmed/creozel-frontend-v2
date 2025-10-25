import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';
import { Button } from './Button';
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'simple' | 'outline' | 'pills';
  className?: string;
  itemsPerPage?: number;
  totalItems?: number;
  showItemsPerPage?: boolean;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
}
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  showFirstButton = true,
  showLastButton = true,
  size = 'md',
  variant = 'default',
  className = '',
  itemsPerPage,
  totalItems,
  showItemsPerPage = false,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 25, 50, 100]
}) => {
  // Generate page numbers to display
  const range = (start: number, end: number) => {
    return Array.from({
      length: end - start + 1
    }, (_, i) => start + i);
  };
  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages);
  const siblingsStart = Math.max(Math.min(currentPage - siblingCount, totalPages - boundaryCount - siblingCount * 2 - 1), boundaryCount + 2);
  const siblingsEnd = Math.min(Math.max(currentPage + siblingCount, boundaryCount + siblingCount * 2 + 2), endPages.length > 0 ? endPages[0] - 2 : totalPages - 1);
  // Calculate page ranges
  const itemList = [...startPages, ...(siblingsStart > boundaryCount + 2 ? ['ellipsis'] : boundaryCount + 1 < totalPages - boundaryCount ? [boundaryCount + 1] : []), ...range(siblingsStart, siblingsEnd), ...(siblingsEnd < totalPages - boundaryCount - 1 ? ['ellipsis'] : totalPages - boundaryCount > boundaryCount ? [totalPages - boundaryCount] : []), ...endPages];
  // Handle page change
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };
  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onItemsPerPageChange) {
      onItemsPerPageChange(Number(e.target.value));
    }
  };
  // Size classes
  const sizeClasses = {
    sm: {
      button: 'w-7 h-7 text-xs',
      text: 'text-xs'
    },
    md: {
      button: 'w-9 h-9 text-sm',
      text: 'text-sm'
    },
    lg: {
      button: 'w-10 h-10 text-base',
      text: 'text-base'
    }
  };
  // Variant classes
  const getButtonClasses = (isActive: boolean) => {
    switch (variant) {
      case 'outline':
        return isActive ? 'bg-white dark:bg-gray-800 border-green-500 dark:border-green-500 text-green-600 dark:text-green-400 border' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 border hover:bg-gray-50 dark:hover:bg-gray-700';
      case 'pills':
        return isActive ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800';
      case 'simple':
        return isActive ? 'text-green-600 dark:text-green-400 font-medium underline' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300';
      default:
        return isActive ? 'bg-green-600 dark:bg-green-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700';
    }
  };
  // Calculate item range for display
  const calculateItemRange = () => {
    if (!itemsPerPage || !totalItems) return null;
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);
    return `${start}-${end} of ${totalItems}`;
  };
  // Render simple variant
  if (variant === 'simple') {
    return <div className={`flex items-center justify-between ${className}`}>
        <div className="flex items-center">
          {showItemsPerPage && onItemsPerPageChange && <div className="flex items-center mr-4">
              <span className={`${sizeClasses[size].text} text-gray-500 dark:text-gray-400 mr-2`}>
                Items per page:
              </span>
              <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 text-sm py-1 px-2">
                {itemsPerPageOptions.map(option => <option key={option} value={option}>
                    {option}
                  </option>)}
              </select>
            </div>}
          {calculateItemRange() && <span className={`${sizeClasses[size].text} text-gray-500 dark:text-gray-400`}>
              {calculateItemRange()}
            </span>}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size={size} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1} ariaLabel="Previous page" className={sizeClasses[size].button}>
            <ChevronLeftIcon size={size === 'sm' ? 16 : 20} />
          </Button>
          <span className={`${sizeClasses[size].text} text-gray-700 dark:text-gray-300`}>
            Page {currentPage} of {totalPages}
          </span>
          <Button variant="ghost" size={size} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages} ariaLabel="Next page" className={sizeClasses[size].button}>
            <ChevronRightIcon size={size === 'sm' ? 16 : 20} />
          </Button>
        </div>
      </div>;
  }
  // Render default, outline, or pills variant
  return <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {/* Items per page selector */}
      {showItemsPerPage && onItemsPerPageChange && <div className="flex items-center mr-4">
          <span className={`${sizeClasses[size].text} text-gray-500 dark:text-gray-400 mr-2`}>
            Items per page:
          </span>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 text-sm py-1 px-2">
            {itemsPerPageOptions.map(option => <option key={option} value={option}>
                {option}
              </option>)}
          </select>
        </div>}
      {/* Item range display */}
      {calculateItemRange() && <span className={`${sizeClasses[size].text} text-gray-500 dark:text-gray-400 mr-4`}>
          {calculateItemRange()}
        </span>}
      {/* First page button */}
      {showFirstButton && <Button variant={variant === 'default' ? 'outline' : 'ghost'} size={size} onClick={() => handlePageChange(1)} disabled={currentPage <= 1} ariaLabel="Go to first page" className={`${sizeClasses[size].button} ${variant === 'pills' ? 'rounded-full' : ''}`}>
          <ChevronLeftIcon size={size === 'sm' ? 12 : 14} className="mr-1" />
          <ChevronLeftIcon size={size === 'sm' ? 12 : 14} />
        </Button>}
      {/* Previous page button */}
      <Button variant={variant === 'default' ? 'outline' : 'ghost'} size={size} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1} ariaLabel="Previous page" className={`${sizeClasses[size].button} ${variant === 'pills' ? 'rounded-full' : ''}`}>
        <ChevronLeftIcon size={size === 'sm' ? 16 : 20} />
      </Button>
      {/* Page numbers */}
      {itemList.map((item, index) => {
      if (item === 'ellipsis') {
        return <span key={`ellipsis-${index}`} className={`flex items-center justify-center ${sizeClasses[size].button} text-gray-500 dark:text-gray-400`}>
              <MoreHorizontalIcon size={size === 'sm' ? 16 : 20} />
            </span>;
      }
      const page = item as number;
      const isActive = page === currentPage;
      return <button key={page} onClick={() => handlePageChange(page)} disabled={isActive} className={`
              flex items-center justify-center rounded-md
              ${sizeClasses[size].button}
              ${getButtonClasses(isActive)}
              ${variant === 'pills' ? 'rounded-full' : ''}
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
              transition-colors duration-200
            `} aria-current={isActive ? 'page' : undefined} aria-label={`Page ${page}`}>
            {page}
          </button>;
    })}
      {/* Next page button */}
      <Button variant={variant === 'default' ? 'outline' : 'ghost'} size={size} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages} ariaLabel="Next page" className={`${sizeClasses[size].button} ${variant === 'pills' ? 'rounded-full' : ''}`}>
        <ChevronRightIcon size={size === 'sm' ? 16 : 20} />
      </Button>
      {/* Last page button */}
      {showLastButton && <Button variant={variant === 'default' ? 'outline' : 'ghost'} size={size} onClick={() => handlePageChange(totalPages)} disabled={currentPage >= totalPages} ariaLabel="Go to last page" className={`${sizeClasses[size].button} ${variant === 'pills' ? 'rounded-full' : ''}`}>
          <ChevronRightIcon size={size === 'sm' ? 12 : 14} className="mr-1" />
          <ChevronRightIcon size={size === 'sm' ? 12 : 14} />
        </Button>}
    </div>;
};