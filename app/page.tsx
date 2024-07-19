import Link from 'next/link';
import Image from 'next/image';

import PatientForm from '@/components/forms/PatientForm';
import LogoTitle from '@/components/LogoTitle';

export default function Home() {
  return (
    <div className='flex h-screen max-h-screen'>
      {/* OTP Verification | PasskeyModal */}
      <section className='container my-auto'>
        <div className='sub-container max-w-[31rem]'>
          <div className='flex items-center justify-start gap-2 mb-12'>
            <Image
              src='/assets/icons/logo.svg'
              alt='logo'
              width={1000}
              height={1000}
              className='h-8 w-fit'
            />
            <LogoTitle />
          </div>

          <PatientForm />
          <div className='text-14-regular mt-20 flex justify-between'>
            <p className='justify-items-end text-dark-600 xl:text-left'>© 2024 HealthyCare</p>
            <Link href='/?admin=true' className='text-blue-700'>
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src='/assets/images/medical-img.jpg'
        alt='medical'
        width={1000}
        height={1000}
        className='side-img max-w-[50%]'
      />
    </div>
  );
}
