import React, { useEffect, useState, createElement } from 'react'
import { useLocation } from 'react-router-dom'
import { ContentToolsSidebar } from '../../components/content/ContentToolsSidebar'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { FileUpload } from '../../components/ui/FileUpload'
import { FormInput } from '../../components/ui/FormInput'
import { FormTextarea } from '../../components/ui/FormTextarea'
import { FormSelect } from '../../components/ui/FormSelect'
import {
  VideoIcon,
  SparklesIcon,
  DownloadIcon,
  SaveIcon,
  PlayIcon,
  PauseIcon,
  Volume2Icon,
  VolumeXIcon,
  MaximizeIcon,
  SettingsIcon,
  YoutubeIcon,
  Loader2Icon,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  TextToVideoTool,
  ImageToVideoTool,
} from '../../components/content/tools/VideoTools'
import {
  YouTubeTranscriberTool,
  CaptionsGeneratorTool,
  VideoFaceSwapTool,
} from '../../components/content/tools/VideoToolsPhase2'
import {
  YouTubeTranslatorTool,
  ChatWithYouTubeTool,
} from '../../components/content/tools/VideoToolsPhase3'
const YouTubeSummarizerTool = ({ isGenerating, result, onGenerate }) => (
  <div className="space-y-6">
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          YouTube URL
        </label>
        <input
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500"
        />
      </div>
      <Button
        variant="primary"
        size="lg"
        leftIcon={
          isGenerating ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <YoutubeIcon />
          )
        }
        onClick={() =>
          onGenerate({
            url: 'https://www.youtube.com/watch?v=example',
          })
        }
        disabled={isGenerating}
        className="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:opacity-90"
      >
        {isGenerating ? 'Summarizing...' : 'Summarize Video'}
      </Button>
    </div>
  </div>
)
const VideoFaceSwapTool = ({ isGenerating, result, onGenerate }) => (
  <div className="text-center py-12">
    <VideoIcon
      size={48}
      className="mx-auto text-gray-400 dark:text-gray-600 mb-4"
    />
    <p className="text-gray-600 dark:text-gray-400">
      Video Face Swap tool is coming soon
    </p>
    <Button
      variant="outline"
      className="mt-4"
      onClick={() => onGenerate({})}
      disabled={isGenerating}
    >
      {isGenerating ? 'Processing...' : 'Try Demo'}
    </Button>
  </div>
)
const VideoGeneratorTool = ({ isGenerating, result, onGenerate }) => {
  const [prompt, setPrompt] = useState('')
  const [duration, setDuration] = useState('5')
  const [style, setStyle] = useState('realistic')
  const durationOptions = [
    { value: '3', label: '3 seconds' },
    { value: '5', label: '5 seconds' },
    { value: '10', label: '10 seconds' },
  ]
  const styleOptions = [
    { value: 'realistic', label: 'Realistic' },
    { value: 'animated', label: 'Animated' },
    { value: 'cinematic', label: 'Cinematic' },
    { value: 'artistic', label: 'Artistic' },
  ]
  return (
    <div className="space-y-6">
      <FormTextarea
        label="Video Description"
        placeholder="Describe the video you want to generate..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        showCharCount
        maxLength={500}
        helperText="Be specific about the scene, actions, and style"
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          options={durationOptions}
          helperText="Video length"
        />
        <FormSelect
          label="Style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          options={styleOptions}
          helperText="Visual style"
        />
      </div>
      <Button
        variant="primary"
        size="lg"
        leftIcon={
          isGenerating ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <SparklesIcon />
          )
        }
        onClick={() => onGenerate({ prompt, duration, style })}
        disabled={isGenerating || !prompt.trim()}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        {isGenerating ? 'Generating...' : 'Generate Video'}
      </Button>
    </div>
  )
}
const ImageToVideoTool = ({ isGenerating, result, onGenerate }) => {
  const [file, setFile] = useState<File | null>(null)
  const [motion, setMotion] = useState('medium')
  const [duration, setDuration] = useState('5')
  const motionOptions = [
    { value: 'low', label: 'Low Motion' },
    { value: 'medium', label: 'Medium Motion' },
    { value: 'high', label: 'High Motion' },
  ]
  const durationOptions = [
    { value: '3', label: '3 seconds' },
    { value: '5', label: '5 seconds' },
    { value: '10', label: '10 seconds' },
  ]
  return (
    <div className="space-y-6">
      <FileUpload
        label="Upload Image"
        accept="image/*"
        maxSize={10}
        onFileSelect={setFile}
        helperText="PNG, JPG, WEBP up to 10MB"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Motion Intensity"
          value={motion}
          onChange={(e) => setMotion(e.target.value)}
          options={motionOptions}
          helperText="Amount of movement"
        />
        <FormSelect
          label="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          options={durationOptions}
          helperText="Video length"
        />
      </div>
      <Button
        variant="primary"
        size="lg"
        leftIcon={
          isGenerating ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <SparklesIcon />
          )
        }
        onClick={() => onGenerate({ motion, duration })}
        disabled={isGenerating || !file}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        {isGenerating ? 'Creating Video...' : 'Create Video'}
      </Button>
    </div>
  )
}
const VideoEditorTool = ({ isGenerating, result, onGenerate }) => {
  const [file, setFile] = useState<File | null>(null)
  const [editType, setEditType] = useState('trim')
  const editOptions = [
    { value: 'trim', label: 'Trim Video' },
    { value: 'crop', label: 'Crop Video' },
    { value: 'speed', label: 'Change Speed' },
    { value: 'filter', label: 'Apply Filter' },
    { value: 'subtitle', label: 'Add Subtitles' },
  ]
  return (
    <div className="space-y-6">
      <FileUpload
        label="Upload Video"
        accept="video/*"
        maxSize={100}
        onFileSelect={setFile}
        helperText="MP4, MOV, AVI up to 100MB"
      />
      <FormSelect
        label="Edit Type"
        value={editType}
        onChange={(e) => setEditType(e.target.value)}
        options={editOptions}
        helperText="Choose the type of edit"
      />
      <Button
        variant="primary"
        size="lg"
        leftIcon={
          isGenerating ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <SparklesIcon />
          )
        }
        onClick={() => onGenerate({ editType })}
        disabled={isGenerating || !file}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        {isGenerating ? 'Processing...' : 'Edit Video'}
      </Button>
    </div>
  )
}
export const VideoEditor = () => {
  const location = useLocation()
  const [selectedTool, setSelectedTool] = useState<string | null>(
    location.state?.selectedTool || 'text-to-video',
  )
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const handleGenerate = async (data: any) => {
    setIsGenerating(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 4000))
      let mockResult
      switch (selectedTool) {
        case 'text-to-video':
          mockResult = {
            videoUrl:
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            thumbnail:
              'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=60',
            prompt: data.prompt,
            duration: 30,
            resolution: '1920x1080',
            fps: 30,
          }
          break
        case 'image-to-video':
          mockResult = {
            videoUrl:
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            thumbnail:
              'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=60',
            duration: 15,
            resolution: '1920x1080',
            fps: 24,
          }
          break
        case 'youtube-summarizer':
          mockResult = {
            summary: `This video provides a comprehensive overview of AI and machine learning concepts. Key topics covered include:\n\n• Introduction to neural networks and deep learning\n• Practical applications in various industries\n• Future trends and developments in AI\n• Ethical considerations and responsible AI development\n\nThe presenter explains complex concepts in an accessible way, making it suitable for both beginners and intermediate learners.`,
            keyPoints: [
              'Neural networks form the foundation of modern AI',
              'Deep learning has revolutionized computer vision and NLP',
              'AI is being applied across healthcare, finance, and transportation',
              'Ethical AI development is crucial for responsible innovation',
            ],
            duration: 840,
            videoUrl: data.url,
          }
          break
        case 'youtube-transcriber':
          mockResult = {
            transcription: `[00:00] Welcome to this comprehensive guide on artificial intelligence and machine learning.\n\n[00:15] In this video, we'll explore the fundamental concepts that power modern AI systems.\n\n[00:30] Let's start with neural networks, which are the building blocks of deep learning.\n\n[01:00] Neural networks are inspired by the human brain and consist of interconnected nodes.\n\n[01:30] These networks can learn patterns from data and make predictions.`,
            language: 'English',
            duration: 840,
            timestamps: true,
          }
          break
        case 'captions-generator':
          mockResult = {
            captions: [
              {
                start: 0,
                end: 3,
                text: 'Welcome to our video tutorial',
              },
              {
                start: 3,
                end: 6,
                text: 'Today we will learn about AI',
              },
              {
                start: 6,
                end: 10,
                text: 'Artificial Intelligence is transforming industries',
              },
              {
                start: 10,
                end: 14,
                text: 'Let us explore the key concepts together',
              },
            ],
            format: 'SRT',
            language: 'English',
          }
          break
        case 'video-face-swap':
          mockResult = {
            videoUrl:
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            thumbnail:
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60',
            duration: 25,
            resolution: '1920x1080',
            fps: 30,
          }
          break
        default:
          mockResult = {
            videoUrl:
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            thumbnail:
              'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=60',
            duration: 30,
          }
      }
      setResult(mockResult)
      setDuration(mockResult.duration || 30)
      toast.success('Video processed successfully!')
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Failed to process video')
    } finally {
      setIsGenerating(false)
    }
  }
  const handleDownload = () => {
    if (result?.videoUrl) {
      const a = document.createElement('a')
      a.href = result.videoUrl
      a.download = `${selectedTool}-${Date.now()}.mp4`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      toast.success('Downloaded successfully!')
    }
  }
  const handleSave = () => {
    toast.success('Saved to library!')
  }
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }
  const toggleMute = () => {
    setIsMuted(!isMuted)
  }
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  const renderToolInterface = () => {
    if (!selectedTool) return null
    const toolProps = {
      isGenerating,
      result,
      onGenerate: handleGenerate,
    }
    switch (selectedTool) {
      case 'text-to-video':
        return <TextToVideoTool {...toolProps} />
      case 'image-to-video':
        return <ImageToVideoTool {...toolProps} />
      case 'youtube-summarizer':
        return <YouTubeSummarizerTool {...toolProps} />
      case 'youtube-transcriber':
        return <YouTubeTranscriberTool {...toolProps} />
      case 'youtube-translator':
        return <YouTubeTranslatorTool {...toolProps} />
      case 'chat-with-youtube':
        return <ChatWithYouTubeTool {...toolProps} />
      case 'captions-generator':
        return <CaptionsGeneratorTool {...toolProps} />
      case 'video-face-swap':
        return <VideoFaceSwapTool {...toolProps} />
      default:
        return (
          <div className="text-center py-12">
            <VideoIcon
              size={48}
              className="mx-auto text-gray-400 dark:text-gray-600 mb-4"
            />
            <p className="text-gray-600 dark:text-gray-400">
              Select a tool from the sidebar to get started
            </p>
          </div>
        )
    }
  }
  const renderResult = () => {
    if (!result) return null
    return (
      <Card className="mt-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <SparklesIcon size={20} className="text-rose-500" />
              Generated Result
            </h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<DownloadIcon size={16} />}
                onClick={handleDownload}
              >
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<SaveIcon size={16} />}
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </div>
          {/* Video Player */}
          {result.videoUrl && (
            <div className="space-y-4">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                {/* Video Thumbnail/Preview */}
                <img
                  src={result.thumbnail}
                  alt="Video preview"
                  className="w-full h-full object-cover"
                />
                {/* Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <button
                    onClick={togglePlayPause}
                    className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-all shadow-lg hover:shadow-xl active:scale-95"
                  >
                    {isPlaying ? (
                      <PauseIcon size={32} className="text-gray-900" />
                    ) : (
                      <PlayIcon size={32} className="text-gray-900 ml-1" />
                    )}
                  </button>
                </div>
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500 transition-all duration-300"
                        style={{
                          width: `${(currentTime / duration) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlayPause}
                        className="text-white hover:text-rose-400 transition-colors"
                      >
                        {isPlaying ? (
                          <PauseIcon size={20} />
                        ) : (
                          <PlayIcon size={20} />
                        )}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="text-white hover:text-rose-400 transition-colors"
                      >
                        {isMuted ? (
                          <VolumeXIcon size={20} />
                        ) : (
                          <Volume2Icon size={20} />
                        )}
                      </button>
                      <span className="text-xs text-white font-medium">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="text-white hover:text-rose-400 transition-colors">
                        <SettingsIcon size={20} />
                      </button>
                      <button className="text-white hover:text-rose-400 transition-colors">
                        <MaximizeIcon size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Video Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {result.resolution && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Resolution
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {result.resolution}
                    </div>
                  </div>
                )}
                {result.fps && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Frame Rate
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {result.fps} FPS
                    </div>
                  </div>
                )}
                {result.duration && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Duration
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatTime(result.duration)}
                    </div>
                  </div>
                )}
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Format
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    MP4
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Summary Result */}
          {result.summary && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Video Summary
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {result.summary}
                </p>
              </div>
              {result.keyPoints && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Key Points
                  </h4>
                  <ul className="space-y-2">
                    {result.keyPoints.map((point: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {/* Transcription Result */}
          {result.transcription && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Transcription
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {result.language}
                </span>
              </div>
              <pre className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
                {result.transcription}
              </pre>
            </div>
          )}
          {/* Captions Result */}
          {result.captions && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Generated Captions
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {result.format} Format
                </span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {result.captions.map((caption: any, index: number) => (
                  <div
                    key={index}
                    className="p-2 bg-white dark:bg-gray-900/50 rounded border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {formatTime(caption.start)} → {formatTime(caption.end)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {caption.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    )
  }
  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      <ContentToolsSidebar
        currentCategory="video"
        selectedTool={selectedTool}
        onSelectTool={setSelectedTool}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Video Content Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate, edit, and analyze video content with AI
          </p>
        </div>
        <Card>
          <div className="p-6">{renderToolInterface()}</div>
        </Card>
        {renderResult()}
      </div>
    </div>
  )
}
