'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  FormFieldType,
  GenderOptions,
  PatientFormDefaultValues,
} from '@/shared/constants';
import { Doctors } from '@/shared/data/doctors';
import formData from '@/shared/data/forms.json';
import { Identification } from '@/shared/data/identification';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { registerPatient } from '@/lib/actions/patient.actions';
import { PatientFormValidation } from '@/lib/validation';

import { Form, FormControl } from '@/components/ui/form';
import { commonIcons, iconTypes } from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import SubmitButton from '@/components/common/SubmitButton';
import DynamicFormField from '@/components/fields/DynamicFormField';

import FileUploader from '../common/FileUploader';
import { SelectItem } from '../ui/select';

// Building forms with React Hook Form and Zod. Use shadcn/ui/Form
// npx shadcn-ui@latest add form

const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    title,
    subtitle,
    personalInformation,
    medicalInformation,
    identificationAndVerification,
    consentAndPrivacy,
    submit,
  } = formData.register;

  // 1. Define form
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    let formData;

    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append('blobFile', blobFile);
      formData.append('fileName', values.identificationDocument[0].name);
    }

    try {
      // eslint-disable-next-line no-console
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

      // @ts-ignore
      const patient = await registerPatient(patientData);

      if (patient) router.push(`/patients/${user.$id}/new-appointment`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex-1 space-y-8'>
        <section className='mb-12 space-y-4'>
          <h1 className='header'>{title}</h1>
          <p className='text-dark-700'>{subtitle}</p>
        </section>
        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            {' '}
            <h2 className='sub-header'>{personalInformation.heading}</h2>
          </div>
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
        <div className='flex flex-col gap-6 xl:flex-row'>
          {' '}
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
        </div>

        <DynamicFormField
          control={form.control}
          fieldType={FormFieldType.GROUP}
          name='gender'
          label='Gender'
          renderGroup={(field) => (
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className='flex flex-wrap justify-between gap-6'
              >
                {GenderOptions.map((option) => (
                  <div key={option} className='radio-group'>
                    <RadioGroupItem value={option.toLowerCase()} id={option} />
                    <Label htmlFor={option} className='cursor-pointer'>
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          )}
        />

        <DynamicFormField
          control={form.control}
          fieldType={FormFieldType.DATE_PICKER}
          name='birthDate'
          label='Date of Birth'
          placeholder='MM/dd/yyyy'
          iconSrc={{ name: commonIcons.SCHEDULE, type: iconTypes.COMMON }}
          iconAlt='schedule'
        />
        <div className='flex flex-col gap-6 xl:flex-row'>
          <DynamicFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name='address'
            label='Address'
            placeholder='17th Hospital Street, Kyiv'
            iconSrc={{ name: commonIcons.HOME, type: iconTypes.COMMON }}
            iconAlt='user'
          />
          <DynamicFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name='profession'
            label='Profession'
            placeholder='Teacher'
            iconSrc={{ name: commonIcons.JOB, type: iconTypes.COMMON }}
            iconAlt='user'
          />
        </div>
        <div className='flex flex-col gap-6 xl:flex-row'>
          <DynamicFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name='emergencyContactName'
            label='Emergency Contact Name'
            placeholder='Parent/Guardian name'
            iconSrc={{ name: commonIcons.USER, type: iconTypes.COMMON }}
            iconAlt='user'
          />

          <DynamicFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name='emergencyContactNumber'
            label='Emergency Contact Number'
            placeholder='(777) 123-4567'
          />
        </div>

        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            {' '}
            <h2 className='sub-header'>{medicalInformation.heading}</h2>
          </div>
        </section>

        <DynamicFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name='primaryPhysician'
          label='Primary Physician'
          placeholder='Select a physician'
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.id} value={doctor.full_name}>
              <div className='flex cursor-pointer items-center gap-2'>
                <Image
                  src={doctor.image}
                  alt={doctor.full_name}
                  width={32}
                  height={32}
                  className='rounded-full border border-dark-500'
                />
                <p className='flex flex-col items-start justify-start lg:flex-row lg:gap-2'>
                  {doctor.title} {doctor.full_name}, {doctor.degree}{' '}
                  <span className='text-slate-800 dark:text-white'>
                    {doctor.specialty}
                  </span>
                </p>
              </div>
            </SelectItem>
          ))}
        </DynamicFormField>

        <div className='flex flex-col gap-6 xl:flex-row'>
          <DynamicFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name='insuranceProvider'
            label='Insurance Provider'
            placeholder='RedCross'
            iconSrc={{ name: commonIcons.HOME, type: iconTypes.COMMON }}
            iconAlt='Insurance Provider'
          />
          <DynamicFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name='insurancePolicyNumber'
            label='Insurance Policy Number'
            placeholder='EJ7357352277'
            iconSrc={{
              name: commonIcons.INSURANCE_POLICY,
              type: iconTypes.COMMON,
            }}
            iconAlt='Insurance Policy Number'
          />
        </div>
        <div className='flex flex-col gap-6 xl:flex-row'>
          <DynamicFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name='allergies'
            label='Allergies (if any)'
            placeholder='Amoxicillin, Aspirin, Pet Dander'
          />
          <DynamicFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name='currentMedication'
            label='Current Medication (if any)'
            placeholder='Loratadine 10 mg, Insulin Glargine 100 units/mL'
          />
        </div>
        <div className='flex flex-col gap-6 xl:flex-row'>
          <DynamicFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name='familyMedicalHistory'
            label='Family medical history'
            placeholder='Mother had diabetes, father had hypertension'
          />
          <DynamicFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name='pastMedicalHistory'
            label='Past medical history'
            placeholder='Had chickenpox as a child, underwent knee surgery in 2018'
          />
        </div>
        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>
              {identificationAndVerification.heading}
            </h2>
          </div>
        </section>

        <DynamicFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name='identificationType'
          label='Identification type'
          placeholder='Select an identification type'
        >
          {Identification.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </DynamicFormField>

        <DynamicFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='identificationNumber'
          label='Identification number'
          placeholder='0123456789'
        />

        <DynamicFormField
          control={form.control}
          fieldType={FormFieldType.GROUP}
          name='identificationDocument'
          label='Scanned copy of identification document'
          renderGroup={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>{consentAndPrivacy.heading}</h2>
          </div>

          {consentAndPrivacy.fields.map((field) => (
            <DynamicFormField
              key={field.name}
              control={form.control}
              fieldType={FormFieldType.CHECKBOX}
              name={field.name}
              label={field.label}
            />
          ))}
        </section>
        <SubmitButton isLoading={isLoading}>{submit}</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
