import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { SettingsIcon, MicVocalIcon, LanguagesIcon, UploadIcon } from 'lucide-react';
interface ToolProps {
  isGenerating: boolean;
  result: any;
  onGenerate: (data: any) => void;
}
export const VoiceChangerTool: React.FC<ToolProps> = ({
  isGenerating,
  onGenerate
}) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [effect, setEffect] = useState('robot');
  const [intensity, setIntensity] = useState(50);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      audioFile,
      effect,
      intensity
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Upload Audio File
        </label>
        <div className="relative">
          <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" id="voice-changer-upload" />
          <label htmlFor="voice-changer-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
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
          Voice Effect
        </label>
        <select value={effect} onChange={e => setEffect(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white">
          <option value="robot">Robot</option>
          <option value="chipmunk">Chipmunk</option>
          <option value="deep">Deep Voice</option>
          <option value="echo">Echo</option>
          <option value="reverb">Reverb</option>
          <option value="alien">Alien</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Effect Intensity: {intensity}%
        </label>
        <input type="range" min="0" max="100" value={intensity} onChange={e => setIntensity(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500" />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>Subtle</span>
          <span>Extreme</span>
        </div>
      </div>
      <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" leftIcon={<SettingsIcon size={18} />} disabled={isGenerating || !audioFile} loading={isGenerating}>
        {isGenerating ? 'Applying Effect...' : 'Apply Voice Effect'}
      </Button>
    </form>;
};
export const VoiceCloningTool: React.FC<ToolProps> = ({
  isGenerating,
  onGenerate
}) => {
  const [voiceSample, setVoiceSample] = useState<File | null>(null);
  const [text, setText] = useState('');
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVoiceSample(e.target.files[0]);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      voiceSample,
      text
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Voice Sample (10-30 seconds)
        </label>
        <div className="relative">
          <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" id="voice-sample-upload" />
          <label htmlFor="voice-sample-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadIcon size={32} className="mb-3 text-gray-400 dark:text-gray-500" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Upload voice sample</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Clear audio with minimal background noise
              </p>
            </div>
          </label>
        </div>
        {voiceSample && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Selected: {voiceSample.name}
          </p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Text to Speak
        </label>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter the text you want the cloned voice to speak..." rows={6} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-400" required />
      </div>
      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg">
        <p className="text-sm text-amber-800 dark:text-amber-300">
          Note: Voice cloning requires a clear voice sample for best results.
          Ensure the sample has minimal background noise.
        </p>
      </div>
      <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" leftIcon={<MicVocalIcon size={18} />} disabled={isGenerating || !voiceSample || !text.trim()} loading={isGenerating}>
        {isGenerating ? 'Cloning Voice...' : 'Clone Voice'}
      </Button>
    </form>;
};
export const AudioTranslatorTool: React.FC<ToolProps> = ({
  isGenerating,
  onGenerate
}) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [preserveVoice, setPreserveVoice] = useState(true);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      audioFile,
      sourceLanguage,
      targetLanguage,
      preserveVoice
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Upload Audio File
        </label>
        <div className="relative">
          <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" id="audio-translator-upload" />
          <label htmlFor="audio-translator-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Source Language
          </label>
          <select value={sourceLanguage} onChange={e => setSourceLanguage(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white">
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
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Target Language
          </label>
          <select value={targetLanguage} onChange={e => setTargetLanguage(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-white">
            <option value="es">Spanish</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="zh">Chinese</option>
          </select>
        </div>
      </div>
      <div className="flex items-center">
        <input type="checkbox" id="preserve-voice" checked={preserveVoice} onChange={e => setPreserveVoice(e.target.checked)} className="w-4 h-4 text-amber-500 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 dark:focus:ring-amber-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label htmlFor="preserve-voice" className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
          Preserve original voice characteristics
        </label>
      </div>
      <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" leftIcon={<LanguagesIcon size={18} />} disabled={isGenerating || !audioFile} loading={isGenerating}>
        {isGenerating ? 'Translating Audio...' : 'Translate Audio'}
      </Button>
    </form>;
};