import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { LayoutTemplateIcon, StarIcon, ClockIcon, PlayIcon, CopyIcon, TrashIcon, EditIcon, SearchIcon, FilterIcon, PlusIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: number;
  estimatedTime: string;
  usageCount: number;
  lastUsed?: string;
  isStarred: boolean;
  tags: string[];
}
interface WorkflowTemplatesProps {
  onSelectTemplate?: (template: WorkflowTemplate) => void;
  onCreateNew?: () => void;
  className?: string;
}
export const WorkflowTemplates: React.FC<WorkflowTemplatesProps> = ({
  onSelectTemplate,
  onCreateNew,
  className
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  // Mock templates data
  const templates: WorkflowTemplate[] = [{
    id: '1',
    name: 'Blog Post Generator',
    description: 'Generate a complete blog post with images and SEO optimization',
    category: 'content',
    steps: 5,
    estimatedTime: '5-10 min',
    usageCount: 142,
    lastUsed: '2 hours ago',
    isStarred: true,
    tags: ['blog', 'seo', 'content']
  }, {
    id: '2',
    name: 'Social Media Pack',
    description: 'Create posts for multiple social media platforms at once',
    category: 'social',
    steps: 4,
    estimatedTime: '3-5 min',
    usageCount: 89,
    lastUsed: 'Yesterday',
    isStarred: true,
    tags: ['social', 'marketing']
  }, {
    id: '3',
    name: 'Product Description Suite',
    description: 'Generate product descriptions, images, and marketing copy',
    category: 'ecommerce',
    steps: 6,
    estimatedTime: '8-12 min',
    usageCount: 67,
    lastUsed: '3 days ago',
    isStarred: false,
    tags: ['ecommerce', 'product', 'marketing']
  }, {
    id: '4',
    name: 'Video Content Pipeline',
    description: 'Create video scripts, generate visuals, and add voiceover',
    category: 'video',
    steps: 7,
    estimatedTime: '15-20 min',
    usageCount: 45,
    isStarred: false,
    tags: ['video', 'content', 'multimedia']
  }, {
    id: '5',
    name: 'Email Campaign Builder',
    description: 'Design email templates with personalized content and images',
    category: 'marketing',
    steps: 4,
    estimatedTime: '5-8 min',
    usageCount: 123,
    lastUsed: 'Last week',
    isStarred: true,
    tags: ['email', 'marketing', 'campaign']
  }, {
    id: '6',
    name: 'Translation & Localization',
    description: 'Translate content to multiple languages with cultural adaptation',
    category: 'localization',
    steps: 3,
    estimatedTime: '2-4 min',
    usageCount: 34,
    isStarred: false,
    tags: ['translation', 'localization']
  }];
  const categories = ['all', 'content', 'social', 'ecommerce', 'video', 'marketing', 'localization'];
  const filteredTemplates = templates.filter(template => {
    if (searchQuery && !template.name.toLowerCase().includes(searchQuery.toLowerCase()) && !template.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory !== 'all' && template.category !== selectedCategory) {
      return false;
    }
    if (showStarredOnly && !template.isStarred) {
      return false;
    }
    return true;
  });
  return <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Workflow Templates
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Pre-built workflows to jumpstart your automation
          </p>
        </div>
        <Button variant="primary" leftIcon={<PlusIcon size={16} />} onClick={onCreateNew}>
          Create Custom Template
        </Button>
      </div>
      {/* Filters */}
      <Card className="p-5">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search templates..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3FE0A5] focus:border-transparent transition-all" />
          </div>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={cn('px-3 py-1.5 rounded-full text-sm font-medium transition-all', selectedCategory === category ? 'bg-[#3FE0A5] text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700')}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>)}
          </div>
          {/* Additional Filters */}
          <div className="flex items-center gap-4">
            <button onClick={() => setShowStarredOnly(!showStarredOnly)} className={cn('flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all', showStarredOnly ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700')}>
              <StarIcon size={14} fill={showStarredOnly ? 'currentColor' : 'none'} />
              Starred Only
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {filteredTemplates.length} templates found
            </span>
          </div>
        </div>
      </Card>
      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => <Card key={template.id} className="group hover:shadow-lg transition-all duration-200">
            <div className="p-5 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-[#3FE0A5] transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {template.description}
                  </p>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <StarIcon size={18} className={cn(template.isStarred ? 'text-amber-500 fill-amber-500' : 'text-gray-400')} />
                </button>
              </div>
              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <LayoutTemplateIcon size={14} />
                  <span>{template.steps} steps</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon size={14} />
                  <span>{template.estimatedTime}</span>
                </div>
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {template.tags.map(tag => <span key={tag} className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400">
                    {tag}
                  </span>)}
              </div>
              {/* Footer */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  Used {template.usageCount} times
                  {template.lastUsed && ` • ${template.lastUsed}`}
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Duplicate template">
                    <CopyIcon size={14} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <Button variant="primary" size="sm" leftIcon={<PlayIcon size={14} />} onClick={() => onSelectTemplate?.(template)}>
                    Use
                  </Button>
                </div>
              </div>
            </div>
          </Card>)}
      </div>
      {/* Empty State */}
      {filteredTemplates.length === 0 && <Card className="p-12 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <FilterIcon size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No templates found
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your filters or search query
          </p>
          <Button variant="outline" onClick={() => {
        setSearchQuery('');
        setSelectedCategory('all');
        setShowStarredOnly(false);
      }}>
            Clear Filters
          </Button>
        </Card>}
    </div>;
};