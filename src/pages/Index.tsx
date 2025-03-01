
import React from 'react';
import QuranPlayer from '@/components/QuranPlayer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/30 p-6">
      <div className="w-full max-w-md">
        <QuranPlayer />
      </div>
    </div>
  );
};

export default Index;
