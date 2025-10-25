import React, { useState, createElement } from 'react';
import { useLocation } from 'react-router-dom';
import { ContentToolsSidebar } from '../../components/content/ContentToolsSidebar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ImageIcon, SparklesIcon, DownloadIcon, SaveIcon, CopyIcon, Loader2Icon, UploadIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ImageGeneratorTool, ImageToImageTool, BackgroundRemoverTool, ImageUpscalerTool } from '../../components/content/tools/ImageTools';
const ImageToPromptTool = ({
  isGenerating,
  result,
  onGenerate
}) => <div className="space-y-6">
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Upload Image
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 dark:hover:border-purple-400 transition-colors cursor-pointer">
          <UploadIcon size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            PNG, JPG, WEBP up to 10MB
          </p>
        </div>
      </div>
      <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({
      imageUrl: 'sample.jpg'
    })} disabled={isGenerating} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
        {isGenerating ? 'Analyzing...' : 'Generate Prompt'}
      </Button>
    </div>
  </div>;
const ImageVariatorTool = ({
  isGenerating,
  result,
  onGenerate
}) => <div className="space-y-6">
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Upload Image
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 dark:hover:border-purple-400 transition-colors cursor-pointer">
          <UploadIcon size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Click to upload or drag and drop
          </p>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Number of Variations
        </label>
        <input type="number" min="1" max="4" defaultValue={2} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
      </div>
      <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({
      variations: 2
    })} disabled={isGenerating} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
        {isGenerating ? 'Generating...' : 'Create Variations'}
      </Button>
    </div>
  </div>;
const BackgroundReplacerTool = ({
  isGenerating,
  result,
  onGenerate
}) => <div className="space-y-6">
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Upload Image
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 dark:hover:border-purple-400 transition-colors cursor-pointer">
          <UploadIcon size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Click to upload or drag and drop
          </p>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          New Background Description
        </label>
        <textarea placeholder="Describe the new background..." rows={3} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none" />
      </div>
      <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({
      background: 'new background'
    })} disabled={isGenerating} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
        {isGenerating ? 'Processing...' : 'Replace Background'}
      </Button>
    </div>
  </div>;
const FaceSwapperTool = ({
  isGenerating,
  result,
  onGenerate
}) => <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Source Image
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 dark:hover:border-purple-400 transition-colors cursor-pointer">
          <UploadIcon size={32} className="mx-auto text-gray-400 dark:text-gray-500 mb-2" />
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Upload source face
          </p>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Target Image
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 dark:hover:border-purple-400 transition-colors cursor-pointer">
          <UploadIcon size={32} className="mx-auto text-gray-400 dark:text-gray-500 mb-2" />
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Upload target image
          </p>
        </div>
      </div>
    </div>
    <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({})} disabled={isGenerating} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
      {isGenerating ? 'Swapping...' : 'Swap Faces'}
    </Button>
  </div>;
