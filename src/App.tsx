import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainNavigation } from './components/layout/MainNavigation';
import { Toaster } from 'sonner';
import { Login } from './pages/auth/Login';
import { AuthGuard } from './components/auth/AuthGuard';
import { SkipLink } from './components/ui/SkipLink';
import { Breadcrumbs } from './components/ui/Breadcrumbs';
import { ThemeProvider } from './components/ui/ThemeProvider';
import { FloatingActionMenu } from './components/ui/FloatingActionMenu';
import { AppProvider, useAppContext } from './context/AppContext';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { LoadingState } from './components/ui/LoadingState';
// Lazy load pages for better performance
const Dashboard = lazy(() => import('./components/dashboard/Dashboard').then(m => ({
  default: m.Dashboard
})));
const TextEditor = lazy(() => import('./pages/content/TextEditor').then(m => ({
  default: m.TextEditor
})));
const ImageEditor = lazy(() => import('./pages/content/ImageEditor').then(m => ({
  default: m.ImageEditor
})));
const AudioEditor = lazy(() => import('./pages/content/AudioEditor').then(m => ({
  default: m.AudioEditor
})));
const VideoEditor = lazy(() => import('./pages/content/VideoEditor').then(m => ({
  default: m.VideoEditor
})));
const ContentLibrary = lazy(() => import('./pages/content/ContentLibrary').then(m => ({
  default: m.ContentLibrary
})));
const ContentHub = lazy(() => import('./pages/content/ContentHub').then(m => ({
  default: m.ContentHub
})));
const SocialMedia = lazy(() => import('./pages/SocialMedia').then(m => ({
  default: m.SocialMedia
})));
const Analytics = lazy(() => import('./pages/Analytics').then(m => ({
  default: m.Analytics
})));
const Calendar = lazy(() => import('./pages/Calendar').then(m => ({
  default: m.Calendar
})));
const Messages = lazy(() => import('./pages/Messages').then(m => ({
  default: m.Messages
})));
const Team = lazy(() => import('./pages/Team').then(m => ({
  default: m.Team
})));
const Settings = lazy(() => import('./pages/Settings').then(m => ({
  default: m.Settings
})));
const Help = lazy(() => import('./pages/Help').then(m => ({
  default: m.Help
})));
const AutopilotDashboard = lazy(() => import('./pages/autopilot/AutopilotDashboard').then(m => ({
  default: m.AutopilotDashboard
})));
const CreatePipeline = lazy(() => import('./pages/autopilot/CreatePipeline').then(m => ({
  default: m.CreatePipeline
})));
const VideoGenerator = lazy(() => import('./pages/autopilot/VideoGenerator').then(m => ({
  default: m.VideoGenerator
})));
const CustomTemplates = lazy(() => import('./pages/autopilot/CustomTemplates').then(m => ({
  default: m.CustomTemplates
})));
const PostScheduler = lazy(() => import('./pages/autopilot/PostScheduler').then(m => ({
  default: m.PostScheduler
})));
const MediaLibrary = lazy(() => import('./pages/autopilot/MediaLibrary').then(m => ({
  default: m.MediaLibrary
})));
const EngagementAnalytics = lazy(() => import('./pages/autopilot/EngagementAnalytics').then(m => ({
  default: m.EngagementAnalytics
})));
const SocialAccounts = lazy(() => import('./pages/SocialAccounts').then(m => ({
  default: m.SocialAccounts
})));
const MediaGallery = lazy(() => import('./pages/MediaGallery').then(m => ({
  default: m.MediaGallery
})));
const AffiliatePage = lazy(() => import('./pages/affiliate/AffiliatePage').then(m => ({
  default: m.AffiliatePage
})));
const UsageHistory = lazy(() => import('./pages/credits/UsageHistory').then(m => ({
  default: m.UsageHistory
})));
const AddCredits = lazy(() => import('./pages/credits/AddCredits').then(m => ({
  default: m.AddCredits
})));
const TransactionHistory = lazy(() => import('./pages/credits/TransactionHistory').then(m => ({
  default: m.TransactionHistory
})));
const UserProfile = lazy(() => import('./pages/profile/UserProfile').then(m => ({
  default: m.UserProfile
})));
const Notifications = lazy(() => import('./pages/notifications/Notifications').then(m => ({
  default: m.Notifications
})));
const WorkflowDashboard = lazy(() => import('./pages/workflow/WorkflowDashboard').then(m => ({
  default: m.WorkflowDashboard
})));
const PerformanceAnalytics = lazy(() => import('./pages/analytics/PerformanceAnalytics').then(m => ({
  default: m.PerformanceAnalytics
})));
const ABTestingDashboard = lazy(() => import('./pages/analytics/ABTestingDashboard').then(m => ({
  default: m.ABTestingDashboard
})));
const AudienceInsights = lazy(() => import('./pages/analytics/AudienceInsights').then(m => ({
  default: m.AudienceInsights
})));
const CollaborationHub = lazy(() => import('./pages/collaboration/CollaborationHub').then(m => ({
  default: m.CollaborationHub
})));
const TeamWorkspace = lazy(() => import('./pages/collaboration/TeamWorkspace').then(m => ({
  default: m.TeamWorkspace
})));
const VersionHistory = lazy(() => import('./pages/collaboration/VersionHistory').then(m => ({
  default: m.VersionHistory
})));
// Loading fallback component
const PageLoader = () => <div className="flex items-center justify-center min-h-[60vh]">
    <LoadingState variant="spinner" size="lg" text="Loading..." />
  </div>;
