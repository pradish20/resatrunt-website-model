/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RestaurantLogo } from '../../components/common/RestaurantLogo';
import { authService } from '../../services/auth';
import { Lock, Mail, ArrowRight, ArrowLeft, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onBackToSite: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onBackToSite,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const demoCreds = authService.getDefaultDemoCredentials();
  const supabaseActive = isSupabaseConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await authService.login(email, password);
      if (res.success) {
        onLoginSuccess();
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please check your credentials.');
      }
    } catch {
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail(demoCreds.email);
    setPassword(demoCreds.initialPasswordHint);
  };

  return (
    <div className="min-h-screen bg-[#07170f] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial from-[#14452f]/30 via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* Back to Public Website Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-4">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#a0c2b0] hover:text-[#c5a869] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Green Family Restaurant</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-[#0f2e1e] py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-[#c5a869]/30 relative z-10">
          {/* Logo Lockup */}
          <div className="flex flex-col items-center text-center mb-8">
            <RestaurantLogo variant="light" size="lg" />
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14452f] border border-[#c5a869]/30 text-[11px] font-semibold tracking-wider text-[#c5a869] uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Owner Management Portal</span>
            </div>
            <p className="text-xs text-[#a0c2b0] mt-2">
              Sign in with your verified owner credentials to manage the restaurant CMS.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-lg bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#d0e2d8] mb-1.5"
              >
                Owner Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#719b84] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. owner@greenfamilyrestaurant.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#092014] border border-[#14452f] rounded-lg text-white placeholder-[#587e6b] focus:outline-none focus:ring-1 focus:ring-[#c5a869] focus:border-[#c5a869]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold uppercase tracking-wider text-[#d0e2d8] mb-1.5"
              >
                Owner Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#719b84] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#092014] border border-[#14452f] rounded-lg text-white placeholder-[#587e6b] focus:outline-none focus:ring-1 focus:ring-[#c5a869] focus:border-[#c5a869]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold tracking-widest text-[#07170f] bg-[#c5a869] hover:bg-[#d8bd7e] active:bg-[#b09355] rounded-lg shadow-md transition-all duration-150 disabled:opacity-50"
            >
              {isLoading ? (
                <span>VERIFYING CREDENTIALS...</span>
              ) : (
                <>
                  <span>SIGN IN TO DASHBOARD</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div className="mt-8 pt-6 border-t border-[#14452f] text-center">
            <div className="flex items-center justify-between text-[11px] text-[#86a895] mb-2">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#c5a869]" />
                <span>
                  {supabaseActive ? 'Supabase Auth Connected' : 'Initial Owner Credentials'}
                </span>
              </span>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-[#c5a869] hover:underline font-semibold"
              >
                Auto-fill
              </button>
            </div>
            <p className="text-[10px] text-[#6d917d] leading-relaxed text-left font-mono bg-[#092014] p-2.5 rounded border border-[#14452f]/60">
              Email: {demoCreds.email}
              <br />
              Initial Pass: {demoCreds.initialPasswordHint}
            </p>
            <p className="text-[10px] text-[#6d917d] mt-2 italic">
              You can change this password at any time in Admin Settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
