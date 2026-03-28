import { Announcement, UserProfile } from '@/types/study';

const STORE_KEY_ANNOUNCEMENTS = 'umla_announcements';
const STORE_KEY_PROFILE = 'umla_profile';

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
  try {
    const stored = localStorage.getItem(STORE_KEY_ANNOUNCEMENTS);
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_ANNOUNCEMENTS;
}

export function saveAnnouncements(data: Announcement[]) {
  localStorage.setItem(STORE_KEY_ANNOUNCEMENTS, JSON.stringify(data));
}

export function getProfile(): UserProfile {
  try {
    const stored = localStorage.getItem(STORE_KEY_PROFILE);
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_PROFILE;
}

export function saveProfile(data: UserProfile) {
  localStorage.setItem(STORE_KEY_PROFILE, JSON.stringify(data));
}
