
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Surah, surahs } from '@/data/quranData';
import SurahDropdown from './SurahDropdown';
import { cn } from '@/lib/utils';

const QuranPlayer: React.FC = () => {
  const [selectedSurah, setSelectedSurah] = useState<Surah>(surahs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, selectedSurah]);
  
  const handleSurahChange = (surah: Surah) => {
    setSelectedSurah(surah);
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
    }, 100);
  };
  
  const handlePrevious = () => {
    const currentIndex = surahs.findIndex(s => s.number === selectedSurah.number);
    if (currentIndex > 0) {
      setSelectedSurah(surahs[currentIndex - 1]);
      setIsPlaying(false);
      setTimeout(() => {
        setIsPlaying(true);
      }, 100);
    }
  };
  
  const handleNext = () => {
    const currentIndex = surahs.findIndex(s => s.number === selectedSurah.number);
    if (currentIndex < surahs.length - 1) {
      setSelectedSurah(surahs[currentIndex + 1]);
      setIsPlaying(false);
      setTimeout(() => {
        setIsPlaying(true);
      }, 100);
    }
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      
      // Calculate percentage
      const percentage = (current / duration) * 100;
      setProgress(percentage);
      setCurrentTime(current);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    
    // Auto play next surah
    const currentIndex = surahs.findIndex(s => s.number === selectedSurah.number);
    if (currentIndex < surahs.length - 1) {
      setTimeout(() => {
        setSelectedSurah(surahs[currentIndex + 1]);
        setIsPlaying(true);
      }, 1000);
    }
  };
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current) {
      const progressWidth = progressRef.current.clientWidth;
      const clickPosition = e.nativeEvent.offsetX;
      const percentage = (clickPosition / progressWidth);
      const newTime = percentage * audioRef.current.duration;
      
      audioRef.current.currentTime = newTime;
      setProgress(percentage * 100);
    }
  };
  
  // Format time in MM:SS
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-4">
      <div className="text-center mb-8 animate-fade-in">
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2 inline-block">
          Quran Player
        </span>
        <h1 className="text-2xl font-semibold mb-1">Noble Quran</h1>
        <p className="text-muted-foreground text-sm">Listen with reverence and reflection</p>
      </div>

      <div className="w-full mb-8">
        <SurahDropdown 
          surahs={surahs}
          selectedSurah={selectedSurah}
          onSelect={handleSurahChange}
        />
      </div>
      
      <div 
        className={cn(
          "w-full rounded-xl glass-morphism p-6",
          "shadow-sm hover:shadow-md transition-all duration-300 mb-4"
        )}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Volume2 size={16} className="text-primary/70 mr-2" />
            <span className="text-xs font-medium text-primary/70">
              Mishary Rashid Alafasy
            </span>
          </div>
          <span className="text-xs font-medium text-primary/70">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        
        <div 
          ref={progressRef}
          className="h-1.5 bg-secondary rounded-full overflow-hidden mb-6 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between player-controls">
          <button 
            onClick={handlePrevious}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-secondary text-primary/80"
            aria-label="Previous Surah"
          >
            <SkipBack size={18} />
          </button>
          
          <button
            onClick={handlePlayPause}
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              "bg-primary text-primary-foreground shadow-sm",
              "hover:shadow-md hover:bg-primary/90 transition-all"
            )}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </button>
          
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-secondary text-primary/80"
            aria-label="Next Surah"
          >
            <SkipForward size={18} />
          </button>
        </div>
      </div>
      
      <audio
        ref={audioRef}
        src={selectedSurah.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      
      <div className="text-center mt-4 text-xs text-muted-foreground animate-fade-in">
        <p>Currently playing Surah {selectedSurah.englishName}</p>
      </div>
    </div>
  );
};

export default QuranPlayer;
