import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { FileTextIcon, RefreshCwIcon, LanguagesIcon, ListIcon, SparklesIcon, MailIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
interface ToolProps {
  isGenerating: boolean;
  result: any;
  onGenerate: (data: any) => void;
}
export const BlogWriterTool: React.FC<ToolProps> = ({
  isGenerating,
  onGenerate
}) => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [keywords, setKeywords] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      topic,
      tone,
      length,
      keywords
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Blog Topic
        </label>
        <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Enter your blog topic..." className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Tone
          </label>
          <select value={tone} onChange={e => setTone(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200">
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="friendly">Friendly</option>
            <option value="authoritative">Authoritative</option>
            <option value="conversational">Conversational</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Length
          </label>
          <select value={length} onChange={e => setLength(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200">
            <option value="short">Short (500 words)</option>
            <option value="medium">Medium (1000 words)</option>
            <option value="long">Long (2000 words)</option>
            <option value="very-long">Very Long (3000+ words)</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Keywords (optional)
        </label>
        <input type="text" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="SEO, marketing, content strategy" className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200" />
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Separate keywords with commas
        </p>
      </div>
      <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-none shadow-md hover:shadow-lg" leftIcon={<FileTextIcon size={18} />} disabled={isGenerating || !topic.trim()} loading={isGenerating}>
        {isGenerating ? 'Writing Blog...' : 'Write Blog Post'}
      </Button>
    </form>;
};
export const RewriterTool: React.FC<ToolProps> = ({
  isGenerating,
  onGenerate
}) => {
  const [text, setText] = useState('');
  const [style, setStyle] = useState('improve');
  const [creativity, setCreativity] = useState(50);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      text,
      style,
      creativity
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Text to Rewrite
        </label>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your text here to rewrite it..." rows={8} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200" required />
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {text.length} characters
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Rewrite Style
        </label>
        <select value={style} onChange={e => setStyle(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200">
          <option value="improve">Improve Writing</option>
          <option value="simplify">Simplify</option>
          <option value="expand">Expand</option>
          <option value="shorten">Shorten</option>
          <option value="formal">Make Formal</option>
          <option value="casual">Make Casual</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Creativity Level: {creativity}%
        </label>
        <input type="range" min="0" max="100" value={creativity} onChange={e => setCreativity(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>Conservative</span>
          <span>Creative</span>
        </div>
      </div>
      <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-none shadow-md hover:shadow-lg" leftIcon={<RefreshCwIcon size={18} />} disabled={isGenerating || !text.trim()} loading={isGenerating}>
        {isGenerating ? 'Rewriting...' : 'Rewrite Text'}
      </Button>
    </form>;
};
export const TranslatorTool: React.FC<ToolProps> = ({
  isGenerating,
  onGenerate
}) => {
  const [text, setText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      text,
      sourceLanguage,
      targetLanguage
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Text to Translate
        </label>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter text to translate..." rows={6} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            From
          </label>
          <select value={sourceLanguage} onChange={e => setSourceLanguage(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200">
            <option value="auto">Auto-detect</option>
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
            To
          </label>
          <select value={targetLanguage} onChange={e => setTargetLanguage(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200">
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
      <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-none shadow-md hover:shadow-lg" leftIcon={<LanguagesIcon size={18} />} disabled={isGenerating || !text.trim()} loading={isGenerating}>
        {isGenerating ? 'Translating...' : 'Translate Text'}
      </Button>
    </form>;
};
export const SummarizerTool: React.FC<ToolProps> = ({
  isGenerating,
  onGenerate
}) => {
  const [text, setText] = useState('');
  const [length, setLength] = useState('medium');
  const [format, setFormat] = useState('paragraph');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      text,
      length,
      format
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Text to Summarize
        </label>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your long text here to summarize..." rows={8} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200" required />
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {text.length} characters
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Summary Length
          </label>
          <select value={length} onChange={e => setLength(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200">
            <option value="brief">Brief (1-2 sentences)</option>
            <option value="short">Short (3-4 sentences)</option>
            <option value="medium">Medium (1 paragraph)</option>
            <option value="detailed">Detailed (2-3 paragraphs)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Format
          </label>
          <select value={format} onChange={e => setFormat(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200">
            <option value="paragraph">Paragraph</option>
            <option value="bullets">Bullet Points</option>
            <option value="key-points">Key Points</option>
          </select>
        </div>
      </div>
      <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-none shadow-md hover:shadow-lg" leftIcon={<ListIcon size={18} />} disabled={isGenerating || !text.trim()} loading={isGenerating}>
        {isGenerating ? 'Summarizing...' : 'Summarize Text'}
      </Button>
    </form>;
};
export const SocialPostTool: React.FC<ToolProps> = ({
  isGenerating,
  onGenerate
}) => {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('twitter');
  const [tone, setTone] = useState('engaging');
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      topic,
      platform,
      tone,
      includeHashtags,
      includeEmojis
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Post Topic
        </label>
        <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="What do you want to post about?" className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Platform
          </label>
          <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200">
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Tone
          </label>
          <select value={tone} onChange={e => setTone(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200">
            <option value="engaging">Engaging</option>
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="humorous">Humorous</option>
            <option value="inspirational">Inspirational</option>
          </select>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center">
          <input type="checkbox" id="include-hashtags" checked={includeHashtags} onChange={e => setIncludeHashtags(e.target.checked)} className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="include-hashtags" className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
            Include relevant hashtags
          </label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="include-emojis" checked={includeEmojis} onChange={e => setIncludeEmojis(e.target.checked)} className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="include-emojis" className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
            Include emojis
          </label>
        </div>
      </div>
      <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-none shadow-md hover:shadow-lg" leftIcon={<SparklesIcon size={18} />} disabled={isGenerating || !topic.trim()} loading={isGenerating}>
        {isGenerating ? 'Creating Post...' : 'Create Social Post'}
      </Button>
    </form>;
};
export const EmailWriterTool: React.FC<ToolProps> = ({
  isGenerating,
  onGenerate
}) => {
  const [purpose, setPurpose] = useState('');
  const [emailType, setEmailType] = useState('marketing');
  const [tone, setTone] = useState('professional');
  const [includeSubject, setIncludeSubject] = useState(true);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      purpose,
      emailType,
      tone,
      includeSubject
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Email Purpose
        </label>
        <textarea value={purpose} onChange={e => setPurpose(e.target.value)} placeholder="Describe what you want to communicate in this email..." rows={4} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Email Type
          </label>
          <select value={emailType} onChange={e => setEmailType(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200">
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
            <option value="follow-up">Follow-up</option>
            <option value="announcement">Announcement</option>
            <option value="newsletter">Newsletter</option>
            <option value="cold-outreach">Cold Outreach</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Tone
          </label>
          <select value={tone} onChange={e => setTone(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200">
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="persuasive">Persuasive</option>
          </select>
        </div>
      </div>
      <div className="flex items-center">
        <input type="checkbox" id="include-subject" checked={includeSubject} onChange={e => setIncludeSubject(e.target.checked)} className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label htmlFor="include-subject" className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
          Generate subject line
        </label>
      </div>
      <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-none shadow-md hover:shadow-lg" leftIcon={<MailIcon size={18} />} disabled={isGenerating || !purpose.trim()} loading={isGenerating}>
        {isGenerating ? 'Writing Email...' : 'Write Email'}
      </Button>
    </form>;
};