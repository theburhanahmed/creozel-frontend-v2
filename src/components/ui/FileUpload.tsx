import React, { useState, useRef } from 'react';
import { cn } from '../../lib/utils';
import { UploadIcon, XIcon, FileIcon, AlertCircleIcon } from 'lucide-react';
import { Button } from './Button';
interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSize?: number; // in MB
  error?: string;
  helperText?: string;
  onFileSelect: (file: File | null) => void;
  preview?: boolean;
  className?: string;
}
export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept,
  maxSize = 10,
  error,
  helperText,
  onFileSelect,
  preview = true,
  className
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (selectedFile: File | null) => {
    if (!selectedFile) {
      setFile(null);
      setPreviewUrl(null);
      onFileSelect(null);
      return;
    }
    // Check file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      onFileSelect(null);
      return;
    }
    setFile(selectedFile);
    onFileSelect(selectedFile);
    // Generate preview for images
    if (preview && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return <div className={cn('w-full', className)}>
      {label && <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>}
      <div className={cn('relative border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer', isDragging && 'border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/10', error && 'border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-900/10', !isDragging && !error && 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10')} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={() => fileInputRef.current?.click()}>
        <input ref={fileInputRef} type="file" accept={accept} onChange={e => handleFileChange(e.target.files?.[0] || null)} className="hidden" aria-describedby={error ? 'file-upload-error' : undefined} />
        {file && previewUrl ? <div className="relative p-4">
            <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
            <Button variant="outline" size="sm" className="absolute top-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm" leftIcon={<XIcon size={16} />} onClick={e => {
          e.stopPropagation();
          handleRemove();
        }}>
              Remove
            </Button>
          </div> : file ? <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FileIcon size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" leftIcon={<XIcon size={16} />} onClick={e => {
          e.stopPropagation();
          handleRemove();
        }} />
          </div> : <div className="flex flex-col items-center justify-center p-10 text-center">
            <UploadIcon size={48} className={cn('mb-4 transition-colors duration-300', isDragging ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500')} />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {accept || 'All files'} (Max {maxSize}MB)
            </p>
          </div>}
      </div>
      {error && <p id="file-upload-error" className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
          <AlertCircleIcon size={14} />
          {error}
        </p>}
      {helperText && !error && <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>}
    </div>;
};