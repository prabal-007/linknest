import ChatInterface from '@/components/ChatInterface';
import React from 'react';

const page = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center">
      <div className='flex-grow h-full'>
        <ChatInterface />
      </div>
    </div>
  );
};

export default page;
