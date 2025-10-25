import React, { useState } from 'react';
import { FileTextIcon, ImageIcon, VideoIcon, MicIcon, SearchIcon, RefreshCwIcon, ExpandIcon, ShrinkIcon, LanguagesIcon, ScanSearchIcon, RepeatIcon, SpellCheckIcon, MessageSquareIcon, SparklesIcon, WandIcon, ZoomInIcon, ScissorsIcon, ReplaceIcon, TypeIcon, UsersIcon, BoxIcon, PenToolIcon, AudioLinesIcon, Volume2Icon, MusicIcon, MicVocalIcon, SettingsIcon, SplitIcon, YoutubeIcon, CaptionsIcon, ChevronRightIcon, ChevronDownIcon, MenuIcon, XIcon, ChevronLeftIcon, PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
}
interface ToolCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  tools: Tool[];
}
interface ContentToolsSidebarProps {
  currentCategory: 'writing' | 'image' | 'audio' | 'video';
  selectedTool: string | null;
  onSelectTool: (toolId: string) => void;
  className?: string;
}
const allCategories: ToolCategory[] = [{
  id: 'writing',
  name: 'Writing Tools',
  icon: <FileTextIcon size={16} />,
  color: 'blue',
  tools: [{
    id: 'keyword-research',
    name: 'Keyword Research',
    description: 'Find trending keywords',
    icon: <SearchIcon size={16} />
  }, {
    id: 'content-generator',
    name: 'Content Generator',
    description: 'Generate original content',
    icon: <SparklesIcon size={16} />,
    badge: 'Popular'
  }, {
    id: 'rewriter',
    name: 'Rewriter',
    description: 'Rewrite content',
    icon: <RefreshCwIcon size={16} />
  }, {
    id: 'content-expander',
    name: 'Content Expander',
    description: 'Expand content',
    icon: <ExpandIcon size={16} />
  }, {
    id: 'content-shortener',
    name: 'Content Shortener',
    description: 'Condense content',
    icon: <ShrinkIcon size={16} />
  }, {
    id: 'content-translator',
    name: 'Content Translator',
    description: 'Translate content',
    icon: <LanguagesIcon size={16} />
  }, {
    id: 'content-detector',
    name: 'Content Detector',
    description: 'Detect AI content',
    icon: <ScanSearchIcon size={16} />
  }, {
    id: 'paraphraser',
    name: 'Paraphraser',
    description: 'Rephrase text',
    icon: <RepeatIcon size={16} />
  }, {
    id: 'summarizer',
    name: 'Summarizer',
    description: 'Create summaries',
    icon: <FileTextIcon size={16} />
  }, {
    id: 'grammar-checker',
    name: 'Grammar Checker',
    description: 'Fix grammar errors',
    icon: <SpellCheckIcon size={16} />
  }]
}, {
  id: 'image',
  name: 'Image Tools',
  icon: <ImageIcon size={16} />,
  color: 'purple',
  tools: [{
    id: 'chat-with-image',
    name: 'Chat with Image',
    description: 'Ask about images',
    icon: <MessageSquareIcon size={16} />
  }, {
    id: 'image-generator',
    name: 'Image Generator',
    description: 'Generate images',
    icon: <SparklesIcon size={16} />,
    badge: 'Popular'
  }, {
    id: 'image-to-image',
    name: 'Image to Image',
    description: 'Transform images',
    icon: <RefreshCwIcon size={16} />
  }, {
    id: 'image-to-prompt',
    name: 'Image to Prompt',
    description: 'Generate prompts',
    icon: <FileTextIcon size={16} />
  }, {
    id: 'image-variator',
    name: 'Image Variator',
    description: 'Create variations',
    icon: <WandIcon size={16} />
  }, {
    id: 'image-upscaler',
    name: 'Image Upscaler',
    description: 'Enhance resolution',
    icon: <ZoomInIcon size={16} />
  }, {
    id: 'image-extender',
    name: 'Image Extender',
    description: 'Extend images',
    icon: <ExpandIcon size={16} />
  }, {
    id: 'background-remover',
    name: 'Background Remover',
    description: 'Remove backgrounds',
    icon: <ScissorsIcon size={16} />
  }, {
    id: 'background-replacer',
    name: 'Background Replacer',
    description: 'Replace backgrounds',
    icon: <ReplaceIcon size={16} />
  }, {
    id: 'text-remover',
    name: 'Text Remover',
    description: 'Remove text',
    icon: <TypeIcon size={16} />
  }, {
    id: 'object-remover',
    name: 'Object Remover',
    description: 'Remove objects',
    icon: <ScissorsIcon size={16} />
  }, {
    id: 'search-and-replace',
    name: 'Search and Replace',
    description: 'Find and replace',
    icon: <SearchIcon size={16} />
  }, {
    id: 'image-mask-editor',
    name: 'Image Mask Editor',
    description: 'Edit image masks',
    icon: <div size={16} />
  }, {
    id: 'image-text-editor',
    name: 'Image Text Editor',
    description: 'Add text to images',
    icon: <TypeIcon size={16} />
  }, {
    id: 'face-swapper',
    name: 'Face Swapper',
    description: 'Swap faces',
    icon: <UsersIcon size={16} />
  }, {
    id: '3d-image-generator',
    name: '3D Image Generator',
    description: 'Generate 3D images',
    icon: <BoxIcon size={16} />
  }, {
    id: 'sketch-to-image',
    name: 'Sketch to Image',
    description: 'Convert sketches',
    icon: <PenToolIcon size={16} />
  }]
}, {
  id: 'audio',
  name: 'Audio Tools',
  icon: <MicIcon size={16} />,
  color: 'amber',
  tools: [{
    id: 'text-to-speech',
    name: 'Text to Speech',
    description: 'Convert text to speech',
    icon: <Volume2Icon size={16} />,
    badge: 'Popular'
  }, {
    id: 'text-to-sound',
    name: 'Text to Sound',
    description: 'Generate sound effects',
    icon: <AudioLinesIcon size={16} />
  }, {
    id: 'music-generator',
    name: 'Music Generator',
    description: 'Create music tracks',
    icon: <MusicIcon size={16} />
  }, {
    id: 'speech-to-text',
    name: 'Speech to Text',
    description: 'Transcribe audio',
    icon: <FileTextIcon size={16} />
  }, {
    id: 'voice-changer',
    name: 'Voice Changer',
    description: 'Modify voice',
    icon: <SettingsIcon size={16} />
  }, {
    id: 'voice-cloning',
    name: 'Voice Cloning',
    description: 'Clone voices',
    icon: <MicVocalIcon size={16} />
  }, {
    id: 'voice-design',
    name: 'Voice Design',
    description: 'Design voice profiles',
    icon: <WandIcon size={16} />
  }, {
    id: 'voice-isolator',
    name: 'Voice Isolator',
    description: 'Isolate vocals',
    icon: <SplitIcon size={16} />
  }, {
    id: 'audio-translator',
    name: 'Audio Translator',
    description: 'Translate audio',
    icon: <LanguagesIcon size={16} />
  }]
}, {
  id: 'video',
  name: 'Video Tools',
  icon: <VideoIcon size={16} />,
  color: 'rose',
  tools: [{
    id: 'text-to-video',
    name: 'Text to Video',
    description: 'Generate videos',
    icon: <SparklesIcon size={16} />,
    badge: 'Popular'
  }, {
    id: 'image-to-video',
    name: 'Image to Video',
    description: 'Animate images',
    icon: <VideoIcon size={16} />
  }, {
    id: 'youtube-summarizer',
    name: 'YouTube Summarizer',
    description: 'Summarize videos',
    icon: <YoutubeIcon size={16} />
  }, {
    id: 'youtube-transcriber',
    name: 'YouTube Transcriber',
    description: 'Transcribe videos',
    icon: <FileTextIcon size={16} />
  }, {
    id: 'youtube-translator',
    name: 'YouTube Translator',
    description: 'Translate videos',
    icon: <LanguagesIcon size={16} />
  }, {
    id: 'chat-with-youtube',
    name: 'Chat With YouTube',
    description: 'Ask about videos',
    icon: <MessageSquareIcon size={16} />
  }, {
    id: 'captions-generator',
    name: 'Captions Generator',
    description: 'Generate captions',
    icon: <CaptionsIcon size={16} />
  }, {
    id: 'video-face-swap',
    name: 'Video Face Swap',
    description: 'Swap faces in video',
    icon: <UsersIcon size={16} />
  }]
}];
export const ContentToolsSidebar: React.FC<ContentToolsSidebarProps> = ({
  currentCategory,
  selectedTool,
  onSelectTool,
  className
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([currentCategory]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]);
  };
  const handleToolSelect = (toolId: string) => {
    onSelectTool(toolId);
    setIsMobileOpen(false);
  };
  const getCategoryColorClasses = (color: string) => {
    const colors: Record<string, any> = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800',
        hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/30'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800',
        hover: 'hover:bg-purple-100 dark:hover:bg-purple-900/30'
      },
      amber: {
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        text: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-800',
        hover: 'hover:bg-amber-100 dark:hover:bg-amber-900/30'
      },
      rose: {
        bg: 'bg-rose-50 dark:bg-rose-900/20',
        text: 'text-rose-600 dark:text-rose-400',
        border: 'border-rose-200 dark:border-rose-800',
        hover: 'hover:bg-rose-100 dark:hover:bg-rose-900/30'
      }
    };
    return colors[color] || colors.blue;
  };
  const sidebarContent = <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className={cn('transition-all duration-300', isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100')}>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white whitespace-nowrap">
            AI Tools
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 whitespace-nowrap">
            Select a tool to get started
          </p>
        </div>
        {/* Desktop collapse button */}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200" aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {isCollapsed ? <PanelLeftOpenIcon size={18} className="text-gray-600 dark:text-gray-400" /> : <PanelLeftCloseIcon size={18} className="text-gray-600 dark:text-gray-400" />}
        </button>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {allCategories.map(category => {
        const isExpanded = expandedCategories.includes(category.id);
        const isCurrentCategory = category.id === currentCategory;
        const colors = getCategoryColorClasses(category.color);
        return <div key={category.id} className="space-y-1">
              <button onClick={() => toggleCategory(category.id)} className={cn('w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors duration-200', isCurrentCategory ? `${colors.bg} ${colors.text}` : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800')} title={isCollapsed ? category.name : undefined}>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex-shrink-0">{category.icon}</div>
                  <span className={cn('text-sm font-medium transition-all duration-300 whitespace-nowrap', isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100')}>
                    {category.name}
                  </span>
                </div>
                <ChevronRightIcon size={14} className={cn('transition-all duration-300 flex-shrink-0', isExpanded && 'rotate-90', isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100')} />
              </button>
              {/* Tools list */}
              {isExpanded && !isCollapsed && <div className="ml-4 pl-3 border-l-2 border-gray-200 dark:border-gray-700 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  {category.tools.map(tool => {
              const isSelected = selectedTool === tool.id;
              return <button key={tool.id} onClick={() => handleToolSelect(tool.id)} className={cn('w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200', isSelected ? `${colors.bg} ${colors.text} shadow-sm` : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50')}>
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className={cn('flex-shrink-0', isSelected && colors.text)}>
                            {tool.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {tool.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                        {tool.badge && <span className="ml-2 px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 flex-shrink-0">
                            {tool.badge}
                          </span>}
                      </button>;
            })}
                </div>}
            </div>;
      })}
      </div>
    </div>;
  return <>
      {/* Mobile Toggle Button */}
      <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="lg:hidden fixed bottom-4 left-4 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#3FE0A5] to-emerald-400 text-white shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-200 active:scale-95" aria-label="Toggle menu">
        {isMobileOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
      </button>
      {/* Mobile Backdrop */}
      {isMobileOpen && <div className="lg:hidden fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-200" onClick={() => setIsMobileOpen(false)} />}
      {/* Sidebar */}
      <div className={cn('fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg lg:shadow-none z-40 transition-all duration-300 ease-in-out',
    // Mobile behavior
    'lg:translate-x-0', isMobileOpen ? 'translate-x-0' : '-translate-x-full',
    // Desktop collapse behavior
    isCollapsed ? 'lg:w-16' : 'lg:w-80',
    // Mobile width
    'w-80', className)}>
        {sidebarContent}
      </div>
      {/* Collapsed sidebar tooltip on hover (desktop only) */}
      {isCollapsed && <style>{`
          @media (min-width: 1024px) {
            .lg\\:w-16:hover {
              width: 20rem !important;
            }
            .lg\\:w-16:hover .opacity-0 {
              opacity: 1 !important;
              width: auto !important;
            }
          }
        `}</style>}
    </>;
};