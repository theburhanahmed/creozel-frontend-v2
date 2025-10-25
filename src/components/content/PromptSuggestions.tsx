import React from 'react';
import { Sparkles as SparklesIcon } from 'lucide-react';
import { ContentType } from './ContentCreator';
interface PromptSuggestionsProps {
  contentType: ContentType;
  contentSubtype?: string;
  onSelect: (suggestion: string) => void;
}
export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({
  contentType,
  contentSubtype,
  onSelect
}) => {
  const getSuggestions = () => {
    if (contentType === 'text') {
      switch (contentSubtype) {
        case 'caption':
          return ['A professional photo of our team collaborating in our new office space', 'A close-up shot of our new product with a minimal background', 'Behind-the-scenes look at our creative process'];
        case 'tweet':
          return ['Announcing our new feature that helps users save time', 'We', 'Sharing our thoughts on the latest industry trends'];
        case 'blog':
          return ['A beginner', '10 productivity tips for remote workers', 'How our latest product solves a common industry problem'];
        case 'script':
          return ['A 2-minute explainer video about our company mission', 'A tutorial showing how to use our product', 'Customer testimonial interview questions'];
        default:
          return ['Write a compelling story about our brand journey', 'Create a professional description of our services', 'Draft a welcome message for new customers'];
      }
    } else if (contentType === 'image') {
      return ['A minimalist logo with blue and green gradients', 'A product photo on a clean white background', 'An abstract digital illustration representing innovation'];
    } else if (contentType === 'audio') {
      return ['A professional podcast intro with upbeat background music', 'A calm meditation guidance with soft ambient sounds', 'A product announcement with subtle brand sound effects'];
    } else if (contentType === 'video') {
      return ['A product demonstration showing key features in action', 'An animated explainer video with professional voiceover', 'A customer testimonial compilation with subtle background music'];
    }
    return ['Create content that showcases our brand values', 'Generate professional material for our marketing campaign', 'Design content that explains our product benefits'];
  };
  const getTypeColor = () => {
    switch (contentType) {
      case 'text':
        return 'Background blue 50 border blue 200 hover background blue 100 dark background blue 900/20 dark border blue 800/30 dark hover background blue 900/30';
      case 'image':
        return 'Background purple 50 border purple 200 hover background purple 100 dark background purple 900/20 dark border purple 800/30 dark hover background purple 900/30';
      case 'audio':
        return 'Background amber 50 border amber 200 hover background amber 100 dark background amber 900/20 dark border amber 800/30 dark hover background amber 900/30';
      case 'video':
        return 'Background emerald 50 border emerald 200 hover background emerald 100 dark background emerald 900/20 dark border emerald 800/30 dark hover background emerald 900/30';
      default:
        return 'Background gray 50 border gray 200 hover background gray 100 dark background gray 900/20 dark border gray 800/30 dark hover background gray 900/30';
    }
  };
  const suggestions = getSuggestions();
  const typeColor = getTypeColor();
  return <div className="mt-2 space-y-2">
      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
        <SparklesIcon size={12} />
        Suggested prompts
      </p>
      <div className="space-y-2">
        {suggestions.map((suggestion, index) => <button key={index} onClick={() => onSelect(suggestion)} className={`w-full text-left text-sm p-2 rounded-md border transition-colors ${typeColor}`}>
            {suggestion}
          </button>)}
      </div>
    </div>;
};