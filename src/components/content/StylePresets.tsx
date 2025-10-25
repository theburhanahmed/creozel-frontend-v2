import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { SparklesIcon, ImageIcon, PaletteIcon, WandIcon, CheckIcon, StarIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
interface StylePreset {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  settings: any;
  preview?: string;
  popular?: boolean;
  category: string;
}
interface StylePresetsProps {
  toolType: 'text' | 'image' | 'audio' | 'video';
  selectedPreset?: string;
  onSelectPreset: (preset: StylePreset) => void;
  className?: string;
}
export const StylePresets: React.FC<StylePresetsProps> = ({
  toolType,
  selectedPreset,
  onSelectPreset,
  className
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  // Define presets based on tool type
  const getPresets = (): StylePreset[] => {
    switch (toolType) {
      case 'text':
        return [{
          id: 'professional',
          name: 'Professional',
          description: 'Formal, business-appropriate tone',
          icon: <SparklesIcon size={18} />,
          settings: {
            temperature: 0.5,
            topP: 0.9,
            tone: 'professional'
          },
          popular: true,
          category: 'tone'
        }, {
          id: 'creative',
          name: 'Creative',
          description: 'Imaginative and expressive writing',
          icon: <WandIcon size={18} />,
          settings: {
            temperature: 0.9,
            topP: 0.95,
            tone: 'creative'
          },
          popular: true,
          category: 'tone'
        }, {
          id: 'concise',
          name: 'Concise',
          description: 'Brief and to the point',
          icon: <SparklesIcon size={18} />,
          settings: {
            temperature: 0.3,
            maxTokens: 500,
            tone: 'concise'
          },
          category: 'style'
        }, {
          id: 'detailed',
          name: 'Detailed',
          description: 'Comprehensive and thorough',
          icon: <SparklesIcon size={18} />,
          settings: {
            temperature: 0.7,
            maxTokens: 2000,
            tone: 'detailed'
          },
          category: 'style'
        }, {
          id: 'casual',
          name: 'Casual',
          description: 'Friendly and conversational',
          icon: <SparklesIcon size={18} />,
          settings: {
            temperature: 0.8,
            topP: 0.9,
            tone: 'casual'
          },
          category: 'tone'
        }, {
          id: 'technical',
          name: 'Technical',
          description: 'Precise and technical language',
          icon: <SparklesIcon size={18} />,
          settings: {
            temperature: 0.4,
            topP: 0.85,
            tone: 'technical'
          },
          category: 'tone'
        }];
      case 'image':
        return [{
          id: 'photorealistic',
          name: 'Photorealistic',
          description: 'Ultra-realistic photography style',
          icon: <ImageIcon size={18} />,
          settings: {
            steps: 50,
            cfgScale: 7,
            sampler: 'DPM++ 2M'
          },
          preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200',
          popular: true,
          category: 'realism'
        }, {
          id: 'artistic',
          name: 'Artistic',
          description: 'Painterly and stylized',
          icon: <PaletteIcon size={18} />,
          settings: {
            steps: 40,
            cfgScale: 9,
            sampler: 'Euler a'
          },
          preview: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=200',
          popular: true,
          category: 'art'
        }, {
          id: 'anime',
          name: 'Anime',
          description: 'Japanese animation style',
          icon: <SparklesIcon size={18} />,
          settings: {
            steps: 30,
            cfgScale: 8,
            sampler: 'Euler a'
          },
          preview: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200',
          popular: true,
          category: 'art'
        }, {
          id: 'cinematic',
          name: 'Cinematic',
          description: 'Movie-like composition',
          icon: <ImageIcon size={18} />,
          settings: {
            steps: 50,
            cfgScale: 7.5,
            sampler: 'DPM++ SDE'
          },
          preview: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200',
          category: 'realism'
        }, {
          id: 'abstract',
          name: 'Abstract',
          description: 'Non-representational art',
          icon: <WandIcon size={18} />,
          settings: {
            steps: 35,
            cfgScale: 10,
            sampler: 'Euler'
          },
          preview: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=200',
          category: 'art'
        }, {
          id: 'minimalist',
          name: 'Minimalist',
          description: 'Clean and simple design',
          icon: <SparklesIcon size={18} />,
          settings: {
            steps: 30,
            cfgScale: 6,
            sampler: 'DDIM'
          },
          preview: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=200',
          category: 'design'
        }];
      case 'audio':
        return [{
          id: 'natural',
          name: 'Natural',
          description: 'Conversational and authentic',
          icon: <SparklesIcon size={18} />,
          settings: {
            temperature: 0.7,
            speed: 1.0
          },
          popular: true,
          category: 'voice'
        }, {
          id: 'professional',
          name: 'Professional',
          description: 'Clear and authoritative',
          icon: <SparklesIcon size={18} />,
          settings: {
            temperature: 0.5,
            speed: 0.95
          },
          popular: true,
          category: 'voice'
        }, {
          id: 'energetic',
          name: 'Energetic',
          description: 'Upbeat and dynamic',
          icon: <SparklesIcon size={18} />,
          settings: {
            temperature: 0.8,
            speed: 1.1
          },
          category: 'voice'
        }, {
          id: 'calm',
          name: 'Calm',
          description: 'Soothing and relaxed',
          icon: <SparklesIcon size={18} />,
          settings: {
            temperature: 0.6,
            speed: 0.9
          },
          category: 'voice'
        }];
      case 'video':
        return [{
          id: 'smooth',
          name: 'Smooth',
          description: 'Fluid motion and transitions',
          icon: <SparklesIcon size={18} />,
          settings: {
            steps: 50,
            cfgScale: 7,
            fps: 30
          },
          popular: true,
          category: 'motion'
        }, {
          id: 'dramatic',
          name: 'Dramatic',
          description: 'Bold and cinematic',
          icon: <SparklesIcon size={18} />,
          settings: {
            steps: 60,
            cfgScale: 9,
            fps: 24
          },
          popular: true,
          category: 'style'
        }, {
          id: 'fast-paced',
          name: 'Fast-Paced',
          description: 'Quick cuts and energy',
          icon: <SparklesIcon size={18} />,
          settings: {
            steps: 40,
            cfgScale: 7,
            fps: 60
          },
          category: 'motion'
        }];
      default:
        return [];
    }
  };
  const presets = getPresets();
  const categories = ['all', ...new Set(presets.map(p => p.category))];
  const filteredPresets = selectedCategory === 'all' ? presets : presets.filter(p => p.category === selectedCategory);
  return <Card className={cn('', className)}>
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <PaletteIcon size={18} className="text-purple-500" />
          Style Presets
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Quick-start templates for your generation
        </p>
      </div>
      {/* Category Filter */}
      <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={cn('px-3 py-1.5 rounded-full text-sm font-medium transition-all', selectedCategory === category ? 'bg-[#3FE0A5] text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700')}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>)}
        </div>
      </div>
      {/* Presets Grid */}
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredPresets.map(preset => <button key={preset.id} onClick={() => onSelectPreset(preset)} className={cn('relative p-4 rounded-lg border-2 text-left transition-all duration-200 group', selectedPreset === preset.id ? 'border-[#3FE0A5] bg-[#3FE0A5]/5 shadow-md' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm')}>
              {/* Popular Badge */}
              {preset.popular && <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-medium flex items-center gap-1">
                  <StarIcon size={10} fill="currentColor" />
                  Popular
                </div>}
              {/* Preview Image for image presets */}
              {preset.preview && <div className="mb-3 rounded-lg overflow-hidden h-24">
                  <img src={preset.preview} alt={preset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>}
              {/* Icon and Name */}
              <div className="flex items-start gap-3">
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', selectedPreset === preset.id ? 'bg-[#3FE0A5] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400')}>
                  {preset.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    {preset.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {preset.description}
                  </p>
                </div>
                {selectedPreset === preset.id && <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#3FE0A5] flex items-center justify-center">
                    <CheckIcon size={12} className="text-white" />
                  </div>}
              </div>
            </button>)}
        </div>
      </div>
    </Card>;
};