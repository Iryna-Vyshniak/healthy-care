'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { UserFomValidation } from '@/lib/validation';

import { Form } from '@/components/ui/form';
import { commonIcons, iconTypes } from '../ui/icon';

import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';

import { FormFieldType } from '@/constants';

// Building forms with React Hook Form and Zod. Use shadcn/ui/Form
// npx shadcn-ui@latest add form

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  console.log('router: ', router);
  // 1. Define form
  const form = useForm<z.infer<typeof UserFomValidation>>({
    resolver: zodResolver(UserFomValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFomValidation>) {
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try {
      const userData = { name, email, phone };
      console.log('userData: ', userData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1'>
        <section className='mb-12 space-y-4'>
          <h1 className='header'>Welcome</h1>
          <p className='text-dark-700'>Schedule your first consultation</p>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='name'
          label='Full Name'
          placeholder='John Doe'
          iconSrc={{ name: commonIcons.USER, type: iconTypes.COMMON }}
          iconAlt='user'
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='email'
          label='Email'
          placeholder='johndoe@example.com'
          iconSrc={{ name: commonIcons.EMAIL, type: iconTypes.COMMON }}
          iconAlt='email'
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name='phone'
          label='Phone Number'
          placeholder='(777) 123-4567'
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
