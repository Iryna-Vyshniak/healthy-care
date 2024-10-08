import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import mainContent from '@/shared/data/content.json';
import { Doctors } from '@/shared/data/doctors';
import layoutContent from '@/shared/data/layoutContent.json';

import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import Icon, { commonIcons, iconSizes, iconTypes } from '@/components/ui/icon';

import Header from '@/components/common/Header';
import Logo from '@/components/common/Logo';
import LogoTitle from '@/components/common/LogoTitle';

const SuccessPage = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const { successMessage, requestDetails, newAppointmentButton } =
    mainContent.success;
  const { title, subtitle, afterSubtitle } = layoutContent.header;
  const { copy, year, company, highlight, suffix } = layoutContent.footer;

  const appointmentId = (searchParams?.appointmentId as string) || '';
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doctor) => doctor.full_name === appointment.primaryPhysician
  );
  return (
    <div className='relative flex h-screen max-h-screen flex-col'>
      <Header>
        <Link href='/' className='flex items-center justify-start gap-2'>
          <Logo />
          <LogoTitle
            title={title}
            subtitle={subtitle}
            aftersubtitle={afterSubtitle}
          />
        </Link>
      </Header>

      <main className='remove-scrollbar container flex flex-1 flex-col items-center justify-center gap-12 py-10'>
        {' '}
        <section className='flex flex-col items-center justify-center gap-12'>
          <Image
            src={successMessage.imageSrc}
            height={160}
            width={160}
            alt={successMessage.imageAlt}
          />
          <h2 className='header mb-6 max-w-[600px] text-center'>
            {successMessage.titlePrefix}{' '}
            <span className='text-green-600'>{successMessage.highlight}</span>{' '}
            {successMessage.title}
          </h2>
          <p>{successMessage.subtitle}</p>
        </section>
        <section className='request-details'>
          <p>{requestDetails.label}</p>
          {doctor && (
            <div className='flex items-center gap-3'>
              <Image
                src={doctor.image}
                alt={doctor.full_name}
                width={100}
                height={100}
                className='size-6'
              />
              <p className='whitespace-nowrap'>
                {doctor.degree} {doctor.full_name}
              </p>
            </div>
          )}
          <div className='flex gap-2'>
            <Icon
              name={commonIcons.SCHEDULE}
              size={iconSizes.MEDIUM}
              type={iconTypes.COMMON}
              className='mx-2'
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <Button variant='outline' className='shad-primary-btn' asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            {newAppointmentButton.label}
          </Link>
        </Button>
      </main>

      <footer className='text-14-regular h-fit w-full bg-blue-100 bg-opacity-10 bg-clip-padding p-2 backdrop-blur-md backdrop-filter dark:bg-dark-300/60'>
        <div className='container flex items-center justify-start'>
          <p className='copyright py-2 text-dark-600'>
            {copy} {year} {company}{' '}
            <span className='text-green-600'>{highlight}</span> {suffix}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SuccessPage;
