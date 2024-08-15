import React from 'react';

import Image from 'next/image';

const Logo = () => (
  <Image
    src='/assets/icons/logo.svg'
    alt='logo'
    width={1000}
    height={1000}
    className='h-8 w-fit'
  />
);

export default Logo;
