import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeftIcon, ClockIcon, RotateCcwIcon, EyeIcon, DownloadIcon, CheckCircleIcon, AlertCircleIcon, GitBranchIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { cn } from '../../lib/utils';
interface Version {
  id: string;
  version: string;
  timestamp: string;
  author: {
    name: string;
    avatar: string;
  };
  changes: string;
  isCurrent: boolean;
  size: string;
}
export const VersionHistory: React.FC = () => {
  const {
    id
  } = useParams();
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareVersions, setCompareVersions] = useState<string[]>([]);
  const versions: Version[] = [{
    id: '1',
    version: 'v1.5',
    timestamp: '2 hours ago',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60'
    },
    changes: 'Updated headline and CTA button text',
    isCurrent: true,
    size: '2.4 MB'
  }, {
    id: '2',
    version: 'v1.4',
    timestamp: '5 hours ago',
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60'
    },
    changes: 'Adjusted color scheme and typography',
    isCurrent: false,
    size: '2.3 MB'
  }, {
    id: '3',
    version: 'v1.3',
    timestamp: '1 day ago',
    author: {
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60'
    },
    changes: 'Added new product images',
    isCurrent: false,
    size: '2.5 MB'
  }, {
    id: '4',
    version: 'v1.2',
    timestamp: '2 days ago',
    author: {
      name: 'David Park',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60'
    },
    changes: 'Revised content copy',
    isCurrent: false,
    size: '2.2 MB'
  }, {
    id: '5',
    version: 'v1.1',
    timestamp: '3 days ago',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60'
    },
    changes: 'Initial draft with basic layout',
    isCurrent: false,
    size: '2.1 MB'
  }];
  const handleCompareToggle = (versionId: string) => {
    if (compareVersions.includes(versionId)) {
      setCompareVersions(compareVersions.filter(id => id !== versionId));
    } else if (compareVersions.length < 2) {
      setCompareVersions([...compareVersions, versionId]);
    }
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/collaboration/workspace/1">
            <Button variant="outline" size="sm" leftIcon={<ArrowLeftIcon size={14} />}>
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ClockIcon size={28} className="text-[#3FE0A5]" />
              Version History
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Instagram Campaign Post
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant={compareMode ? 'primary' : 'outline'} leftIcon={<div size={16} />} onClick={() => {
          setCompareMode(!compareMode);
          setCompareVersions([]);
        }}>
            {compareMode ? 'Cancel Compare' : 'Compare Versions'}
          </Button>
          {compareMode && compareVersions.length === 2 && <Button variant="primary">View Comparison</Button>}
        </div>
      </div>
      {/* Compare Mode Info */}
      {compareMode && <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <div size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-blue-900 dark:text-blue-100">
                Compare Mode Active
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Select two versions to compare. {compareVersions.length}/2
                selected
              </p>
            </div>
          </div>
        </Card>}
      {/* Version Timeline */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <GitBranchIcon size={20} className="text-[#3FE0A5]" />
              Version Timeline
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {versions.length} versions
            </span>
          </div>
          <div className="space-y-4">
            {versions.map((version, index) => <div key={version.id} className={cn('relative p-4 rounded-lg border-2 transition-all duration-200', version.isCurrent ? 'border-[#3FE0A5] bg-[#3FE0A5]/5' : compareMode && compareVersions.includes(version.id) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:shadow-md')}>
                {/* Timeline connector */}
                {index < versions.length - 1 && <div className="absolute left-9 top-full h-4 w-0.5 bg-gray-300 dark:bg-gray-600" />}
                <div className="flex items-start gap-4">
                  {/* Version indicator */}
                  <div className={cn('w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0', version.isCurrent ? 'bg-gradient-to-r from-[#3FE0A5] to-[#38B897]' : 'bg-gray-400 dark:bg-gray-600')}>
                    {version.version.replace('v', '')}
                  </div>
                  {/* Version details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {version.version}
                          </h3>
                          {version.isCurrent && <span className="px-2 py-0.5 rounded-full bg-[#3FE0A5] text-white text-xs font-medium">
                              Current
                            </span>}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {version.changes}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {version.size}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <div className="flex items-center gap-2">
                        <img src={version.author.avatar} alt={version.author.name} className="w-5 h-5 rounded-full" />
                        <span>{version.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon size={14} />
                        <span>{version.timestamp}</span>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {compareMode ? <Button variant={compareVersions.includes(version.id) ? 'primary' : 'outline'} size="sm" onClick={() => handleCompareToggle(version.id)} disabled={!compareVersions.includes(version.id) && compareVersions.length >= 2}>
                          {compareVersions.includes(version.id) ? 'Selected' : 'Select'}
                        </Button> : <>
                          <Button variant="outline" size="sm" leftIcon={<EyeIcon size={14} />}>
                            Preview
                          </Button>
                          {!version.isCurrent && <Button variant="outline" size="sm" leftIcon={<RotateCcwIcon size={14} />}>
                              Restore
                            </Button>}
                          <Button variant="outline" size="sm" leftIcon={<DownloadIcon size={14} />}>
                            Download
                          </Button>
                        </>}
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </Card>
      {/* Version Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center text-white">
                <GitBranchIcon size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Versions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {versions.length}
                </p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white">
                <ClockIcon size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Last Updated
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  2h ago
                </p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white">
                <CheckCircleIcon size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Contributors
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  4
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>;
};