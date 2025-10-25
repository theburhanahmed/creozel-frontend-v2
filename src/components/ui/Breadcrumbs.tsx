import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
interface BreadcrumbsProps {
  items?: {
    label: string;
    href: string;
  }[];
  autoGenerate?: boolean;
  className?: string;
  separator?: React.ReactNode;
  homeIcon?: React.ReactNode;
}
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  autoGenerate = false,
  className = '',
  separator = <ChevronRightIcon size={16} className="text-gray-400" />,
  homeIcon = <HomeIcon size={16} />
}) => {
  const location = useLocation();
  // Auto-generate breadcrumbs from the current path
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    // Start with home
    const breadcrumbs = [{
      label: 'Home',
      href: '/'
    }];
    // Build up the breadcrumbs
    let currentPath = '';
    paths.forEach(path => {
      currentPath += `/${path}`;
      const formattedLabel = path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      breadcrumbs.push({
        label: formattedLabel,
        href: currentPath
      });
    });
    return breadcrumbs;
  };
  const breadcrumbItems = autoGenerate ? generateBreadcrumbs() : items || [];
  if (!breadcrumbItems.length) return null;
  return <nav aria-label="Breadcrumb" className={cn('mb-4', className)}>
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbItems.map((item, index) => <li key={item.href} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400" aria-hidden="true">
                {separator}
              </span>}
            {index === 0 ? <Link to={item.href} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center" aria-label="Home">
                {homeIcon}
                <span className="sr-only">{item.label}</span>
              </Link> : index === breadcrumbItems.length - 1 ? <span className="font-medium text-gray-900 dark:text-white" aria-current="page">
                {item.label}
              </span> : <Link to={item.href} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                {item.label}
              </Link>}
          </li>)}
      </ol>
    </nav>;
};