/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { getSupabaseConfigStatus } from '../../../lib/supabase';
import { authService } from '../../../services/auth';
import { dbService } from '../../../services/db';
import {
  Key,
  Database,
  Copy,
  Check,
  RefreshCw,
  AlertTriangle,
  Server,
  Lock,
} from 'lucide-react';
import { ConfirmModal } from '../../../components/common/ConfirmModal';

interface SettingsTabProps {
  onNotify: (type: 'success' | 'error' | 'info', message: string) => void;
  onDataReset: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  onNotify,
  onDataReset,
}) => {
  const supabaseStatus = getSupabaseConfigStatus();

  // Password Change State
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);

  // SQL Copy State
  const [copiedSql, setCopiedSql] = useState(false);

  // Reset Modal
  const [showResetModal, setShowResetModal] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      onNotify('error', 'New passwords do not match. Please verify.');
      return;
    }
    if (newPassword.length < 6) {
      onNotify('error', 'Password must be at least 6 characters long.');
      return;
    }

    setIsChangingPass(true);
    try {
      const user = authService.getCurrentUser();
      const emailToUse = newEmail.trim() || user?.email || 'owner@greenfamilyrestaurant.com';
      const success = await authService.changeCredentials(emailToUse, newPassword);

      if (success) {
        onNotify('success', 'Owner login credentials updated successfully!');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        onNotify('error', 'Failed to update credentials.');
      }
    } finally {
      setIsChangingPass(false);
    }
  };

  const copySqlSchema = () => {
    const sql = dbService.generateSupabaseSQL();
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    onNotify('success', 'Supabase SQL script copied to clipboard!');
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const handleResetConfirm = () => {
    dbService.resetToInitialDefaults();
    onDataReset();
    setShowResetModal(false);
    onNotify('success', 'Database restored to initial restaurant seed data.');
  };

  return (
    <div className="space-y-8 max-w-4xl animate-fade-in">
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl font-serif font-bold text-slate-900">
          Settings & Cloud Integration
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review database connection status, copy Supabase migration scripts, update owner credentials, and manage data.
        </p>
      </div>

      {/* 1. Database & Supabase Status */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Database className="w-4 h-4 text-[#0f3822]" />
          <h3 className="font-serif font-bold text-base text-slate-900">
            Database & Storage Infrastructure
          </h3>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                supabaseStatus.isConfigured ? 'bg-emerald-500 ring-4 ring-emerald-100' : 'bg-amber-500 ring-4 ring-amber-100'
              }`}
            />
            <div>
              <div className="text-xs font-bold text-slate-800">
                {supabaseStatus.isConfigured
                  ? 'Supabase Cloud Database & Storage Active'
                  : 'Local High-Performance Persistent Storage Mode Active'}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {supabaseStatus.isConfigured
                  ? `Connected to: ${supabaseStatus.url}`
                  : 'Currently storing all restaurant settings, menu items, and gallery changes in browser persistent storage with instant live reactivity.'}
              </div>
            </div>
          </div>
        </div>

        {/* Setup Guide Accordion Box */}
        <div className="p-4 rounded-lg bg-[#f4f7f5] border border-[#14452f]/20 text-xs text-[#20392b] space-y-2">
          <div className="font-bold flex items-center gap-2 text-[#0f3822]">
            <Server className="w-4 h-4" />
            <span>How to Connect Your Real Supabase Project:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-[11.5px] leading-relaxed text-[#3b5546]">
            <li>
              Create a free project at <strong>supabase.com</strong>.
            </li>
            <li>
              Copy the SQL schema using the button below and paste it into Supabase’s <strong>SQL Editor</strong>, then click <strong>Run</strong>.
            </li>
            <li>
              Add your credentials into your project environment file (<code>.env</code>):
              <div className="bg-[#092014] text-[#d4e6dc] font-mono p-2.5 rounded mt-1 text-[11px]">
                VITE_SUPABASE_URL=https://your-project.supabase.co
                <br />
                VITE_SUPABASE_ANON_KEY=your-anon-key-here
              </div>
            </li>
          </ol>
        </div>

        {/* Copy SQL Button */}
        <div>
          <button
            type="button"
            onClick={copySqlSchema}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0f3822] bg-white border border-[#0f3822]/30 hover:bg-[#edf3ef] rounded-md transition-colors"
          >
            {copiedSql ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>SQL Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#a3833e]" />
                <span>Copy Supabase PostgreSQL Migration Script</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Change Owner Credentials */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Key className="w-4 h-4 text-[#0f3822]" />
          <h3 className="font-serif font-bold text-base text-slate-900">
            Owner Security & Credentials
          </h3>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                Owner Email Address
              </label>
              <input
                type="email"
                placeholder="owner@greenfamilyrestaurant.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822] text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                placeholder="At least 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822] text-slate-900"
              />
            </div>
          </div>

          <div className="sm:w-1/2">
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0f3822] text-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={isChangingPass}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#0f3822] hover:bg-[#14452f] rounded-md transition-colors"
          >
            <Lock className="w-3.5 h-3.5 text-[#c5a869]" />
            <span>Update Owner Password</span>
          </button>
        </form>
      </div>

      {/* 3. Data Reset / Demo Seed */}
      <div className="bg-white p-6 rounded-xl border border-red-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-red-100 pb-3">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <h3 className="font-serif font-bold text-base text-red-900">
            Danger Zone
          </h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Restore the website back to the original Green Family Restaurant seed data (including all 4 authentic photos, full Indian menu categories, and baseline chapters).
        </p>

        <button
          type="button"
          onClick={() => setShowResetModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset All Content to Initial Defaults</span>
        </button>
      </div>

      <ConfirmModal
        isOpen={showResetModal}
        title="Reset All Restaurant Content?"
        message="This will overwrite current edits with the original authentic starter data. Are you sure you wish to continue?"
        confirmLabel="Reset Content"
        isDestructive={true}
        onConfirm={handleResetConfirm}
        onCancel={() => setShowResetModal(false)}
      />
    </div>
  );
};
