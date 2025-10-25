import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { SparklesIcon, VideoIcon, YoutubeIcon, UploadIcon, Loader2Icon } from 'lucide-react';
interface ToolProps {
  isGenerating: boolean;
  result: any;
  onGenerate: (data: any) => void;
}
export const TextToVideoTool: React.FC<ToolProps> = ({
  isGenerating,
  onGenerate
}) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [duration, setDuration] = useState(5);
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      prompt,
      style,
      duration,
      aspectRatio
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Video Description
        </label>
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Describe the video you want to create..." rows={6} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-400" required />
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Be specific about the scene, action, and style you want
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Style
          </label>
          <select value={style} onChange={e => setStyle(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900 dark:text-white">
            <option value="realistic">Realistic</option>
            <option value="animated">Animated</option>
            <option value="cinematic">Cinematic</option>
            <option value="artistic">Artistic</option>
            <option value="abstract">Abstract</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Aspect Ratio
          </label>
          <select value={aspectRatio} onChange={e => setAspectRatio(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900 dark:text-white">
            <option value="16:9">16:9 (Landscape)</option>
            <option value="9:16">9:16 (Portrait)</option>
            <option value="1:1">1:1 (Square)</option>
            <option value="4:3">4:3 (Standard)</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Duration: {duration} seconds
        </label>
        <input type="range" min="3" max="30" value={duration} onChange={e => setDuration(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-rose-500" />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>3s</span>
          <span>30s</span>
        </div>
      </div>
      <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600" leftIcon={<SparklesIcon size={18} />} disabled={isGenerating || !prompt.trim()} loading={isGenerating}>
        {isGenerating ? 'Generating Video...' : 'Generate Video'}
      </Button>
    </form>;
};
export const ImageToVideoTool: React.FC<ToolProps> = ({
  isGenerating,
  onGenerate
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [motion, setMotion] = useState('subtle');
  const [duration, setDuration] = useState(5);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      imageFile,
      motion,
      duration
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Upload Image
        </label>
        <div className="relative">
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="image-to-video-upload" />
          <label htmlFor="image-to-video-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {imageFile ? <div className="flex flex-col items-center">
                <img src={URL.createObjectURL(imageFile)} alt="Preview" className="max-h-48 rounded-lg mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {imageFile.name}
                </p>
              </div> : <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon size={32} className="mb-3 text-gray-400 dark:text-gray-500" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, WEBP (MAX. 10MB)
                </p>
              </div>}
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Motion Style
        </label>
        <select value={motion} onChange={e => setMotion(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900 dark:text-white">
          <option value="subtle">Subtle Movement</option>
          <option value="zoom">Zoom In/Out</option>
          <option value="pan">Pan Across</option>
          <option value="rotate">Rotate</option>
          <option value="parallax">Parallax Effect</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Duration: {duration} seconds
        </label>
        <input type="range" min="3" max="15" value={duration} onChange={e => setDuration(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-rose-500" />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>3s</span>
          <span>15s</span>
        </div>
      </div>
      <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600" leftIcon={<VideoIcon size={18} />} disabled={isGenerating || !imageFile} loading={isGenerating}>
        {isGenerating ? 'Creating Animation...' : 'Animate Image'}
      </Button>
    </form>;
};
export const YouTubeSummarizerTool: React.FC<ToolProps> = ({
  isGenerating,
  onGenerate
}) => {
  const [url, setUrl] = useState('');
  const [summaryLength, setSummaryLength] = useState('medium');
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      url,
      summaryLength,
      includeTimestamps
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          YouTube URL
        </label>
        <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Summary Length
        </label>
        <select value={summaryLength} onChange={e => setSummaryLength(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900 dark:text-white">
          <option value="brief">Brief (1-2 paragraphs)</option>
          <option value="medium">Medium (3-5 paragraphs)</option>
          <option value="detailed">Detailed (Full summary)</option>
        </select>
      </div>
      <div className="flex items-center">
        <input type="checkbox" id="include-timestamps" checked={includeTimestamps} onChange={e => setIncludeTimestamps(e.target.checked)} className="w-4 h-4 text-rose-500 bg-gray-100 border-gray-300 rounded focus:ring-rose-500 dark:focus:ring-rose-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label htmlFor="include-timestamps" className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
          Include key timestamps
        </label>
      </div>
      <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600" leftIcon={<YoutubeIcon size={18} />} disabled={isGenerating || !url.trim()} loading={isGenerating}>
        {isGenerating ? 'Summarizing Video...' : 'Summarize Video'}
      </Button>
    </form>;
};