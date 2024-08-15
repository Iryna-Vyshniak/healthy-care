import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/components/common/Logo';
import LogoTitle from '@/components/common/LogoTitle';
import PatientForm from '@/components/forms/PatientForm';

export default function Home() {
  return (
    <div className='flex h-screen max-h-screen'>
      {/* OTP Verification | PasskeyModal */}
      <section className='container my-auto'>
        <div className='sub-container max-w-[31rem]'>
          <div className='mb-12 flex items-center justify-start gap-2'>
            <Logo />
            <LogoTitle title='Healthy' subtitle='Care' />
          </div>

          <PatientForm />
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
        src='/assets/images/medical-img.jpg'
        alt='medical'
        width={1000}
        height={1000}
        className='side-img max-w-[50%]'
      />
    </div>
  );
}
