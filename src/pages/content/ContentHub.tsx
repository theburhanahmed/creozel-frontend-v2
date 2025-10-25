import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentToolsSidebar } from '../../components/content/ContentToolsSidebar';
import { Card } from '../../components/ui/Card';
import { FileTextIcon, ImageIcon, VideoIcon, MicIcon, SparklesIcon, ArrowRightIcon, ArrowLeftIcon } from 'lucide-react';
export const ContentHub = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showToolsIndicator, setShowToolsIndicator] = useState(true);
  const navigate = useNavigate();
  // Hide the tools indicator after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToolsIndicator(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    setShowToolsIndicator(false);
    // Determine which category the tool belongs to and navigate
    const toolCategories = {
      // Writing tools
      'keyword-research': '/content/text',
      'content-generator': '/content/text',
      rewriter: '/content/text',
      'content-expander': '/content/text',
      'content-shortener': '/content/text',
      'content-translator': '/content/text',
      'content-detector': '/content/text',
      paraphraser: '/content/text',
      summarizer: '/content/text',
      'grammar-checker': '/content/text',
      // Image tools
      'chat-with-image': '/content/image',
      'image-generator': '/content/image',
      'image-to-image': '/content/image',
      'image-to-prompt': '/content/image',
      'image-variator': '/content/image',
      'image-upscaler': '/content/image',
      'image-extender': '/content/image',
      'background-remover': '/content/image',
      'background-replacer': '/content/image',
      'text-remover': '/content/image',
      'object-remover': '/content/image',
      'search-and-replace': '/content/image',
      'image-mask-editor': '/content/image',
      'image-text-editor': '/content/image',
      'face-swapper': '/content/image',
      '3d-image-generator': '/content/image',
      'sketch-to-image': '/content/image',
      // Audio tools
      'text-to-speech': '/content/audio',
      'text-to-sound': '/content/audio',
      'music-generator': '/content/audio',
      'speech-to-text': '/content/audio',
      'voice-changer': '/content/audio',
      'voice-cloning': '/content/audio',
      'voice-design': '/content/audio',
      'voice-isolator': '/content/audio',
      'audio-translator': '/content/audio',
      // Video tools
      'text-to-video': '/content/video',
      'image-to-video': '/content/video',
      'youtube-summarizer': '/content/video',
      'youtube-transcriber': '/content/video',
      'youtube-translator': '/content/video',
      'chat-with-youtube': '/content/video',
      'captions-generator': '/content/video',
      'video-face-swap': '/content/video'
    };
    const targetPath = toolCategories[toolId];
    if (targetPath) {
      navigate(targetPath, {
        state: {
          selectedTool: toolId
        }
      });
    }
  };
  const contentCategories = [{
    icon: <FileTextIcon size={32} />,
    title: 'Text Content',
    description: 'Generate, edit, and optimize text content with AI',
    color: 'from-blue-500 to-cyan-500',
    toolCount: 10,
    href: '/content/text'
  }, {
    icon: <ImageIcon size={32} />,
    title: 'Image Content',
    description: 'Create and edit images with advanced AI tools',
    color: 'from-purple-500 to-pink-500',
    toolCount: 17,
    href: '/content/image'
  }, {
    icon: <VideoIcon size={32} />,
    title: 'Video Content',
    description: 'Generate and edit videos with AI assistance',
    color: 'from-rose-500 to-red-600',
    toolCount: 8,
    href: '/content/video'
  }, {
    icon: <MicIcon size={32} />,
    title: 'Audio Content',
    description: 'Text-to-speech, music generation, and audio editing',
    color: 'from-amber-500 to-orange-600',
    toolCount: 9,
    href: '/content/audio'
  }];
  return <div className="flex gap-6 h-[calc(100vh-8rem)] relative">
      <ContentToolsSidebar currentCategory="writing" selectedTool={selectedTool} onSelectTool={handleToolSelect} />
      {/* Tools Indicator - appears on initial load */}
      {showToolsIndicator && <div className="hidden lg:block absolute left-[21rem] top-8 z-50 animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="relative">
            {/* Arrow pointing to sidebar */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2">
              <ArrowLeftIcon size={24} className="text-[#3FE0A5] animate-pulse" />
            </div>
            {/* Message bubble */}
            <div className="bg-gradient-to-r from-[#3FE0A5] to-emerald-400 text-white px-6 py-3 rounded-xl shadow-lg">
              <p className="font-semibold text-sm whitespace-nowrap flex items-center gap-2">
                <SparklesIcon size={16} />
                Here are your AI tools!
              </p>
              <p className="text-xs mt-1 opacity-90">
                Select a tool from the sidebar to get started
              </p>
            </div>
            {/* Close button */}
            <button onClick={() => setShowToolsIndicator(false)} className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-md hover:shadow-lg transition-all duration-200" aria-label="Close">
              <span className="text-xs">×</span>
            </button>
          </div>
        </div>}
      <div className="flex-1 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
            <SparklesIcon size={32} className="text-[#3FE0A5]" />
            AI Content Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Select a tool from the sidebar or choose a content category below to
            get started
          </p>
        </div>
        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contentCategories.map(category => <Card key={category.title} className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700" onClick={() => navigate(category.href)}>
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    {category.icon}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">
                      {category.toolCount} tools
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#3FE0A5] transition-colors duration-200">
                  {category.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center gap-2 text-[#3FE0A5] font-medium group-hover:gap-3 transition-all duration-200">
                  <span>Explore tools</span>
                  <ArrowRightIcon size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </Card>)}
        </div>
        {/* Quick Start Section */}
        <Card className="mt-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <SparklesIcon size={24} className="text-[#3FE0A5]" />
              Quick Start Guide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3FE0A5]/10 flex items-center justify-center text-[#3FE0A5] font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Select a Tool
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Choose from our comprehensive library of AI tools in the
                    sidebar
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3FE0A5]/10 flex items-center justify-center text-[#3FE0A5] font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Configure Settings
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Customize parameters to match your specific requirements
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3FE0A5]/10 flex items-center justify-center text-[#3FE0A5] font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Generate & Export
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Create your content and download or save it to your library
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>;
};