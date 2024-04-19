import React from 'react';
import HeaderComponent from '@/components/HeaderComponent';
import AddNewLocationComponent from '@/components/AddNewLocationComponent';

export default function BackendApi() {
  return (
    <div className="flex flex-col bg-cover bg-center bg-no-repeat">
      <HeaderComponent />
      <AddNewLocationComponent />
    </div>
  );
}
