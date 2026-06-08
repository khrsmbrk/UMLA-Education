import { Announcement, UserProfile } from '@/types/study';

const STORE_KEY_ANNOUNCEMENTS = 'umla_announcements';
const STORE_KEY_PROFILE = 'umla_profile';

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

const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  { id: '1', judul: 'Jadwal UAS Semester Genap', isi: 'UAS akan dilaksanakan pada tanggal 15-25 Juni 2026.', kategori: 'Akademik', tanggal: '2026-03-28', aktif: true },
  { id: '2', judul: 'Pembayaran UKT Periode 2', isi: 'Batas pembayaran UKT periode 2 adalah 30 April 2026.', kategori: 'Keuangan', tanggal: '2026-03-25', aktif: true },
  { id: '3', judul: 'Maintenance Portal', isi: 'Portal akan maintenance pada 5 April 2026 pukul 00:00-06:00.', kategori: 'Sistem', tanggal: '2026-03-20', aktif: false },
];

const DEFAULT_PROFILE: UserProfile = {
  name: 'Ahmad Mahasiswa',
  email: 'ahmad@student.umla.ac.id',
  nim: '2023010001',
  role: 'Mahasiswa',
  joinedAt: '2023-09-01',
};

export function getAnnouncements(): Announcement[] {
  return getStoredData(STORE_KEY_ANNOUNCEMENTS, DEFAULT_ANNOUNCEMENTS);
}

export function saveAnnouncements(data: Announcement[]) {
  saveStoredData(STORE_KEY_ANNOUNCEMENTS, data);
}

export function getProfile(): UserProfile {
  return getStoredData(STORE_KEY_PROFILE, DEFAULT_PROFILE);
}

export function saveProfile(data: UserProfile) {
  saveStoredData(STORE_KEY_PROFILE, data);
  window.dispatchEvent(new Event('umla-profile-updated'));
}
