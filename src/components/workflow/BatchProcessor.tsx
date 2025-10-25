import React, { useCallback, useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressIndicator } from '../ui/ProgressIndicator';
import { UploadIcon, PlayIcon, PauseIcon, XIcon, FileIcon, CheckCircleIcon, AlertCircleIcon, DownloadIcon, FolderIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
interface BatchItem {
  id: string;
  name: string;
  size: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  error?: string;
  result?: any;
}
interface BatchProcessorProps {
  toolName: string;
  onProcess?: (items: File[]) => Promise<void>;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  className?: string;
}
export const BatchProcessor: React.FC<BatchProcessorProps> = ({
  toolName,
  onProcess,
  maxFiles = 50,
  acceptedFileTypes = ['*'],
  className
}) => {
  const [items, setItems] = useState<BatchItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const handleFileUpload = useCallback((files: FileList) => {
    const newItems: BatchItem[] = Array.from(files).slice(0, maxFiles).map(file => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      status: 'pending',
      progress: 0
    }));
    setItems(prev => [...prev, ...newItems]);
  }, [maxFiles]);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  }, [handleFileUpload]);
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);
  const removeItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };
  const clearCompleted = () => {
    setItems(items.filter(item => item.status !== 'completed'));
  };
  const clearAll = () => {
    setItems([]);
    setOverallProgress(0);
  };
  const startProcessing = async () => {
    setIsProcessing(true);
    setIsPaused(false);
    const pendingItems = items.filter(item => item.status === 'pending');
    for (let i = 0; i < pendingItems.length; i++) {
      if (isPaused) break;
      const item = pendingItems[i];
      // Update status to processing
      setItems(prev => prev.map(it => it.id === item.id ? {
        ...it,
        status: 'processing'
      } : it));
      // Simulate processing with progress updates
      for (let progress = 0; progress <= 100; progress += 10) {
        if (isPaused) break;
        await new Promise(resolve => setTimeout(resolve, 200));
        setItems(prev => prev.map(it => it.id === item.id ? {
          ...it,
          progress
        } : it));
      }
      // Mark as completed
      setItems(prev => prev.map(it => it.id === item.id ? {
        ...it,
        status: 'completed',
        progress: 100
      } : it));
      // Update overall progress
      setOverallProgress((i + 1) / pendingItems.length * 100);
    }
    setIsProcessing(false);
  };
  const pauseProcessing = () => {
    setIsPaused(true);
    setIsProcessing(false);
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon size={16} className="text-green-500" />;
      case 'error':
        return <AlertCircleIcon size={16} className="text-red-500" />;
      case 'processing':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      default:
        return <FileIcon size={16} className="text-gray-400" />;
    }
  };
  const completedCount = items.filter(item => item.status === 'completed').length;
  const errorCount = items.filter(item => item.status === 'error').length;
  const pendingCount = items.filter(item => item.status === 'pending').length;
  return <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Batch Processor
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Process multiple files with {toolName}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {items.length > 0 && <>
              <Button variant="outline" leftIcon={<XIcon size={16} />} onClick={clearAll} disabled={isProcessing}>
                Clear All
              </Button>
              {completedCount > 0 && <Button variant="outline" leftIcon={<DownloadIcon size={16} />}>
                  Download All ({completedCount})
                </Button>}
            </>}
          {items.length > 0 && !isProcessing && <Button variant="primary" leftIcon={<PlayIcon size={16} />} onClick={startProcessing} disabled={pendingCount === 0}>
              Process All ({pendingCount})
            </Button>}
          {isProcessing && <Button variant="outline" leftIcon={<PauseIcon size={16} />} onClick={pauseProcessing}>
              Pause
            </Button>}
        </div>
      </div>
      {/* Stats */}
      {items.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {items.length}
                </p>
              </div>
              <FolderIcon size={24} className="text-gray-400" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pending
                </p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                  {pendingCount}
                </p>
              </div>
              <FileIcon size={24} className="text-amber-400" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Completed
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {completedCount}
                </p>
              </div>
              <CheckCircleIcon size={24} className="text-green-400" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Errors
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
                  {errorCount}
                </p>
              </div>
              <AlertCircleIcon size={24} className="text-red-400" />
            </div>
          </Card>
        </div>}
      {/* Overall Progress */}
      {isProcessing && <Card className="p-5">
          <ProgressIndicator value={overallProgress} label="Overall Progress" variant="line" size="lg" animated />
        </Card>}
      {/* Upload Area */}
      {items.length === 0 && <Card>
          <div className="p-12 text-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#3FE0A5] hover:bg-[#3FE0A5]/5 transition-all duration-200 cursor-pointer" onDrop={handleDrop} onDragOver={handleDragOver} onClick={() => document.getElementById('file-upload')?.click()}>
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#3FE0A5] to-[#38B897] flex items-center justify-center mb-4">
              <UploadIcon size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Upload files to process
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Maximum {maxFiles} files • {acceptedFileTypes.join(', ')}
            </p>
            <input id="file-upload" type="file" multiple accept={acceptedFileTypes.join(',')} onChange={e => e.target.files && handleFileUpload(e.target.files)} className="hidden" />
          </div>
        </Card>}
      {/* File List */}
      {items.length > 0 && <Card>
          <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Files ({items.length})
            </h3>
            {completedCount > 0 && <Button variant="ghost" size="sm" onClick={clearCompleted}>
                Clear Completed
              </Button>}
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
            {items.map(item => <div key={item.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {getStatusIcon(item.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.size}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" disabled={item.status === 'processing'}>
                    <XIcon size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
                {item.status === 'processing' && <ProgressIndicator value={item.progress} variant="line" size="sm" showValue={false} animated />}
                {item.status === 'error' && item.error && <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    {item.error}
                  </p>}
              </div>)}
          </div>
        </Card>}
    </div>;
};