// Main application component
export function App() {
  return <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>;
}
// Separate component to use the context
function AppContent() {
  const {
    isDarkMode
  } = useAppContext();
  return <ThemeProvider defaultTheme={isDarkMode ? 'dark' : 'light'}>
      <BrowserRouter>
        <div className="relative min-h-screen w-full bg-gray-50 dark:bg-[#0A0E14] transition-colors duration-300">
          <Routes>
            {/* Public auth routes */}
            <Route path="/auth/login" element={<Login />} />
            {/* Protected app routes */}
            <Route path="/*" element={<AuthGuard>
                  <ErrorBoundary>
                    <SkipLink targetId="main-content" />
                    <MainNavigation />
                    <div className="flex min-h-screen w-full pt-20">
                      <div className="flex-1 flex flex-col min-w-0 w-full transition-all duration-300">
                        <main id="main-content" className="flex-1 w-full px-4 py-4 md:py-6 max-w-screen-2xl mx-auto bg-gray-50 dark:bg-[#0A0E14] transition-colors duration-300 mb-16 md:mb-0" role="main" aria-label="Main content">
                          <Breadcrumbs autoGenerate={true} className="hidden md:block" />
                          <Suspense fallback={<PageLoader />}>
                            <Routes>
                              <Route path="/" element={<Dashboard />} />
                              <Route path="/profile" element={<UserProfile />} />
                              <Route path="/notifications" element={<Notifications />} />
                              <Route path="/content" element={<ContentHub />} />
                              <Route path="/content/text" element={<TextEditor />} />
                              <Route path="/content/image" element={<ImageEditor />} />
                              <Route path="/content/audio" element={<AudioEditor />} />
                              <Route path="/content/video" element={<VideoEditor />} />
                              <Route path="/content/library" element={<ContentLibrary />} />
                              <Route path="/autopilot" element={<AutopilotDashboard />} />
                              <Route path="/autopilot/create" element={<CreatePipeline />} />
                              <Route path="/autopilot/video-generator" element={<VideoGenerator />} />
                              <Route path="/autopilot/templates" element={<CustomTemplates />} />
                              <Route path="/autopilot/scheduler" element={<PostScheduler />} />
                              <Route path="/autopilot/media" element={<MediaLibrary />} />
                              <Route path="/autopilot/analytics" element={<EngagementAnalytics />} />
                              <Route path="/workflow" element={<WorkflowDashboard />} />
                              <Route path="/analytics/performance" element={<PerformanceAnalytics />} />
                              <Route path="/analytics/ab-testing" element={<ABTestingDashboard />} />
                              <Route path="/analytics/audience" element={<AudienceInsights />} />
                              <Route path="/collaboration" element={<CollaborationHub />} />
                              <Route path="/collaboration/workspace/:id" element={<TeamWorkspace />} />
                              <Route path="/collaboration/history/:id" element={<VersionHistory />} />
                              <Route path="/credits/usage" element={<UsageHistory />} />
                              <Route path="/credits/add" element={<AddCredits />} />
                              <Route path="/credits/transactions" element={<TransactionHistory />} />
                              <Route path="/media" element={<MediaGallery />} />
                              <Route path="/social" element={<SocialMedia />} />
                              <Route path="/analytics" element={<Analytics />} />
                              <Route path="/calendar" element={<Calendar />} />
                              <Route path="/messages" element={<Messages />} />
                              <Route path="/team" element={<Team />} />
                              <Route path="/affiliate" element={<AffiliatePage />} />
                              <Route path="/settings" element={<Settings />} />
                              <Route path="/help" element={<Help />} />
                              <Route path="/social-accounts" element={<SocialAccounts />} />
                              <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                          </Suspense>
                        </main>
                      </div>
                    </div>
                    <FloatingActionMenu position="bottom-right" />
                  </ErrorBoundary>
                </AuthGuard>} />
          </Routes>
          <Toaster position="top-right" theme={isDarkMode ? 'dark' : 'light'} toastOptions={{
          style: {
            background: isDarkMode ? '#1A2234' : '#FFFFFF',
            border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
            borderRadius: '0.75rem',
            padding: '1rem',
            color: isDarkMode ? '#F3F4F6' : '#1F2937',
            boxShadow: isDarkMode ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }
        }} />
        </div>
      </BrowserRouter>
    </ThemeProvider>;
}