import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { FileTextIcon, CaptionsIcon, UsersIcon, UploadIcon } from 'lucide-react';
interface ToolProps {
  isGenerating: boolean;
  result: any;
  onGenerate: (data: any) => void;
}
export const YouTubeTranscriberTool: React.FC<ToolProps> = ({
  isGenerating,
  onGenerate
}) => {
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('en');
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      url,
      language,
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
          Language
        </label>
        <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900 dark:text-white">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="zh">Chinese</option>
        </select>
      </div>
      <div className="flex items-center">
        <input type="checkbox" id="transcribe-timestamps" checked={includeTimestamps} onChange={e => setIncludeTimestamps(e.target.checked)} className="w-4 h-4 text-rose-500 bg-gray-100 border-gray-300 rounded focus:ring-rose-500 dark:focus:ring-rose-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label htmlFor="transcribe-timestamps" className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
          Include timestamps
        </label>
      </div>
      <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600" leftIcon={<FileTextIcon size={18} />} disabled={isGenerating || !url.trim()} loading={isGenerating}>
        {isGenerating ? 'Transcribing...' : 'Transcribe Video'}
      </Button>
    </form>;
};
export const CaptionsGeneratorTool: React.FC<ToolProps> = ({
  isGenerating,
  onGenerate
}) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('en');
  const [format, setFormat] = useState('SRT');
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      videoFile,
      language,
      format
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Upload Video File
        </label>
        <div className="relative">
          <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" id="captions-video-upload" />
          <label htmlFor="captions-video-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadIcon size={32} className="mb-3 text-gray-400 dark:text-gray-500" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                MP4, MOV, AVI (MAX. 500MB)
              </p>
            </div>
          </label>
        </div>
        {videoFile && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Selected: {videoFile.name}
          </p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Language
          </label>
          <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900 dark:text-white">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Format
          </label>
          <select value={format} onChange={e => setFormat(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900 dark:text-white">
            <option value="SRT">SRT</option>
            <option value="VTT">VTT</option>
            <option value="ASS">ASS</option>
            <option value="SSA">SSA</option>
          </select>
        </div>
      </div>
      <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600" leftIcon={<CaptionsIcon size={18} />} disabled={isGenerating || !videoFile} loading={isGenerating}>
        {isGenerating ? 'Generating Captions...' : 'Generate Captions'}
      </Button>
    </form>;
};
export const VideoFaceSwapTool: React.FC<ToolProps> = ({
  isGenerating,
  onGenerate
}) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [faceImage, setFaceImage] = useState<File | null>(null);
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };
  const handleFaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFaceImage(e.target.files[0]);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      videoFile,
      faceImage
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Upload Video
        </label>
        <div className="relative">
          <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" id="face-swap-video-upload" />
          <label htmlFor="face-swap-video-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadIcon size={32} className="mb-3 text-gray-400 dark:text-gray-500" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Upload source video</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                MP4, MOV, AVI (MAX. 500MB)
              </p>
            </div>
          </label>
        </div>
        {videoFile && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Selected: {videoFile.name}
          </p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Upload Face Image
        </label>
        <div className="relative">
          <input type="file" accept="image/*" onChange={handleFaceChange} className="hidden" id="face-swap-image-upload" />
          <label htmlFor="face-swap-image-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {faceImage ? <div className="flex flex-col items-center">
                <img src={URL.createObjectURL(faceImage)} alt="Face preview" className="max-h-32 rounded-lg mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {faceImage.name}
                </p>
              </div> : <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon size={32} className="mb-3 text-gray-400 dark:text-gray-500" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Upload target face</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Clear frontal face photo
                </p>
              </div>}
          </label>
        </div>
      </div>
      <div className="p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/30 rounded-lg">
        <p className="text-sm text-rose-800 dark:text-rose-300">
          Note: Face swap requires clear, frontal face images for best results.
          Processing may take several minutes depending on video length.
        </p>
      </div>
      <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600" leftIcon={<UsersIcon size={18} />} disabled={isGenerating || !videoFile || !faceImage} loading={isGenerating}>
        {isGenerating ? 'Swapping Faces...' : 'Swap Faces'}
      </Button>
    </form>;
};