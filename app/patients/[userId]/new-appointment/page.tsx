import React from 'react';

import layoutContent from '@/shared/data/layoutContent.json';

import { getPatient } from '@/lib/actions/patient.actions';

import Header from '@/components/common/Header';
import Logo from '@/components/common/Logo';
import LogoTitle from '@/components/common/LogoTitle';
import AppointmentForm from '@/components/forms/AppointmentForm';

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const { title, subtitle, afterSubtitle } = layoutContent.header;
  const { copy, year, company, highlight, suffix } = layoutContent.footer;

  const patient = await getPatient(userId);

  return (
    <div className='flex h-screen max-h-screen flex-col bg-appointment bg-cover bg-right bg-no-repeat dark:bg-dark-appointment md:bg-center'>
      <Header>
        <Logo />
        <LogoTitle
          title={title}
          subtitle={subtitle}
          aftersubtitle={afterSubtitle}
        />
      </Header>
      <section className='remove-scrollbar container my-auto mt-12'>
        <div className='sub-container flex max-w-[31rem] items-center justify-center'>
          <AppointmentForm
            type='create'
            userId={userId}
            patientId={patient?.$id}
          />
        </div>
      </section>
      <footer className='text-14-regular h-fit w-full bg-blue-100 bg-opacity-10 bg-clip-padding p-2 backdrop-blur-md backdrop-filter dark:bg-dark-300/60'>
        <div className='container flex items-center justify-start'>
          <p className='copyright py-2 text-dark-600'>
            {copy} {year} {company}{' '}
            <span className='text-green-600'>{highlight}</span> {suffix}
          </p>
        </div>{' '}
      </footer>
    </div>
  );
};

export default NewAppointment;
