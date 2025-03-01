
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Surah } from '@/data/quranData';
import { cn } from '@/lib/utils';

interface SurahDropdownProps {
  surahs: Surah[];
  selectedSurah: Surah;
  onSelect: (surah: Surah) => void;
}

const SurahDropdown: React.FC<SurahDropdownProps> = ({ 
  surahs, 
  selectedSurah, 
  onSelect 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative w-full max-w-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-4 py-2.5 flex items-center justify-between",
          "rounded-xl glass-morphism transition-all duration-300",
          "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20",
          isOpen ? "shadow-md" : "shadow-sm"
        )}
      >
        <div className="flex items-center">
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 mr-3">
            <span className="text-xs font-medium text-primary">{selectedSurah.number}</span>
          </div>
          <div className="text-left">
            <p className="text-sm font-medium">{selectedSurah.englishName}</p>
            <p className="text-xs text-muted-foreground">{selectedSurah.name}</p>
          </div>
        </div>
        <ChevronDown 
          className={cn(
            "h-4 w-4 text-primary/70 transition-transform duration-300",
            isOpen ? "transform rotate-180" : ""
          )} 
        />
      </button>

      {isOpen && (
        <div 
          className={cn(
            "absolute mt-2 w-full z-50 overflow-hidden",
            "dropdown-container rounded-xl glass-morphism shadow-lg",
            "animate-scale-in"
          )}
        >
          <div className="max-h-64 overflow-y-auto py-1">
            {surahs.map((surah) => (
              <button
                key={surah.number}
                onClick={() => {
                  onSelect(surah);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-4 py-2.5 flex items-center",
                  "transition-colors duration-200 ease-in-out text-left",
                  "hover:bg-primary/5 focus:outline-none focus:bg-primary/5",
                  selectedSurah.number === surah.number ? "bg-primary/5" : ""
                )}
              >
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 mr-3">
                  <span className="text-xs font-medium text-primary">{surah.number}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{surah.englishName}</p>
                  <p className="text-xs text-muted-foreground">{surah.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SurahDropdown;
