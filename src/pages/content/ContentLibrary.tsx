import React, { useMemo, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SearchIcon, FilterIcon, GridIcon, ListIcon, FolderIcon, StarIcon, TagIcon, DownloadIcon, TrashIcon, Share2Icon, MoreVerticalIcon, PlusIcon, FileTextIcon, ImageIcon, VideoIcon, MicIcon, CalendarIcon, SortAscIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { formatDate } from '../../lib/utils';
interface ContentItem {
  id: string;
  type: 'text' | 'image' | 'audio' | 'video';
  tool: string;
  prompt: string;
  result: any;
  options: Record<string, any>;
  createdAt: Date;
  tags: string[];
  folder?: string;
  isFavorite: boolean;
  thumbnail?: string;
}
// Mock data for demonstration
const mockContentItems: ContentItem[] = [{
  id: '1',
  type: 'text',
  tool: 'Content Generator',
  prompt: 'Write a blog post about AI trends',
  result: 'Artificial Intelligence continues to revolutionize...',
  options: {
    tone: 'professional',
    length: 'medium'
  },
  createdAt: new Date(Date.now() - 1000 * 60 * 30),
  tags: ['blog', 'AI', 'technology'],
  isFavorite: true,
  folder: 'Blog Posts'
}, {
  id: '2',
  type: 'image',
  tool: 'Image Generator',
  prompt: 'A futuristic cityscape at sunset',
  result: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800',
  options: {
    style: 'realistic',
    aspectRatio: '16:9'
  },
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  tags: ['cityscape', 'futuristic', 'sunset'],
  isFavorite: false,
  thumbnail: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=300'
}, {
  id: '3',
  type: 'video',
  tool: 'Text to Video',
  prompt: 'Product demonstration video',
  result: 'https://example.com/video.mp4',
  options: {
    duration: 30,
    style: 'modern'
  },
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  tags: ['product', 'demo', 'marketing'],
  isFavorite: true,
  folder: 'Marketing'
}];
export const ContentLibrary: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // Extract unique folders and tags
  const folders = useMemo(() => {
    const folderSet = new Set<string>();
    mockContentItems.forEach(item => {
      if (item.folder) folderSet.add(item.folder);
    });
    return Array.from(folderSet);
  }, []);
  // Filter and sort content
  const filteredContent = useMemo(() => {
    let filtered = mockContentItems;
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(item => item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) || item.tool.toLowerCase().includes(searchQuery.toLowerCase()) || item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    }
    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }
    // Folder filter
    if (selectedFolder !== 'all') {
      filtered = filtered.filter(item => item.folder === selectedFolder);
    }
    // Favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter(item => item.isFavorite);
    }
    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else {
        return a.prompt.localeCompare(b.prompt);
      }
    });
    return filtered;
  }, [searchQuery, selectedType, selectedFolder, showFavoritesOnly, sortBy]);
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <FileTextIcon size={16} />;
      case 'image':
        return <ImageIcon size={16} />;
      case 'video':
        return <VideoIcon size={16} />;
      case 'audio':
        return <MicIcon size={16} />;
      default:
        return <FileTextIcon size={16} />;
    }
  };
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'text':
        return 'bg-blue-500/20 text-blue-400';
      case 'image':
        return 'bg-purple-500/20 text-purple-400';
      case 'video':
        return 'bg-rose-500/20 text-rose-400';
      case 'audio':
        return 'bg-amber-500/20 text-amber-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Content Library
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage all your AI-generated content in one place
          </p>
        </div>
        <Button variant="primary" leftIcon={<PlusIcon size={16} />}>
          Create New
        </Button>
      </div>
      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search content, prompts, or tags..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3FE0A5] focus:border-transparent" />
            </div>
          </div>
          {/* Type Filter */}
          <select value={selectedType} onChange={e => setSelectedType(e.target.value)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3FE0A5]">
            <option value="all">All Types</option>
            <option value="text">Text</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="audio">Audio</option>
          </select>
          {/* Folder Filter */}
          <select value={selectedFolder} onChange={e => setSelectedFolder(e.target.value)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3FE0A5]">
            <option value="all">All Folders</option>
            {folders.map(folder => <option key={folder} value={folder}>
                {folder}
              </option>)}
          </select>
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-1">
            <button onClick={() => setViewMode('grid')} className={cn('p-2 rounded transition-colors', viewMode === 'grid' ? 'bg-[#3FE0A5] text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700')}>
              <GridIcon size={18} />
            </button>
            <button onClick={() => setViewMode('list')} className={cn('p-2 rounded transition-colors', viewMode === 'list' ? 'bg-[#3FE0A5] text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700')}>
              <ListIcon size={18} />
            </button>
          </div>
        </div>
        {/* Secondary Filters */}
        <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button onClick={() => setShowFavoritesOnly(!showFavoritesOnly)} className={cn('flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors', showFavoritesOnly ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600')}>
            <StarIcon size={14} fill={showFavoritesOnly ? 'currentColor' : 'none'} />
            Favorites Only
          </button>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as 'date' | 'name')} className="px-3 py-1.5 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-none focus:ring-2 focus:ring-[#3FE0A5]">
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>
          <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
            {filteredContent.length} items
          </div>
        </div>
      </Card>
      {/* Content Grid/List */}
      {viewMode === 'grid' ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContent.map(item => <Card key={item.id} className="group hover:shadow-lg transition-all duration-200">
              {/* Thumbnail */}
              {item.type === 'image' && item.thumbnail ? <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-t-lg overflow-hidden">
                  <img src={item.thumbnail} alt={item.prompt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div> : <div className={cn('aspect-video rounded-t-lg flex items-center justify-center', getTypeColor(item.type))}>
                  <div className="text-4xl">{getTypeIcon(item.type)}</div>
                </div>}
              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                      {item.prompt}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {item.tool}
                    </p>
                  </div>
                  <button className="flex-shrink-0 text-gray-400 hover:text-amber-400 transition-colors">
                    <StarIcon size={16} fill={item.isFavorite ? 'currentColor' : 'none'} />
                  </button>
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 3).map(tag => <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                      {tag}
                    </span>)}
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <CalendarIcon size={12} />
                    {formatDate(item.createdAt)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors">
                      <DownloadIcon size={14} />
                    </button>
                    <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors">
                      <Share2Icon size={14} />
                    </button>
                    <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors">
                      <MoreVerticalIcon size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </Card>)}
        </div> : <Card>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredContent.map(item => <div key={item.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', getTypeColor(item.type))}>
                    {getTypeIcon(item.type)}
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {item.prompt}
                      </h3>
                      {item.isFavorite && <StarIcon size={14} className="text-amber-400 flex-shrink-0" fill="currentColor" />}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span>{item.tool}</span>
                      <span>•</span>
                      <span>{formatDate(item.createdAt)}</span>
                      {item.folder && <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <FolderIcon size={12} />
                            {item.folder}
                          </span>
                        </>}
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors">
                      <DownloadIcon size={16} />
                    </button>
                    <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors">
                      <Share2Icon size={16} />
                    </button>
                    <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors">
                      <MoreVerticalIcon size={16} />
                    </button>
                  </div>
                </div>
              </div>)}
          </div>
        </Card>}
    </div>;
};