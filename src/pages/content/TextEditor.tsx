import React, { useEffect, useState, createElement } from 'react';
import { useLocation } from 'react-router-dom';
import { ContentToolsSidebar } from '../../components/content/ContentToolsSidebar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileTextIcon, SparklesIcon, CopyIcon, DownloadIcon, RefreshCwIcon, SaveIcon, Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { BlogWriterTool, RewriterTool, TranslatorTool, SummarizerTool, SocialPostTool, EmailWriterTool } from '../../components/content/tools/WritingTools';
import { KeywordResearchTool, ContentExpanderTool, ContentShortenerTool, ContentDetectorTool, ParaphraserTool, GrammarCheckerTool, SEOOptimizerTool } from '../../components/content/tools/WritingToolsPhase2';
export const TextEditor: React.FC = () => {
  const location = useLocation();
  const [selectedTool, setSelectedTool] = useState<string | null>(location.state?.selectedTool || 'content-generator');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const handleGenerate = async (data: any) => {
    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Mock result based on tool
      let mockResult;
      switch (selectedTool) {
        case 'content-generator':
          mockResult = {
            text: `Generated content based on your prompt: "${data.prompt}"\n\nThis is a sample of AI-generated content that would be created using advanced language models. The content is tailored to your specific requirements including tone, length, and style preferences.\n\nKey points covered:\n• Main topic introduction\n• Supporting details and examples\n• Conclusion and call-to-action\n\nThis content can be further refined and customized to match your exact needs.`
          };
          break;
        case 'rewriter':
          mockResult = {
            text: `Rewritten version of your content:\n\n${data.text.split(' ').reverse().join(' ')}\n\nThis is a completely rewritten version that maintains the core message while using different wording and structure.`
          };
          break;
        case 'summarizer':
          mockResult = {
            summary: `Summary of your content:\n\nThis is a concise summary that captures the main points and key takeaways from the original text. The summary maintains the essential information while reducing the overall length.`,
            keyPoints: ['Main idea #1', 'Important concept #2', 'Key takeaway #3']
          };
          break;
        case 'content-translator':
          mockResult = {
            translatedText: `[Translated to ${data.targetLanguage}]\n\nThis is the translated version of your content, accurately conveying the meaning in the target language while maintaining the tone and style of the original.`,
            originalLanguage: 'English',
            targetLanguage: data.targetLanguage
          };
          break;
        case 'grammar-checker':
          mockResult = {
            correctedText: data.text,
            errors: [{
              type: 'spelling',
              original: 'recieve',
              corrected: 'receive',
              position: 45
            }, {
              type: 'grammar',
              original: 'was went',
              corrected: 'went',
              position: 102
            }],
            score: 92
          };
          break;
        case 'seo-optimizer':
          mockResult = {
            optimizedText: data.text,
            suggestions: ['Add more relevant keywords', 'Improve meta description', 'Optimize heading structure', 'Add internal links'],
            seoScore: 78,
            keywords: ['content', 'optimization', 'SEO', 'ranking']
          };
          break;
        default:
          mockResult = {
            text: 'Generated content would appear here.'
          };
      }
      setResult(mockResult);
      toast.success('Content generated successfully!');
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Failed to generate content');
    } finally {
      setIsGenerating(false);
    }
  };
  const handleCopy = () => {
    if (result?.text || result?.summary || result?.translatedText) {
      const textToCopy = result.text || result.summary || result.translatedText;
      navigator.clipboard.writeText(textToCopy);
      toast.success('Copied to clipboard!');
    }
  };
  const handleDownload = () => {
    if (result?.text || result?.summary || result?.translatedText) {
      const textToDownload = result.text || result.summary || result.translatedText;
      const blob = new Blob([textToDownload], {
        type: 'text/plain'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedTool}-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Downloaded successfully!');
    }
  };
  const handleSave = () => {
    toast.success('Saved to library!');
  };
  const renderToolInterface = () => {
    if (!selectedTool) return null;
    const toolProps = {
      isGenerating,
      result: result,
      onGenerate: handleGenerate
    };
    switch (selectedTool) {
      case 'content-generator':
        return <BlogWriterTool {...toolProps} />;
      case 'rewriter':
        return <RewriterTool {...toolProps} />;
      case 'content-translator':
        return <TranslatorTool {...toolProps} />;
      case 'summarizer':
        return <SummarizerTool {...toolProps} />;
      case 'keyword-research':
        return <KeywordResearchTool {...toolProps} />;
      case 'content-expander':
        return <ContentExpanderTool {...toolProps} />;
      case 'content-shortener':
        return <ContentShortenerTool {...toolProps} />;
      case 'content-detector':
        return <ContentDetectorTool {...toolProps} />;
      case 'paraphraser':
        return <ParaphraserTool {...toolProps} />;
      case 'grammar-checker':
        return <GrammarCheckerTool {...toolProps} />;
      case 'seo-optimizer':
        return <SEOOptimizerTool {...toolProps} />;
      default:
        return <div className="text-center py-12">
            <FileTextIcon size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Select a tool from the sidebar to get started
            </p>
          </div>;
    }
  };
  const renderResult = () => {
    if (!result) return null;
    return <Card className="mt-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <SparklesIcon size={20} className="text-blue-500" />
              Generated Result
            </h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" leftIcon={<CopyIcon size={16} />} onClick={handleCopy}>
                Copy
              </Button>
              <Button variant="outline" size="sm" leftIcon={<DownloadIcon size={16} />} onClick={handleDownload}>
                Download
              </Button>
              <Button variant="outline" size="sm" leftIcon={<SaveIcon size={16} />} onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
          {/* Display result based on type */}
          {result.text && <div className="prose dark:prose-invert max-w-none">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <pre className="whitespace-pre-wrap text-sm text-gray-900 dark:text-gray-100 font-sans">
                  {result.text}
                </pre>
              </div>
            </div>}
          {result.summary && <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <pre className="whitespace-pre-wrap text-sm text-gray-900 dark:text-gray-100 font-sans">
                  {result.summary}
                </pre>
              </div>
              {result.keyPoints && <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Key Points:
                  </h4>
                  <ul className="space-y-2">
                    {result.keyPoints.map((point: string, index: number) => <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        {point}
                      </li>)}
                  </ul>
                </div>}
            </div>}
          {result.translatedText && <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>
                  {result.originalLanguage} → {result.targetLanguage}
                </span>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <pre className="whitespace-pre-wrap text-sm text-gray-900 dark:text-gray-100 font-sans">
                  {result.translatedText}
                </pre>
              </div>
            </div>}
          {result.errors && <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Grammar Score: {result.score}/100
                </h4>
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300" style={{
                width: `${result.score}%`
              }} />
                </div>
              </div>
              <div className="space-y-2">
                {result.errors.map((error: any, index: number) => <div key={index} className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-amber-800 dark:text-amber-300 uppercase">
                        {error.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      <span className="line-through">{error.original}</span> →{' '}
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {error.corrected}
                      </span>
                    </p>
                  </div>)}
              </div>
            </div>}
          {result.seoScore !== undefined && <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  SEO Score: {result.seoScore}/100
                </h4>
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-300" style={{
                width: `${result.seoScore}%`
              }} />
                </div>
              </div>
              {result.keywords && <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Keywords:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map((keyword: string, index: number) => <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md text-xs font-medium">
                        {keyword}
                      </span>)}
                  </div>
                </div>}
              {result.suggestions && <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Suggestions:
                  </h5>
                  <ul className="space-y-2">
                    {result.suggestions.map((suggestion: string, index: number) => <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                          {suggestion}
                        </li>)}
                  </ul>
                </div>}
            </div>}
        </div>
      </Card>;
  };
  return <div className="flex gap-6 h-[calc(100vh-8rem)]">
      <ContentToolsSidebar currentCategory="writing" selectedTool={selectedTool} onSelectTool={setSelectedTool} />
      <div className="flex-1 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Text Content Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate, edit, and optimize text content with AI
          </p>
        </div>
        <Card>
          <div className="p-6">{renderToolInterface()}</div>
        </Card>
        {renderResult()}
      </div>
    </div>;
};