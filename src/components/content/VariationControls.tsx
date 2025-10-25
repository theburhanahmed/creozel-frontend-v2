import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CopyIcon, RefreshCwIcon, SlidersIcon, GridIcon, SparklesIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
interface VariationControlsProps {
  originalContent: any;
  onGenerateVariation: (strength: number, count: number) => void;
  isGenerating?: boolean;
  className?: string;
}
export const VariationControls: React.FC<VariationControlsProps> = ({
  originalContent,
  onGenerateVariation,
  isGenerating = false,
  className
}) => {
  const [variationStrength, setVariationStrength] = useState(0.5);
  const [variationCount, setVariationCount] = useState(4);
  const strengthPresets = [{
    label: 'Subtle',
    value: 0.3,
    description: 'Minor changes'
  }, {
    label: 'Moderate',
    value: 0.5,
    description: 'Balanced variation'
  }, {
    label: 'Strong',
    value: 0.7,
    description: 'Significant changes'
  }, {
    label: 'Extreme',
    value: 0.9,
    description: 'Major transformation'
  }];
  return <Card className={cn('', className)}>
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <RefreshCwIcon size={18} className="text-blue-500" />
          Generate Variations
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Create different versions of your content
        </p>
      </div>
      <div className="p-5 space-y-5">
        {/* Variation Strength */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Variation Strength
            </label>
            <span className="text-sm font-medium text-[#3FE0A5]">
              {Math.round(variationStrength * 100)}%
            </span>
          </div>
          {/* Strength Presets */}
          <div className="grid grid-cols-2 gap-2">
            {strengthPresets.map(preset => <button key={preset.value} onClick={() => setVariationStrength(preset.value)} className={cn('p-3 rounded-lg border-2 text-left transition-all', variationStrength === preset.value ? 'border-[#3FE0A5] bg-[#3FE0A5]/5' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600')}>
                <div className="font-medium text-sm text-gray-900 dark:text-white">
                  {preset.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {preset.description}
                </div>
              </button>)}
          </div>
          {/* Custom Slider */}
          <div className="pt-2">
            <input type="range" min="0" max="1" step="0.05" value={variationStrength} onChange={e => setVariationStrength(parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider" />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Subtle</span>
              <span>Extreme</span>
            </div>
          </div>
        </div>
        {/* Number of Variations */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <GridIcon size={16} />
            Number of Variations
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 4, 8].map(count => <button key={count} onClick={() => setVariationCount(count)} className={cn('px-4 py-2 rounded-lg border-2 font-medium transition-all', variationCount === count ? 'border-[#3FE0A5] bg-[#3FE0A5]/5 text-[#3FE0A5]' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600')}>
                {count}
              </button>)}
          </div>
        </div>
        {/* Preview Info */}
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
          <div className="flex items-start gap-2">
            <SparklesIcon size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium mb-1">What to expect:</p>
              <ul className="space-y-1 text-xs">
                <li>• {variationCount} variations will be generated</li>
                <li>
                  • Each will differ by ~{Math.round(variationStrength * 100)}%
                  from the original
                </li>
                <li>• Uses the same seed with controlled randomness</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Generate Button */}
        <Button variant="primary" className="w-full justify-center" leftIcon={<RefreshCwIcon size={16} />} onClick={() => onGenerateVariation(variationStrength, variationCount)} disabled={isGenerating || !originalContent}>
          {isGenerating ? 'Generating...' : `Generate ${variationCount} Variation${variationCount > 1 ? 's' : ''}`}
        </Button>
        {/* Quick Actions */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Quick Actions
          </p>
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <CopyIcon size={14} />
              Duplicate
            </button>
            <button className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <SlidersIcon size={14} />
              Remix
            </button>
          </div>
        </div>
      </div>
    </Card>;
};