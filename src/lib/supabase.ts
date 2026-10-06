/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const rawSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function isValidHttpUrl(val?: unknown): boolean {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (
    trimmed === '' ||
    trimmed.includes('placeholder') ||
    trimmed.includes('your-project-ref')
  ) {
    return false;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function isValidAnonKey(val?: unknown): boolean {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  return (
    trimmed !== '' &&
    !trimmed.includes('placeholder') &&
    !trimmed.includes('your-anon-public-key') &&
    trimmed.length > 10
  );
}

export const isSupabaseConfigured = (): boolean => {
  return isValidHttpUrl(rawSupabaseUrl) && isValidAnonKey(rawSupabaseAnonKey);
};

let clientInstance: SupabaseClient | null = null;

if (isSupabaseConfigured()) {
  try {
    const cleanUrl = String(rawSupabaseUrl).trim();
    const cleanKey = String(rawSupabaseAnonKey).trim();
    clientInstance = createClient(cleanUrl, cleanKey);
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    clientInstance = null;
  }
}

export const supabase: SupabaseClient | null = clientInstance;

export const getSupabaseConfigStatus = () => {
  return {
    isConfigured: Boolean(clientInstance && isSupabaseConfigured()),
    url: typeof rawSupabaseUrl === 'string' ? rawSupabaseUrl : null,
    hasKey: Boolean(rawSupabaseAnonKey),
  };
};
