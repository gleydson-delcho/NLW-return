import { CircleNotch } from 'phosphor-react';
import React from 'react';

// import { Container } from './styles';

export const Loading = () => {
  return (
    <div className='h-6 w-6 flex items-center justify-center overflow-hidden'>
      <CircleNotch weight='bold' className='w-4 h-4 animate-spin' />
    </div>
  );
}