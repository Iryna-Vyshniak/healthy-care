import React from 'react';

const LogoTitle = ({
  title,
  subtitle,
  aftersubtitle,
}: {
  title: string;
  subtitle: string;
  aftersubtitle?: string;
}) => {
  return (
    <div className='dark:clip-text ml-2 text-dark-200 drop-shadow-[0_0.5px_0.05px_rgba(250,250,250,1)] dark:text-white'>
      <p className='mr-2 font-yanone text-[10px] font-bold uppercase dark:text-white'>
        {title}
      </p>
      <p className='mr-2 font-yanone text-[10px] font-bold uppercase text-green-600'>
        {subtitle}
        {aftersubtitle && (
          <span className='mr-2 font-yanone text-[10px] font-bold uppercase text-dark-200 dark:text-white'>
            {aftersubtitle}
          </span>
        )}
      </p>
    </div>
  );
};

export default LogoTitle;
