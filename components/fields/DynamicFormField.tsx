'use client';

import React from 'react';

import { FormField, FormItem, FormLabel,  FormMessage } from '@/components/ui/form';

import { FormFieldType } from '@/shared/constants';

import RenderField from './RenderField';

const DynamicFormField = (props: CustomProps) => {
  const { control, fieldType, name, label, placeholder, iconSrc, iconAlt } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {fieldType !== FormFieldType.CHECKBOX && label && <FormLabel>{label}</FormLabel>}
          <RenderField field={field} props={props} />

          <FormMessage className='shad-error' />
        </FormItem>
      )}
    />
  );
};

export default DynamicFormField;
