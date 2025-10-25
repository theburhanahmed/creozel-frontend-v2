import React from 'react';
import { Button } from '../../ui/Button';
import { SparklesIcon, Loader2Icon, UploadIcon, AudioLinesIcon, WandIcon, SplitIcon, MicVocalIcon, LanguagesIcon, SettingsIcon } from 'lucide-react';
interface ToolProps {
  isGenerating: boolean;
  result: any;
  onGenerate: (data: any) => void;
}
export const VoiceChangerTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Upload Audio File
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 text-center hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-all duration-300 cursor-pointer group">
            <UploadIcon size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              MP3, WAV, FLAC up to 50MB
            </p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Voice Effect
          </label>
          <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
            <option>Pitch Shift</option>
            <option>Robot Voice</option>
            <option>Reverb</option>
            <option>Echo</option>
            <option>Whisper</option>
            <option>Deep Voice</option>
            <option>Helium Voice</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Effect Intensity
          </label>
          <input type="range" min="0" max="100" defaultValue="50" className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-amber-500" />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
            <span>Subtle</span>
            <span>Moderate</span>
            <span>Extreme</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Preserve Clarity
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Output Format
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
              <option>MP3</option>
              <option>WAV</option>
              <option>FLAC</option>
            </select>
          </div>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SettingsIcon />} onClick={() => onGenerate({
        effect: 'Pitch Shift',
        intensity: 50,
        clarity: 'High',
        format: 'MP3'
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Processing...' : 'Apply Voice Effect'}
        </Button>
      </div>
    </div>;
};
export const TextToSoundTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Sound Description
          </label>
          <textarea placeholder="Describe the sound effect you want to generate..." rows={4} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Duration (seconds)
          </label>
          <input type="range" min="1" max="30" defaultValue="5" className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-amber-500" />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
            <span>1s</span>
            <span>30s</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Sound Category
          </label>
          <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
            <option>Nature</option>
            <option>Urban</option>
            <option>Musical</option>
            <option>Mechanical</option>
            <option>Electronic</option>
            <option>Human</option>
            <option>Other</option>
          </select>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <AudioLinesIcon />} onClick={() => onGenerate({
        description: 'Sound effect description',
        duration: 5,
        category: 'nature'
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Generating...' : 'Generate Sound'}
        </Button>
      </div>
    </div>;
};
export const VoiceDesignTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Voice Characteristics
          </label>
          <textarea placeholder="Describe the voice characteristics you want (e.g., deep, warm, energetic)..." rows={3} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Gender
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
              <option>Male</option>
              <option>Female</option>
              <option>Neutral</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Age Range
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
              <option>Young (18-30)</option>
              <option>Middle (30-50)</option>
              <option>Mature (50+)</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Accent
          </label>
          <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
            <option>American</option>
            <option>British</option>
            <option>Australian</option>
            <option>Indian</option>
            <option>None</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Speaking Rate
          </label>
          <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-amber-500" />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
            <span>Slow</span>
            <span>Normal</span>
            <span>Fast</span>
          </div>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <WandIcon />} onClick={() => onGenerate({
        characteristics: 'Voice characteristics',
        gender: 'male',
        ageRange: 'young',
        accent: 'american',
        speakingRate: 1
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Designing...' : 'Design Voice'}
        </Button>
      </div>
    </div>;
};
export const VoiceIsolatorTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Upload Audio File
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 text-center hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-all duration-300 cursor-pointer group">
            <UploadIcon size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              MP3, WAV, FLAC up to 50MB
            </p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Isolation Mode
          </label>
          <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
            <option>Isolate Vocals</option>
            <option>Isolate Instruments</option>
            <option>Remove Vocals</option>
            <option>Remove Instruments</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Quality Level
          </label>
          <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
            <option>Standard</option>
            <option>High Quality</option>
            <option>Maximum Quality</option>
          </select>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-blue-200/50 dark:border-blue-800/30">
          <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
            💡 Higher quality settings take longer but produce better results
          </p>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SplitIcon />} onClick={() => onGenerate({
        mode: 'isolate-vocals',
        quality: 'high'
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Isolating...' : 'Isolate Voice'}
        </Button>
      </div>
    </div>;
};
export const VoiceCloningToolEnhanced: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Upload Voice Sample
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 text-center hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-all duration-300 cursor-pointer group">
            <UploadIcon size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              MP3, WAV (at least 30 seconds recommended)
            </p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Text to Speak
          </label>
          <textarea placeholder="Enter the text you want the cloned voice to speak..." rows={4} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Voice Model Name
          </label>
          <input type="text" placeholder="Give your voice model a name..." className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border-2 border-amber-200/50 dark:border-amber-800/30">
          <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">
            ⚠️ Please ensure you have permission to clone this voice
          </p>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <MicVocalIcon />} onClick={() => onGenerate({
        voiceSample: 'sample.mp3',
        text: 'Text to speak',
        modelName: 'My Voice'
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Cloning Voice...' : 'Clone Voice'}
        </Button>
      </div>
    </div>;
};
export const AudioTranslatorToolEnhanced: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Upload Audio File
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 text-center hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-all duration-300 cursor-pointer group">
            <UploadIcon size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              MP3, WAV, FLAC up to 50MB
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Source Language
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
              <option>Auto-detect</option>
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Chinese</option>
              <option>Japanese</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Target Language
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
              <option>Spanish</option>
              <option>English</option>
              <option>French</option>
              <option>German</option>
              <option>Chinese</option>
              <option>Japanese</option>
            </select>
          </div>
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-amber-500 dark:hover:border-amber-400 cursor-pointer transition-all duration-200">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Preserve original voice characteristics
            </span>
          </label>
          <label className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-amber-500 dark:hover:border-amber-400 cursor-pointer transition-all duration-200">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Generate subtitles
            </span>
          </label>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <LanguagesIcon />} onClick={() => onGenerate({
        sourceLanguage: 'auto',
        targetLanguage: 'spanish',
        preserveVoice: true,
        generateSubtitles: false
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Translating...' : 'Translate Audio'}
        </Button>
      </div>
    </div>;
};