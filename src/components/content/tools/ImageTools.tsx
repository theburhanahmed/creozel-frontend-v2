import React from 'react';
import { Button } from '../../ui/Button';
import { SparklesIcon, UploadIcon, Loader2Icon } from 'lucide-react';
interface ToolProps {
  isGenerating: boolean;
  result: any;
  onGenerate: (data: any) => void;
}
export const ImageGeneratorTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Prompt
          </label>
          <textarea placeholder="Describe the image you want to generate..." rows={4} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Style
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
              <option>Realistic</option>
              <option>Artistic</option>
              <option>Digital Art</option>
              <option>Anime</option>
              <option>3D Render</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Aspect Ratio
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
              <option>1:1 (Square)</option>
              <option>16:9 (Landscape)</option>
              <option>9:16 (Portrait)</option>
              <option>4:3</option>
            </select>
          </div>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({
        prompt: 'A beautiful landscape',
        style: 'realistic',
        aspectRatio: '16:9'
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Generating...' : 'Generate Image'}
        </Button>
      </div>
    </div>;
};
export const ImageToImageTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Upload Reference Image
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
            Transformation Prompt
          </label>
          <textarea placeholder="Describe how you want to transform the image..." rows={3} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Transformation Strength
          </label>
          <input type="range" min="0" max="100" defaultValue="50" className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-purple-500" />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
            <span>Subtle</span>
            <span>Strong</span>
          </div>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({
        prompt: 'Transform to watercolor',
        strength: 0.5
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Transforming...' : 'Transform Image'}
        </Button>
      </div>
    </div>;
};
export const BackgroundRemoverTool: React.FC<ToolProps> = ({
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
            💡 Tip: Works best with clear subjects and good lighting
          </p>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({})} disabled={isGenerating} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Removing...' : 'Remove Background'}
        </Button>
      </div>
    </div>;
};
export const ImageUpscalerTool: React.FC<ToolProps> = ({
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
            Upscale Factor
          </label>
          <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
            <option>2x (Double Resolution)</option>
            <option>4x (Quadruple Resolution)</option>
            <option>8x (8x Resolution)</option>
          </select>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({
        scale: 4
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Upscaling...' : 'Upscale Image'}
        </Button>
      </div>
    </div>;
};