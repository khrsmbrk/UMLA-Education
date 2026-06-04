## Perubahan pada `src/pages/Schedule.tsx`

### 1. Perbaiki "+ NEW CLASS" agar tersimpan & muncul
- Ganti konstanta `MOCK_SCHEDULE` menjadi state: `const [schedule, setSchedule] = useState<any[]>([])`.
- Pada `handleCreateSlot`, buat objek slot baru dengan struktur yang dipakai render (`id`, `dayOfWeek`, `startTime`, `endTime`, `location`, `type`, `course: { name, code }`) lalu `setSchedule(prev => [...prev, newItem])` sebelum menutup modal.
- `groupedSchedule` dihitung dari state `schedule`, sehingga kelas baru langsung tampil pada hari yang dipilih.
- Persist ke `localStorage` (key `umla_schedule`) via `useEffect` agar tidak hilang saat refresh — konsisten dengan pola `mockStore.ts` yang sudah dipakai project.

### 2. Dropdown Day: Senin–Sabtu (Inggris)
- Update konstanta:
  ```ts
  const DAYS = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
  ```
- Dropdown otomatis ikut karena di-render dari `DAYS.map(...)`.

### 3. Update label minggu
- Ganti teks `Week 7` menjadi `Week 11` pada blok header kanan ("CURRENT WEEK").

### 4. Hapus data dummy
- Hapus seluruh isi awal `MOCK_SCHEDULE` (state awal `schedule` = `[]`).
- Empty state "No classes scheduled" sudah ada, jadi tampilan tetap rapi saat kosong.

### Catatan
- Tidak ada perubahan pada file lain.
- Tidak menambah backend; persistensi pakai `localStorage` mengikuti pola existing.
