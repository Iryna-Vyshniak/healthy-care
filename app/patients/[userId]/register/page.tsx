import React from 'react';

import Image from 'next/image';

import { getUser } from '@/lib/actions/patient.actions';

import Logo from '@/components/common/Logo';
import LogoTitle from '@/components/common/LogoTitle';
import RegisterForm from '@/components/forms/RegisterForm';

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className='relative flex h-screen max-h-screen'>
      <header className='fixed z-10 h-fit w-full bg-blue-300 bg-opacity-10 bg-clip-padding py-4 backdrop-blur-md backdrop-filter dark:bg-dark-300/60'>
        <div className='container flex items-center justify-start gap-2'>
          <Logo />
          <LogoTitle title='smart' subtitle='med' aftersubtitle='service' />
        </div>
      </header>
      <section className='remove-scrollbar container'>
        <div className='sub-container mt-12 max-w-[35rem] flex-1 flex-col py-10 2xl:max-w-[50rem]'>
          <RegisterForm user={user} />
          <p className='copyright py-12 text-dark-600'>© 2024 HealthyCare</p>
        </div>
      </section>
      <Image
        src='/assets/images/register-img.jpg'
        alt='medical'
        width={1000}
        height={1000}
        className='side-img max-w-[25rem] 2xl:max-w-[50rem]'
      />
    </div>
  );
};

export default Register;
