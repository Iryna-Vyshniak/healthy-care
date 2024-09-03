'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { FormFieldType } from '@/shared/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createUser } from '@/lib/actions/patient.actions';
import { UserFormValidation } from '@/lib/validation';

import { Form } from '@/components/ui/form';
import { commonIcons, iconTypes } from '@/components/ui/icon';

import SubmitButton from '@/components/common/SubmitButton';
import DynamicFormField from '@/components/fields/DynamicFormField';

// Building forms with React Hook Form and Zod. Use shadcn/ui/Form
// npx shadcn-ui@latest add form

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
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
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);

      if (user) {
        router.push(`/patients/${user.$id}/register`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='card w-full space-y-6 rounded-[13px]'
      >
        <section className='mb-2 space-y-4 md:mb-12'>
          <h2 className='header'>Welcome</h2>
          <p className='text-dark-200 dark:text-white'>
            Schedule your first consultation
          </p>
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
