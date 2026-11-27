/* data.js — Semua angka di situs ini.
   Sumber ditulis sebagai teks di setiap halaman yang memakai angka itu.
   Tidak ada angka yang dikarang: semua berasal dari rilis resmi yang
   tercantum di samping angka. Satuan: jiwa, km persegi, persen, rupiah. */

"use strict";

/* ---------- Indikator kunci nasional ---------- */
const INDICATORS = [
  {
    id: "penduduk",
    label: "Jumlah Penduduk",
    value: "281,6 juta jiwa",
    detail: "Pertengahan tahun 2024",
    source: "BPS, Proyeksi Penduduk Interim 2020–2023 (pertengahan tahun 2024)",
  },
  {
    id: "pdb",
    label: "PDB (harga berlaku)",
    value: "Rp22.139,0 triliun",
    detail: "Tahun 2024",
    source: "BPS, Berita Resmi Statistik No. 17/02/Th. XXVIII, 5 Februari 2025",
  },
  {
    id: "pdbKapita",
    label: "PDB per Kapita",
    value: "Rp78,62 juta",
    detail: "Tahun 2024 (setara US$4.960,33)",
    source: "BPS, Berita Resmi Statistik No. 17/02/Th. XXVIII, 5 Februari 2025",
  },
  {
    id: "inflasi",
    label: "Inflasi (y-on-y)",
    value: "1,57%",
    detail: "Desember 2024 terhadap Desember 2023",
    source: "BPS, Berita Resmi Statistik inflasi Desember 2024",
  },
  {
    id: "tpt",
    label: "Tingkat Pengangguran Terbuka",
    value: "4,91%",
    detail: "Agustus 2024 (7,47 juta orang menganggur)",
    source: "BPS, Booklet Sakernas Agustus 2024",
  },
  {
    id: "miskin",
    label: "Tingkat Kemiskinan",
    value: "8,57%",
    detail: "September 2024 (24,06 juta jiwa)",
    source: "BPS, Berita Resmi Statistik kemiskinan September 2024",
  },
];

/* ---------- Deret waktu nasional ---------- */
/* Penduduk pertengahan tahun, juta jiwa — BPS (Sensus 2020 untuk 2020,
   Proyeksi Penduduk Interim untuk 2021–2024). */
const POPULATION_SERIES = [
  { year: 2019, value: 268.1 },
  { year: 2020, value: 270.2 },
  { year: 2021, value: 272.7 },
  { year: 2022, value: 275.8 },
  { year: 2023, value: 278.7 },
  { year: 2024, value: 281.6 },
];

/* Laju pertumbuhan penduduk, persen per tahun — BPS. */
const POPULATION_GROWTH = 1.04; /* 2024 terhadap 2023 */

/* PDB atas dasar harga berlaku, triliun rupiah — BPS. */
const GDP_SERIES = [
  { year: 2019, value: 15833.9 },
  { year: 2020, value: 15434.2 },
  { year: 2021, value: 16976.7 },
  { year: 2022, value: 19588.4 },
  { year: 2023, value: 20892.4 },
  { year: 2024, value: 22139.0 },
];

