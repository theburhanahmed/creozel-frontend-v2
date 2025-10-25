import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { SparklesIcon, FileTextIcon, ImageIcon, VideoIcon, MicIcon, TrendingUpIcon, ZapIcon, ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
interface ContentCreationPanelProps {
  onCreateContent?: () => void;
}
export const ContentCreationPanel: React.FC<ContentCreationPanelProps> = ({
  onCreateContent
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const contentTypes = [{
    id: 'text',
    name: 'Text Content',
    icon: <FileTextIcon size={20} />,
    description: 'Articles, blogs, social posts',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    path: '/content/text',
    badge: 'Popular'
  }, {
    id: 'image',
    name: 'Images',
    icon: <ImageIcon size={20} />,
    description: 'AI-generated visuals',
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    textColor: 'text-purple-600 dark:text-purple-400',
    path: '/content/image'
  }, {
    id: 'video',
    name: 'Videos',
    icon: <VideoIcon size={20} />,
    description: 'Animated content',
    color: 'from-rose-500 to-red-600',
    bgColor: 'bg-rose-50 dark:bg-rose-900/20',
    textColor: 'text-rose-600 dark:text-rose-400',
    path: '/content/video'
  }, {
    id: 'audio',
    name: 'Audio',
    icon: <MicIcon size={20} />,
    description: 'Voice & music',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    textColor: 'text-amber-600 dark:text-amber-400',
    path: '/content/audio'
  }];
  return <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-gray-200/50 dark:border-gray-700/50">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-800/30">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3FE0A5]/20 to-[#38B897]/20 flex items-center justify-center">
              <SparklesIcon size={20} className="text-[#3FE0A5]" />
            </div>
            Create Content
          </h3>
          <Link to="/content">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRightIcon size={14} />} className="text-[#3FE0A5] hover:text-[#38B897]">
              View All
            </Button>
          </Link>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {contentTypes.map(type => <Link key={type.id} to={type.path}>
              <button onMouseEnter={() => setHoveredCard(type.id)} onMouseLeave={() => setHoveredCard(null)} className={`
                  relative w-full p-4 rounded-xl border-2 transition-all duration-300
                  ${hoveredCard === type.id ? `border-transparent shadow-xl` : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}
                  group text-left
                `}>
                {hoveredCard === type.id && <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-10 rounded-xl`} />}
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg ${type.bgColor} flex items-center justify-center ${type.textColor} transition-all duration-300 group-hover:scale-110`}>
                      {type.icon}
                    </div>
                    {type.badge && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                        {type.badge}
                      </span>}
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-[#3FE0A5] transition-colors duration-200">
                    {type.name}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {type.description}
                  </p>
                </div>
              </button>
            </Link>)}
        </div>
        <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-800/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <TrendingUpIcon size={16} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Trending Topic
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  AI Tools for 2024
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              Create
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-800/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <ZapIcon size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Quick Post
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Generate in 30 seconds
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              Start
            </Button>
          </div>
        </div>
      </div>
    </Card>;
};