export const ImageEditor = () => {
  const location = useLocation();
  const [selectedTool, setSelectedTool] = useState<string | null>(location.state?.selectedTool || 'image-generator');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const handleGenerate = async (data: any) => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      let mockResult;
      switch (selectedTool) {
        case 'image-generator':
          mockResult = {
            imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
            prompt: data.prompt,
            style: data.style,
            aspectRatio: data.aspectRatio
          };
          break;
        case 'image-to-image':
          mockResult = {
            imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80',
            prompt: data.prompt,
            strength: data.strength
          };
          break;
        case 'image-to-prompt':
          mockResult = {
            prompt: 'A stunning landscape photograph featuring a majestic mountain range at sunset, with dramatic clouds and vibrant colors reflecting on a serene lake in the foreground. Professional photography, high detail, 8k resolution.',
            confidence: 0.92,
            tags: ['landscape', 'mountain', 'sunset', 'lake', 'nature']
          };
          break;
        case 'image-variator':
          mockResult = {
            variations: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=600&auto=format&fit=crop&q=80']
          };
          break;
        case 'image-upscaler':
          mockResult = {
            imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop&q=80',
            originalSize: '512x512',
            newSize: '2048x2048',
            scale: 4
          };
          break;
        case 'background-remover':
          mockResult = {
            imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&auto=format&fit=crop&q=80',
            originalUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&auto=format&fit=crop&q=80'
          };
          break;
        case 'background-replacer':
          mockResult = {
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop&q=80',
            background: data.background
          };
          break;
        case 'face-swapper':
          mockResult = {
            imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=1200&auto=format&fit=crop&q=80'
          };
          break;
        default:
          mockResult = {
            imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80'
          };
      }
      setResult(mockResult);
      toast.success('Image generated successfully!');
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };
  const handleDownload = () => {
    if (result?.imageUrl) {
      const a = document.createElement('a');
      a.href = result.imageUrl;
      a.download = `${selectedTool}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success('Downloaded successfully!');
    }
  };
  const handleCopy = () => {
    if (result?.prompt) {
      navigator.clipboard.writeText(result.prompt);
      toast.success('Copied to clipboard!');
    }
  };
  const handleSave = () => {
    toast.success('Saved to library!');
  };
  const renderToolInterface = () => {
    const commonProps = {
      isGenerating,
      result,
      onGenerate: handleGenerate
    };
    switch (selectedTool) {
      case 'image-generator':
        return <ImageGeneratorTool {...commonProps} />;
      case 'image-to-image':
        return <ImageToImageTool {...commonProps} />;
      case 'image-to-prompt':
        return <ImageToPromptTool {...commonProps} />;
      case 'image-variator':
        return <ImageVariatorTool {...commonProps} />;
      case 'image-upscaler':
        return <ImageUpscalerTool {...commonProps} />;
      case 'background-remover':
        return <BackgroundRemoverTool {...commonProps} />;
      case 'background-replacer':
        return <BackgroundReplacerTool {...commonProps} />;
      case 'face-swapper':
        return <FaceSwapperTool {...commonProps} />;
      default:
        return <div className="text-center py-12">
            <ImageIcon size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Select a tool from the sidebar to get started
            </p>
          </div>;
    }
  };
  const renderResult = () => {
    if (!result) return null;
    return <Card className="mt-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <SparklesIcon size={20} className="text-purple-500" />
              Generated Result
            </h3>
            <div className="flex items-center gap-2">
              {result.prompt && <Button variant="outline" size="sm" leftIcon={<CopyIcon size={16} />} onClick={handleCopy}>
                  Copy
                </Button>}
              <Button variant="outline" size="sm" leftIcon={<DownloadIcon size={16} />} onClick={handleDownload}>
                Download
              </Button>
              <Button variant="outline" size="sm" leftIcon={<SaveIcon size={16} />} onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
          {/* Single Image Result */}
          {result.imageUrl && !result.variations && <div className="space-y-4">
              <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img src={result.imageUrl} alt="Generated image" className="w-full h-auto" style={{
              transform: `scale(${zoomLevel / 100})`
            }} />
                {/* Zoom Controls */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                  <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 25))} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
                    <ZoomOutIcon size={16} />
                  </button>
                  <span className="text-sm font-medium px-2 min-w-[60px] text-center">
                    {zoomLevel}%
                  </span>
                  <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 25))} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
                    <ZoomInIcon size={16} />
                  </button>
                </div>
              </div>
              {/* Image Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {result.style && <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Style
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                      {result.style}
                    </div>
                  </div>}
                {result.aspectRatio && <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Aspect Ratio
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {result.aspectRatio}
                    </div>
                  </div>}
                {result.originalSize && <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Original
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {result.originalSize}
                    </div>
                  </div>}
                {result.newSize && <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Upscaled
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {result.newSize}
                    </div>
                  </div>}
              </div>
            </div>}
          {/* Image Variations */}
          {result.variations && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.variations.map((url: string, index: number) => <div key={index} className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden group">
                  <img src={url} alt={`Variation ${index + 1}`} className="w-full h-auto" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button variant="outline" size="sm" className="bg-white/90">
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white/90">
                      Use This
                    </Button>
                  </div>
                </div>)}
            </div>}
          {/* Prompt Result */}
          {result.prompt && selectedTool === 'image-to-prompt' && <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    Generated Prompt
                  </h4>
                  {result.confidence && <span className="text-xs font-medium text-green-600 dark:text-green-400">
                      {(result.confidence * 100).toFixed(0)}% confidence
                    </span>}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {result.prompt}
                </p>
              </div>
              {result.tags && <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Detected Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag: string, index: number) => <span key={index} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium">
                        {tag}
                      </span>)}
                  </div>
                </div>}
            </div>}
        </div>
      </Card>;
  };
  return <div className="flex gap-6 h-[calc(100vh-8rem)]">
      <ContentToolsSidebar currentCategory="image" selectedTool={selectedTool} onSelectTool={setSelectedTool} />
      <div className="flex-1 overflow-y-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
              <ImageIcon size={20} className="text-purple-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Image Content Tools
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 ml-[52px]">
            Generate, edit, and enhance images with AI
          </p>
        </div>
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="p-6">{renderToolInterface()}</div>
        </Card>
        {renderResult()}
      </div>
    </div>;
};