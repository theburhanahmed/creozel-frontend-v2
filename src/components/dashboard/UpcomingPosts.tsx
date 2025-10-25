import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Heading3, BodyText } from '../ui/Typography';
import { CalendarIcon, ArrowRightIcon, InstagramIcon, TwitterIcon, LinkedinIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export const UpcomingPosts = () => {
  const upcomingPosts = [{
    id: 1,
    title: 'Social Media Strategy 2023',
    platform: 'instagram',
    scheduledFor: 'Today, 3:00 PM',
    status: 'scheduled'
  }, {
    id: 2,
    title: 'Product Launch Announcement',
    platform: 'twitter',
    scheduledFor: 'Tomorrow, 9:00 AM',
    status: 'scheduled'
  }, {
    id: 3,
    title: 'Industry Insights Report',
    platform: 'linkedin',
    scheduledFor: 'Aug 15, 11:00 AM',
    status: 'draft'
  }];
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <InstagramIcon size={14} className="text-pink-500" />;
      case 'twitter':
        return <TwitterIcon size={14} className="text-blue-400" />;
      case 'linkedin':
        return <LinkedinIcon size={14} className="text-blue-600" />;
      default:
        return null;
    }
  };
  return <Card className="h-full">
      <CardHeader className="flex items-center justify-between">
        <Heading3 className="text-lg">Upcoming Posts</Heading3>
        <Button variant="outline" size="sm" leftIcon={<CalendarIcon size={14} />} href="/calendar">
          Calendar
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {upcomingPosts.map(post => <div key={post.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {post.title}
                  </h4>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      {getPlatformIcon(post.platform)}
                      <span className="ml-1 capitalize">{post.platform}</span>
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {post.scheduledFor}
                    </span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${post.status === 'scheduled' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}>
                  {post.status === 'scheduled' ? 'Scheduled' : 'Draft'}
                </span>
              </div>
            </div>)}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-gray-200 dark:border-gray-700">
        <Link to="/calendar" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center transition-colors">
          View All Scheduled Posts
          <ArrowRightIcon size={14} className="ml-1" />
        </Link>
      </CardFooter>
    </Card>;
};