/* Pertumbuhan ekonomi (c-to-c), persen — BPS. */
const GROWTH_SERIES = [
  { year: 2019, value: 5.02 },
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.7 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

/* Inflasi year-on-year bulan Desember, persen — BPS. */
const INFLATION_SERIES = [
  { year: 2019, value: 2.72 },
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

/* Kontribusi lapangan usaha terhadap PDB, persen, 2024 — BPS. */
const SECTORS_2024 = [
  { label: "Industri pengolahan", value: 18.98 },
  { label: "Perdagangan besar dan eceran", value: 13.07 },
  { label: "Pertanian, kehutanan, dan perikanan", value: 12.61 },
  { label: "Konstruksi", value: 10.09 },
  { label: "Pertambangan dan penggalian", value: 9.15 },
  { label: "Lapangan usaha lainnya", value: 36.1 },
];

/* ---------- Struktur umur ---------- */
/* SUPAS 2025 — BPS, dirilis 5 Mei 2025. Total penduduk 284,67 juta jiwa. */
const AGE_GROUPS_2025 = [
  { label: "0–14 tahun (anak)", value: 23.44, color: "#2e7d5b" },
  { label: "15–64 tahun (produktif)", value: 68.94, color: "#c8102e" },
  { label: "65 tahun ke atas (lansia)", value: 7.62, color: "#e0a100" },
];
const DEPENDENCY_RATIO_2025 = 45.05; /* per 100 penduduk produktif */

/* Komposisi penduduk menurut generasi, persen — BPS, SUPAS 2025. */
const GENERATIONS_2025 = [
  { label: "Gen Z (1997–2012)", value: 24.93 },
  { label: "Milenial (1981–1996)", value: 24.34 },
  { label: "Gen X (1965–1980)", value: 19.7 },
  { label: "Post Gen Z (2013 ke atas)", value: 19.65 },
  { label: "Baby Boomer (1945–1964)", value: 10.31 },
  { label: "Pre-Boomer (sebelum 1945)", value: 1.07 },
];

/* ---------- Provinsi ---------- */
/* Penduduk: BPS, Proyeksi Penduduk Interim 2020–2023, pertengahan 2024.
   Luas wilayah: BPS, Statistik Indonesia 2026 (data Badan Informasi
   Geospasial, surat Desember 2024). Total luas Indonesia 1.890.179,78 km2.
   IPM: BPS, Indeks Pembangunan Manusia 2024. */
const PROVINCES = [
  { name: "Aceh", population: 5554800, area: 56835.019, ipm: 74.03 },
  { name: "Sumatera Utara", population: 15588500, area: 72437.755, ipm: 74.02 },
  { name: "Sumatera Barat", population: 5836200, area: 42107.674, ipm: 74.49 },
  { name: "Riau", population: 6728100, area: 89900.78, ipm: 74.79 },
  { name: "Jambi", population: 3724300, area: 49023.037, ipm: 73.43 },
  { name: "Sumatera Selatan", population: 8837300, area: 86771.918, ipm: 72.3 },
  { name: "Bengkulu", population: 2112200, area: 20122.21, ipm: 73.39 },
  { name: "Lampung", population: 9419600, area: 33570.758, ipm: 71.81 },
  { name: "Kepulauan Bangka Belitung", population: 1531500, area: 16670.225, ipm: 73.33 },
  { name: "Kepulauan Riau", population: 2183300, area: 8170.375, ipm: 77.97 },
  { name: "DKI Jakarta", population: 10684900, area: 661.53, ipm: 83.08 },
  { name: "Jawa Barat", population: 50345200, area: 37053.331, ipm: 74.43 },
  { name: "Jawa Tengah", population: 37892300, area: 34347.428, ipm: 73.88 },
  { name: "DI Yogyakarta", population: 3759500, area: 3170.363, ipm: 81.55 },
  { name: "Jawa Timur", population: 41814500, area: 48055.876, ipm: 74.09 },
  { name: "Banten", population: 12431400, area: 9355.763, ipm: 74.48 },
  { name: "Bali", population: 4433300, area: 5582.827, ipm: 77.76 },
  { name: "Nusa Tenggara Barat", population: 5646000, area: 19631.991, ipm: 70.93 },
  { name: "Nusa Tenggara Timur", population: 5656000, area: 46378.105, ipm: 67.39 },
  { name: "Kalimantan Barat", population: 5695500, area: 147018.063, ipm: 70.13 },
  { name: "Kalimantan Tengah", population: 2809700, area: 153430.363, ipm: 72.73 },
  { name: "Kalimantan Selatan", population: 4273400, area: 37125.426, ipm: 73.03 },
  { name: "Kalimantan Timur", population: 4045900, area: 126951.758, ipm: 78.83 },
  { name: "Kalimantan Utara", population: 739800, area: 69900.886, ipm: 73.02 },
  { name: "Sulawesi Utara", population: 2701800, area: 14488.429, ipm: 75.03 },
  { name: "Sulawesi Tengah", population: 3121800, area: 61496.983, ipm: 71.56 },
  { name: "Sulawesi Selatan", population: 9463400, area: 45323.975, ipm: 74.05 },
  { name: "Sulawesi Tenggara", population: 2793100, area: 36139.303, ipm: 73.48 },
  { name: "Gorontalo", population: 1227800, area: 12024.982, ipm: 71.23 },
  { name: "Sulawesi Barat", population: 1503200, area: 16590.667, ipm: 68.2 },
  { name: "Maluku", population: 1945600, area: 46133.832, ipm: 71.57 },
  { name: "Maluku Utara", population: 1355600, area: 31465.977, ipm: 71.03 },
  { name: "Papua Barat", population: 578700, area: 60308.59, ipm: 67.02 },
  { name: "Papua Barat Daya", population: 627100, area: 39103.058, ipm: 68.63 },
  { name: "Papua", population: 1060600, area: 81383.315, ipm: 73.0 },
  { name: "Papua Selatan", population: 542100, area: 117858.969, ipm: 67.9 },
  { name: "Papua Tengah", population: 1472900, area: 61079.587, ipm: 59.75 },
  { name: "Papua Pegunungan", population: 1467000, area: 52508.656, ipm: 53.42 },
];

/* Sepuluh provinsi berpenduduk terbesar, 2024 — diturunkan dari tabel di atas. */
const TOP_PROVINCES = PROVINCES.slice()
  .sort(function (a, b) { return b.population - a.population; })
  .slice(0, 10);

/* Fakta ketenagakerjaan — BPS, Sakernas Agustus 2024. */
const LABOUR_2024 = {
  workingAge: "215,37 juta orang",
  labourForce: "152,11 juta orang",
  employed: "144,64 juta orang",
  unemployed: "7,47 juta orang",
  tpt: 4.91,
  informalShare: 57.95,
  source: "BPS, Booklet Sakernas Agustus 2024",
};

/* Fakta kemiskinan — BPS, September 2024. */
const POVERTY_2024 = {
  rate: 8.57,
  count: "24,06 juta jiwa",
  line: "Rp595.242 per kapita per bulan",
  source: "BPS, Berita Resmi Statistik kemiskinan September 2024",
};

window.STATS_DATA = {
  INDICATORS: INDICATORS,
  POPULATION_SERIES: POPULATION_SERIES,
  POPULATION_GROWTH: POPULATION_GROWTH,
  GDP_SERIES: GDP_SERIES,
  GROWTH_SERIES: GROWTH_SERIES,
  INFLATION_SERIES: INFLATION_SERIES,
  SECTORS_2024: SECTORS_2024,
  AGE_GROUPS_2025: AGE_GROUPS_2025,
  DEPENDENCY_RATIO_2025: DEPENDENCY_RATIO_2025,
  GENERATIONS_2025: GENERATIONS_2025,
  PROVINCES: PROVINCES,
  TOP_PROVINCES: TOP_PROVINCES,
  LABOUR_2024: LABOUR_2024,
  POVERTY_2024: POVERTY_2024,
};
