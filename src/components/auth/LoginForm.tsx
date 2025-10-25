import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { toast } from 'sonner';
import { LogInIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon, AlertCircleIcon, SparklesIcon } from 'lucide-react';
import { mockUser } from '../../services/mockData';
export const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Validate inputs
    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }
    // Simulate authentication delay
    setTimeout(() => {
      try {
        // In a real app, this would call your authentication API
        // For this demo, we'll accept any email/password and use the mock user
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(mockUser));
        toast.success('Login successful', {
          description: 'Welcome back to your dashboard!'
        });
        navigate('/', {
          replace: true
        });
      } catch (err: any) {
        console.error('Login error:', err);
        setError('Invalid email or password');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };
  return <Card className="max-w-md w-full mx-auto shadow-2xl border-gray-200/50 dark:border-gray-700/50 hover:shadow-3xl transition-all duration-300">
      <div className="p-8 md:p-10">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3FE0A5] to-[#38B897] flex items-center justify-center text-white font-bold text-2xl shadow-2xl shadow-[#3FE0A5]/30 hover:shadow-3xl hover:shadow-[#3FE0A5]/40 transition-all duration-300 hover:scale-105 cursor-pointer">
              C
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Welcome back
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base">
            Sign in to your account to continue
          </p>
        </div>
        {/* Error Alert */}
        {error && <div className="mb-6 p-4 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/10 border border-red-200 dark:border-red-800/30 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-1 duration-200 shadow-sm">
            <AlertCircleIcon size={18} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-red-700 dark:text-red-300 font-medium">
              {error}
            </span>
          </div>}
        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative group">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${emailFocused ? 'text-[#3FE0A5]' : 'text-gray-400 dark:text-gray-500'}`}>
                <MailIcon size={18} />
              </div>
              <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)} className="pl-12 block w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-[#3FE0A5]/20 focus:border-[#3FE0A5] hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md" placeholder="you@example.com" />
            </div>
          </div>
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative group">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${passwordFocused ? 'text-[#3FE0A5]' : 'text-gray-400 dark:text-gray-500'}`}>
                <LockIcon size={18} />
              </div>
              <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)} className="pl-12 pr-12 block w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-[#3FE0A5]/20 focus:border-[#3FE0A5] hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md" placeholder="••••••••" />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-all duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95">
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
            </div>
          </div>
          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-[#3FE0A5] focus:ring-[#3FE0A5] border-gray-300 dark:border-gray-600 rounded transition-all duration-200 cursor-pointer hover:border-[#3FE0A5]" />
              <label htmlFor="remember-me" className="ml-2.5 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-semibold text-[#3FE0A5] hover:text-[#38B897] transition-colors duration-200 hover:underline underline-offset-4">
                Forgot password?
              </a>
            </div>
          </div>
          {/* Submit Button */}
          <div className="pt-2">
            <Button variant="primary" className="w-full justify-center bg-gradient-to-r from-[#3FE0A5] to-[#38B897] hover:from-[#38B897] hover:to-[#3FE0A5] shadow-xl shadow-[#3FE0A5]/30 hover:shadow-2xl hover:shadow-[#3FE0A5]/40 border-none py-3.5 text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" type="submit" leftIcon={loading ? null : <LogInIcon size={18} />} disabled={loading}>
              {loading ? <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div> : 'Sign in'}
            </Button>
          </div>
        </form>
        {/* Divider */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                Or continue with
              </span>
            </div>
          </div>
          {/* Social Login Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full justify-center py-3.5 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] hover:border-gray-300 dark:hover:border-gray-600 group">
              <svg className="w-5 h-5 mr-2.5 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              <span className="font-semibold">Google</span>
            </Button>
            <Button variant="outline" className="w-full justify-center py-3.5 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] hover:border-gray-300 dark:hover:border-gray-600 group">
              <svg className="w-5 h-5 mr-2.5 transition-transform duration-200 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">GitHub</span>
            </Button>
          </div>
        </div>
        {/* Sign Up Link */}
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <a href="/auth/register" className="font-semibold text-[#3FE0A5] hover:text-[#38B897] transition-colors duration-200 hover:underline underline-offset-4">
            Sign up
          </a>
        </p>
        {/* Demo Notice */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/30 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center flex-shrink-0">
              <SparklesIcon size={18} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 mb-1.5">
                Demo Mode
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
                This is a demo app. Any email/password combination will work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>;
};