import Link from 'next/link';

import Logo from '@/components/common/Logo';
import LogoTitle from '@/components/common/LogoTitle';
import PatientForm from '@/components/forms/PatientForm';

export default function Home() {
  return (
    <div className='flex h-screen max-h-screen flex-col bg-intro bg-cover bg-left bg-no-repeat dark:bg-dark-intro dark:bg-center'>
      <header className='fixed h-fit w-full bg-blue-300 bg-opacity-10 bg-clip-padding p-4 backdrop-blur-md backdrop-filter dark:bg-dark-300/60'>
        <div className='container flex items-center justify-start gap-2'>
          <Logo />
          <LogoTitle title='smart' subtitle='med' aftersubtitle='service' />
        </div>
      </header>
      <section className='container mb-4 mt-12 lg:flex lg:items-center lg:justify-center'>
        <div className='card text-base-100 hidden h-[32.5rem] w-full max-w-[31rem] flex-col items-center justify-center space-y-6 rounded-[13px] pl-10 pr-20 font-yanone text-xl xl:flex'>
          <h1 className='text-base-100 mb-10 text-6xl font-bold'>
            Your Trusted Hospital
          </h1>
          <p>Our Hospital is one of the best Hospital in this city.</p>
          <p>To get our best service please login to our system.</p>
          <p>You can request for appoinment with a doctor from your home.</p>
        </div>
        <div className='sub-container flex max-w-[31rem] items-center justify-center'>
          <PatientForm />
        </div>
      </section>
      <footer className='text-14-regular h-fit w-full bg-blue-100 bg-opacity-10 bg-clip-padding p-4 backdrop-blur-md backdrop-filter dark:bg-dark-300/60'>
        <div className='container flex items-center justify-between gap-2'>
          <p className='justify-items-end text-dark-200 dark:text-white xl:text-left'>
            © 2024 SMART <span className='text-green-600'>MED</span> SERVICE
          </p>
          <Link href='/?admin=true' className='uppercase text-green-600'>
            Admin
          </Link>
        </div>{' '}
      </footer>
    </div>
  );
}
