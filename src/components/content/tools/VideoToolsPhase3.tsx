import React from 'react';
import { Button } from '../../ui/Button';
import { SparklesIcon, Loader2Icon, LanguagesIcon, MessageSquareIcon, YoutubeIcon } from 'lucide-react';
interface ToolProps {
  isGenerating: boolean;
  result: any;
  onGenerate: (data: any) => void;
}
export const YouTubeTranslatorTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            YouTube URL
          </label>
          <input type="url" placeholder="https://www.youtube.com/watch?v=..." className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Source Language
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
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
            <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
              <option>Spanish</option>
              <option>English</option>
              <option>French</option>
              <option>German</option>
              <option>Chinese</option>
              <option>Japanese</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Translation Mode
          </label>
          <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
            <option>Subtitles Only</option>
            <option>Dubbed Audio</option>
            <option>Both Subtitles & Audio</option>
          </select>
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-rose-500 dark:hover:border-rose-400 cursor-pointer transition-all duration-200">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Preserve original voice tone
            </span>
          </label>
          <label className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-rose-500 dark:hover:border-rose-400 cursor-pointer transition-all duration-200">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Include timestamps
            </span>
          </label>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <LanguagesIcon />} onClick={() => onGenerate({
        url: 'https://youtube.com/watch?v=...',
        sourceLanguage: 'auto',
        targetLanguage: 'spanish',
        mode: 'subtitles'
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Translating...' : 'Translate Video'}
        </Button>
      </div>
    </div>;
};
export const ChatWithYouTubeTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            YouTube URL
          </label>
          <input type="url" placeholder="https://www.youtube.com/watch?v=..." className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-blue-200/50 dark:border-blue-800/30">
          <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
            💡 After loading the video, you can ask questions about its content
          </p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Your Question
          </label>
          <textarea placeholder="Ask anything about the video content..." rows={4} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Response Style
          </label>
          <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
            <option>Detailed</option>
            <option>Concise</option>
            <option>Summary</option>
            <option>Key Points</option>
          </select>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <MessageSquareIcon />} onClick={() => onGenerate({
        url: 'https://youtube.com/watch?v=...',
        question: 'What is this video about?',
        responseStyle: 'detailed'
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Analyzing...' : 'Ask Question'}
        </Button>
      </div>
    </div>;
};