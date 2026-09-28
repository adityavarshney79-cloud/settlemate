/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  ArrowRight, 
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  UserCheck,
  ShieldCheck,
  RotateCw,
  Volume2
} from 'lucide-react';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (email: string, password?: string) => { success: boolean; error?: string };
  onNavigate: (view: string) => void;
  users: User[];
}

// Generate random 5-character alphanumeric captcha
const generateCaptchaCode = (): string => {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // Exclude ambiguous 0, O, 1, I
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export default function Login({ onLogin, onNavigate, users }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Home Buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);

  // Captcha states
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  const refreshCaptcha = useCallback(() => {
    setCaptchaCode(generateCaptchaCode());
    setCaptchaInput('');
    setCaptchaError(false);
  }, []);

  useEffect(() => {
    refreshCaptcha();
  }, [refreshCaptcha]);

  const handleSpeakCaptcha = () => {
    if ('speechSynthesis' in window && captchaCode) {
      const spelledOut = captchaCode.split('').join(' ');
      const utterance = new SpeechSynthesisUtterance(`Security code: ${spelledOut}`);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleQuickRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCaptchaError(false);

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!password) {
      setError('Please enter your account password.');
      return;
    }

    // Strict CAPTCHA validation
    if (captchaInput.trim().toUpperCase() !== captchaCode.toUpperCase()) {
      setCaptchaError(true);
      setError('Invalid CAPTCHA security code. Please type the exact characters shown in the security box.');
      refreshCaptcha();
      return;
    }

    // Exact password credential verification
    const result = onLogin(email.trim().toLowerCase(), password);
    if (!result.success) {
      setError(result.error || 'Authentication failed. Please check your credentials.');
      refreshCaptcha();
    }
  };

  const handleForgotPass = () => {
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 4500);
  };

  return (
    <div 
      className="min-h-screen relative flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 text-slate-800 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.7)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&auto=format&fit=crop&q=80')`
      }}
      id="login-container-page"
    >
      {/* Top Brand & Navigation Bar */}
      <div className="w-full flex justify-between items-center max-w-5xl mx-auto pt-2">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 bg-[#de5d26] rounded-xl flex items-center justify-center shadow-md shadow-orange-950/20">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-xl font-black tracking-tight text-white drop-shadow-sm">SettleMate</span>
        </div>
        <button
          onClick={() => onNavigate('privacy')}
          className="text-xs font-semibold text-white/85 hover:text-white transition px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-xs cursor-pointer border border-white/10"
          id="login-top-privacy-btn"
        >
          Privacy Policy
        </button>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-auto py-4">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40 space-y-5">
          
          {/* Brand Header */}
          <div className="flex flex-col items-center text-center space-y-2.5" id="brand-header-block">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-tr from-[#de5d26] to-[#ff7b47] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-600/25">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9.5L12 3l9 6.5V20a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 20V9.5z" />
                  <path d="M9 21V12h6v9" />
                  <path d="M12 8v2" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-xs border border-orange-100">
                <ShieldCheck className="w-3.5 h-3.5 text-[#de5d26]" />
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                SettleMate
              </h1>
              <p className="text-[#de5d26] font-semibold text-xs tracking-wide">
                One Journey. One Coordinator.
              </p>
            </div>

            <div className="pt-1 border-t border-slate-100 w-full">
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                Welcome back
              </h2>
              <p className="text-slate-500 text-xs">
                Enter your credentials and security captcha to sign in
              </p>
            </div>
          </div>

          {/* "I am" Quick Role Switcher */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              I am
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5" id="role-selector-grid">
              {(['Home Buyer', 'Mortgage Adviser', 'Property Lawyer', 'Real Estate Agent'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleQuickRoleSelect(role)}
                  className={`py-2 px-2 text-[11px] font-bold rounded-xl border transition-all cursor-pointer truncate text-center ${
                    selectedRole === role
                      ? 'bg-[#de5d26] text-white border-[#de5d26] shadow-sm shadow-orange-500/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                  id={`role-btn-${role.replace(/\s+/g, '-').toLowerCase()}`}
                  title={`Select ${role}`}
                >
                  {role === 'Real Estate Agent' ? 'Real Estate Agent' : role}
                </button>
              ))}
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start space-x-2 animate-shake" id="login-error-alert">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="font-medium leading-relaxed">{error}</span>
            </div>
          )}

          {/* Forgot Password Success Toast */}
          {forgotSent && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-start space-x-2 animate-fade-in" id="forgot-success-alert">
              <UserCheck className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
              <span>Password recovery link dispatched to {email || 'your registered email'}!</span>
            </div>
          )}

          {/* Main Credentials Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* 1. Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1 pl-0.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                placeholder="you@example.com"
                className="block w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#de5d26] focus:border-[#de5d26] text-slate-800 bg-white placeholder-slate-400 transition shadow-2xs"
              />
            </div>

            {/* 2. Password */}
            <div>
              <div className="flex justify-between items-center mb-1 pl-0.5">
                <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPass}
                  className="text-[11px] font-semibold text-[#de5d26] hover:text-[#c84617] transition cursor-pointer"
                  id="login-forgot-link"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative rounded-lg">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  placeholder="Enter exact password"
                  className="block w-full pl-3.5 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#de5d26] focus:border-[#de5d26] text-slate-800 bg-white placeholder-slate-400 transition shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition p-1 rounded-lg focus:outline-none cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  id="toggle-password-visibility-btn"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* 3. CAPTCHA Security Verification as requested */}
            <div className="p-3.5 bg-slate-50/90 border border-slate-200/90 rounded-2xl space-y-2.5" id="login-captcha-section">
              <div className="flex items-center justify-between">
                <label htmlFor="captcha-input" className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#de5d26]" />
                  <span>Security CAPTCHA</span>
                  <span className="text-[#de5d26] ml-1">*</span>
                </label>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={handleSpeakCaptcha}
                    title="Audio CAPTCHA (Read aloud)"
                    className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 rounded-lg transition cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    title="Generate New CAPTCHA"
                    className="p-1 text-slate-500 hover:text-[#de5d26] hover:bg-slate-200/70 rounded-lg transition cursor-pointer"
                    id="refresh-captcha-btn"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Captcha Visual Box */}
              <div className="flex items-center gap-2">
                {/* Stylized high-contrast visual display */}
                <div 
                  className="flex-1 min-w-0 h-10 sm:h-11 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl flex items-center justify-center select-none relative overflow-hidden shadow-inner border border-slate-700 px-2 sm:px-3 cursor-pointer"
                  onClick={refreshCaptcha}
                  title="Click to refresh CAPTCHA code"
                >
                  {/* Visual distortion lines & noise texture */}
                  <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" preserveAspectRatio="none">
                    <line x1="0" y1="35%" x2="100%" y2="65%" stroke="#de5d26" strokeWidth="2.5" strokeDasharray="4 2" />
                    <line x1="0" y1="75%" x2="100%" y2="25%" stroke="#ffffff" strokeWidth="1.8" />
                    <line x1="20%" y1="0" x2="80%" y2="100%" stroke="#f97316" strokeWidth="1.2" opacity="0.6" />
                  </svg>
                  
                  {/* Captcha Characters with optimized sizing and safe margins for Android & mobile */}
                  <div className="flex items-center justify-center space-x-1 sm:space-x-1.5 text-sm sm:text-base font-mono font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10">
                    {captchaCode.split('').map((char, index) => {
                      const tilts = ['-rotate-3', 'rotate-3', '-rotate-6', 'rotate-6', '-rotate-2'];
                      const colors = ['text-orange-300', 'text-amber-200', 'text-white', 'text-emerald-300', 'text-sky-200'];
                      return (
                        <span 
                          key={index} 
                          className={`inline-block transform ${tilts[index % tilts.length]} ${colors[index % colors.length]} font-extrabold tracking-normal`}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Captcha Input */}
                <div className="w-28 sm:w-32 flex-shrink-0">
                  <input
                    id="captcha-input"
                    type="text"
                    required
                    maxLength={6}
                    value={captchaInput}
                    onChange={(e) => {
                      setCaptchaInput(e.target.value.toUpperCase());
                      setCaptchaError(false);
                      setError(null);
                    }}
                    placeholder="Enter code"
                    className={`block w-full px-2.5 py-2 sm:py-2.5 border rounded-xl text-xs font-mono font-bold tracking-wider text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 uppercase transition shadow-2xs ${
                      captchaError 
                        ? 'border-red-400 focus:ring-red-400 bg-red-50/50' 
                        : 'border-slate-300 focus:ring-[#de5d26] focus:border-[#de5d26]'
                    }`}
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-500 pl-0.5">
                Type the 5 characters shown above. Case-insensitive.
              </p>
            </div>

            {/* Submit Sign In Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#de5d26] hover:bg-[#c84617] transition active:scale-98 duration-150 cursor-pointer shadow-md shadow-orange-600/20"
              id="login-submit-button"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </form>

          {/* Navigation to Registration & Privacy */}
          <div className="text-center space-y-1.5 pt-1">
            <div>
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="text-xs font-bold text-[#de5d26] hover:text-[#c84617] transition cursor-pointer"
                id="login-register-link"
              >
                Don't have an account? Register profile
              </button>
            </div>
            <div className="flex items-center justify-center space-x-2.5">
              <button
                type="button"
                onClick={() => onNavigate('privacy')}
                className="text-[11px] text-slate-400 hover:text-slate-600 underline transition cursor-pointer"
                id="login-privacy-link"
              >
                Privacy Policy
              </button>
              <span className="text-slate-300 text-[10px]">•</span>
              <button
                type="button"
                onClick={() => onNavigate('cookies')}
                className="text-[11px] text-slate-400 hover:text-slate-600 underline transition cursor-pointer"
                id="login-cookies-link"
              >
                Cookie Policy
              </button>
              <span className="text-slate-300 text-[10px]">•</span>
              <button
                type="button"
                onClick={() => onNavigate('csa')}
                className="text-[11px] text-slate-400 hover:text-slate-600 underline transition cursor-pointer font-semibold"
                id="login-csa-link"
                title="Customer Service Agreement"
              >
                CSA
              </button>
              <span className="text-slate-300 text-[10px]">•</span>
              <button
                type="button"
                onClick={() => onNavigate('disclaimer')}
                className="text-[11px] text-slate-400 hover:text-slate-600 underline transition cursor-pointer"
                id="login-disclaimer-link"
              >
                Disclaimer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Disclaimer on Login Screen Only */}
      <div className="max-w-3xl mx-auto text-center px-4 pb-2" id="login-disclaimer-block">
        <p className="text-[11px] sm:text-xs text-white/85 leading-relaxed drop-shadow-sm bg-black/35 backdrop-blur-xs py-2 px-4 rounded-xl border border-white/10">
          <strong>Disclaimer:</strong> SettleMate is a real-time property coordination platform for home buyers and settlement professionals. SettleMate does not provide direct legal, mortgage lending, or real estate advisory services.
        </p>
      </div>
    </div>
  );
}
