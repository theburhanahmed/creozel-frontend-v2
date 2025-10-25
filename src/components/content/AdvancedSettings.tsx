import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { ChevronDownIcon, ChevronUpIcon, SettingsIcon, InfoIcon, RefreshCwIcon, LockIcon, UnlockIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
interface AdvancedSettingsProps {
  settings: GenerationSettings;
  onSettingsChange: (settings: GenerationSettings) => void;
  toolType: 'text' | 'image' | 'audio' | 'video';
  className?: string;
}
export interface GenerationSettings {
  seed?: number;
  temperature?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  maxTokens?: number;
  steps?: number;
  cfgScale?: number;
  sampler?: string;
  negativePrompt?: string;
}
export const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  settings,
  onSettingsChange,
  toolType,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [seedLocked, setSeedLocked] = useState(false);
  const generateRandomSeed = () => {
    const newSeed = Math.floor(Math.random() * 1000000);
    onSettingsChange({
      ...settings,
      seed: newSeed
    });
  };
  const handleSettingChange = (key: keyof GenerationSettings, value: any) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };
  // Settings configurations based on tool type
  const getSettingsConfig = () => {
    switch (toolType) {
      case 'text':
        return [{
          key: 'temperature',
          label: 'Temperature',
          min: 0,
          max: 2,
          step: 0.1,
          default: 0.7,
          tooltip: 'Controls randomness. Higher values make output more random.'
        }, {
          key: 'topP',
          label: 'Top P',
          min: 0,
          max: 1,
          step: 0.05,
          default: 0.9,
          tooltip: 'Controls diversity via nucleus sampling.'
        }, {
          key: 'frequencyPenalty',
          label: 'Frequency Penalty',
          min: -2,
          max: 2,
          step: 0.1,
          default: 0,
          tooltip: 'Reduces repetition of token sequences.'
        }, {
          key: 'presencePenalty',
          label: 'Presence Penalty',
          min: -2,
          max: 2,
          step: 0.1,
          default: 0,
          tooltip: 'Increases likelihood of new topics.'
        }, {
          key: 'maxTokens',
          label: 'Max Tokens',
          min: 1,
          max: 4000,
          step: 1,
          default: 1000,
          tooltip: 'Maximum length of generated text.'
        }];
      case 'image':
        return [{
          key: 'steps',
          label: 'Steps',
          min: 1,
          max: 150,
          step: 1,
          default: 50,
          tooltip: 'Number of denoising steps. More steps = higher quality.'
        }, {
          key: 'cfgScale',
          label: 'CFG Scale',
          min: 1,
          max: 30,
          step: 0.5,
          default: 7,
          tooltip: 'How closely to follow the prompt. Higher = more literal.'
        }, {
          key: 'sampler',
          label: 'Sampler',
          options: ['Euler', 'Euler a', 'DPM++ 2M', 'DPM++ SDE', 'DDIM'],
          default: 'Euler a',
          tooltip: 'The sampling method to use.'
        }];
      case 'audio':
        return [{
          key: 'temperature',
          label: 'Temperature',
          min: 0,
          max: 1,
          step: 0.05,
          default: 0.7,
          tooltip: 'Controls variation in speech patterns.'
        }, {
          key: 'steps',
          label: 'Steps',
          min: 10,
          max: 100,
          step: 5,
          default: 50,
          tooltip: 'Quality steps for audio generation.'
        }];
      case 'video':
        return [{
          key: 'steps',
          label: 'Steps',
          min: 10,
          max: 100,
          step: 5,
          default: 50,
          tooltip: 'Number of generation steps per frame.'
        }, {
          key: 'cfgScale',
          label: 'CFG Scale',
          min: 1,
          max: 20,
          step: 0.5,
          default: 7,
          tooltip: 'Prompt adherence strength.'
        }];
      default:
        return [];
    }
  };
  const settingsConfig = getSettingsConfig();
  return <Card className={cn('overflow-hidden', className)}>
      {/* Header */}
      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
            <SettingsIcon size={18} className="text-indigo-500" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Advanced Settings
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Fine-tune generation parameters
            </p>
          </div>
        </div>
        {isExpanded ? <ChevronUpIcon size={20} className="text-gray-400" /> : <ChevronDownIcon size={20} className="text-gray-400" />}
      </button>
      {/* Settings Panel */}
      {isExpanded && <div className="px-5 pb-5 space-y-5 border-t border-gray-200 dark:border-gray-700 pt-5 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Seed Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                Seed
                <div className="group relative">
                  <InfoIcon size={14} className="text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                    Use same seed to reproduce results
                  </div>
                </div>
              </label>
              <div className="flex items-center gap-2">
                <button onClick={() => setSeedLocked(!seedLocked)} className={cn('p-1.5 rounded transition-colors', seedLocked ? 'text-[#3FE0A5] bg-[#3FE0A5]/10' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300')} title={seedLocked ? 'Unlock seed' : 'Lock seed'}>
                  {seedLocked ? <LockIcon size={14} /> : <UnlockIcon size={14} />}
                </button>
                <button onClick={generateRandomSeed} disabled={seedLocked} className="p-1.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" title="Generate random seed">
                  <RefreshCwIcon size={14} />
                </button>
              </div>
            </div>
            <input type="number" value={settings.seed || ''} onChange={e => handleSettingChange('seed', parseInt(e.target.value) || undefined)} disabled={seedLocked} placeholder="Random" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-[#3FE0A5] focus:border-transparent transition-all" />
          </div>
          {/* Dynamic Settings based on tool type */}
          {settingsConfig.map((config: any) => <div key={config.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  {config.label}
                  {config.tooltip && <div className="group relative">
                      <InfoIcon size={14} className="text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10 max-w-xs">
                        {config.tooltip}
                      </div>
                    </div>}
                </label>
                {!config.options && <span className="text-sm font-medium text-[#3FE0A5]">
                    {settings[config.key as keyof GenerationSettings] ?? config.default}
                  </span>}
              </div>
              {config.options ?
        // Dropdown for options
        <select value={settings[config.key as keyof GenerationSettings] as string || config.default} onChange={e => handleSettingChange(config.key, e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3FE0A5] focus:border-transparent transition-all">
                  {config.options.map((option: string) => <option key={option} value={option}>
                      {option}
                    </option>)}
                </select> :
        // Slider for numeric values
        <div className="space-y-2">
                  <input type="range" min={config.min} max={config.max} step={config.step} value={settings[config.key as keyof GenerationSettings] as number || config.default} onChange={e => handleSettingChange(config.key, parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider" />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{config.min}</span>
                    <span>{config.max}</span>
                  </div>
                </div>}
            </div>)}
          {/* Negative Prompt for image generation */}
          {toolType === 'image' && <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                Negative Prompt
                <div className="group relative">
                  <InfoIcon size={14} className="text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                    Specify what to avoid in generation
                  </div>
                </div>
              </label>
              <textarea value={settings.negativePrompt || ''} onChange={e => handleSettingChange('negativePrompt', e.target.value)} placeholder="e.g., blurry, low quality, distorted..." rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3FE0A5] focus:border-transparent transition-all resize-none" />
            </div>}
          {/* Reset Button */}
          <button onClick={() => {
        const defaults: GenerationSettings = {};
        settingsConfig.forEach((config: any) => {
          defaults[config.key as keyof GenerationSettings] = config.default;
        });
        onSettingsChange(defaults);
      }} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium">
            Reset to Defaults
          </button>
        </div>}
    </Card>;
};