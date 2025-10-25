import React, { useEffect, useState, Fragment } from 'react';
import { FormatSpecificEditor } from '../../components/autopilot/FormatSpecificEditor';
import { GeneratedOutputPreview } from '../../components/autopilot/GeneratedOutputPreview';
import { ContentFormatSelector } from '../../components/autopilot/ContentFormatSelector';
import { SmartOptimizerSidebar } from '../../components/autopilot/SmartOptimizerSidebar';
import { PlatformScheduler } from '../../components/autopilot/PlatformScheduler';
import { SlideEditor } from '../../components/autopilot/SlideEditor';
import { Card } from '../../components/ui/Card';
import { Tabs } from '../../components/ui/Tabs';
import { Button } from '../../components/ui/Button';
import { SmartContentIdeas } from '../../components/autopilot/SmartContentIdeas';
import { ContentEngineOrb } from '../../components/3d/ContentEngineOrb';
import { LayoutIcon, FileTextIcon, VideoIcon, ImageIcon, BookOpenIcon, MailIcon, PlusIcon, UsersIcon, SparklesIcon, ArrowRightIcon, CheckCircleIcon, ArrowLeftIcon, InfoIcon, HelpCircleIcon, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
export const CreatePipeline = () => {
  // Add necessary state variables
  const [activeTab, setActiveTab] = useState('format');
  const [selectedContentFormat, setSelectedContentFormat] = useState('');
  const [showContentIdeas, setShowContentIdeas] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showSmartOptimizer, setShowSmartOptimizer] = useState(true);
  const [showSlideEditor, setShowSlideEditor] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    hashtags: [],
    caption: '',
    backgroundMusic: null,
    thumbnail: '',
    slides: []
    // Format-specific fields will be added dynamically
  });
  const [scheduleData, setScheduleData] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  // Ensure the form loads properly
  useEffect(() => {
    setIsFormLoaded(true);
  }, []);
  // Effect to reset generation state when format changes
  useEffect(() => {
    if (selectedContentFormat) {
      setIsGenerated(false);
      setShowSlideEditor(false);
    }
  }, [selectedContentFormat]);
  // Define tabs for the component
  const tabs = [{
    id: 'format',
    label: 'Content Format'
  }, {
    id: 'basic',
    label: 'Basic Information'
  }, {
    id: 'content',
    label: 'Content'
  }, {
    id: 'slides',
    label: 'Slide Editor'
  }, {
    id: 'platforms',
    label: 'Platforms'
  }, {
    id: 'schedule',
    label: 'Schedule'
  }, {
    id: 'monetization',
    label: 'Monetization'
  }, {
    id: 'advanced',
    label: 'Advanced'
  }];
  // Content format definitions with icons
  const contentFormats = [{
    id: 'short-video',
    name: 'Short Video',
    icon: <VideoIcon size={24} />,
    description: 'Create engaging short-form videos for social media',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
    color: 'from-orange-500 to-amber-500'
  }, {
    id: 'long-video',
    name: 'Long-form Video',
    icon: <VideoIcon size={24} />,
    description: 'Create in-depth video content',
    platforms: ['YouTube', 'Vimeo'],
    color: 'from-red-500 to-rose-500'
  }, {
    id: 'image-post',
    name: 'Image Post',
    icon: <ImageIcon size={24} />,
    description: 'Design eye-catching social media images',
    platforms: ['Instagram', 'Pinterest', 'Twitter'],
    color: 'from-purple-500 to-pink-500'
  }, {
    id: 'carousel',
    name: 'Carousel',
    icon: <LayoutIcon size={24} />,
    description: 'Create swipeable multi-image posts',
    platforms: ['Instagram', 'LinkedIn'],
    color: 'from-blue-500 to-indigo-500'
  }, {
    id: 'story',
    name: 'Story',
    icon: <BookOpenIcon size={24} />,
    description: 'Design engaging story content',
    platforms: ['Instagram', 'Facebook'],
    color: 'from-indigo-500 to-violet-500'
  }, {
    id: 'blog-post',
    name: 'Blog Post',
    icon: <FileTextIcon size={24} />,
    description: 'Write SEO-optimized blog content',
    platforms: ['Medium', 'WordPress'],
    color: 'from-emerald-500 to-teal-500'
  }, {
    id: 'email-newsletter',
    name: 'Email Newsletter',
    icon: <MailIcon size={24} />,
    description: 'Create engaging email campaigns',
    platforms: ['Email'],
    color: 'from-cyan-500 to-blue-500'
  }];
  // Handle format selection
  const handleFormatSelect = (formatId: string) => {
    setSelectedContentFormat(formatId);
    setActiveTab('basic'); // Move to basic info after format selection
    setCompletedSteps(prev => [...prev, 'format']);
    toast.success('Format selected', {
      description: `Selected ${contentFormats.find(f => f.id === formatId)?.name}`
    });
  };
  // Handle format-specific data updates
  const handleFormatDataUpdate = (data: any) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };
  // Handle content generation
  const handleGenerateContent = () => {
    if (!selectedContentFormat) {
      toast.error('Please select a content format first');
      return;
    }
    setIsGenerating(true);
    // Simulate AI content generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      setCompletedSteps(prev => [...prev, 'content']);
      toast.success('Content generated successfully', {
        description: 'Your content has been created based on your inputs.'
      });
      // For carousel and story formats, show the slide editor next
      if (['carousel', 'story'].includes(selectedContentFormat)) {
        setShowSlideEditor(true);
      }
    }, 2000);
  };
  // Handle selecting content ideas
  const handleSelectIdea = (idea: any) => {
    setShowContentIdeas(false);
    setFormData(prev => ({
      ...prev,
      title: idea.title || prev.title,
      description: idea.description || prev.description
    }));
    toast.success('Content idea selected', {
      description: 'The selected idea has been added to your pipeline'
    });
  };
  // Preview handlers
  const handleEditContent = () => {
    setIsGenerated(false);
    toast.info('Editing content', {
      description: 'Opening content editor for modifications'
    });
  };
  const handleRegenerateContent = () => {
    setIsGenerating(true);
    // Simulate regeneration
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      toast.success('Content regenerated', {
        description: 'Your content has been updated with new variations'
      });
    }, 1500);
  };
  const handleScheduleContent = () => {
    // For carousel and story, show slide editor first
    if (['carousel', 'story'].includes(selectedContentFormat) && !completedSteps.includes('slides')) {
      setActiveTab('slides');
      setShowSlideEditor(true);
      toast.info('Edit your slides', {
        description: 'Configure each slide before scheduling'
      });
    } else {
      setActiveTab('schedule');
      toast.success('Proceeding to schedule', {
        description: 'Configure when and where to publish your content'
      });
    }
  };
  // Handle scheduling
  const handleSchedule = (data: any) => {
    setScheduleData(data);
    setCompletedSteps(prev => [...prev, 'schedule']);
    toast.success('Content scheduled successfully', {
      description: data.mode === 'auto' ? 'Your content will be automatically posted according to your schedule' : 'Your content has been added to your publishing schedule'
    });
    // Move to next tab
    setActiveTab('monetization');
  };
  // Handle saving basic info
  const handleSaveBasicInfo = () => {
    if (!formData.title || !formData.description) {
      toast.error('Please complete all required fields', {
        description: 'Title and description are required'
      });
      return;
    }
    setCompletedSteps(prev => [...prev, 'basic']);
    setActiveTab('content');
    toast.success('Basic information saved', {
      description: 'Your pipeline information has been saved'
    });
  };
  // Handle slide editor updates
  const handleSlideUpdate = (slides: any[]) => {
    setFormData(prev => ({
      ...prev,
      slides
    }));
  };
  // Handle completing slide editing
  const handleSlideEditComplete = () => {
    setCompletedSteps(prev => [...prev, 'slides']);
    setActiveTab('platforms');
    toast.success('Slides saved successfully', {
      description: 'Your slides have been configured and are ready to publish'
    });
  };
  // Handle final pipeline creation
  const handleCreatePipeline = () => {
    toast.success('Pipeline created successfully!', {
      description: 'Your content pipeline is now set up and ready to go'
    });
    // In a real app, this would navigate to the pipeline dashboard
    setTimeout(() => {
      window.location.href = '/autopilot';
    }, 1500);
  };
  // Handle applying AI suggestions from Smart Optimizer
  const handleApplySuggestion = (type: string, value: any) => {
    let message = '';
    switch (type) {
      case 'title':
        setFormData(prev => ({
          ...prev,
          title: value
        }));
        message = 'Optimized title applied';
        break;
      case 'hashtags':
        setFormData(prev => ({
          ...prev,
          hashtags: value
        }));
        message = 'Trending hashtags applied';
        break;
      case 'caption':
        setFormData(prev => ({
          ...prev,
          caption: value
        }));
        message = 'Viral caption applied';
        break;
      case 'music':
        setFormData(prev => ({
          ...prev,
          backgroundMusic: value
        }));
        message = `Background track "${value.name}" applied`;
        break;
      case 'thumbnail':
        setFormData(prev => ({
          ...prev,
          thumbnail: value
        }));
        message = 'AI-generated thumbnail applied';
        break;
      case 'generateThumbnail':
        message = 'Generating more thumbnail options';
        break;
    }
    toast.success('Smart optimization applied', {
      description: message
    });
  };
  // Handle tab changes with validation
  const handleTabChange = (tabId: string) => {
    // Validate before allowing certain tab changes
    if (tabId === 'content' && !selectedContentFormat) {
      toast.error('Please select a content format first', {
        description: 'Go to the Content Format tab to select a format'
      });
      return;
    }
    if (tabId === 'content' && (!formData.title || !formData.description)) {
      toast.error('Please complete the basic information first', {
        description: 'Title and description are required'
      });
      return;
    }
    if (tabId === 'slides' && !isGenerated) {
      toast.error('Please generate content first', {
        description: 'Generate content before editing slides'
      });
      return;
    }
    if (tabId === 'slides' && !['carousel', 'story'].includes(selectedContentFormat)) {
      toast.error('Slide editor is only for carousel and story formats', {
        description: 'This tab is not applicable to your selected format'
      });
      return;
    }
    if (tabId === 'platforms' && !isGenerated) {
      toast.error('Please generate content first', {
        description: 'Generate content before configuring platforms'
      });
      return;
    }
    if (tabId === 'platforms' && ['carousel', 'story'].includes(selectedContentFormat) && !completedSteps.includes('slides')) {
      toast.error('Please complete slide editing first', {
        description: 'Configure your slides before setting up platforms'
      });
      return;
    }
    if (tabId === 'schedule' && !completedSteps.includes('content')) {
      toast.error('Please complete content creation first', {
        description: 'Generate and optimize your content before scheduling'
      });
      return;
    }
    setActiveTab(tabId);
  };
  // Check if a step is completed
  const isStepCompleted = (stepId: string) => {
    return completedSteps.includes(stepId);
  };
  // Check if the slides tab should be shown
  const shouldShowSlidesTab = ['carousel', 'story'].includes(selectedContentFormat);
  // Filter tabs based on content format
  const filteredTabs = tabs.filter(tab => {
    if (tab.id === 'slides') {
      return shouldShowSlidesTab;
    }
    return true;
  });
  if (!isFormLoaded) {
    return <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>;
  }
  return <div className="space-y-8 relative max-w-screen-2xl mx-auto">
      {/* Header with improved styling */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-900/30 p-5 rounded-xl border border-gray-200/70 dark:border-gray-700/70 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <SparklesIcon size={24} className="text-indigo-500" />
            Create Content Pipeline
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Design, automate, and optimize your content creation workflow
          </p>
        </div>
        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <Button variant="outline" leftIcon={<PlusIcon size={16} />} onClick={() => setShowContentIdeas(true)} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            Content Ideas
          </Button>
          <Button variant="outline" leftIcon={<UsersIcon size={16} />} onClick={() => setShowInviteModal(true)} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            Invite Collaborators
          </Button>
          {activeTab === 'content' && selectedContentFormat && isGenerated && <Button variant={showSmartOptimizer ? 'primary' : 'outline'} leftIcon={<SparklesIcon size={16} />} onClick={() => setShowSmartOptimizer(!showSmartOptimizer)} className={showSmartOptimizer ? 'bg-gradient-to-r from-indigo-500 to-purple-500 border-none' : ''}>
              Smart Optimizer
            </Button>}
        </div>
      </div>

      <form className="space-y-6">
        {/* Enhanced progress indicator */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1 overflow-x-auto hide-scrollbar">
              <div className="flex items-center space-x-1 text-sm">
                {filteredTabs.map((tab, index) => <Fragment key={tab.id}>
                    {index > 0 && <div className="flex items-center">
                        <div className={`w-6 h-0.5 ${isStepCompleted(filteredTabs[index - 1].id) ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                      </div>}
                    <button onClick={() => handleTabChange(tab.id)} className={`flex items-center whitespace-nowrap px-3 py-1.5 rounded-full transition-all ${activeTab === tab.id ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-medium ring-2 ring-indigo-500/20' : isStepCompleted(tab.id) ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                      {isStepCompleted(tab.id) ? <CheckCircleIcon size={16} className="mr-1.5 text-emerald-500" /> : <span className={`flex items-center justify-center w-5 h-5 rounded-full mr-1.5 text-xs font-medium ${activeTab === tab.id ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                          {index + 1}
                        </span>}
                      {tab.label}
                    </button>
                  </Fragment>)}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {activeTab !== 'format' && <Button variant="outline" size="sm" leftIcon={<ArrowLeftIcon size={14} />} onClick={() => {
              const currentIndex = filteredTabs.findIndex(tab => tab.id === activeTab);
              if (currentIndex > 0) {
                setActiveTab(filteredTabs[currentIndex - 1].id);
              }
            }} className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Previous
                </Button>}
              {activeTab !== filteredTabs[filteredTabs.length - 1].id && activeTab !== 'content' && activeTab !== 'slides' && <Button variant="outline" size="sm" rightIcon={<ArrowRightIcon size={14} />} onClick={() => {
              const currentIndex = filteredTabs.findIndex(tab => tab.id === activeTab);
              if (currentIndex < filteredTabs.length - 1) {
                handleTabChange(filteredTabs[currentIndex + 1].id);
              }
            }} className="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-700/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30">
                    Next
                  </Button>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className={`lg:col-span-${activeTab === 'content' && selectedContentFormat && isGenerated && showSmartOptimizer ? '3' : '4'}`}>
            <Card className="border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="space-y-0">
                <Tabs tabs={filteredTabs} activeTab={activeTab} onChange={handleTabChange} variant="enclosed" className="hidden" // Hide duplicate tabs
              />
                <div className="p-6 lg:p-8">
                  {/* Format selection screen with improved layout */}
                  {activeTab === 'format' && <div className="space-y-8 max-w-4xl mx-auto">
                      {/* Content Engine Orb with enhanced styling */}
                      <div className="relative flex justify-center items-center py-8">
                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/30 to-purple-50/30 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-full blur-3xl opacity-70"></div>
                        <div className="relative transform hover:scale-105 transition-transform duration-500 cursor-pointer">
                          <ContentEngineOrb size={160} className="drop-shadow-xl" />
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 animate-pulse">
                            <div className="flex items-center justify-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-white/80 dark:bg-gray-800/80 px-3 py-1 rounded-full shadow-sm border border-indigo-200 dark:border-indigo-800">
                              <Sparkles size={12} />
                              <span>AI-Powered</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Enhanced section title */}
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                          Select a content format to get started
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                          Choose the type of content you want to create in your
                          pipeline. Each format is optimized for different
                          platforms and audience engagement.
                        </p>
                      </div>
                      {/* Format selector with improved styling */}
                      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-6 shadow-sm border border-gray-200/70 dark:border-gray-700/70">
                        <ContentFormatSelector formats={contentFormats} selectedFormat={selectedContentFormat} onSelectFormat={handleFormatSelect} />
                        {/* Help text */}
                        <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30 text-sm text-blue-800 dark:text-blue-300">
                          <HelpCircleIcon size={20} className="flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium mb-1">
                              Not sure which format to choose?
                            </p>
                            <p>
                              Short videos perform best for engagement,
                              carousels for information retention, and blog
                              posts for SEO. Choose based on your content goals.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>}
                  {/* Basic information screen with improved styling */}
                  {activeTab === 'basic' && <div className="space-y-8 max-w-3xl mx-auto">
                      <div className="flex items-center gap-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                          {contentFormats.find(f => f.id === selectedContentFormat)?.icon || <FileTextIcon size={24} />}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {contentFormats.find(f => f.id === selectedContentFormat)?.name || 'Content'}{' '}
                            Pipeline
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Set up the basic details for your content pipeline
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Pipeline Name{' '}
                            <span className="text-red-500">*</span>
                          </label>
                          <input type="text" value={formData.title} onChange={e => setFormData({
                        ...formData,
                        title: e.target.value
                      })} placeholder="Enter a descriptive name for your pipeline..." className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" />
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Choose a clear name that describes the purpose of
                            this content pipeline
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description <span className="text-red-500">*</span>
                          </label>
                          <textarea value={formData.description} onChange={e => setFormData({
                        ...formData,
                        description: e.target.value
                      })} placeholder="Describe what this pipeline will create and its goals..." rows={4} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" />
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Add details about the content, target audience, and
                            publishing frequency
                          </p>
                        </div>
                        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                          <Button variant="primary" rightIcon={<ArrowRightIcon size={16} />} onClick={handleSaveBasicInfo} className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-none shadow-md shadow-indigo-500/20 dark:shadow-indigo-700/30">
                            Continue to Content
                          </Button>
                        </div>
                      </div>
                    </div>}
                  {/* Additional tab content would go here */}
                </div>
              </div>
            </Card>
          </div>
          {/* Smart Optimizer Sidebar with improved styling */}
          {activeTab === 'content' && selectedContentFormat && isGenerated && showSmartOptimizer && <div className="lg:col-span-1">
                <SmartOptimizerSidebar contentFormat={selectedContentFormat} onApplySuggestion={handleApplySuggestion} />
              </div>}
        </div>
      </form>

      {/* Content Ideas Modal */}
      {showContentIdeas && <SmartContentIdeas isOpen={showContentIdeas} onClose={() => setShowContentIdeas(false)} onSelectIdea={handleSelectIdea} />}
    </div>;
};