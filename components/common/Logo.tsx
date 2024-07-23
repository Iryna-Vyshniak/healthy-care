import Image from 'next/image';
import React from 'react';

const Logo = () => (
  <Image src='/assets/icons/logo.svg' alt='logo' width={1000} height={1000} className='h-8 w-fit' />
);

export default Logo;
