import React, { useCallback, useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { PlayIcon, PlusIcon, SaveIcon, TrashIcon, SettingsIcon, ArrowRightIcon, ZapIcon, AlertCircleIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
interface WorkflowStep {
  id: string;
  toolId: string;
  toolName: string;
  toolIcon: React.ReactNode;
  settings: Record<string, any>;
  status?: 'pending' | 'running' | 'completed' | 'error';
}
interface WorkflowBuilderProps {
  onSave?: (workflow: WorkflowStep[]) => void;
  onExecute?: (workflow: WorkflowStep[]) => void;
  initialSteps?: WorkflowStep[];
  className?: string;
}
export const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({
  onSave,
  onExecute,
  initialSteps = [],
  className
}) => {
  const [steps, setSteps] = useState<WorkflowStep[]>(initialSteps);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  // Available tools that can be added to workflow
  const availableTools = [{
    id: 'text-generator',
    name: 'Text Generator',
    icon: <FileTextIcon size={16} />
  }, {
    id: 'image-generator',
    name: 'Image Generator',
    icon: <ImageIcon size={16} />
  }, {
    id: 'rewriter',
    name: 'Rewriter',
    icon: <RefreshCwIcon size={16} />
  }, {
    id: 'translator',
    name: 'Translator',
    icon: <LanguagesIcon size={16} />
  }, {
    id: 'summarizer',
    name: 'Summarizer',
    icon: <FileTextIcon size={16} />
  }, {
    id: 'image-upscaler',
    name: 'Image Upscaler',
    icon: <ZoomInIcon size={16} />
  }];
  const addStep = (toolId: string) => {
    const tool = availableTools.find(t => t.id === toolId);
    if (!tool) return;
    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      toolId: tool.id,
      toolName: tool.name,
      toolIcon: tool.icon,
      settings: {},
      status: 'pending'
    };
    setSteps([...steps, newStep]);
  };
  const removeStep = (stepId: string) => {
    setSteps(steps.filter(step => step.id !== stepId));
    if (selectedStep === stepId) {
      setSelectedStep(null);
    }
  };
  const updateStepSettings = (stepId: string, settings: Record<string, any>) => {
    setSteps(steps.map(step => step.id === stepId ? {
      ...step,
      settings
    } : step));
  };
  const executeWorkflow = async () => {
    if (steps.length === 0) return;
    setIsExecuting(true);
    // Simulate workflow execution
    for (let i = 0; i < steps.length; i++) {
      setSteps(prev => prev.map((step, index) => index === i ? {
        ...step,
        status: 'running'
      } : step));
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSteps(prev => prev.map((step, index) => index === i ? {
        ...step,
        status: 'completed'
      } : step));
    }
    setIsExecuting(false);
    if (onExecute) onExecute(steps);
  };
  const saveWorkflow = () => {
    if (onSave) onSave(steps);
  };
  const getStepStatusIcon = (status?: string) => {
    switch (status) {
      case 'running':
        return <ClockIcon size={16} className="text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircleIcon size={16} className="text-green-500" />;
      case 'error':
        return <AlertCircleIcon size={16} className="text-red-500" />;
      default:
        return <ClockIcon size={16} className="text-gray-400" />;
    }
  };
  return <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Workflow Builder
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Chain multiple tools together to create automated workflows
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" leftIcon={<SaveIcon size={16} />} onClick={saveWorkflow} disabled={steps.length === 0}>
            Save Workflow
          </Button>
          <Button variant="primary" leftIcon={<PlayIcon size={16} />} onClick={executeWorkflow} disabled={steps.length === 0 || isExecuting}>
            {isExecuting ? 'Executing...' : 'Execute Workflow'}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tool Palette */}
        <Card className="lg:col-span-1">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ZapIcon size={16} className="text-purple-500" />
              Available Tools
            </h3>
          </div>
          <div className="p-4 space-y-2">
            {availableTools.map(tool => <button key={tool.id} onClick={() => addStep(tool.id)} className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-[#3FE0A5] hover:bg-[#3FE0A5]/5 transition-all duration-200 text-left group">
                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:bg-[#3FE0A5]/10 group-hover:text-[#3FE0A5] transition-colors">
                  {tool.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#3FE0A5] transition-colors">
                  {tool.name}
                </span>
              </button>)}
          </div>
        </Card>
        {/* Workflow Canvas */}
        <Card className="lg:col-span-3">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Workflow Steps ({steps.length})
            </h3>
          </div>
          <div className="p-6">
            {steps.length === 0 ? <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <ZapIcon size={24} className="text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No steps added yet
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Start building your workflow by adding tools from the left
                  panel
                </p>
              </div> : <div className="space-y-4">
                {steps.map((step, index) => <div key={step.id} className="relative">
                    {/* Step Card */}
                    <div className={cn('relative p-4 rounded-lg border-2 transition-all duration-200', selectedStep === step.id ? 'border-[#3FE0A5] bg-[#3FE0A5]/5 shadow-md' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600', step.status === 'running' && 'animate-pulse')} onClick={() => setSelectedStep(step.id)}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Step Number */}
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#3FE0A5] to-[#38B897] flex items-center justify-center text-white font-semibold text-sm">
                            {index + 1}
                          </div>
                          {/* Tool Info */}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {step.toolName}
                              </span>
                              {getStepStatusIcon(step.status)}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              {step.status === 'running' ? 'Processing...' : step.status === 'completed' ? 'Completed' : step.status === 'error' ? 'Error occurred' : 'Ready to execute'}
                            </p>
                          </div>
                        </div>
                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button onClick={e => {
                      e.stopPropagation();
                      setSelectedStep(step.id);
                    }} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <SettingsIcon size={16} className="text-gray-600 dark:text-gray-400" />
                          </button>
                          <button onClick={e => {
                      e.stopPropagation();
                      removeStep(step.id);
                    }} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" disabled={isExecuting}>
                            <TrashIcon size={16} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                      {/* Settings Preview */}
                      {Object.keys(step.settings).length > 0 && <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(step.settings).slice(0, 3).map(([key, value]) => <span key={key} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                  {key}: {String(value)}
                                </span>)}
                          </div>
                        </div>}
                    </div>
                    {/* Connector Arrow */}
                    {index < steps.length - 1 && <div className="flex justify-center py-2">
                        <ArrowRightIcon size={20} className="text-gray-400 transform rotate-90" />
                      </div>}
                  </div>)}
              </div>}
          </div>
        </Card>
      </div>
      {/* Step Settings Panel */}
      {selectedStep && <Card>
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Step Settings
            </h3>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Configure settings for the selected step
            </p>
            {/* Add step-specific settings here */}
          </div>
        </Card>}
    </div>;
};
// Import icons
import { FileTextIcon, ImageIcon, RefreshCwIcon, LanguagesIcon, ZoomInIcon } from 'lucide-react';