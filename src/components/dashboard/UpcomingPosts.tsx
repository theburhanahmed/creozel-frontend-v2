import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CalendarIcon, ClockIcon, InstagramIcon, LinkedinIcon, TwitterIcon, YoutubeIcon, MoreVerticalIcon, EditIcon, TrashIcon, ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export const UpcomingPosts: React.FC = () => {
  const posts = [{
    id: 1,
    title: '10 AI Tools to Boost Productivity',
    platform: 'instagram',
    platformName: 'Instagram',
    platformIcon: <InstagramIcon size={16} className="text-pink-500" />,
    scheduledDate: 'Today',
    scheduledTime: '5:30 PM',
    status: 'scheduled',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop'
  }, {
    id: 2,
    title: 'Social Media Strategy Guide',
    platform: 'linkedin',
    platformName: 'LinkedIn',
    platformIcon: <LinkedinIcon size={16} className="text-blue-700" />,
    scheduledDate: 'Tomorrow',
    scheduledTime: '9:00 AM',
    status: 'scheduled',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop'
  }, {
    id: 3,
    title: 'Quick Tips for Content Creators',
    platform: 'twitter',
    platformName: 'Twitter',
    platformIcon: <TwitterIcon size={16} className="text-blue-400" />,
    scheduledDate: 'Dec 28',
    scheduledTime: '12:00 PM',
    status: 'scheduled',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop'
  }];
  return <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-gray-200/50 dark:border-gray-700/50">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-800/30">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <CalendarIcon size={20} className="text-indigo-500" />
            </div>
            Upcoming Posts
          </h3>
          <Link to="/calendar">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRightIcon size={14} />} className="text-indigo-500 hover:text-indigo-600">
              View All
            </Button>
          </Link>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {posts.map(post => <div key={post.id} className="p-4 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-transparent dark:hover:from-gray-800/30 dark:hover:to-transparent transition-all duration-300 group">
            <div className="flex gap-4">
              {/* Thumbnail */}
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-[#3FE0A5] transition-colors duration-200">
                  {post.title}
                </h4>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                    {post.platformIcon}
                    <span>{post.platformName}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-gray-400" />
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                    <ClockIcon size={12} />
                    <span>
                      {post.scheduledDate} at {post.scheduledTime}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Scheduled
                  </span>
                </div>
              </div>
              {/* Actions */}
              <div className="flex items-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <EditIcon size={14} />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  <TrashIcon size={14} />
                </button>
              </div>
            </div>
          </div>)}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
        <Link to="/calendar">
          <Button variant="outline" className="w-full justify-center font-semibold hover:shadow-md transition-all duration-200">
            View Full Calendar
          </Button>
        </Link>
      </div>
    </Card>;
};