import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { SparklesIcon, UploadIcon, DownloadIcon, SaveIcon, ShareIcon, RefreshCwIcon, SettingsIcon, Loader2Icon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { toast } from 'sonner';
interface ToolOption {
  id: string;
  label: string;
  type: 'select' | 'range' | 'checkbox' | 'text' | 'textarea';
  options?: {
    value: string;
    label: string;
  }[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: any;
  description?: string;
}
interface ToolInterfaceProps {
  toolId: string;
  toolName: string;
  category: string;
  onGenerate: (input: any, options: any) => void;
  isGenerating: boolean;
  result?: any;
  options?: ToolOption[];
  inputType?: 'text' | 'file' | 'url' | 'both';
  acceptedFileTypes?: string;
}
export const ToolInterface: React.FC<ToolInterfaceProps> = ({
  toolId,
  toolName,
  category,
  onGenerate,
  isGenerating,
  result,
  options = [],
  inputType = 'text',
  acceptedFileTypes = 'image/*'
}) => {
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [toolOptions, setToolOptions] = useState<Record<string, any>>(() => {
    const defaults: Record<string, any> = {};
    options.forEach(opt => {
      defaults[opt.id] = opt.defaultValue;
    });
    return defaults;
  });
  const getCategoryColor = () => {
    switch (category) {
      case 'writing':
        return {
          gradient: 'from-blue-500 to-indigo-600',
          light: 'bg-blue-50 dark:bg-blue-900/20',
          text: 'text-blue-600 dark:text-blue-400'
        };
      case 'image':
        return {
          gradient: 'from-purple-500 to-pink-600',
          light: 'bg-purple-50 dark:bg-purple-900/20',
          text: 'text-purple-600 dark:text-purple-400'
        };
      case 'audio':
        return {
          gradient: 'from-amber-500 to-orange-600',
          light: 'bg-amber-50 dark:bg-amber-900/20',
          text: 'text-amber-600 dark:text-amber-400'
        };
      case 'video':
        return {
          gradient: 'from-rose-500 to-red-600',
          light: 'bg-rose-50 dark:bg-rose-900/20',
          text: 'text-rose-600 dark:text-rose-400'
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          light: 'bg-gray-50 dark:bg-gray-900/20',
          text: 'text-gray-600 dark:text-gray-400'
        };
    }
  };
  const colors = getCategoryColor();
  const handleGenerate = () => {
    if (!input && !file) {
      toast.error('Please provide input');
      return;
    }
    onGenerate({
      text: input,
      file
    }, toolOptions);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleOptionChange = (optionId: string, value: any) => {
    setToolOptions(prev => ({
      ...prev,
      [optionId]: value
    }));
  };
  const renderOption = (option: ToolOption) => {
    switch (option.type) {
      case 'select':
        return <div key={option.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {option.label}
            </label>
            <select value={toolOptions[option.id] || option.defaultValue} onChange={e => handleOptionChange(option.id, e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-opacity-50">
              {option.options?.map(opt => <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>)}
            </select>
            {option.description && <p className="text-xs text-gray-500 dark:text-gray-400">
                {option.description}
              </p>}
          </div>;
      case 'range':
        return <div key={option.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {option.label}
              </label>
              <span className={`text-sm font-medium ${colors.text}`}>
                {toolOptions[option.id] || option.defaultValue}
              </span>
            </div>
            <input type="range" min={option.min} max={option.max} step={option.step} value={toolOptions[option.id] || option.defaultValue} onChange={e => handleOptionChange(option.id, parseFloat(e.target.value))} className="w-full" />
            {option.description && <p className="text-xs text-gray-500 dark:text-gray-400">
                {option.description}
              </p>}
          </div>;
      case 'checkbox':
        return <div key={option.id} className="flex items-start space-x-3">
            <input type="checkbox" id={option.id} checked={toolOptions[option.id] || option.defaultValue} onChange={e => handleOptionChange(option.id, e.target.checked)} className="mt-1 h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-opacity-50" />
            <div className="flex-1">
              <label htmlFor={option.id} className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                {option.label}
              </label>
              {option.description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {option.description}
                </p>}
            </div>
          </div>;
      case 'text':
        return <div key={option.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {option.label}
            </label>
            <input type="text" value={toolOptions[option.id] || option.defaultValue || ''} onChange={e => handleOptionChange(option.id, e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-opacity-50" />
            {option.description && <p className="text-xs text-gray-500 dark:text-gray-400">
                {option.description}
              </p>}
          </div>;
      default:
        return null;
    }
  };
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Input Panel */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${colors.light}`}>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {toolName}
            </h3>
          </div>
          <div className="p-6 space-y-6">
            {/* Input Section */}
            {(inputType === 'text' || inputType === 'both') && <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Input Text
                </label>
                <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter your text here..." className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-opacity-50 resize-none" rows={6} />
              </div>}
            {(inputType === 'file' || inputType === 'both') && <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Upload File
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadIcon className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {file ? file.name : 'Click to upload'}
                      </p>
                    </div>
                    <input type="file" className="hidden" accept={acceptedFileTypes} onChange={handleFileChange} />
                  </label>
                </div>
              </div>}
            {inputType === 'url' && <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  URL
                </label>
                <input type="url" value={input} onChange={e => setInput(e.target.value)} placeholder="https://..." className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-opacity-50" />
              </div>}
            {/* Basic Options */}
            {options.slice(0, 3).map(renderOption)}
            {/* Advanced Options Toggle */}
            {options.length > 3 && <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center justify-between w-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  <span>Advanced Options</span>
                  {showAdvanced ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
                </button>
                {showAdvanced && <div className="mt-4 space-y-4">
                    {options.slice(3).map(renderOption)}
                  </div>}
              </div>}
            {/* Generate Button */}
            <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={handleGenerate} disabled={isGenerating || !input && !file} className={`w-full bg-gradient-to-r ${colors.gradient} hover:opacity-90 border-none shadow-md`}>
              {isGenerating ? 'Generating...' : 'Generate'}
            </Button>
          </div>
        </Card>
      </div>
      {/* Output Panel */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Output
            </h3>
            {result && !isGenerating && <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" leftIcon={<RefreshCwIcon size={14} />}>
                  Regenerate
                </Button>
                <Button variant="ghost" size="sm" leftIcon={<DownloadIcon size={14} />}>
                  Download
                </Button>
                <Button variant="ghost" size="sm" leftIcon={<SaveIcon size={14} />}>
                  Save
                </Button>
                <Button variant="ghost" size="sm" leftIcon={<ShareIcon size={14} />}>
                  Share
                </Button>
              </div>}
          </div>
          <div className="p-6 min-h-[400px] flex items-center justify-center">
            {isGenerating ? <div className="text-center">
                <Loader2Icon size={48} className={`mx-auto mb-4 animate-spin ${colors.text}`} />
                <p className="text-gray-600 dark:text-gray-400">
                  Processing your request...
                </p>
              </div> : result ? <div className="w-full">{result}</div> : <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${colors.light} flex items-center justify-center ${colors.text}`}>
                  <SparklesIcon size={32} />
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Your generated content will appear here
                </p>
              </div>}
          </div>
        </Card>
      </div>
    </div>;
};