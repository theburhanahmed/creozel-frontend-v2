import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { MainNavigation } from './components/layout/MainNavigation';
import { Dashboard } from './components/dashboard/Dashboard';
import { TextEditor } from './pages/content/TextEditor';
import { ImageEditor } from './pages/content/ImageEditor';
import { AudioEditor } from './pages/content/AudioEditor';
import { VideoEditor } from './pages/content/VideoEditor';
import { SocialMedia } from './pages/SocialMedia';
import { Analytics } from './pages/Analytics';
import { Calendar } from './pages/Calendar';
import { Messages } from './pages/Messages';
import { Team } from './pages/Team';
import { Settings } from './pages/Settings';
import { Help } from './pages/Help';
import { Toaster } from 'sonner';
import { AutopilotDashboard } from './pages/autopilot/AutopilotDashboard';
import { CreatePipeline } from './pages/autopilot/CreatePipeline';
import { VideoGenerator } from './pages/autopilot/VideoGenerator';
import { CustomTemplates } from './pages/autopilot/CustomTemplates';
import { PostScheduler } from './pages/autopilot/PostScheduler';
import { MediaLibrary } from './pages/autopilot/MediaLibrary';
import { EngagementAnalytics } from './pages/autopilot/EngagementAnalytics';
import { Login } from './pages/auth/Login';
import { AuthGuard } from './components/auth/AuthGuard';
import { SocialAccounts } from './pages/SocialAccounts';
import { MediaGallery } from './pages/MediaGallery';
import { AffiliatePage } from './pages/affiliate/AffiliatePage';
import { SkipLink } from './components/ui/SkipLink';
import { Breadcrumbs } from './components/ui/Breadcrumbs';
import { UsageHistory } from './pages/credits/UsageHistory';
import { AddCredits } from './pages/credits/AddCredits';
import { TransactionHistory } from './pages/credits/TransactionHistory';
import { ThemeProvider } from './components/ui/ThemeProvider';
import { FloatingActionMenu } from './components/ui/FloatingActionMenu';
import { AppProvider, useAppContext } from './context/AppContext';
import { UserProfile } from './pages/profile/UserProfile';
import { Notifications } from './pages/notifications/Notifications';
// Main application component
export function App() {
  return <AppProvider>
      <AppContent />
    </AppProvider>;
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
                  <SkipLink targetId="main-content" />
                  <MainNavigation />
                  <div className="flex min-h-screen w-full pt-20">
                    {/* Main content */}
                    <div className="flex-1 flex flex-col min-w-0 w-full transition-all duration-300">
                      <main id="main-content" className="flex-1 w-full px-4 py-4 md:py-6 max-w-screen-2xl mx-auto bg-gray-50 dark:bg-[#0A0E14] transition-colors duration-300 mb-16 md:mb-0">
                        {/* Add breadcrumbs */}
                        <Breadcrumbs autoGenerate={true} className="hidden md:block" />
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          {/* Profile Routes */}
                          <Route path="/profile" element={<UserProfile />} />
                          <Route path="/notifications" element={<Notifications />} />
                          <Route path="/content" element={<Navigate to="/content/text" replace />} />
                          <Route path="/content/text" element={<TextEditor />} />
                          <Route path="/content/image" element={<ImageEditor />} />
                          <Route path="/content/audio" element={<AudioEditor />} />
                          <Route path="/content/video" element={<VideoEditor />} />
                          {/* Autopilot Pipelines Routes */}
                          <Route path="/autopilot" element={<AutopilotDashboard />} />
                          <Route path="/autopilot/create" element={<CreatePipeline />} />
                          <Route path="/autopilot/video-generator" element={<VideoGenerator />} />
                          <Route path="/autopilot/templates" element={<CustomTemplates />} />
                          <Route path="/autopilot/scheduler" element={<PostScheduler />} />
                          <Route path="/autopilot/media" element={<MediaLibrary />} />
                          <Route path="/autopilot/analytics" element={<EngagementAnalytics />} />
                          {/* Credits Routes */}
                          <Route path="/credits/usage" element={<UsageHistory />} />
                          <Route path="/credits/add" element={<AddCredits />} />
                          <Route path="/credits/transactions" element={<TransactionHistory />} />
                          {/* Media Gallery */}
                          <Route path="/media" element={<MediaGallery />} />
                          {/* Customer-facing routes */}
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
                      </main>
                    </div>
                  </div>
                  {/* Floating Action Menu */}
                  <FloatingActionMenu position="bottom-right" />
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