import React from 'react';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className='fixed z-10 h-fit w-full bg-blue-300 bg-opacity-10 bg-clip-padding py-4 backdrop-blur-md backdrop-filter dark:bg-dark-300/60'>
      <div className='container flex items-center justify-start gap-2'>
        {children}
      </div>
    </header>
  );
};

export default Header;
