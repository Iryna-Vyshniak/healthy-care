'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { FormFieldType } from '@/shared/constants';
import formData from '@/shared/data/forms.json';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createUser } from '@/lib/actions/patient.actions';
import { UserFormValidation } from '@/lib/validation';

import { Form } from '@/components/ui/form';
import {
  CommonIcons,
  commonIcons,
  HomeIcons,
  IconSource,
  iconTypes,
} from '@/components/ui/icon';

import SubmitButton from '@/components/common/SubmitButton';
import DynamicFormField from '@/components/fields/DynamicFormField';

// Building forms with React Hook Form and Zod. Use shadcn/ui/Form
// npx shadcn-ui@latest add form

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { title, subtitle, fields, submit } = formData.patientForm;
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
        <section className='mb-2 space-y-4 md:mb-8'>
          <h2 className='header'>{title}</h2>
          <p className='text-dark-200 dark:text-white'>{subtitle}</p>
        </section>
        {fields.map(({ name, label, placeholder, iconSrc, iconAlt }) => (
          <DynamicFormField
            key={label}
            control={form.control}
            fieldType={
              name !== 'phone' ? FormFieldType.INPUT : FormFieldType.PHONE_INPUT
            }
            name={name}
            label={label}
            placeholder={placeholder}
            iconSrc={
              iconSrc
                ? {
                    name: commonIcons[iconSrc.name as keyof typeof commonIcons],
                    type: iconTypes[iconSrc.type as keyof typeof iconTypes],
                  }
                : undefined
            }
            iconAlt={iconAlt || ''}
          />
        ))}
        <SubmitButton isLoading={isLoading}>{submit}</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
