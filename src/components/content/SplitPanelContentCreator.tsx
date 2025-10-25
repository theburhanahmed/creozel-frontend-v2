import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Sparkles as SparklesIcon, FileText as FileTextIcon, Image as ImageIcon, Video as VideoIcon, Mic as MicIcon, Send as SendIcon, Copy as CopyIcon, Check as CheckIcon, Edit as EditIcon, Save as SaveIcon, Download as DownloadIcon, Share2 as ShareIcon, RefreshCw as RefreshCwIcon, Loader2 as Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { ContentTypeSelector } from './ContentTypeSelector';
import { PromptSuggestions } from './PromptSuggestions';
import { motion, AnimatePresence } from 'framer-motion';
export type ContentType = 'text' | 'image' | 'audio' | 'video';
interface SplitPanelContentCreatorProps {
  type: ContentType;
  onGenerate: (prompt: string, options: any) => void;
  onSave?: (content: any) => void;
  onExport?: (content: any) => void;
  onShare?: (content: any) => void;
  onEdit?: (content: any) => void;
  isGenerating: boolean;
  generatedContent: any;
  previewContent?: React.ReactNode;
  editTools?: React.ReactNode;
  contentSubtypes?: {
    value: string;
    label: string;
  }[];
  defaultSubtype?: string;
  promptPlaceholder?: string;
  generationOptions?: React.ReactNode;
}
export const SplitPanelContentCreator: React.FC<SplitPanelContentCreatorProps> = ({
  type,
  onGenerate,
  onSave,
  onExport,
  onShare,
  onEdit,
  isGenerating,
  generatedContent,
  previewContent,
  editTools,
  contentSubtypes,
  defaultSubtype = '',
  promptPlaceholder = 'Describe what you want to create...',
  generationOptions
}) => {
  const [prompt, setPrompt] = useState('');
  const [contentSubtype, setContentSubtype] = useState(defaultSubtype);
  const [copied, setCopied] = useState(false);
  const [generationSettings, setGenerationSettings] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
          icon: <FileTextIcon size={16} />,
          ringColor: 'ring-blue-500/50'
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
          icon: <ImageIcon size={16} />,
          ringColor: 'ring-purple-500/50'
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
          icon: <MicIcon size={16} />,
          ringColor: 'ring-amber-500/50'
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
          icon: <VideoIcon size={16} />,
          ringColor: 'ring-emerald-500/50'
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
          icon: <FileTextIcon size={16} />,
          ringColor: 'ring-gray-500/50'
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
    return <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className={`flex flex-col items-center justify-center p-12 ${typeDetails.lightBg} rounded-lg border ${typeDetails.borderColor} h-full`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${typeDetails.bgColor} bg-opacity-20 dark:bg-opacity-30 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-white opacity-0 animate-pulse"></div>
          <Loader2Icon size={32} className={`animate-spin ${typeDetails.color}`} />
        </div>
        <h3 className={`text-xl font-medium ${typeDetails.color} mb-2`}>
          Generating {type} content...
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center">
          This might take a moment. We're creating something amazing for you!
        </p>
      </motion.div>;
  };
  const renderEmptyPreview = () => {
    return <div className="flex flex-col items-center justify-center h-full p-12 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${typeDetails.lightBg}`}>
          {typeDetails.icon}
        </div>
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
          No {type} generated yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
          Enter a prompt in the sidebar and click generate to create {type}{' '}
          content
        </p>
        <div className={`mt-4 text-sm ${typeDetails.color} animate-pulse`}>
          <SparklesIcon size={16} className="inline mr-2" />
          Waiting for your creative input
        </div>
      </div>;
  };
  return <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)] min-h-[600px]">
      {/* Content Type Indicator */}
      <motion.div initial={{
      y: -20,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} className="w-full mb-4 lg:hidden">
        <div className={`flex items-center gap-3 p-3 rounded-lg ${typeDetails.lightBg} border ${typeDetails.borderColor}`}>
          <div className={`w-10 h-10 rounded-full ${typeDetails.bgColor} flex items-center justify-center text-white shadow-md`}>
            {typeDetails.icon}
          </div>
          <div>
            <h2 className={`font-medium ${typeDetails.color}`}>
              {typeDetails.title}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {typeDetails.description}
            </p>
          </div>
        </div>
      </motion.div>
      {/* Left Panel - Controls */}
      <div className="w-full lg:w-[30%] flex flex-col h-full">
        <Card className="flex flex-col h-full shadow-sm overflow-hidden">
          {/* Header */}
          <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${typeDetails.lightBg} hidden lg:flex items-center gap-3`}>
            <div className={`w-10 h-10 rounded-full ${typeDetails.bgColor} flex items-center justify-center text-white shadow-md`}>
              {typeDetails.icon}
            </div>
            <div>
              <h2 className={`font-medium ${typeDetails.color}`}>
                {typeDetails.title}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {typeDetails.description}
              </p>
            </div>
          </div>
          {/* Content */}
          <div className="p-4 flex-grow overflow-y-auto">
            <AnimatePresence mode="wait">
              {isEditing ? <motion.div key="edit-panel" initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: -20
            }} className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className={`text-lg font-medium ${typeDetails.color}`}>
                      Edit {type.charAt(0).toUpperCase() + type.slice(1)}{' '}
                      Content
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="text-gray-500">
                      Cancel
                    </Button>
                  </div>
                  {editTools || <div className="text-center p-6">
                      <p className="text-gray-500 dark:text-gray-400">
                        Editing tools will appear here
                      </p>
                    </div>}
                </motion.div> : <motion.div key="generate-panel" initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: 20
            }} className="space-y-6">
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
                        <SparklesIcon size={12} />
                        {showSuggestions ? 'Hide suggestions' : 'Show suggestions'}
                      </button>
                    </div>
                    <div className="relative">
                      <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={promptPlaceholder} className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all ${typeDetails.ringColor}`} rows={4} />
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
                </motion.div>}
            </AnimatePresence>
          </div>
          {/* Footer */}
          <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-700">
            {isEditing ? <Button variant="primary" size="lg" leftIcon={<CheckIcon size={18} />} onClick={() => {
            setIsEditing(false);
            toast.success('Changes applied successfully');
          }} className={`w-full bg-gradient-to-r ${typeDetails.gradientFrom} ${typeDetails.gradientTo} ${typeDetails.hoverColor}`}>
                Apply Changes
              </Button> : <Button variant="primary" size="lg" leftIcon={isGenerating ? <Loader2Icon className="animate-spin" size={18} /> : <SparklesIcon size={18} />} onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className={`w-full bg-gradient-to-r ${typeDetails.gradientFrom} ${typeDetails.gradientTo} ${typeDetails.hoverColor} shadow-sm transition-all hover:shadow-md`}>
                {isGenerating ? 'Generating...' : `Generate ${type.charAt(0).toUpperCase() + type.slice(1)}`}
              </Button>}
          </div>
        </Card>
      </div>
      {/* Right Panel - Preview */}
      <div className="w-full lg:w-[70%] h-full">
        <Card className="h-full shadow-sm overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full ${typeDetails.lightBg} flex items-center justify-center mr-2`}>
                {typeDetails.icon}
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {type === 'text' && contentSubtype ? contentSubtypes?.find(t => t.value === contentSubtype)?.label || 'Generated Content' : 'Generated Content'}
              </h3>
            </div>
            <AnimatePresence>
              {generatedContent && !isGenerating && <motion.div initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -10
            }} className="flex items-center gap-2">
                  {type === 'text' && <Button variant="ghost" size="sm" leftIcon={copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />} onClick={handleCopy} className={copied ? typeDetails.color : ''}>
                      {copied ? 'Copied' : 'Copy'}
                    </Button>}
                  <Button variant="ghost" size="sm" leftIcon={<RefreshCwIcon size={14} />} onClick={() => onGenerate(prompt, {
                ...generationSettings,
                contentSubtype
              })} disabled={isGenerating}>
                    Regenerate
                  </Button>
                  <Button variant="ghost" size="sm" leftIcon={<EditIcon size={14} />} onClick={() => {
                setIsEditing(true);
                onEdit && onEdit(generatedContent);
              }}>
                    Edit
                  </Button>
                </motion.div>}
            </AnimatePresence>
          </div>
          {/* Preview Content */}
          <div className="flex-grow overflow-y-auto">
            {isGenerating ? renderLoadingState() : !generatedContent ? renderEmptyPreview() : <AnimatePresence>
                <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              duration: 0.3
            }}>
                  {previewContent || <div className="p-6 text-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        Preview content will appear here
                      </p>
                    </div>}
                </motion.div>
              </AnimatePresence>}
          </div>
          {/* Footer */}
          {!isGenerating && generatedContent && <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" leftIcon={<DownloadIcon size={14} />} onClick={() => onExport && onExport(generatedContent)}>
                Export
              </Button>
              <Button variant="outline" size="sm" leftIcon={<ShareIcon size={14} />} onClick={() => onShare && onShare(generatedContent)}>
                Share
              </Button>
              <Button variant="primary" size="sm" leftIcon={<SaveIcon size={14} />} onClick={() => onSave && onSave(generatedContent)} className={`bg-gradient-to-r ${typeDetails.gradientFrom} ${typeDetails.gradientTo}`}>
                Save
              </Button>
            </div>}
        </Card>
      </div>
    </div>;
};