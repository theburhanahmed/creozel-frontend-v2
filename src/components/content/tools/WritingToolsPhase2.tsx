import React from 'react';
import { Button } from '../../ui/Button';
import { SparklesIcon, Loader2Icon, SearchIcon } from 'lucide-react';
interface ToolProps {
  isGenerating: boolean;
  result: any;
  onGenerate: (data: any) => void;
}
export const KeywordResearchTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Topic or Keyword
          </label>
          <input type="text" placeholder="Enter your main topic or keyword..." className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Industry
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Finance</option>
              <option>E-commerce</option>
              <option>Education</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
              <option>Global</option>
            </select>
          </div>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SearchIcon />} onClick={() => onGenerate({
        keyword: 'AI tools',
        industry: 'Technology',
        location: 'United States'
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Researching...' : 'Research Keywords'}
        </Button>
      </div>
    </div>;
};
export const ContentExpanderTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Content to Expand
          </label>
          <textarea placeholder="Enter the content you want to expand..." rows={6} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Expansion Level
          </label>
          <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
            <option>Moderate (1.5x)</option>
            <option>Significant (2x)</option>
            <option>Extensive (3x)</option>
          </select>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({
        text: 'Content to expand',
        level: 'moderate'
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Expanding...' : 'Expand Content'}
        </Button>
      </div>
    </div>;
};
export const ContentShortenerTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Content to Shorten
          </label>
          <textarea placeholder="Enter the content you want to shorten..." rows={6} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Target Length
          </label>
          <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
            <option>Brief (50% shorter)</option>
            <option>Concise (30% shorter)</option>
            <option>Minimal (70% shorter)</option>
          </select>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({
        text: 'Content to shorten',
        targetLength: 'brief'
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Shortening...' : 'Shorten Content'}
        </Button>
      </div>
    </div>;
};
export const ContentDetectorTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Content to Analyze
          </label>
          <textarea placeholder="Paste the content you want to analyze..." rows={8} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border-2 border-blue-200/50 dark:border-blue-800/30">
          <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
            💡 This tool analyzes content to detect AI-generated text
          </p>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({
        text: 'Content to analyze'
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Analyzing...' : 'Detect AI Content'}
        </Button>
      </div>
    </div>;
};
export const ParaphraserTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Text to Paraphrase
          </label>
          <textarea placeholder="Enter the text you want to paraphrase..." rows={6} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Paraphrasing Mode
          </label>
          <select className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
            <option>Standard</option>
            <option>Fluent</option>
            <option>Creative</option>
            <option>Formal</option>
            <option>Simple</option>
          </select>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({
        text: 'Text to paraphrase',
        mode: 'standard'
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Paraphrasing...' : 'Paraphrase Text'}
        </Button>
      </div>
    </div>;
};
export const GrammarCheckerTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Text to Check
          </label>
          <textarea placeholder="Enter or paste your text here..." rows={8} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-all duration-200">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Grammar
            </span>
          </label>
          <label className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-all duration-200">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Spelling
            </span>
          </label>
          <label className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-all duration-200">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Punctuation
            </span>
          </label>
          <label className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-all duration-200">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Style
            </span>
          </label>
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({
        text: 'Text to check'
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Checking...' : 'Check Grammar'}
        </Button>
      </div>
    </div>;
};
export const SEOOptimizerTool: React.FC<ToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  return <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Content to Optimize
          </label>
          <textarea placeholder="Paste your content here..." rows={6} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Target Keywords
          </label>
          <input type="text" placeholder="Enter keywords separated by commas..." className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600" />
        </div>
        <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={() => onGenerate({
        text: 'Content to optimize',
        keywords: ['SEO', 'optimization']
      })} disabled={isGenerating} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          {isGenerating ? 'Optimizing...' : 'Optimize for SEO'}
        </Button>
      </div>
    </div>;
};