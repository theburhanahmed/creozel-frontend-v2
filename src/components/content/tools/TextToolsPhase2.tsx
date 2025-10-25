import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { SparklesIcon, Loader2Icon, LanguagesIcon, CheckCircleIcon, HashIcon } from 'lucide-react';
import { toast } from 'sonner';
interface BaseToolProps {
  isGenerating: boolean;
  result?: any;
  onGenerate: (data: any) => void;
}
// Translator Tool
export const TranslatorTool: React.FC<BaseToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  const [text, setText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [preserveFormatting, setPreserveFormatting] = useState(true);
  const [formalTone, setFormalTone] = useState(false);
  const languages = [{
    code: 'auto',
    name: 'Auto-detect'
  }, {
    code: 'en',
    name: 'English'
  }, {
    code: 'es',
    name: 'Spanish'
  }, {
    code: 'fr',
    name: 'French'
  }, {
    code: 'de',
    name: 'German'
  }, {
    code: 'it',
    name: 'Italian'
  }, {
    code: 'pt',
    name: 'Portuguese'
  }, {
    code: 'ru',
    name: 'Russian'
  }, {
    code: 'ja',
    name: 'Japanese'
  }, {
    code: 'zh',
    name: 'Chinese'
  }, {
    code: 'ko',
    name: 'Korean'
  }, {
    code: 'ar',
    name: 'Arabic'
  }, {
    code: 'hi',
    name: 'Hindi'
  }];
  const handleGenerate = () => {
    if (!text.trim()) {
      toast.error('Please enter text to translate');
      return;
    }
    if (sourceLanguage === targetLanguage && sourceLanguage !== 'auto') {
      toast.error('Source and target languages must be different');
      return;
    }
    onGenerate({
      text,
      sourceLanguage,
      targetLanguage,
      preserveFormatting,
      formalTone
    });
  };
  return <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Text to Translate
          </label>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter or paste text to translate..." className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" rows={6} />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {text.length} characters
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Source Language
            </label>
            <select value={sourceLanguage} onChange={e => setSourceLanguage(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
              {languages.map(lang => <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Language
            </label>
            <select value={targetLanguage} onChange={e => setTargetLanguage(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
              {languages.filter(lang => lang.code !== 'auto').map(lang => <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>)}
            </select>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center">
            <input type="checkbox" id="preserveFormatting" checked={preserveFormatting} onChange={e => setPreserveFormatting(e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <label htmlFor="preserveFormatting" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Preserve formatting and line breaks
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="formalTone" checked={formalTone} onChange={e => setFormalTone(e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <label htmlFor="formalTone" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Use formal tone
            </label>
          </div>
        </div>
      </div>
      <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <LanguagesIcon />} onClick={handleGenerate} disabled={isGenerating || !text.trim()} className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90">
        {isGenerating ? 'Translating...' : 'Translate Text'}
      </Button>
    </div>;
};
// Grammar Checker Tool
export const GrammarCheckerTool: React.FC<BaseToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en');
  const [checkStyle, setCheckStyle] = useState(true);
  const [checkPunctuation, setCheckPunctuation] = useState(true);
  const [suggestImprovements, setSuggestImprovements] = useState(true);
  const handleGenerate = () => {
    if (!text.trim()) {
      toast.error('Please enter text to check');
      return;
    }
    onGenerate({
      text,
      language,
      checkStyle,
      checkPunctuation,
      suggestImprovements
    });
  };
  return <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Text to Check
          </label>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter or paste text to check for grammar and spelling..." className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none" rows={8} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Language
          </label>
          <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
          </select>
        </div>
        <div className="space-y-3">
          <div className="flex items-center">
            <input type="checkbox" id="checkStyle" checked={checkStyle} onChange={e => setCheckStyle(e.target.checked)} className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
            <label htmlFor="checkStyle" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Check writing style and clarity
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="checkPunctuation" checked={checkPunctuation} onChange={e => setCheckPunctuation(e.target.checked)} className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
            <label htmlFor="checkPunctuation" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Check punctuation
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="suggestImprovements" checked={suggestImprovements} onChange={e => setSuggestImprovements(e.target.checked)} className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
            <label htmlFor="suggestImprovements" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Suggest improvements
            </label>
          </div>
        </div>
      </div>
      <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <CheckCircleIcon />} onClick={handleGenerate} disabled={isGenerating || !text.trim()} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90">
        {isGenerating ? 'Checking...' : 'Check Grammar'}
      </Button>
    </div>;
};
// SEO Optimizer Tool
export const SEOOptimizerTool: React.FC<BaseToolProps> = ({
  isGenerating,
  result,
  onGenerate
}) => {
  const [content, setContent] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('');
  const [contentType, setContentType] = useState('blog-post');
  const [optimizeForFeaturedSnippet, setOptimizeForFeaturedSnippet] = useState(true);
  const [generateMetaDescription, setGenerateMetaDescription] = useState(true);
  const handleGenerate = () => {
    if (!content.trim()) {
      toast.error('Please enter content to optimize');
      return;
    }
    if (!targetKeyword.trim()) {
      toast.error('Please enter a target keyword');
      return;
    }
    onGenerate({
      content,
      targetKeyword,
      contentType,
      optimizeForFeaturedSnippet,
      generateMetaDescription
    });
  };
  return <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Target Keyword
          </label>
          <input type="text" value={targetKeyword} onChange={e => setTargetKeyword(e.target.value)} placeholder="e.g., content marketing strategy" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Content to Optimize
          </label>
          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Paste your content here for SEO optimization..." className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none" rows={6} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Content Type
          </label>
          <select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500">
            <option value="blog-post">Blog Post</option>
            <option value="landing-page">Landing Page</option>
            <option value="product-page">Product Page</option>
            <option value="article">Article</option>
          </select>
        </div>
        <div className="space-y-3">
          <div className="flex items-center">
            <input type="checkbox" id="optimizeForFeaturedSnippet" checked={optimizeForFeaturedSnippet} onChange={e => setOptimizeForFeaturedSnippet(e.target.checked)} className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
            <label htmlFor="optimizeForFeaturedSnippet" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Optimize for featured snippet
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="generateMetaDescription" checked={generateMetaDescription} onChange={e => setGenerateMetaDescription(e.target.checked)} className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
            <label htmlFor="generateMetaDescription" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Generate meta description
            </label>
          </div>
        </div>
      </div>
      <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" /> : <HashIcon />} onClick={handleGenerate} disabled={isGenerating || !content.trim() || !targetKeyword.trim()} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90">
        {isGenerating ? 'Optimizing...' : 'Optimize for SEO'}
      </Button>
    </div>;
};