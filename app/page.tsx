import Link from 'next/link';

import content from '@/shared/data/content.json';
import layoutContent from '@/shared/data/layoutContent.json';

import Header from '@/components/common/Header';
import Logo from '@/components/common/Logo';
import LogoTitle from '@/components/common/LogoTitle';
import PatientForm from '@/components/forms/PatientForm';
import PasskeyModal from '@/components/modal/PasskeyModal';

export default function Home({ searchParams }: SearchParamProps) {
  const homeContent = content.home;
  const { title, subtitle, afterSubtitle } = layoutContent.header;
  const { copy, year, company, highlight, suffix, adminLink, adminText } =
    layoutContent.footer;

  const isAdmin = searchParams?.admin === 'true';

  return (
    <div className='flex h-screen max-h-screen flex-col bg-intro bg-cover bg-left bg-no-repeat dark:bg-dark-intro dark:bg-center'>
      <Header>
        <Logo />
        <LogoTitle
          title={title}
          subtitle={subtitle}
          aftersubtitle={afterSubtitle}
        />
      </Header>
      {isAdmin && <PasskeyModal />}
      <section className='container mb-4 mt-12 lg:flex lg:items-center lg:justify-center'>
        <div className='card text-base-100 hidden h-auto w-full max-w-[31rem] flex-col items-center justify-center space-y-6 rounded-[13px] pl-10 pr-20 font-yanone text-xl xl:flex'>
          <h1 className='text-base-100 mb-8 text-5xl font-bold'>
            {homeContent.section.mainHeading}
          </h1>
          {homeContent.section.paragraphs.map((paragraph, index) => (
            <p className='text-pretty text-xl' key={index}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className='sub-container flex max-w-[31rem] items-center justify-center'>
          <PatientForm />
        </div>
      </section>
      <footer className='text-14-regular h-fit w-full bg-blue-100 bg-opacity-10 bg-clip-padding p-2 backdrop-blur-md backdrop-filter dark:bg-dark-300/60'>
        <div className='container flex items-center justify-between gap-2'>
          <p className='justify-items-end text-dark-200 dark:text-white xl:text-left'>
            {copy} {year} {company}{' '}
            <span className='text-green-600'>{highlight}</span> {suffix}
          </p>
          <Link href={adminLink} className='uppercase text-green-600'>
            {adminText}
          </Link>
        </div>{' '}
      </footer>
    </div>
  );
}
