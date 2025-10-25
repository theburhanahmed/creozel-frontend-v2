import React from 'react';
import { Button } from '../../ui/Button';
import { SparklesIcon, Loader2Icon, UploadIcon, PenToolIcon, TypeIcon, BoxIcon } from 'lucide-react';
interface ToolProps {
  isGenerating: boolean;
  result: any;
  onGenerate: (data: any) => void;
}
export const ImageMaskEditorTool: React.FC<ToolProps> = ({
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
            Mask Tool
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Brush', 'Eraser', 'Magic Wand', 'Lasso'].map(tool => <label key={tool} className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-500 dark:hover:border-purple-400 cursor-pointer transition-all duration-200">
                <input type="radio" name="mask-tool" className="w-4 h-4" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {tool}
                </span>
              </label>)}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Brush Size
          </label>
          <input type="range" min="1" max="100" defaultValue="20" className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-purple-500" />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
            <span>Small</span>
            <span>Large</span>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200/50 dark:border-purple-800/30">
          <p className="text-sm text-purple-800 dark:text-purple-300 font-medium">
            💡 Use masks to select specific areas for editing or inpainting
          </p>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <PenToolIcon />} onClick={() => onGenerate({
        tool: 'brush',
        brushSize: 20
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Processing...' : 'Open Mask Editor'}
        </Button>
      </div>
    </div>;
};
export const ImageTextEditorTool: React.FC<ToolProps> = ({
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
            Text to Add
          </label>
          <textarea placeholder="Enter the text you want to add to the image..." rows={3} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Font Style
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
              <option>Arial</option>
              <option>Helvetica</option>
              <option>Times New Roman</option>
              <option>Georgia</option>
              <option>Impact</option>
              <option>Comic Sans</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Font Size
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
              <option>Extra Large</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Text Position
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Top Left', 'Top Center', 'Top Right', 'Middle Left', 'Center', 'Middle Right', 'Bottom Left', 'Bottom Center', 'Bottom Right'].map(position => <label key={position} className="flex items-center justify-center p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-500 dark:hover:border-purple-400 cursor-pointer transition-all duration-200 text-xs font-medium text-gray-700 dark:text-gray-300">
                <input type="radio" name="position" className="sr-only" />
                {position}
              </label>)}
          </div>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <TypeIcon />} onClick={() => onGenerate({
        text: 'Text to add',
        font: 'Arial',
        size: 'medium',
        position: 'center'
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Adding Text...' : 'Add Text to Image'}
        </Button>
      </div>
    </div>;
};
export const ThreeDImageGeneratorTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            3D Object Description
          </label>
          <textarea placeholder="Describe the 3D object you want to generate..." rows={4} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Style
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
              <option>Realistic</option>
              <option>Cartoon</option>
              <option>Low Poly</option>
              <option>Stylized</option>
              <option>Abstract</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Quality
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
              <option>Draft</option>
              <option>Standard</option>
              <option>High Quality</option>
              <option>Ultra High</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Output Format
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['PNG Render', 'OBJ Model', 'GLTF Model', 'FBX Model'].map(format => <label key={format} className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-500 dark:hover:border-purple-400 cursor-pointer transition-all duration-200">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {format}
                  </span>
                </label>)}
          </div>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-blue-200/50 dark:border-blue-800/30">
          <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
            💡 3D generation may take several minutes depending on complexity
          </p>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <BoxIcon />} onClick={() => onGenerate({
        description: '3D object description',
        style: 'realistic',
        quality: 'standard',
        formats: ['png']
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Generating 3D...' : 'Generate 3D Image'}
        </Button>
      </div>
    </div>;
};
export const SketchToImageTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Upload Sketch
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 text-center hover:border-purple-500 dark:hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-300 cursor-pointer group">
            <UploadIcon size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-300" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              PNG, JPG, hand-drawn sketches work best
            </p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Additional Prompt (Optional)
          </label>
          <textarea placeholder="Add details about what you want the final image to look like..." rows={3} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Style
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
              <option>Photorealistic</option>
              <option>Artistic</option>
              <option>Anime</option>
              <option>Cartoon</option>
              <option>Oil Painting</option>
              <option>Watercolor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Detail Level
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Very High</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Sketch Fidelity
          </label>
          <input type="range" min="0" max="100" defaultValue="70" className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-purple-500" />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
            <span>Creative</span>
            <span>Precise</span>
          </div>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({
        prompt: 'Additional details',
        style: 'photorealistic',
        detailLevel: 'high',
        fidelity: 70
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Converting...' : 'Convert Sketch to Image'}
        </Button>
      </div>
    </div>;
};