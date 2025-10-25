import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { SparklesIcon, Loader2Icon, DownloadIcon, CopyIcon, RefreshCwIcon } from 'lucide-react';
import { toast } from 'sonner';
interface BaseToolProps {
  isGenerating: boolean;
  result?: any;
  onGenerate: (data: any) => void;
}
// Content Generator Tool
export const ContentGeneratorTool: React.FC<BaseToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState('blog-post');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [includeKeywords, setIncludeKeywords] = useState(true);
  const [variations, setVariations] = useState(1);
  const handleGenerate = () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }
    onGenerate({
      topic,
      contentType,
      tone,
      length,
      includeKeywords,
      variations
    });
  };
  return <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Topic / Brief
          </label>
          <textarea value={topic} onChange={e => setTopic(e.target.value)} placeholder="Enter your content topic or brief..." className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" rows={4} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content Type
            </label>
            <select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
              <option value="blog-post">Blog Post</option>
              <option value="article">Article</option>
              <option value="social-media">Social Media</option>
              <option value="email">Email</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tone
            </label>
            <select value={tone} onChange={e => setTone(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
              <option value="formal">Formal</option>
              <option value="humorous">Humorous</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Length
            </label>
            <select value={length} onChange={e => setLength(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
              <option value="short">Short (300 words)</option>
              <option value="medium">Medium (600 words)</option>
              <option value="long">Long (1200+ words)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Variations
            </label>
            <input type="number" min="1" max="5" value={variations} onChange={e => setVariations(parseInt(e.target.value))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="includeKeywords" checked={includeKeywords} onChange={e => setIncludeKeywords(e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          <label htmlFor="includeKeywords" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Include SEO keywords
          </label>
        </div>
      </div>
      <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={handleGenerate} disabled={isGenerating || !topic.trim()} className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90">
        {isGenerating ? 'Generating...' : 'Generate Content'}
      </Button>
    </div>;
};
// Rewriter Tool
export const RewriterTool: React.FC<BaseToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  const [text, setText] = useState('');
  const [style, setStyle] = useState('simplify');
  const [creativity, setCreativity] = useState(5);
  const [preserveMeaning, setPreserveMeaning] = useState(true);
  const [changeStructure, setChangeStructure] = useState(false);
  const handleGenerate = () => {
    if (!text.trim()) {
      toast.error('Please enter text to rewrite');
      return;
    }
    onGenerate({
      text,
      style,
      creativity,
      preserveMeaning,
      changeStructure
    });
  };
  return <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Text to Rewrite
          </label>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste the text you want to rewrite..." className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" rows={6} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Rewrite Style
          </label>
          <select value={style} onChange={e => setStyle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
            <option value="simplify">Simplify</option>
            <option value="elaborate">Elaborate</option>
            <option value="formal">Make Formal</option>
            <option value="casual">Make Casual</option>
          </select>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Creativity Level
            </label>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {creativity}
            </span>
          </div>
          <input type="range" min="1" max="10" value={creativity} onChange={e => setCreativity(parseInt(e.target.value))} className="w-full" />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Conservative</span>
            <span>Creative</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center">
            <input type="checkbox" id="preserveMeaning" checked={preserveMeaning} onChange={e => setPreserveMeaning(e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <label htmlFor="preserveMeaning" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Preserve original meaning
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="changeStructure" checked={changeStructure} onChange={e => setChangeStructure(e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <label htmlFor="changeStructure" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Change sentence structure
            </label>
          </div>
        </div>
      </div>
      <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <RefreshCwIcon />} onClick={handleGenerate} disabled={isGenerating || !text.trim()} className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90">
        {isGenerating ? 'Rewriting...' : 'Rewrite Text'}
      </Button>
    </div>;
};
// Summarizer Tool
export const SummarizerTool: React.FC<BaseToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [summaryLength, setSummaryLength] = useState('short');
  const [summaryType, setSummaryType] = useState('abstractive');
  const [keyPoints, setKeyPoints] = useState(5);
  const [includeQuotes, setIncludeQuotes] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleGenerate = () => {
    if (!text.trim() && !file) {
      toast.error('Please enter text or upload a document');
      return;
    }
    onGenerate({
      text,
      file,
      summaryLength,
      summaryType,
      keyPoints,
      includeQuotes
    });
  };
  return <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Text to Summarize
          </label>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your long text here..." className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" rows={8} />
        </div>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          — OR —
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload Document
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {file ? file.name : 'Click to upload PDF, DOCX, or TXT'}
                </p>
              </div>
              <input type="file" className="hidden" accept=".pdf,.docx,.txt" onChange={handleFileChange} />
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Summary Length
            </label>
            <select value={summaryLength} onChange={e => setSummaryLength(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
              <option value="very-short">Very Short</option>
              <option value="short">Short</option>
              <option value="medium">Medium</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Summary Type
            </label>
            <select value={summaryType} onChange={e => setSummaryType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
              <option value="extractive">Extractive</option>
              <option value="abstractive">Abstractive</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Key Points Count: {keyPoints}
          </label>
          <select value={keyPoints} onChange={e => setKeyPoints(parseInt(e.target.value))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
            <option value="3">3 Key Points</option>
            <option value="5">5 Key Points</option>
            <option value="10">10 Key Points</option>
          </select>
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="includeQuotes" checked={includeQuotes} onChange={e => setIncludeQuotes(e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          <label htmlFor="includeQuotes" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Include important quotes
          </label>
        </div>
      </div>
      <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />} onClick={handleGenerate} disabled={isGenerating || !text.trim() && !file} className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90">
        {isGenerating ? 'Summarizing...' : 'Generate Summary'}
      </Button>
    </div>;
};