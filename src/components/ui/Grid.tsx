import React, { Children, cloneElement, isValidElement } from 'react';
interface GridProps {
  children: React.ReactNode;
  cols?: number | {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number | {
    x?: number;
    y?: number;
  };
  className?: string;
  rowGap?: number;
  colGap?: number;
  itemClassName?: string;
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
}
export const Grid: React.FC<GridProps> = ({
  children,
  cols = 1,
  gap,
  className = '',
  rowGap,
  colGap,
  itemClassName = '',
  alignItems,
  justifyItems
}) => {
  // Process columns
  const getColsClass = () => {
    if (typeof cols === 'number') {
      return `grid-cols-${cols}`;
    }
    return [cols.sm && `sm:grid-cols-${cols.sm}`, cols.md && `md:grid-cols-${cols.md}`, cols.lg && `lg:grid-cols-${cols.lg}`, cols.xl && `xl:grid-cols-${cols.xl}`].filter(Boolean).join(' ');
  };
  // Process gap
  const getGapClass = () => {
    if (gap === undefined) return '';
    if (typeof gap === 'number') {
      return `gap-${gap}`;
    }
    return [gap.x && `gap-x-${gap.x}`, gap.y && `gap-y-${gap.y}`].filter(Boolean).join(' ');
  };
  // Process alignment
  const getAlignClass = () => {
    if (!alignItems) return '';
    return `items-${alignItems}`;
  };
  // Process justification
  const getJustifyClass = () => {
    if (!justifyItems) return '';
    return `justify-items-${justifyItems}`;
  };
  // Process children to add className to direct children
  const processedChildren = Children.map(children, child => {
    if (isValidElement(child) && itemClassName) {
      return cloneElement(child, {
        className: `${child.props.className || ''} ${itemClassName}`.trim()
      });
    }
    return child;
  });
  return <div className={`
        grid
        ${getColsClass()}
        ${getGapClass()}
        ${rowGap ? `gap-y-${rowGap}` : ''}
        ${colGap ? `gap-x-${colGap}` : ''}
        ${getAlignClass()}
        ${getJustifyClass()}
        ${className}
      `}>
      {processedChildren}
    </div>;
};
export const GridItem: React.FC<{
  children: React.ReactNode;
  colSpan?: number | {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  rowSpan?: number | {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  className?: string;
}> = ({
  children,
  colSpan,
  rowSpan,
  className = ''
}) => {
  // Process column span
  const getColSpanClass = () => {
    if (colSpan === undefined) return '';
    if (typeof colSpan === 'number') {
      return `col-span-${colSpan}`;
    }
    return [colSpan.sm && `sm:col-span-${colSpan.sm}`, colSpan.md && `md:col-span-${colSpan.md}`, colSpan.lg && `lg:col-span-${colSpan.lg}`, colSpan.xl && `xl:col-span-${colSpan.xl}`].filter(Boolean).join(' ');
  };
  // Process row span
  const getRowSpanClass = () => {
    if (rowSpan === undefined) return '';
    if (typeof rowSpan === 'number') {
      return `row-span-${rowSpan}`;
    }
    return [rowSpan.sm && `sm:row-span-${rowSpan.sm}`, rowSpan.md && `md:row-span-${rowSpan.md}`, rowSpan.lg && `lg:row-span-${rowSpan.lg}`, rowSpan.xl && `xl:row-span-${rowSpan.xl}`].filter(Boolean).join(' ');
  };
  return <div className={`
        ${getColSpanClass()}
        ${getRowSpanClass()}
        ${className}
      `}>
      {children}
    </div>;
};