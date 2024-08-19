import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { getUser } from '@/lib/actions/patient.actions';

import Logo from '@/components/common/Logo';
import LogoTitle from '@/components/common/LogoTitle';
import RegisterForm from '@/components/forms/RegisterForm';

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className='flex h-screen max-h-screen'>
      {/* OTP Verification | PasskeyModal */}
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[35rem] flex-1 flex-col py-10 2xl:max-w-[50rem]'>
          <div className='mb-12 flex items-center justify-start gap-2'>
            <Logo />
            <LogoTitle title='Healthy' subtitle='Care' />
          </div>
          <RegisterForm user={user} />
          <div className='text-14-regular mt-20 flex justify-between'>
            <p className='justify-items-end text-dark-600 xl:text-left'>
              © 2024 HealthyCare
            </p>
            <Link href='/?admin=true' className='text-blue-700'>
              Admin
            </Link>
          </div>
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
