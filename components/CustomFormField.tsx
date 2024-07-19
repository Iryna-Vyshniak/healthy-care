'use client';

import React, { ReactNode } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
// International phone number <input/> for React
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js';

import { FormFieldType } from '@/constants';
import { Input } from '@/components/ui/input';

import { Icon, iconSizes, IconSource } from './ui/icon';

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: IconSource;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTineSelect?: boolean;
  children?: ReactNode;
  renderskeleton?: (field: any) => ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { iconSrc, iconAlt, fieldType, placeholder, name, label } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex items-center justify-start rounded-[13px] border border-blue-500 bg-blue-500 dark:border-dark-500 dark:bg-dark-400'>
          {iconSrc && (
            <Icon
              name={iconSrc.name}
              size={iconSizes.MEDIUM}
              type={iconSrc.type}
              className='w-[24px] h-[24px] mx-2'
            />
          )}
          <FormControl>
            <Input placeholder={placeholder} {...field} className='shad-input border-0' />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <div className='flex items-center justify-start rounded-[13px] border border-blue-500 bg-blue-500 dark:border-dark-500 dark:bg-dark-400'>
          {' '}
          <PhoneInput
            international
            defaultCountry='UA'
            withCountryCallingCode
            placeholder={placeholder}
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            {...field}
            className='input-phone'
          />
        </div>
      );
    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
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

export default CustomFormField;
