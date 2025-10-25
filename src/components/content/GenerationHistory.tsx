import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ClockIcon, RepeatIcon, StarIcon, TrashIcon, DownloadIcon, CopyIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
interface HistoryItem {
  id: string;
  prompt: string;
  tool: string;
  result: string;
  timestamp: Date;
  isFavorite: boolean;
  creditCost: number;
}
const mockHistory: HistoryItem[] = [{
  id: '1',
  prompt: 'Write a blog post about AI trends in 2024',
  tool: 'Content Generator',
  result: 'Artificial Intelligence continues to revolutionize...',
  timestamp: new Date(Date.now() - 1000 * 60 * 30),
  isFavorite: true,
  creditCost: 10
}, {
  id: '2',
  prompt: 'Create a social media caption for a product launch',
  tool: 'Content Generator',
  result: 'Introducing our latest innovation! 🚀',
  timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  isFavorite: false,
  creditCost: 5
}, {
  id: '3',
  prompt: 'Summarize this article about climate change',
  tool: 'Summarizer',
  result: 'The article discusses the urgent need for climate action...',
  timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  isFavorite: false,
  creditCost: 8
}];
interface GenerationHistoryProps {
  onReuse?: (item: HistoryItem) => void;
  className?: string;
}
export const GenerationHistory: React.FC<GenerationHistoryProps> = ({
  onReuse,
  className
}) => {
  const [history, setHistory] = useState<HistoryItem[]>(mockHistory);
  const toggleFavorite = (id: string) => {
    setHistory(prev => prev.map(item => item.id === id ? {
      ...item,
      isFavorite: !item.isFavorite
    } : item));
  };
  const deleteItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };
  return <Card className={cn('', className)}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <ClockIcon size={18} className="text-[#3FE0A5]" />
            Generation History
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {history.length} items
          </span>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
        {history.length === 0 ? <div className="p-8 text-center">
            <ClockIcon size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              No generation history yet
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Your recent generations will appear here
            </p>
          </div> : history.map(item => <div key={item.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
              <div className="flex items-start gap-3">
                <button onClick={() => toggleFavorite(item.id)} className="flex-shrink-0 mt-1 text-gray-400 hover:text-amber-400 transition-colors">
                  <StarIcon size={16} fill={item.isFavorite ? 'currentColor' : 'none'} className={cn(item.isFavorite && 'text-amber-400')} />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                      {item.prompt}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                      {formatTimeAgo(item.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span>{item.tool}</span>
                    <span>•</span>
                    <span>{item.creditCost} credits</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                    {item.result}
                  </p>
                  {/* Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onReuse && <button onClick={() => onReuse(item)} className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-[#3FE0A5]/10 text-[#3FE0A5] hover:bg-[#3FE0A5]/20 transition-colors">
                        <RepeatIcon size={12} />
                        Reuse
                      </button>}
                    <button className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <CopyIcon size={12} />
                      Copy
                    </button>
                    <button className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <DownloadIcon size={12} />
                      Save
                    </button>
                    <button onClick={() => deleteItem(item.id)} className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ml-auto">
                      <TrashIcon size={12} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>)}
      </div>
    </Card>;
};