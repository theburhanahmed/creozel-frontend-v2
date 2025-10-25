import React from 'react';
import { Card } from '../ui/Card';
import { FileTextIcon, ImageIcon, VideoIcon, MicIcon, FileIcon, SearchIcon, RefreshCwIcon, ExpandIcon, ShrinkIcon, LanguagesIcon, ScanSearchIcon, RepeatIcon, SpellCheckIcon, MessageSquareIcon, SparklesIcon, WandIcon, ZoomInIcon, ScissorsIcon, ReplaceIcon, TypeIcon, UsersIcon, BoxIcon, PenToolIcon, AudioLinesIcon, Volume2Icon, MusicIcon, MicVocalIcon, SettingsIcon, SplitIcon, YoutubeIcon, CaptionsIcon } from 'lucide-react';
interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  badge?: string;
}
interface ToolSelectorProps {
  category: 'writing' | 'image' | 'document' | 'audio' | 'video';
  onSelectTool: (toolId: string) => void;
  selectedTool?: string;
}
export const ToolSelector: React.FC<ToolSelectorProps> = ({
  category,
  onSelectTool,
  selectedTool
}) => {
  const tools: Record<string, Tool[]> = {
    writing: [{
      id: 'keyword-research',
      name: 'Keyword Research',
      description: 'Find trending keywords and search terms',
      icon: <SearchIcon size={20} />,
      category: 'writing'
    }, {
      id: 'content-generator',
      name: 'Content Generator',
      description: 'Generate original content from scratch',
      icon: <SparklesIcon size={20} />,
      category: 'writing',
      badge: 'Popular'
    }, {
      id: 'rewriter',
      name: 'Rewriter',
      description: 'Rewrite content in different styles',
      icon: <RefreshCwIcon size={20} />,
      category: 'writing'
    }, {
      id: 'content-expander',
      name: 'Content Expander',
      description: 'Expand and elaborate on your content',
      icon: <ExpandIcon size={20} />,
      category: 'writing'
    }, {
      id: 'content-shortener',
      name: 'Content Shortener',
      description: 'Condense content while keeping key points',
      icon: <ShrinkIcon size={20} />,
      category: 'writing'
    }, {
      id: 'content-translator',
      name: 'Content Translator',
      description: 'Translate content to multiple languages',
      icon: <LanguagesIcon size={20} />,
      category: 'writing'
    }, {
      id: 'content-detector',
      name: 'Content Detector',
      description: 'Detect AI-generated content',
      icon: <ScanSearchIcon size={20} />,
      category: 'writing'
    }, {
      id: 'paraphraser',
      name: 'Paraphraser',
      description: 'Rephrase text while maintaining meaning',
      icon: <RepeatIcon size={20} />,
      category: 'writing'
    }, {
      id: 'summarizer',
      name: 'Summarizer',
      description: 'Create concise summaries of long content',
      icon: <FileTextIcon size={20} />,
      category: 'writing'
    }, {
      id: 'grammar-checker',
      name: 'Grammar Checker',
      description: 'Check and fix grammar errors',
      icon: <SpellCheckIcon size={20} />,
      category: 'writing'
    }],
    image: [{
      id: 'chat-with-image',
      name: 'Chat with Image',
      description: 'Ask questions about any image',
      icon: <MessageSquareIcon size={20} />,
      category: 'image'
    }, {
      id: 'image-generator',
      name: 'Image Generator',
      description: 'Generate images from text descriptions',
      icon: <SparklesIcon size={20} />,
      category: 'image',
      badge: 'Popular'
    }, {
      id: 'image-to-image',
      name: 'Image to Image',
      description: 'Transform images using AI',
      icon: <RefreshCwIcon size={20} />,
      category: 'image'
    }, {
      id: 'image-to-prompt',
      name: 'Image to Prompt',
      description: 'Generate prompts from images',
      icon: <FileTextIcon size={20} />,
      category: 'image'
    }, {
      id: 'image-variator',
      name: 'Image Variator',
      description: 'Create variations of existing images',
      icon: <WandIcon size={20} />,
      category: 'image'
    }, {
      id: 'image-upscaler',
      name: 'Image Upscaler',
      description: 'Enhance image resolution and quality',
      icon: <ZoomInIcon size={20} />,
      category: 'image'
    }, {
      id: 'image-extender',
      name: 'Image Extender',
      description: 'Extend images beyond their borders',
      icon: <ExpandIcon size={20} />,
      category: 'image'
    }, {
      id: 'background-remover',
      name: 'Background Remover',
      description: 'Remove backgrounds from images',
      icon: <ScissorsIcon size={20} />,
      category: 'image'
    }, {
      id: 'background-replacer',
      name: 'Background Replacer',
      description: 'Replace image backgrounds',
      icon: <ReplaceIcon size={20} />,
      category: 'image'
    }, {
      id: 'text-remover',
      name: 'Text Remover',
      description: 'Remove text from images',
      icon: <TypeIcon size={20} />,
      category: 'image'
    }, {
      id: 'object-remover',
      name: 'Object Remover',
      description: 'Remove unwanted objects from images',
      icon: <ScissorsIcon size={20} />,
      category: 'image'
    }, {
      id: 'search-and-replace',
      name: 'Search and Replace',
      description: 'Find and replace elements in images',
      icon: <SearchIcon size={20} />,
      category: 'image'
    }, {
      id: 'image-mask-editor',
      name: 'Image Mask Editor',
      description: 'Create and edit image masks',
      icon: <div size={20} />,
      category: 'image'
    }, {
      id: 'image-text-editor',
      name: 'Image Text Editor',
      description: 'Add and edit text on images',
      icon: <TypeIcon size={20} />,
      category: 'image'
    }, {
      id: 'face-swapper',
      name: 'Face Swapper',
      description: 'Swap faces in images',
      icon: <UsersIcon size={20} />,
      category: 'image'
    }, {
      id: '3d-image-generator',
      name: '3D Image Generator',
      description: 'Generate 3D images and models',
      icon: <BoxIcon size={20} />,
      category: 'image'
    }, {
      id: 'sketch-to-image',
      name: 'Sketch to Image',
      description: 'Convert sketches to realistic images',
      icon: <PenToolIcon size={20} />,
      category: 'image'
    }],
    document: [{
      id: 'document-analyzer',
      name: 'Document Analyzer',
      description: 'Analyze and extract insights from documents',
      icon: <FileIcon size={20} />,
      category: 'document',
      badge: 'Coming Soon'
    }, {
      id: 'document-summarizer',
      name: 'Document Summarizer',
      description: 'Summarize long documents',
      icon: <FileTextIcon size={20} />,
      category: 'document',
      badge: 'Coming Soon'
    }, {
      id: 'document-translator',
      name: 'Document Translator',
      description: 'Translate entire documents',
      icon: <LanguagesIcon size={20} />,
      category: 'document',
      badge: 'Coming Soon'
    }],
    audio: [{
      id: 'text-to-speech',
      name: 'Text to Speech',
      description: 'Convert text into natural speech',
      icon: <Volume2Icon size={20} />,
      category: 'audio',
      badge: 'Popular'
    }, {
      id: 'text-to-sound',
      name: 'Text to Sound',
      description: 'Generate sound effects from text',
      icon: <AudioLinesIcon size={20} />,
      category: 'audio'
    }, {
      id: 'music-generator',
      name: 'Music Generator',
      description: 'Create original music tracks',
      icon: <MusicIcon size={20} />,
      category: 'audio'
    }, {
      id: 'speech-to-text',
      name: 'Speech to Text',
      description: 'Transcribe audio to text',
      icon: <FileTextIcon size={20} />,
      category: 'audio'
    }, {
      id: 'voice-changer',
      name: 'Voice Changer',
      description: 'Modify voice characteristics',
      icon: <SettingsIcon size={20} />,
      category: 'audio'
    }, {
      id: 'voice-cloning',
      name: 'Voice Cloning',
      description: 'Clone voices from samples',
      icon: <MicVocalIcon size={20} />,
      category: 'audio'
    }, {
      id: 'voice-design',
      name: 'Voice Design',
      description: 'Design custom voice profiles',
      icon: <WandIcon size={20} />,
      category: 'audio'
    }, {
      id: 'voice-isolator',
      name: 'Voice Isolator',
      description: 'Isolate vocals from audio',
      icon: <SplitIcon size={20} />,
      category: 'audio'
    }, {
      id: 'audio-translator',
      name: 'Audio Translator',
      description: 'Translate audio to different languages',
      icon: <LanguagesIcon size={20} />,
      category: 'audio'
    }],
    video: [{
      id: 'text-to-video',
      name: 'Text to Video',
      description: 'Generate videos from text descriptions',
      icon: <SparklesIcon size={20} />,
      category: 'video',
      badge: 'Popular'
    }, {
      id: 'image-to-video',
      name: 'Image to Video',
      description: 'Animate images into videos',
      icon: <VideoIcon size={20} />,
      category: 'video'
    }, {
      id: 'youtube-summarizer',
      name: 'YouTube Summarizer',
      description: 'Summarize YouTube videos',
      icon: <YoutubeIcon size={20} />,
      category: 'video'
    }, {
      id: 'youtube-transcriber',
      name: 'YouTube Transcriber',
      description: 'Transcribe YouTube videos to text',
      icon: <FileTextIcon size={20} />,
      category: 'video'
    }, {
      id: 'youtube-translator',
      name: 'YouTube Translator',
      description: 'Translate YouTube videos',
      icon: <LanguagesIcon size={20} />,
      category: 'video'
    }, {
      id: 'chat-with-youtube',
      name: 'Chat With YouTube Video',
      description: 'Ask questions about YouTube videos',
      icon: <MessageSquareIcon size={20} />,
      category: 'video'
    }, {
      id: 'captions-generator',
      name: 'Captions Generator',
      description: 'Generate captions for videos',
      icon: <CaptionsIcon size={20} />,
      category: 'video'
    }, {
      id: 'video-face-swap',
      name: 'Video Face Swap',
      description: 'Swap faces in videos',
      icon: <UsersIcon size={20} />,
      category: 'video'
    }]
  };
  const categoryTools = tools[category] || [];
  const getCategoryColor = () => {
    switch (category) {
      case 'writing':
        return {
          gradient: 'from-blue-500 to-indigo-600',
          light: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          text: 'text-blue-600 dark:text-blue-400',
          hover: 'hover:border-blue-300 dark:hover:border-blue-700',
          ring: 'ring-blue-500/20',
          shadow: 'shadow-blue-500/10'
        };
      case 'image':
        return {
          gradient: 'from-purple-500 to-pink-600',
          light: 'bg-purple-50 dark:bg-purple-900/20',
          border: 'border-purple-200 dark:border-purple-800',
          text: 'text-purple-600 dark:text-purple-400',
          hover: 'hover:border-purple-300 dark:hover:border-purple-700',
          ring: 'ring-purple-500/20',
          shadow: 'shadow-purple-500/10'
        };
      case 'document':
        return {
          gradient: 'from-emerald-500 to-teal-600',
          light: 'bg-emerald-50 dark:bg-emerald-900/20',
          border: 'border-emerald-200 dark:border-emerald-800',
          text: 'text-emerald-600 dark:text-emerald-400',
          hover: 'hover:border-emerald-300 dark:hover:border-emerald-700',
          ring: 'ring-emerald-500/20',
          shadow: 'shadow-emerald-500/10'
        };
      case 'audio':
        return {
          gradient: 'from-amber-500 to-orange-600',
          light: 'bg-amber-50 dark:bg-amber-900/20',
          border: 'border-amber-200 dark:border-amber-800',
          text: 'text-amber-600 dark:text-amber-400',
          hover: 'hover:border-amber-300 dark:hover:border-amber-700',
          ring: 'ring-amber-500/20',
          shadow: 'shadow-amber-500/10'
        };
      case 'video':
        return {
          gradient: 'from-rose-500 to-red-600',
          light: 'bg-rose-50 dark:bg-rose-900/20',
          border: 'border-rose-200 dark:border-rose-800',
          text: 'text-rose-600 dark:text-rose-400',
          hover: 'hover:border-rose-300 dark:hover:border-rose-700',
          ring: 'ring-rose-500/20',
          shadow: 'shadow-rose-500/10'
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          light: 'bg-gray-50 dark:bg-gray-900/20',
          border: 'border-gray-200 dark:border-gray-800',
          text: 'text-gray-600 dark:text-gray-400',
          hover: 'hover:border-gray-300 dark:hover:border-gray-700',
          ring: 'ring-gray-500/20',
          shadow: 'shadow-gray-500/10'
        };
    }
  };
  const colors = getCategoryColor();
  return <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-xl ${colors.shadow} animate-in zoom-in duration-300`}>
            {category === 'writing' && <FileTextIcon size={28} className="text-white" />}
            {category === 'image' && <ImageIcon size={28} className="text-white" />}
            {category === 'document' && <FileIcon size={28} className="text-white" />}
            {category === 'audio' && <MicIcon size={28} className="text-white" />}
            {category === 'video' && <VideoIcon size={28} className="text-white" />}
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Choose Your AI Tool
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Select from our comprehensive suite of AI-powered tools to create
          amazing content
        </p>
      </div>
      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {categoryTools.map(tool => <button key={tool.id} onClick={() => onSelectTool(tool.id)} className={`
              group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left
              transform hover:scale-[1.02] active:scale-[0.98]
              ${selectedTool === tool.id ? `${colors.border} ${colors.light} shadow-xl ${colors.shadow} ring-4 ${colors.ring}` : `border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg ${colors.hover}`}
            `}>
            {/* Badge */}
            {tool.badge && <div className={`
                absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold
                shadow-sm transition-all duration-300 group-hover:scale-110
                ${tool.badge === 'Popular' ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-amber-500/20' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}
              `}>
                {tool.badge}
              </div>}
            {/* Icon Container */}
            <div className={`
              w-14 h-14 rounded-xl ${colors.light} flex items-center justify-center mb-5
              ${colors.text} transition-all duration-300
              group-hover:scale-110 group-hover:rotate-3
              ${selectedTool === tool.id ? 'scale-110' : ''}
            `}>
              {tool.icon}
            </div>
            {/* Content */}
            <div className="space-y-2 pr-2">
              <h3 className="font-bold text-base text-gray-900 dark:text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                {tool.description}
              </p>
            </div>
            {/* Selected Indicator */}
            {selectedTool === tool.id && <div className={`
                absolute bottom-4 right-4 w-8 h-8 rounded-full 
                bg-gradient-to-r ${colors.gradient} 
                flex items-center justify-center shadow-lg ${colors.shadow}
                animate-in zoom-in duration-200
              `}>
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>}
            {/* Hover Effect Overlay */}
            <div className={`
              absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
              transition-opacity duration-300 pointer-events-none
              bg-gradient-to-br ${colors.gradient} mix-blend-overlay
            `} style={{
          opacity: 0.03
        }} />
          </button>)}
      </div>
      {/* Helper Text */}
      {categoryTools.length === 0 && <div className="text-center py-16">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <SparklesIcon size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No tools available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Tools for this category are coming soon!
          </p>
        </div>}
      {/* Category Info */}
      <div className={`
        p-6 rounded-2xl border-2 ${colors.border} ${colors.light}
        transition-all duration-300
      `}>
        <div className="flex items-start gap-4">
          <div className={`
            w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} 
            flex items-center justify-center flex-shrink-0 shadow-lg ${colors.shadow}
          `}>
            <SparklesIcon size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Pro Tip
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {category === 'writing' && 'Start with keyword research to find trending topics, then use the content generator to create engaging articles.'}
              {category === 'image' && 'Use image-to-image transformation to create variations of your designs, or try the background remover for clean product photos.'}
              {category === 'document' && 'Document tools help you analyze, summarize, and translate large documents efficiently.'}
              {category === 'audio' && 'Convert your text to natural-sounding speech, or create custom music tracks for your content.'}
              {category === 'video' && 'Generate videos from text descriptions or animate your images into engaging video content.'}
            </p>
          </div>
        </div>
      </div>
    </div>;
};