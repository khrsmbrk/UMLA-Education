export interface CourseGrade {
  id: string;
  matkul: string;
  sks: number;
  grade: string;
  score: number;
  nilaiAngka: number;
  nilaiHuruf: string;
  catatan?: string;
}

export interface Semester {
  semester: string;
  gpa: string;
  records: CourseGrade[];
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  status: string;
  category: string;
  invoiceNumber: string;
  createdAt: string;
  buktiUrl?: string;
}

export interface Announcement {
  id: string;
  judul: string;
  isi: string;
  kategori: 'Akademik' | 'Umum' | 'Keuangan' | 'Sistem';
  tanggal: string;
  aktif: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  nim: string;
  role: string;
  joinedAt: string;
  avatarUrl?: string;
}
