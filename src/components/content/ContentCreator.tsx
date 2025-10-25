import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Sparkles as SparklesIcon, Send as SendIcon, Edit as EditIcon, Save as SaveIcon, Download as DownloadIcon, Share2 as ShareIcon, RefreshCw as RefreshCwIcon, Copy as CopyIcon, Check as CheckIcon, Loader2 as Loader2Icon, FileText as FileTextIcon, Image as ImageIcon, Video as VideoIcon, Mic as MicIcon, X as XIcon, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ContentTypeSelector } from './ContentTypeSelector';
import { PromptSuggestions } from './PromptSuggestions';
export type ContentType = 'text' | 'image' | 'audio' | 'video';
interface ContentCreatorProps {
  type: ContentType;
  onGenerate: (prompt: string, options: any) => void;
  onSave: (content: any) => void;
  onExport: (content: any) => void;
  onShare: (content: any) => void;
  onEdit: (content: any) => void;
  isGenerating: boolean;
  generatedContent: any;
  editTools?: React.ReactNode;
  previewContent?: React.ReactNode;
  contentSubtypes?: {
    value: string;
    label: string;
  }[];
  defaultSubtype?: string;
  promptPlaceholder?: string;
  generationOptions?: React.ReactNode;
}
export const ContentCreator: React.FC<ContentCreatorProps> = ({
  type,
  onGenerate,
  onSave,
  onExport,
  onShare,
  onEdit,
  isGenerating,
  generatedContent,
  editTools,
  previewContent,
  contentSubtypes,
  defaultSubtype = '',
  promptPlaceholder = 'Describe what you want to create...',
  generationOptions
}) => {
  const [activeTab, setActiveTab] = useState<'generate' | 'edit'>('generate');
  const [prompt, setPrompt] = useState('');
  const [contentSubtype, setContentSubtype] = useState(defaultSubtype);
  const [copied, setCopied] = useState(false);
  const [generationSettings, setGenerationSettings] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  useEffect(() => {
    if (defaultSubtype) {
      setContentSubtype(defaultSubtype);
    } else if (contentSubtypes && contentSubtypes.length > 0) {
      setContentSubtype(contentSubtypes[0].value);
    }
  }, [defaultSubtype, contentSubtypes]);
  const getTypeDetails = () => {
    switch (type) {
      case 'text':
        return {
          title: 'Text Generator',
          description: 'Create professional text content',
          color: 'text-blue-500',
          bgColor: 'bg-blue-500',
          hoverColor: 'hover:bg-blue-600',
          lightBg: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          gradientFrom: 'from-blue-500',
          gradientTo: 'to-blue-600',
          icon: <FileTextIcon size={16} />
        };
      case 'image':
        return {
          title: 'Image Generator',
          description: 'Create stunning images and graphics',
          color: 'text-purple-500',
          bgColor: 'bg-purple-500',
          hoverColor: 'hover:bg-purple-600',
          lightBg: 'bg-purple-50 dark:bg-purple-900/20',
          borderColor: 'border-purple-200 dark:border-purple-800',
          gradientFrom: 'from-purple-500',
          gradientTo: 'to-purple-600',
          icon: <ImageIcon size={16} />
        };
      case 'audio':
        return {
          title: 'Audio Generator',
          description: 'Create professional audio content',
          color: 'text-amber-500',
          bgColor: 'bg-amber-500',
          hoverColor: 'hover:bg-amber-600',
          lightBg: 'bg-amber-50 dark:bg-amber-900/20',
          borderColor: 'border-amber-200 dark:border-amber-800',
          gradientFrom: 'from-amber-500',
          gradientTo: 'to-amber-600',
          icon: <MicIcon size={16} />
        };
      case 'video':
        return {
          title: 'Video Generator',
          description: 'Create engaging video content',
          color: 'text-emerald-500',
          bgColor: 'bg-emerald-500',
          hoverColor: 'hover:bg-emerald-600',
          lightBg: 'bg-emerald-50 dark:bg-emerald-900/20',
          borderColor: 'border-emerald-200 dark:border-emerald-800',
          gradientFrom: 'from-emerald-500',
          gradientTo: 'to-emerald-600',
          icon: <VideoIcon size={16} />
        };
      default:
        return {
          title: 'Content Generator',
          description: 'Create content',
          color: 'text-gray-500',
          bgColor: 'bg-gray-500',
          hoverColor: 'hover:bg-gray-600',
          lightBg: 'bg-gray-50 dark:bg-gray-900/20',
          borderColor: 'border-gray-200 dark:border-gray-800',
          gradientFrom: 'from-gray-500',
          gradientTo: 'to-gray-600',
          icon: <FileTextIcon size={16} />
        };
    }
  };
  const typeDetails = getTypeDetails();
  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt first');
      return;
    }
    onGenerate(prompt, {
      ...generationSettings,
      contentSubtype
    });
  };
  const handleCopy = () => {
    if (type === 'text' && typeof generatedContent === 'string') {
      navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      toast.success('Content copied to clipboard');
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };
  const handleSelectSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
    setShowSuggestions(false);
  };
  const renderLoadingState = () => {
    return <div className={`flex flex-col items-center justify-center p-12 ${typeDetails.lightBg} rounded-lg border ${typeDetails.borderColor} animate-pulse`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${typeDetails.bgColor} bg-opacity-20 dark:bg-opacity-30`}>
          <Loader2Icon size={32} className={`animate-spin ${typeDetails.color}`} />
        </div>
        <h3 className={`text-xl font-medium ${typeDetails.color} mb-2`}>
          Generating {type} content...
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center">
          This might take a moment. We're creating something amazing for you!
        </p>
      </div>;
  };
  const renderEmptyPreview = () => {
    return <div className="flex flex-col items-center justify-center h-full p-12 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${typeDetails.lightBg}`}>
          {typeDetails.icon}
        </div>
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
          No {type} generated yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
          Enter a prompt and click generate to create {type} content
        </p>
        <Button variant="outline" className="group" onClick={() => setActiveTab('generate')}>
          Go to Generator
          <ChevronRightIcon size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>;
  };
  return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel - Controls */}
      <div className="space-y-6">
        <Card className="overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button className={`flex-1 py-3 px-4 text-center font-medium text-sm transition-colors ${activeTab === 'generate' ? `${typeDetails.color} border-b-2 ${typeDetails.borderColor}` : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('generate')}>
              <SparklesIcon size={16} className="inline mr-2" />
              Generate
            </button>
            <button className={`flex-1 py-3 px-4 text-center font-medium text-sm transition-colors ${activeTab === 'edit' ? `${typeDetails.color} border-b-2 ${typeDetails.borderColor}` : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('edit')} disabled={!generatedContent}>
              <EditIcon size={16} className="inline mr-2" />
              Edit
            </button>
          </div>
          <div className="p-6">
            {activeTab === 'generate' ? <div className="space-y-6">
                {/* Content Subtype Selector */}
                {contentSubtypes && contentSubtypes.length > 0 && <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Content Type
                    </label>
                    <ContentTypeSelector types={contentSubtypes} selectedType={contentSubtype} onSelect={setContentSubtype} accentColor={typeDetails.color.replace('text-', '')} />
                  </div>}
                {/* Prompt Input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      What would you like to create?
                    </label>
                    <button onClick={() => setShowSuggestions(!showSuggestions)} className={`text-xs ${typeDetails.color} hover:underline flex items-center gap-1`}>
                      {showSuggestions ? <>
                          <XIcon size={12} />
                          Hide suggestions
                        </> : <>
                          <SparklesIcon size={12} />
                          Show suggestions
                        </>}
                    </button>
                  </div>
                  <div className="relative">
                    <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={promptPlaceholder} className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all ${typeDetails.color.replace('text-', 'focus:ring-')}`} rows={4} />
                    {showSuggestions && <PromptSuggestions contentType={type} contentSubtype={contentSubtype} onSelect={handleSelectSuggestion} />}
                  </div>
                </div>
                {/* Generation Options */}
                {generationOptions && <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Generation Options
                    </h3>
                    <div className={`p-4 rounded-lg ${typeDetails.lightBg} border ${typeDetails.borderColor}`}>
                      {generationOptions}
                    </div>
                  </div>}
                {/* Generate Button */}
                <Button variant="primary" size="lg" leftIcon={<SparklesIcon size={18} />} onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className={`w-full bg-gradient-to-r ${typeDetails.gradientFrom} ${typeDetails.gradientTo} ${typeDetails.hoverColor}`}>
                  {isGenerating ? <>
                      <div className="mr-2 animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Generating...
                    </> : `Generate ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                </Button>
              </div> : <div className="space-y-6">
                {!generatedContent ? <div className="text-center p-6">
                    <p className="text-gray-500 dark:text-gray-400">
                      Generate content first to enable editing
                    </p>
                  </div> : <>
                    <h3 className={`text-lg font-medium ${typeDetails.color}`}>
                      Edit {type.charAt(0).toUpperCase() + type.slice(1)}{' '}
                      Content
                    </h3>
                    {editTools || <div className="text-center p-6">
                        <p className="text-gray-500 dark:text-gray-400">
                          Editing tools will appear here
                        </p>
                      </div>}
                  </>}
              </div>}
          </div>
        </Card>
      </div>
      {/* Right Panel - Preview */}
      <div className="space-y-6">
        <Card className="h-full">
          {!generatedContent && !isGenerating ? renderEmptyPreview() : <>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full ${typeDetails.lightBg} flex items-center justify-center mr-2`}>
                    {typeDetails.icon}
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {type === 'text' && contentSubtype ? contentSubtypes?.find(t => t.value === contentSubtype)?.label || 'Generated Content' : 'Generated Content'}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {type === 'text' && <Button variant="ghost" size="sm" leftIcon={copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />} onClick={handleCopy}>
                      {copied ? 'Copied' : 'Copy'}
                    </Button>}
                  <Button variant="ghost" size="sm" leftIcon={<RefreshCwIcon size={14} />} onClick={() => onGenerate(prompt, generationSettings)} disabled={isGenerating}>
                    Regenerate
                  </Button>
                  <Button variant="ghost" size="sm" leftIcon={<EditIcon size={14} />} onClick={() => {
                setActiveTab('edit');
                onEdit(generatedContent);
              }}>
                    Edit
                  </Button>
                </div>
              </div>
              <div className="p-0 overflow-hidden">
                {isGenerating ? renderLoadingState() : <>
                    {previewContent || <div className="p-6 text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                          Preview will appear here
                        </p>
                      </div>}
                  </>}
              </div>
              {!isGenerating && generatedContent && <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm" leftIcon={<DownloadIcon size={14} />} onClick={() => onExport(generatedContent)}>
                    Export
                  </Button>
                  <Button variant="outline" size="sm" leftIcon={<ShareIcon size={14} />} onClick={() => onShare(generatedContent)}>
                    Share
                  </Button>
                  <Button variant="primary" size="sm" leftIcon={<SaveIcon size={14} />} onClick={() => onSave(generatedContent)} className={`bg-gradient-to-r ${typeDetails.gradientFrom} ${typeDetails.gradientTo}`}>
                    Save
                  </Button>
                </div>}
            </>}
        </Card>
      </div>
    </div>;
};