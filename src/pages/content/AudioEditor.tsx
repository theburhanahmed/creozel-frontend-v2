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
  MicIcon,
  SparklesIcon,
  DownloadIcon,
  SaveIcon,
  PlayIcon,
  PauseIcon,
  Volume2Icon,
  VolumeXIcon,
  Loader2Icon,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  TextToSpeechTool,
  SpeechToTextTool,
  MusicGeneratorTool,
} from '../../components/content/tools/AudioTools'
import { VoiceChangerTool } from '../../components/content/tools/AudioToolsPhase2'
import {
  TextToSoundTool,
  VoiceDesignTool,
  VoiceIsolatorTool,
  VoiceCloningToolEnhanced,
  AudioTranslatorToolEnhanced,
} from '../../components/content/tools/AudioToolsPhase2'
const VoiceCloningTool = ({ isGenerating, result, onGenerate }) => (
  <div className="text-center py-12">
    <MicIcon
      size={48}
      className="mx-auto text-gray-400 dark:text-gray-600 mb-4"
    />
    <p className="text-gray-600 dark:text-gray-400">
      Voice Cloning tool is coming soon
    </p>
    <Button
      variant="outline"
      className="mt-4"
      onClick={() =>
        onGenerate({
          text: 'Sample voice cloning',
        })
      }
      disabled={isGenerating}
    >
      {isGenerating ? 'Processing...' : 'Try Demo'}
    </Button>
  </div>
)
const AudioTranslatorTool = ({ isGenerating, result, onGenerate }) => (
  <div className="text-center py-12">
    <MicIcon
      size={48}
      className="mx-auto text-gray-400 dark:text-gray-600 mb-4"
    />
    <p className="text-gray-600 dark:text-gray-400">
      Audio Translator tool is coming soon
    </p>
    <Button
      variant="outline"
      className="mt-4"
      onClick={() =>
        onGenerate({
          sourceLanguage: 'English',
          targetLanguage: 'Spanish',
        })
      }
      disabled={isGenerating}
    >
      {isGenerating ? 'Processing...' : 'Try Demo'}
    </Button>
  </div>
)
const TextToSpeechTool = ({ isGenerating, result, onGenerate }) => {
  const [text, setText] = useState('')
  const [voice, setVoice] = useState('alloy')
  const [speed, setSpeed] = useState('1.0')
  const voiceOptions = [
    { value: 'alloy', label: 'Alloy (Neutral)' },
    { value: 'echo', label: 'Echo (Male)' },
    { value: 'fable', label: 'Fable (British Male)' },
    { value: 'onyx', label: 'Onyx (Deep Male)' },
    { value: 'nova', label: 'Nova (Female)' },
    { value: 'shimmer', label: 'Shimmer (Soft Female)' },
  ]
  const speedOptions = [
    { value: '0.5', label: '0.5x (Slow)' },
    { value: '0.75', label: '0.75x' },
    { value: '1.0', label: '1.0x (Normal)' },
    { value: '1.25', label: '1.25x' },
    { value: '1.5', label: '1.5x (Fast)' },
  ]
  return (
    <div className="space-y-6">
      <FormTextarea
        label="Text to Convert"
        placeholder="Enter the text you want to convert to speech..."
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        showCharCount
        maxLength={4000}
        helperText="Maximum 4000 characters"
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Voice"
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          options={voiceOptions}
          helperText="Choose the voice for your audio"
        />
        <FormSelect
          label="Speed"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          options={speedOptions}
          helperText="Adjust playback speed"
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
        onClick={() => onGenerate({ text, voice, speed })}
        disabled={isGenerating || !text.trim()}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        {isGenerating ? 'Generating...' : 'Generate Speech'}
      </Button>
    </div>
  )
}
const AudioTranscriberTool = ({ isGenerating, result, onGenerate }) => {
  const [file, setFile] = useState<File | null>(null)
  const [language, setLanguage] = useState('auto')
  const languageOptions = [
    { value: 'auto', label: 'Auto-detect' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'zh', label: 'Chinese' },
  ]
  return (
    <div className="space-y-6">
      <FileUpload
        label="Upload Audio File"
        accept="audio/*"
        maxSize={25}
        onFileSelect={setFile}
        helperText="MP3, WAV, M4A up to 25MB"
      />
      <FormSelect
        label="Language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        options={languageOptions}
        helperText="Select the language of the audio"
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
        onClick={() => onGenerate({ language })}
        disabled={isGenerating || !file}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        {isGenerating ? 'Transcribing...' : 'Transcribe Audio'}
      </Button>
    </div>
  )
}
const VoiceClonerTool = ({ isGenerating, result, onGenerate }) => {
  const [sourceFile, setSourceFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  return (
    <div className="space-y-6">
      <FileUpload
        label="Upload Voice Sample"
        accept="audio/*"
        maxSize={10}
        onFileSelect={setSourceFile}
        helperText="Upload a clear voice sample (MP3, WAV)"
      />
      <FormTextarea
        label="Text to Speak"
        placeholder="Enter the text you want to generate in the cloned voice..."
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        showCharCount
        maxLength={1000}
        helperText="The AI will generate speech in the voice from your sample"
        required
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
        onClick={() => onGenerate({ text })}
        disabled={isGenerating || !sourceFile || !text.trim()}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        {isGenerating ? 'Cloning Voice...' : 'Clone Voice'}
      </Button>
    </div>
  )
}
const AudioEnhancerTool = ({ isGenerating, result, onGenerate }) => {
  const [file, setFile] = useState<File | null>(null)
  const [enhanceType, setEnhanceType] = useState('noise-reduction')
  const enhanceOptions = [
    { value: 'noise-reduction', label: 'Noise Reduction' },
    { value: 'clarity', label: 'Enhance Clarity' },
    { value: 'volume', label: 'Normalize Volume' },
    { value: 'bass-boost', label: 'Bass Boost' },
    { value: 'treble-boost', label: 'Treble Boost' },
  ]
  return (
    <div className="space-y-6">
      <FileUpload
        label="Upload Audio File"
        accept="audio/*"
        maxSize={25}
        onFileSelect={setFile}
        helperText="MP3, WAV, M4A up to 25MB"
      />
      <FormSelect
        label="Enhancement Type"
        value={enhanceType}
        onChange={(e) => setEnhanceType(e.target.value)}
        options={enhanceOptions}
        helperText="Choose how to enhance your audio"
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
        onClick={() => onGenerate({ enhanceType })}
        disabled={isGenerating || !file}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        {isGenerating ? 'Enhancing...' : 'Enhance Audio'}
      </Button>
    </div>
  )
}
export const AudioEditor = () => {
  const location = useLocation()
  const [selectedTool, setSelectedTool] = useState<string | null>(
    location.state?.selectedTool || 'text-to-speech',
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
      await new Promise((resolve) => setTimeout(resolve, 3000))
      let mockResult
      switch (selectedTool) {
        case 'text-to-speech':
          mockResult = {
            audioUrl:
              'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            text: data.text,
            voice: data.voice,
            duration: 45,
          }
          break
        case 'speech-to-text':
          mockResult = {
            transcription: `This is a sample transcription of the audio file. The speech recognition system has converted the spoken words into written text with high accuracy. The system can handle multiple speakers, background noise, and various accents.`,
            confidence: 0.94,
            language: 'English',
            duration: 120,
          }
          break
        case 'music-generator':
          mockResult = {
            audioUrl:
              'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            genre: data.genre,
            mood: data.mood,
            duration: 180,
          }
          break
        case 'voice-changer':
          mockResult = {
            audioUrl:
              'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
            effect: data.effect,
            originalDuration: 60,
            processedDuration: 60,
          }
          break
        case 'voice-cloning':
          mockResult = {
            audioUrl:
              'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
            text: data.text,
            clonedFrom: 'Sample Voice',
            duration: 30,
          }
          break
        case 'audio-translator':
          mockResult = {
            audioUrl:
              'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
            originalLanguage: data.sourceLanguage,
            targetLanguage: data.targetLanguage,
            duration: 75,
          }
          break
        default:
          mockResult = {
            audioUrl:
              'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            duration: 60,
          }
      }
      setResult(mockResult)
      setDuration(mockResult.duration || 60)
      toast.success('Audio generated successfully!')
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Failed to generate audio')
    } finally {
      setIsGenerating(false)
    }
  }
  const handleDownload = () => {
    if (result?.audioUrl) {
      const a = document.createElement('a')
      a.href = result.audioUrl
      a.download = `${selectedTool}-${Date.now()}.mp3`
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
      case 'text-to-speech':
        return <TextToSpeechTool {...toolProps} />
      case 'music-generator':
        return <MusicGeneratorTool {...toolProps} />
      case 'speech-to-text':
        return <SpeechToTextTool {...toolProps} />
      case 'voice-changer':
        return <VoiceChangerTool {...toolProps} />
      case 'text-to-sound':
        return <TextToSoundTool {...toolProps} />
      case 'voice-design':
        return <VoiceDesignTool {...toolProps} />
      case 'voice-isolator':
        return <VoiceIsolatorTool {...toolProps} />
      case 'voice-cloning':
        return <VoiceCloningToolEnhanced {...toolProps} />
      case 'audio-translator':
        return <AudioTranslatorToolEnhanced {...toolProps} />
      default:
        return (
          <div className="text-center py-12">
            <MicIcon
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
              <SparklesIcon size={20} className="text-amber-500" />
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
          {/* Audio Player */}
          {result.audioUrl && (
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800/30">
                {/* Waveform Visualization */}
                <div className="mb-4 h-20 flex items-end gap-1 justify-center">
                  {Array.from({
                    length: 50,
                  }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-gradient-to-t from-amber-500 to-orange-500 rounded-full transition-all duration-300"
                      style={{
                        height: `${Math.random() * 100}%`,
                        opacity: isPlaying ? 1 : 0.3,
                        animation: isPlaying
                          ? `pulse ${0.5 + Math.random()}s ease-in-out infinite`
                          : 'none',
                      }}
                    />
                  ))}
                </div>
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                      style={{
                        width: `${(currentTime / duration) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 rounded-full bg-white/50 dark:bg-gray-800/50 flex items-center justify-center hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeXIcon
                        size={20}
                        className="text-gray-700 dark:text-gray-300"
                      />
                    ) : (
                      <Volume2Icon
                        size={20}
                        className="text-gray-700 dark:text-gray-300"
                      />
                    )}
                  </button>
                  <button
                    onClick={togglePlayPause}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl active:scale-95"
                  >
                    {isPlaying ? (
                      <PauseIcon size={28} className="text-white" />
                    ) : (
                      <PlayIcon size={28} className="text-white ml-1" />
                    )}
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/50 dark:bg-gray-800/50 flex items-center justify-center hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors">
                    <Volume2Icon
                      size={20}
                      className="text-gray-700 dark:text-gray-300"
                    />
                  </button>
                </div>
              </div>
              {/* Audio Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {result.voice && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Voice
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {result.voice}
                    </div>
                  </div>
                )}
                {result.genre && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Genre
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {result.genre}
                    </div>
                  </div>
                )}
                {result.mood && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Mood
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {result.mood}
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
              </div>
            </div>
          )}
          {/* Transcription Result */}
          {result.transcription && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    Transcription
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Confidence:
                    </span>
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                      {(result.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {result.transcription}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Language
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {result.language}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Duration
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatTime(result.duration)}
                  </div>
                </div>
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
        currentCategory="audio"
        selectedTool={selectedTool}
        onSelectTool={setSelectedTool}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Audio Content Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate, convert, and enhance audio content with AI
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
