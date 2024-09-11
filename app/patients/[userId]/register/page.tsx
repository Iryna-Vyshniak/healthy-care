import React from 'react';

import Image from 'next/image';

import layoutContent from '@/shared/data/layoutContent.json';

import { getUser } from '@/lib/actions/patient.actions';

import Header from '@/components/common/Header';
import Logo from '@/components/common/Logo';
import LogoTitle from '@/components/common/LogoTitle';
import RegisterForm from '@/components/forms/RegisterForm';

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const { title, subtitle, afterSubtitle } = layoutContent.header;
  const { copy, year, company, highlight, suffix } = layoutContent.footer;
  return (
    <div className='relative flex h-screen max-h-screen'>
      <Header>
        <Logo />
        <LogoTitle
          title={title}
          subtitle={subtitle}
          aftersubtitle={afterSubtitle}
        />
      </Header>
      <section className='remove-scrollbar container'>
        <div className='sub-container mt-12 max-w-[35rem] flex-1 flex-col py-10 2xl:max-w-[50rem]'>
          <RegisterForm user={user} />
          <p className='copyright py-12 text-dark-600'>
            {copy} {year} {company}{' '}
            <span className='text-green-600'>{highlight}</span> {suffix}
          </p>
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
