/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RestaurantLogo } from '../../components/common/RestaurantLogo';
import { authService } from '../../services/auth';
import {
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
  Eye,
  EyeOff,
  UserCheck,
} from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onBackToSite: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onBackToSite,
}) => {
  const isFirstTimeSetup = !authService.hasConfiguredCredentials();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (isFirstTimeSetup) {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please re-enter.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }

      setIsLoading(true);
      try {
        const res = await authService.setupInitialCredentials(email, password);
        if (res.success) {
          onLoginSuccess();
        } else {
          setErrorMessage(res.error || 'Failed to initialize owner account.');
        }
      } catch {
        setErrorMessage('An error occurred during account setup. Please try again.');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Standard Sign In
    setIsLoading(true);
    try {
      const res = await authService.login(email, password);
      if (res.success) {
        onLoginSuccess();
      } else {
        setErrorMessage(res.error || 'Invalid credentials. Access restricted.');
      }
    } catch {
      setErrorMessage('Network verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
              {isFirstTimeSetup ? (
                <>
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>First-Time Owner Setup</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Confidential Owner Portal</span>
                </>
              )}
            </div>
            <p className="text-xs text-[#a0c2b0] mt-2">
              {isFirstTimeSetup
                ? 'Create your private owner email and password to secure this management console.'
                : 'Enter your confidential administrator credentials to access the CMS.'}
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
                  placeholder="admin@your-restaurant.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#092014] border border-[#14452f] rounded-lg text-white placeholder-[#587e6b] focus:outline-none focus:ring-1 focus:ring-[#c5a869] focus:border-[#c5a869]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold uppercase tracking-wider text-[#d0e2d8] mb-1.5"
              >
                {isFirstTimeSetup ? 'Create Secret Password' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#719b84] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isFirstTimeSetup ? 'new-password' : 'current-password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#092014] border border-[#14452f] rounded-lg text-white placeholder-[#587e6b] focus:outline-none focus:ring-1 focus:ring-[#c5a869] focus:border-[#c5a869]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#719b84] hover:text-[#c5a869] transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {isFirstTimeSetup && (
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#d0e2d8] mb-1.5"
                >
                  Confirm Secret Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#719b84] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#092014] border border-[#14452f] rounded-lg text-white placeholder-[#587e6b] focus:outline-none focus:ring-1 focus:ring-[#c5a869] focus:border-[#c5a869]"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold tracking-widest text-[#07170f] bg-[#c5a869] hover:bg-[#d8bd7e] active:bg-[#b09355] rounded-lg shadow-md transition-all duration-150 disabled:opacity-50"
            >
              {isLoading ? (
                <span>AUTHENTICATING...</span>
              ) : isFirstTimeSetup ? (
                <>
                  <span>CREATE OWNER CREDENTIALS & ENTER</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>SIGN IN TO DASHBOARD</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Confidentiality Notice */}
          <div className="mt-8 pt-6 border-t border-[#14452f] text-center">
            <p className="text-[11px] text-[#6d917d] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a869]" />
              <span>Strictly restricted to authorized restaurant administration.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
