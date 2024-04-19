import React from 'react';
import HeaderComponent from '@/components/HeaderComponent';
import SearchComponent from '@/components/SearchComponent';

export default function Home() {
  return (
    <div className="flex flex-col bg-cover bg-center bg-no-repeat">
      <HeaderComponent />
      <SearchComponent />
    </div>
  );
}
