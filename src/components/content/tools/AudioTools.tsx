import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { Volume2Icon, FileTextIcon, MusicIcon, UploadIcon } from 'lucide-react';
interface ToolProps {
  isGenerating: boolean;
  result: any;
  onGenerate: (data: any) => void;
}
export const TextToSpeechTool: React.FC<ToolProps> = ({
  isGenerating,
  onGenerate
}) => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('female-1');
  const [speed, setSpeed] = useState(1);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      text,
      voice,
      speed
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Text to Convert
        </label>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter the text you want to convert to speech..." rows={6} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-400" required />
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {text.length} characters
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Voice
          </label>
          <select value={voice} onChange={e => setVoice(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white">
            <option value="female-1">Female Voice 1</option>
            <option value="female-2">Female Voice 2</option>
            <option value="male-1">Male Voice 1</option>
            <option value="male-2">Male Voice 2</option>
            <option value="child">Child Voice</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Speed: {speed}x
          </label>
          <input type="range" min="0.5" max="2" step="0.1" value={speed} onChange={e => setSpeed(parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500" />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>0.5x</span>
            <span>2x</span>
          </div>
        </div>
      </div>
      <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" leftIcon={<Volume2Icon size={18} />} disabled={isGenerating || !text.trim()} loading={isGenerating}>
        {isGenerating ? 'Generating Speech...' : 'Generate Speech'}
      </Button>
    </form>;
};
export const SpeechToTextTool: React.FC<ToolProps> = ({
  isGenerating,
  onGenerate
}) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('en');
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      audioFile,
      language
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Upload Audio File
        </label>
        <div className="relative">
          <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" id="audio-upload" />
          <label htmlFor="audio-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadIcon size={32} className="mb-3 text-gray-400 dark:text-gray-500" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                MP3, WAV, M4A (MAX. 50MB)
              </p>
            </div>
          </label>
        </div>
        {audioFile && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Selected: {audioFile.name}
          </p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Language
        </label>
        <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white">
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
      <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" leftIcon={<FileTextIcon size={18} />} disabled={isGenerating || !audioFile} loading={isGenerating}>
        {isGenerating ? 'Transcribing...' : 'Transcribe Audio'}
      </Button>
    </form>;
};
export const MusicGeneratorTool: React.FC<ToolProps> = ({
  isGenerating,
  onGenerate
}) => {
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState('electronic');
  const [mood, setMood] = useState('upbeat');
  const [duration, setDuration] = useState(60);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      prompt,
      genre,
      mood,
      duration
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Music Description
        </label>
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Describe the music you want to create..." rows={4} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-400" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Genre
          </label>
          <select value={genre} onChange={e => setGenre(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white">
            <option value="electronic">Electronic</option>
            <option value="pop">Pop</option>
            <option value="rock">Rock</option>
            <option value="jazz">Jazz</option>
            <option value="classical">Classical</option>
            <option value="ambient">Ambient</option>
            <option value="hip-hop">Hip Hop</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Mood
          </label>
          <select value={mood} onChange={e => setMood(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white">
            <option value="upbeat">Upbeat</option>
            <option value="calm">Calm</option>
            <option value="energetic">Energetic</option>
            <option value="melancholic">Melancholic</option>
            <option value="dramatic">Dramatic</option>
            <option value="happy">Happy</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Duration: {duration} seconds
        </label>
        <input type="range" min="15" max="180" step="15" value={duration} onChange={e => setDuration(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500" />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>15s</span>
          <span>180s</span>
        </div>
      </div>
      <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" leftIcon={<MusicIcon size={18} />} disabled={isGenerating} loading={isGenerating}>
        {isGenerating ? 'Generating Music...' : 'Generate Music'}
      </Button>
    </form>;
};