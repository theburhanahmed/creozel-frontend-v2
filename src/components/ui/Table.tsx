import React, { useCallback, useEffect, useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon, ChevronsUpDownIcon } from 'lucide-react';
export interface Column<T> {
  id: string;
  header: React.ReactNode;
  cell: (item: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  className?: string;
  headerClassName?: string;
  cellClassName?: string;
}
export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T, index: number) => string;
  sortable?: boolean;
  defaultSortColumn?: string;
  defaultSortDirection?: 'asc' | 'desc';
  onSort?: (columnId: string, direction: 'asc' | 'desc') => void;
  selectable?: boolean;
  selectedRows?: string[];
  onSelectedRowsChange?: (selectedRows: string[]) => void;
  onRowClick?: (item: T, index: number) => void;
  isLoading?: boolean;
  loadingRows?: number;
  noDataText?: React.ReactNode;
  stickyHeader?: boolean;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: (item: T, index: number, isSelected?: boolean) => string;
  cellClassName?: string;
  striped?: boolean;
  bordered?: boolean;
  compact?: boolean;
  hoverable?: boolean;
  verticalAlign?: 'top' | 'middle' | 'bottom';
}
export function Table<T>({
  data,
  columns,
  keyExtractor,
  sortable = false,
  defaultSortColumn,
  defaultSortDirection = 'asc',
  onSort,
  selectable = false,
  selectedRows = [],
  onSelectedRowsChange,
  onRowClick,
  isLoading = false,
  loadingRows = 5,
  noDataText = 'No data available',
  stickyHeader = false,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  rowClassName = () => '',
  cellClassName = '',
  striped = false,
  bordered = false,
  compact = false,
  hoverable = true,
  verticalAlign = 'middle'
}: TableProps<T>) {
  // State for sorting
  const [sortColumn, setSortColumn] = useState<string | undefined>(defaultSortColumn);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(defaultSortDirection);
  // State for internal selected rows
  const [internalSelectedRows, setInternalSelectedRows] = useState<string[]>(selectedRows);
  // Update internal selected rows when prop changes
  useEffect(() => {
    setInternalSelectedRows(selectedRows);
  }, [selectedRows]);
  // Handle sort
  const handleSort = useCallback((columnId: string) => {
    if (!sortable) return;
    let newDirection: 'asc' | 'desc' = 'asc';
    if (sortColumn === columnId) {
      // Toggle direction if same column
      newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    }
    setSortColumn(columnId);
    setSortDirection(newDirection);
    if (onSort) {
      onSort(columnId, newDirection);
    }
  }, [sortable, sortColumn, sortDirection, onSort]);
  // Handle row selection
  const handleRowSelect = useCallback((rowKey: string, isSelected: boolean) => {
    if (!selectable || !onSelectedRowsChange) return;
    let newSelectedRows: string[];
    if (isSelected) {
      newSelectedRows = [...internalSelectedRows, rowKey];
    } else {
      newSelectedRows = internalSelectedRows.filter(key => key !== rowKey);
    }
    setInternalSelectedRows(newSelectedRows);
    onSelectedRowsChange(newSelectedRows);
  }, [selectable, internalSelectedRows, onSelectedRowsChange]);
  // Handle select all
  const handleSelectAll = useCallback((isSelected: boolean) => {
    if (!selectable || !onSelectedRowsChange) return;
    let newSelectedRows: string[] = [];
    if (isSelected) {
      newSelectedRows = data.map((item, index) => keyExtractor(item, index));
    }
    setInternalSelectedRows(newSelectedRows);
    onSelectedRowsChange(newSelectedRows);
  }, [selectable, data, keyExtractor, onSelectedRowsChange]);
  // Determine if all rows are selected
  const allRowsSelected = data.length > 0 && internalSelectedRows.length === data.length;
  // Vertical alignment classes
  const verticalAlignClasses = {
    top: 'align-top',
    middle: 'align-middle',
    bottom: 'align-bottom'
  };
  // Table style classes
  const tableClasses = ['w-full table-auto', bordered ? 'border border-gray-200 dark:border-gray-700' : '', className].filter(Boolean).join(' ');
  // Header style classes
  const headerClasses = ['bg-gray-50 dark:bg-gray-800 text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400', bordered ? 'border-b border-gray-200 dark:border-gray-700' : '', stickyHeader ? 'sticky top-0 z-10' : '', headerClassName].filter(Boolean).join(' ');
  // Body style classes
  const bodyClasses = ['bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700', bodyClassName].filter(Boolean).join(' ');
  // Default row style classes
  const defaultRowClasses = [hoverable ? 'hover:bg-gray-50 dark:hover:bg-gray-700/50' : '', striped ? 'even:bg-gray-50 dark:even:bg-gray-700/30' : '', onRowClick ? 'cursor-pointer' : ''].filter(Boolean).join(' ');
  // Cell style classes
  const defaultCellClasses = ['px-4 py-3', compact ? 'px-2 py-1 text-sm' : '', bordered ? 'border-r border-gray-200 dark:border-gray-700 last:border-r-0' : '', cellClassName].filter(Boolean).join(' ');
  // Render loading state
  if (isLoading) {
    return <div className={`overflow-x-auto rounded-lg ${bordered ? 'border border-gray-200 dark:border-gray-700' : ''}`}>
        <table className={tableClasses}>
          <thead className={headerClasses}>
            <tr>
              {selectable && <th className="px-4 py-3 w-12">
                  <div className="flex justify-center">
                    <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  </div>
                </th>}
              {columns.map(column => <th key={column.id} className={`px-4 py-3 text-${column.align || 'left'} ${column.headerClassName || ''}`} style={{
              width: column.width
            }}>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </th>)}
            </tr>
          </thead>
          <tbody className={bodyClasses}>
            {Array.from({
            length: loadingRows
          }).map((_, rowIndex) => <tr key={rowIndex} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                {selectable && <td className="px-4 py-3 w-12">
                    <div className="flex justify-center">
                      <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    </div>
                  </td>}
                {columns.map((column, colIndex) => <td key={`${rowIndex}-${colIndex}`} className={`px-4 py-3 ${verticalAlignClasses[verticalAlign]} ${column.cellClassName || ''}`}>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </td>)}
              </tr>)}
          </tbody>
        </table>
      </div>;
  }
  // Render empty state
  if (data.length === 0) {
    return <div className={`overflow-x-auto rounded-lg ${bordered ? 'border border-gray-200 dark:border-gray-700' : ''}`}>
        <table className={tableClasses}>
          <thead className={headerClasses}>
            <tr>
              {selectable && <th className="px-4 py-3 w-12">
                  <div className="flex justify-center">
                    <input type="checkbox" disabled className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 disabled:opacity-50" />
                  </div>
                </th>}
              {columns.map(column => <th key={column.id} className={`px-4 py-3 text-${column.align || 'left'} ${column.headerClassName || ''}`} style={{
              width: column.width
            }}>
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {sortable && column.sortable !== false && <ChevronsUpDownIcon size={14} className="text-gray-400" />}
                  </div>
                </th>)}
            </tr>
          </thead>
          <tbody className={bodyClasses}>
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                {noDataText}
              </td>
            </tr>
          </tbody>
        </table>
      </div>;
  }
  // Render table with data
  return <div className={`overflow-x-auto rounded-lg ${bordered ? 'border border-gray-200 dark:border-gray-700' : ''}`}>
      <table className={tableClasses}>
        <thead className={headerClasses}>
          <tr>
            {selectable && <th className="px-4 py-3 w-12">
                <div className="flex justify-center">
                  <input type="checkbox" checked={allRowsSelected} onChange={e => handleSelectAll(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                </div>
              </th>}
            {columns.map(column => <th key={column.id} className={`px-4 py-3 text-${column.align || 'left'} ${column.headerClassName || ''}`} style={{
            width: column.width
          }}>
                {sortable && column.sortable !== false ? <button className="flex items-center space-x-1 focus:outline-none group w-full" onClick={() => handleSort(column.id)} type="button">
                    <span>{column.header}</span>
                    {sortColumn === column.id ? sortDirection === 'asc' ? <ChevronUpIcon size={14} className="text-green-500" /> : <ChevronDownIcon size={14} className="text-green-500" /> : <ChevronsUpDownIcon size={14} className="text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />}
                  </button> : <div>{column.header}</div>}
              </th>)}
          </tr>
        </thead>
        <tbody className={bodyClasses}>
          {data.map((item, rowIndex) => {
          const rowKey = keyExtractor(item, rowIndex);
          const isSelected = internalSelectedRows.includes(rowKey);
          return <tr key={rowKey} className={`border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${defaultRowClasses} ${isSelected ? 'bg-green-50 dark:bg-green-900/20' : ''} ${rowClassName(item, rowIndex, isSelected)}`} onClick={onRowClick ? () => onRowClick(item, rowIndex) : undefined}>
                {selectable && <td className="px-4 py-3 w-12">
                    <div className="flex justify-center" onClick={e => e.stopPropagation()}>
                      <input type="checkbox" checked={isSelected} onChange={e => handleRowSelect(rowKey, e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                    </div>
                  </td>}
                {columns.map(column => <td key={`${rowKey}-${column.id}`} className={`${defaultCellClasses} text-${column.align || 'left'} ${verticalAlignClasses[verticalAlign]} ${column.cellClassName || ''}`}>
                    {column.cell(item, rowIndex)}
                  </td>)}
              </tr>;
        })}
        </tbody>
      </table>
    </div>;
}