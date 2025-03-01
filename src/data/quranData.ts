
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  audioUrl: string;
}

export const surahs: Surah[] = [
  {
    number: 1,
    name: "الفاتحة",
    englishName: "Al-Fatiha",
    audioUrl: "https://server8.mp3quran.net/afs/001.mp3"
  },
  {
    number: 2,
    name: "البقرة",
    englishName: "Al-Baqarah",
    audioUrl: "https://server8.mp3quran.net/afs/002.mp3"
  },
  {
    number: 3,
    name: "آل عمران",
    englishName: "Aal-Imran",
    audioUrl: "https://server8.mp3quran.net/afs/003.mp3"
  },
  {
    number: 4,
    name: "النساء",
    englishName: "An-Nisa",
    audioUrl: "https://server8.mp3quran.net/afs/004.mp3"
  },
  {
    number: 5,
    name: "المائدة",
    englishName: "Al-Ma'idah",
    audioUrl: "https://server8.mp3quran.net/afs/005.mp3"
  },
  {
    number: 6,
    name: "الأنعام",
    englishName: "Al-An'am",
    audioUrl: "https://server8.mp3quran.net/afs/006.mp3"
  },
  {
    number: 7,
    name: "الأعراف",
    englishName: "Al-A'raf",
    audioUrl: "https://server8.mp3quran.net/afs/007.mp3"
  },
  {
    number: 8,
    name: "الأنفال",
    englishName: "Al-Anfal",
    audioUrl: "https://server8.mp3quran.net/afs/008.mp3"
  },
  {
    number: 9,
    name: "التوبة",
    englishName: "At-Tawbah",
    audioUrl: "https://server8.mp3quran.net/afs/009.mp3"
  },
  {
    number: 10,
    name: "يونس",
    englishName: "Yunus",
    audioUrl: "https://server8.mp3quran.net/afs/010.mp3"
  }
];
