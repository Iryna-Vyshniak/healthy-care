'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { UserFormValidation } from '@/lib/validation';

import { Form } from '@/components/ui/form';
import { commonIcons, iconTypes } from '@/components/ui/icon';

import DynamicFormField from '@/components/fields/DynamicFormField';
import SubmitButton from '@/components/common/SubmitButton';

import { FormFieldType } from '@/shared/constants';
import { createUser } from '@/lib/actions/patient.actions';

// Building forms with React Hook Form and Zod. Use shadcn/ui/Form
// npx shadcn-ui@latest add form

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  console.log('router: ', router);
  // 1. Define form
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try {
      const userData = { name, email, phone };
      console.log('userData: ', userData);
      const user = await createUser(userData);
      console.log('user: ', user);

      if (user) {
        router.push(`/patients/${user.$id}/register`);
      }
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
        <DynamicFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='name'
          label='Full Name'
          placeholder='John Doe'
          iconSrc={{ name: commonIcons.USER, type: iconTypes.COMMON }}
          iconAlt='user'
        />
        <DynamicFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='email'
          label='Email'
          placeholder='johndoe@example.com'
          iconSrc={{ name: commonIcons.EMAIL, type: iconTypes.COMMON }}
          iconAlt='email'
        />
        <DynamicFormField
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
