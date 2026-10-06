/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AdminUser } from '../types/restaurant';

const AUTH_STORAGE_KEYS = {
  SESSION_TOKEN: 'gfr_admin_session_token_v1',
  USER_DATA: 'gfr_admin_user_data_v1',
  AUTH_CREDS_HASH: 'gfr_owner_creds_hash_v1',
  OWNER_EMAIL: 'gfr_owner_email_v1',
};

// SHA-256 cryptographic hash helper
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const authService = {
  hasConfiguredCredentials(): boolean {
    if (isSupabaseConfigured()) return true;
    const storedHash = localStorage.getItem(AUTH_STORAGE_KEYS.AUTH_CREDS_HASH);
    return Boolean(storedHash && storedHash.length > 10);
  },

  async setupInitialCredentials(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      return { success: false, error: 'Email and password are required.' };
    }
    if (cleanPass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: cleanPass,
        });
        if (error) return { success: false, error: error.message };
        if (data?.user) {
          const user: AdminUser = {
            id: data.user.id,
            email: data.user.email || cleanEmail,
            name: 'Restaurant Owner',
            role: 'owner',
          };
          sessionStorage.setItem(AUTH_STORAGE_KEYS.SESSION_TOKEN, data.session?.access_token || 'supabase_token');
          sessionStorage.setItem(AUTH_STORAGE_KEYS.USER_DATA, JSON.stringify(user));
          return { success: true, user };
        }
      } catch (err: unknown) {
        console.warn('Supabase sign-up attempt error:', err);
      }
    }

    // Save secret cryptographic hash to local storage
    const hash = await sha256(`${cleanEmail}:${cleanPass}`);
    localStorage.setItem(AUTH_STORAGE_KEYS.AUTH_CREDS_HASH, hash);
    localStorage.setItem(AUTH_STORAGE_KEYS.OWNER_EMAIL, cleanEmail);

    const user: AdminUser = {
      id: 'owner_master_id',
      email: cleanEmail,
      name: 'Restaurant Owner',
      role: 'owner',
    };
    const sessionToken = `token_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    sessionStorage.setItem(AUTH_STORAGE_KEYS.SESSION_TOKEN, sessionToken);
    sessionStorage.setItem(AUTH_STORAGE_KEYS.USER_DATA, JSON.stringify(user));

    return { success: true, user };
  },

  async login(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      return { success: false, error: 'Email and password are required.' };
    }

    // 1. If Supabase Auth is configured, use real Supabase Auth
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPass,
        });

        if (error) {
          return { success: false, error: error.message };
        }

        if (data?.user) {
          const user: AdminUser = {
            id: data.user.id,
            email: data.user.email || cleanEmail,
            name: data.user.user_metadata?.full_name || 'Restaurant Owner',
            role: 'owner',
          };
          sessionStorage.setItem(AUTH_STORAGE_KEYS.SESSION_TOKEN, data.session?.access_token || 'supabase_token');
          sessionStorage.setItem(AUTH_STORAGE_KEYS.USER_DATA, JSON.stringify(user));
          return { success: true, user };
        }
      } catch (err: unknown) {
        console.warn('Supabase auth attempt error:', err);
      }
    }

    // 2. Hash verification
    const inputHash = await sha256(`${cleanEmail}:${cleanPass}`);
    const storedHash = localStorage.getItem(AUTH_STORAGE_KEYS.AUTH_CREDS_HASH);

    if (storedHash && inputHash === storedHash) {
      const user: AdminUser = {
        id: 'owner_master_id',
        email: cleanEmail,
        name: 'Restaurant Owner',
        role: 'owner',
      };
      const sessionToken = `token_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      sessionStorage.setItem(AUTH_STORAGE_KEYS.SESSION_TOKEN, sessionToken);
      sessionStorage.setItem(AUTH_STORAGE_KEYS.USER_DATA, JSON.stringify(user));
      return { success: true, user };
    }

    return {
      success: false,
      error: 'Invalid email or password. Access restricted to restaurant owner.',
    };
  },

  async logout(): Promise<void> {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.error('Supabase sign out error:', e);
      }
    }
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.SESSION_TOKEN);
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.USER_DATA);
  },

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem(AUTH_STORAGE_KEYS.SESSION_TOKEN);
    return Boolean(token && token.length > 5);
  },

  getCurrentUser(): AdminUser | null {
    if (!this.isAuthenticated()) return null;
    try {
      const data = sessionStorage.getItem(AUTH_STORAGE_KEYS.USER_DATA);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  async changeCredentials(newEmail: string, newPassword: string): Promise<boolean> {
    const cleanEmail = newEmail.trim().toLowerCase();
    const cleanPass = newPassword.trim();
    if (!cleanEmail || !cleanPass) return false;

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.auth.updateUser({
          email: cleanEmail,
          password: cleanPass,
        });
      } catch (e) {
        console.warn('Supabase credential update error:', e);
      }
    }

    const newHash = await sha256(`${cleanEmail}:${cleanPass}`);
    localStorage.setItem(AUTH_STORAGE_KEYS.AUTH_CREDS_HASH, newHash);
    localStorage.setItem(AUTH_STORAGE_KEYS.OWNER_EMAIL, cleanEmail);

    const user: AdminUser = {
      id: 'owner_master_id',
      email: cleanEmail,
      name: 'Restaurant Owner',
      role: 'owner',
    };
    sessionStorage.setItem(AUTH_STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    return true;
  },
};
