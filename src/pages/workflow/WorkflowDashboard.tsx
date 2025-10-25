import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { WorkflowBuilder } from '../../components/workflow/WorkflowBuilder';
import { BatchProcessor } from '../../components/workflow/BatchProcessor';
import { WorkflowTemplates } from '../../components/workflow/WorkflowTemplates';
import { ZapIcon, LayoutTemplateIcon, FolderIcon, PlusIcon, TrendingUpIcon, ClockIcon, CheckCircleIcon } from 'lucide-react';
export const WorkflowDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const tabs = [{
    id: 'templates',
    label: 'Templates',
    icon: <LayoutTemplateIcon size={16} />
  }, {
    id: 'builder',
    label: 'Workflow Builder',
    icon: <ZapIcon size={16} />
  }, {
    id: 'batch',
    label: 'Batch Processing',
    icon: <FolderIcon size={16} />
  }];
  // Mock stats
  const stats = [{
    label: 'Active Workflows',
    value: '12',
    change: '+3 this week',
    icon: <ZapIcon size={20} className="text-purple-500" />,
    color: 'from-purple-500 to-indigo-600'
  }, {
    label: 'Total Executions',
    value: '1,247',
    change: '+18% from last month',
    icon: <TrendingUpIcon size={20} className="text-blue-500" />,
    color: 'from-blue-500 to-cyan-600'
  }, {
    label: 'Time Saved',
    value: '42h',
    change: 'This month',
    icon: <ClockIcon size={20} className="text-amber-500" />,
    color: 'from-amber-500 to-orange-600'
  }, {
    label: 'Success Rate',
    value: '98.5%',
    change: 'Across all workflows',
    icon: <CheckCircleIcon size={20} className="text-green-500" />,
    color: 'from-green-500 to-emerald-600'
  }];
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Workflow Automation
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Create, manage, and execute automated workflows
          </p>
        </div>
        <Button variant="primary" leftIcon={<PlusIcon size={16} />} onClick={() => setActiveTab('builder')}>
          Create New Workflow
        </Button>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => <Card key={index} className="relative overflow-hidden">
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  {stat.icon}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {stat.change}
                </p>
              </div>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
          </Card>)}
      </div>
      {/* Main Content */}
      <Card>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="enclosed" />
        <div className="p-6">
          {activeTab === 'templates' && <WorkflowTemplates onCreateNew={() => setActiveTab('builder')} />}
          {activeTab === 'builder' && <WorkflowBuilder />}
          {activeTab === 'batch' && <BatchProcessor toolName="Image Generator" />}
        </div>
      </Card>
    </div>;
};