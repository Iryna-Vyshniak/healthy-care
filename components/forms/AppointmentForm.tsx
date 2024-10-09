'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { FormFieldType } from '@/shared/constants';
import { Doctors } from '@/shared/data/doctors';
import formData from '@/shared/data/forms.json';
import { Appointment } from '@/shared/types/appwrite.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createAppointment } from '@/lib/actions/appointment.actions';
import { getAppointmentSchema } from '@/lib/validation';

import { Form } from '@/components/ui/form';

import SubmitButton from '@/components/common/SubmitButton';
import DynamicFormField from '@/components/fields/DynamicFormField';

import { SelectItem } from '../ui/select';

// Building forms with React Hook Form and Zod. Use shadcn/ui/Form
// npx shadcn-ui@latest add form

const AppointmentForm = ({
  userId,
  patientId,
  type = 'create',
  appointment,
}: {
  userId: string;
  patientId: string;
  type: 'create' | 'cancel' | 'schedule';
  appointment?: Appointment;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    title,
    subtitle,
    fields: { primaryPhysician, date, reason, note },
    schedule,
    cancel,
    statusType,
  } = formData.appointment;

  // 1. Define form
  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : '',
      schedule: appointment
        ? new Date(appointment?.schedule!)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : '',
      note: appointment?.note || '',
      cancellationReason: appointment?.cancellationReason || '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    let status;

    switch (type) {
      case 'schedule':
        status = statusType.schedule.status;
        break;
      case 'cancel':
        status = statusType.cancel.status;
        break;

      default:
        status = 'pending';
    }

    try {
      if (type === 'create' && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note,
        };

        const newAppointment = await createAppointment(appointmentData);
        if (newAppointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          );
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  let buttonLabel;

  switch (type) {
    case 'create':
      buttonLabel = statusType.create.buttonLabel;
      break;
    case 'schedule':
      buttonLabel = statusType.schedule.buttonLabel;
      break;
    case 'cancel':
      buttonLabel = statusType.cancel.buttonLabel;
      break;

    default:
      break;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='appointment-card w-full space-y-6 rounded-[13px]'
      >
        <section className='mb-12 space-y-4'>
          <h1 className='header'>{title}</h1>
          <p className='text-dark-700'>{subtitle}</p>
        </section>

        {type !== 'cancel' && (
          <>
            <DynamicFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name='primaryPhysician'
              label={primaryPhysician.label}
              placeholder={primaryPhysician.placeholder}
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
            <DynamicFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name='schedule'
              label={date.label}
              showTimeSelect
              dateFormat={date.dateFormat}
            />
            <div className='flex flex-col gap-6 xl:flex-row'>
              <DynamicFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name='reason'
                label={reason.label}
                placeholder={reason.placeholder}
              />

              <DynamicFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name='note'
                label={note.label}
                placeholder={note.placeholder}
              />
            </div>
          </>
        )}

        {type === 'cancel' && (
          <DynamicFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='cancellationReason'
            label={cancel.fields.cancellationReason.label}
            placeholder={cancel.fields.cancellationReason.placeholder}
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
