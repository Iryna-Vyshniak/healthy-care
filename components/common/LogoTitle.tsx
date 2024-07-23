import React from 'react';

const LogoTitle = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className='bg-gradient-custom clip-text drop-shadow-[0_0.5px_0.05px_rgba(0,0,20,1)] dark:drop-shadow-[0_0.5px_0.05px_rgba(250,250,250,1)]'>
      <p className='text-24-bold'>
        {title}
        <span>{subtitle}</span>
      </p>
    </div>
  );
};

export default LogoTitle;
