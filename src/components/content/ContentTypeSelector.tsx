import React from 'react';
interface ContentTypeSelectorProps {
  types: {
    value: string;
    label: string;
  }[];
  selectedType: string;
  onSelect: (type: string) => void;
  accentColor: string;
}
export const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({
  types,
  selectedType,
  onSelect,
  accentColor = 'blue-500'
}) => {
  return <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {types.map(type => <button key={type.value} onClick={() => onSelect(type.value)} className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all 
            ${selectedType === type.value ? `bg-${accentColor} text-white` : `bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                   text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700`}
          `}>
          {type.label}
        </button>)}
    </div>;
};