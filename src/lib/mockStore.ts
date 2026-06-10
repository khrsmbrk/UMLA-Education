import { Announcement, UserProfile } from '@/types/study';

// ============ Storage keys ============
const STORE_KEY_ANNOUNCEMENTS = 'umla_announcements';
const STORE_KEY_USERS = 'umla_users';
const STORE_KEY_SESSION = 'umla_session';

// ============ Low-level helpers ============
export function getStoredData<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored) as T;
  } catch {}
  return fallback;
}

export function saveStoredData<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('umla-store-updated', { detail: { key } }));
}

// ============ Per-user data helpers ============
// All page-level data (tasks, notes, grades, etc) is scoped to the current user id.
function userKey(key: string) {
  const uid = getCurrentUserId() || 'guest';
  return `umla_u_${uid}_${key}`;
}

export function getUserData<T>(key: string, fallback: T): T {
  return getStoredData(userKey(key), fallback);
}

export function saveUserData<T>(key: string, data: T) {
  saveStoredData(userKey(key), data);
}

// ============ Users registry & auth ============
export interface StoredUser extends UserProfile {
  id: string;
  password: string;
  status: 'pending' | 'active';
}

const DEMO_USER: StoredUser = {
  id: 'demo',
  name: 'Ahmad Mahasiswa',
  email: 'ahmad@student.umla.ac.id',
  nim: '2023010001',
  password: 'demo1234',
  role: 'Mahasiswa',
  joinedAt: '2023-09-01',
  status: 'active',
};

export function getAllUsers(): StoredUser[] {
  return getStoredData<StoredUser[]>(STORE_KEY_USERS, [DEMO_USER]);
}

export function saveAllUsers(users: StoredUser[]) {
  saveStoredData(STORE_KEY_USERS, users);
}

export function registerUser(input: { name: string; email: string; nim: string; password: string }): { ok: boolean; error?: string } {
  const users = getAllUsers();
  if (users.some(u => u.email.toLowerCase() === input.email.toLowerCase())) {
    return { ok: false, error: 'Email sudah terdaftar' };
  }
  if (users.some(u => u.nim === input.nim)) {
    return { ok: false, error: 'NIM sudah terdaftar' };
  }
  const newUser: StoredUser = {
    id: Date.now().toString(),
    name: input.name,
    email: input.email,
    nim: input.nim,
    password: input.password,
    role: 'Mahasiswa',
    joinedAt: new Date().toISOString().split('T')[0],
    status: 'pending',
  };
  saveAllUsers([...users, newUser]);
  return { ok: true };
}

export function loginUser(identifier: string, password: string): { ok: boolean; error?: string } {
  const users = getAllUsers();
  const id = identifier.trim().toLowerCase();
  const user = users.find(u => u.email.toLowerCase() === id || u.nim.toLowerCase() === id || u.name.toLowerCase() === id);
  if (!user) return { ok: false, error: 'Akun tidak ditemukan' };
  if (user.password !== password) return { ok: false, error: 'Password salah' };
  if (user.status !== 'active') return { ok: false, error: 'Akun menunggu persetujuan Admin' };
  setCurrentUserId(user.id);
  return { ok: true };
}

export function logoutUser() {
  localStorage.removeItem(STORE_KEY_SESSION);
  window.dispatchEvent(new Event('umla-profile-updated'));
}

export function getCurrentUserId(): string | null {
  try { return localStorage.getItem(STORE_KEY_SESSION); } catch { return null; }
}

export function setCurrentUserId(id: string) {
  localStorage.setItem(STORE_KEY_SESSION, id);
  window.dispatchEvent(new Event('umla-profile-updated'));
}

export function getCurrentUser(): StoredUser | null {
  const id = getCurrentUserId();
  if (!id) return null;
  return getAllUsers().find(u => u.id === id) || null;
}

// ============ Profile (current user) ============
export function getProfile(): UserProfile {
  const u = getCurrentUser();
  if (u) {
    const { password, status, id, ...profile } = u;
    return profile;
  }
  return { name: 'Guest', email: '', nim: '', role: 'Mahasiswa', joinedAt: new Date().toISOString().split('T')[0] };
}

export function saveProfile(data: UserProfile) {
  const id = getCurrentUserId();
  if (!id) return;
  const users = getAllUsers();
  const updated = users.map(u => u.id === id ? { ...u, ...data } : u);
  saveAllUsers(updated);
  window.dispatchEvent(new Event('umla-profile-updated'));
}

export function changePassword(oldPw: string, newPw: string): { ok: boolean; error?: string } {
  const id = getCurrentUserId();
  if (!id) return { ok: false, error: 'Belum login' };
  const users = getAllUsers();
  const u = users.find(x => x.id === id);
  if (!u) return { ok: false, error: 'User tidak ditemukan' };
  if (u.password !== oldPw) return { ok: false, error: 'Password lama salah' };
  saveAllUsers(users.map(x => x.id === id ? { ...x, password: newPw } : x));
  return { ok: true };
}

export function approveUser(id: string) {
  const users = getAllUsers();
  saveAllUsers(users.map(u => u.id === id ? { ...u, status: 'active' } : u));
}

// ============ Announcements (global) ============
const DEFAULT_ANNOUNCEMENTS: Announcement[] = [];

export function getAnnouncements(): Announcement[] {
  return getStoredData(STORE_KEY_ANNOUNCEMENTS, DEFAULT_ANNOUNCEMENTS);
}

export function saveAnnouncements(data: Announcement[]) {
  saveStoredData(STORE_KEY_ANNOUNCEMENTS, data);
}
