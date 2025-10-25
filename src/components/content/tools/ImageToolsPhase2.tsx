import React from 'react';
import { Button } from '../../ui/Button';
import { SparklesIcon, Loader2Icon, UploadIcon, MessageSquareIcon } from 'lucide-react';
interface ToolProps {
  isGenerating: boolean;
  result: any;
  onGenerate: (data: any) => void;
}
export const ChatWithImageTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Upload Image
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 text-center hover:border-purple-500 dark:hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-300 cursor-pointer group">
            <UploadIcon size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-300" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              PNG, JPG, WEBP up to 10MB
            </p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Your Question
          </label>
          <textarea placeholder="Ask anything about the image..." rows={3} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <MessageSquareIcon />} onClick={() => onGenerate({
        question: 'What is in this image?'
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Analyzing...' : 'Ask Question'}
        </Button>
      </div>
    </div>;
};
export const ImageExtenderTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Upload Image
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 text-center hover:border-purple-500 dark:hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-300 cursor-pointer group">
            <UploadIcon size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-300" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              PNG, JPG, WEBP up to 10MB
            </p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Extension Direction
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Top', 'Bottom', 'Left', 'Right'].map(direction => <label key={direction} className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-500 dark:hover:border-purple-400 cursor-pointer transition-all duration-200">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {direction}
                </span>
              </label>)}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Extension Amount
          </label>
          <input type="range" min="10" max="100" defaultValue="50" className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-purple-500" />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
            <span>Small</span>
            <span>Large</span>
          </div>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({
        direction: ['top', 'bottom'],
        amount: 50
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Extending...' : 'Extend Image'}
        </Button>
      </div>
    </div>;
};
export const TextRemoverTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Upload Image
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 text-center hover:border-purple-500 dark:hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-300 cursor-pointer group">
            <UploadIcon size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-300" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              PNG, JPG, WEBP up to 10MB
            </p>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-blue-200/50 dark:border-blue-800/30">
          <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
            💡 Automatically detects and removes all text from the image
          </p>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({})} disabled={isGenerating} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Removing...' : 'Remove Text'}
        </Button>
      </div>
    </div>;
};
export const ObjectRemoverTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Upload Image
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 text-center hover:border-purple-500 dark:hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-300 cursor-pointer group">
            <UploadIcon size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-300" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              PNG, JPG, WEBP up to 10MB
            </p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Object to Remove
          </label>
          <input type="text" placeholder="Describe the object to remove..." className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({
        object: 'person'
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Removing...' : 'Remove Object'}
        </Button>
      </div>
    </div>;
};
export const SearchAndReplaceTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Upload Image
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 text-center hover:border-purple-500 dark:hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-300 cursor-pointer group">
            <UploadIcon size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-300" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              PNG, JPG, WEBP up to 10MB
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Search For
            </label>
            <input type="text" placeholder="Object to find..." className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Replace With
            </label>
            <input type="text" placeholder="New object..." className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
          </div>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({
        search: 'car',
        replace: 'bicycle'
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Processing...' : 'Search and Replace'}
        </Button>
      </div>
    </div>;
};