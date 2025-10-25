import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Heading3, BodyText } from '../ui/Typography';
import { FileTextIcon, ImageIcon, VideoIcon, MicIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
interface ContentCreationPanelProps {
  onCreateContent: () => void;
}
export const ContentCreationPanel: React.FC<ContentCreationPanelProps> = ({
  onCreateContent
}) => {
  const contentTypes = [{
    icon: <FileTextIcon size={18} />,
    title: 'Text',
    description: 'Create blog posts, articles, and copy',
    href: '/content/text',
    color: 'bg-blue-500/10 text-blue-500 dark:bg-blue-500/20'
  }, {
    icon: <ImageIcon size={18} />,
    title: 'Image',
    description: 'Generate images and graphics',
    href: '/content/image',
    color: 'bg-purple-500/10 text-purple-500 dark:bg-purple-500/20'
  }, {
    icon: <VideoIcon size={18} />,
    title: 'Video',
    description: 'Create and edit video content',
    href: '/content/video',
    color: 'bg-pink-500/10 text-pink-500 dark:bg-pink-500/20'
  }, {
    icon: <MicIcon size={18} />,
    title: 'Audio',
    description: 'Record podcasts and audio clips',
    href: '/content/audio',
    color: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20'
  }];
  return <Card className="h-full">
      <CardHeader className="flex items-center justify-between">
        <Heading3 className="text-lg">Content Creation</Heading3>
        <Button variant="primary" size="sm" leftIcon={<PlusIcon size={14} />} onClick={onCreateContent}>
          New
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {contentTypes.map((type, index) => <Link key={index} to={type.href} className="flex flex-col p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-sm">
              <div className={`w-8 h-8 rounded-full ${type.color} flex items-center justify-center mb-2`}>
                {type.icon}
              </div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {type.title}
              </h4>
              <BodyText className="text-xs mt-1">{type.description}</BodyText>
            </Link>)}
        </div>
      </CardContent>
    </Card>;
};