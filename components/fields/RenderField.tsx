import DatePicker from 'react-datepicker';
// International phone number <input/> for React
import PhoneInput from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js';

import 'react-phone-number-input/style.css';
import 'react-datepicker/dist/react-datepicker.css';

import { FormControl } from '@/components/ui/form';
import Icon, { iconSizes } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';

import { FormFieldType } from '@/shared/constants';

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    iconSrc,
    iconAlt,
    fieldType,
    placeholder,
    name,
    label,
    showTimeSelect,
    dateFormat,
    renderGroup,
  } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex items-center justify-start gap-1 rounded-[13px] border border-dashed border-blue-500 bg-blue-500 dark:border-dark-500 dark:bg-dark-400'>
          {iconSrc && (
            <Icon
              name={iconSrc.name}
              size={iconSizes.MEDIUM}
              type={iconSrc.type}
              className='mx-2'
            />
          )}
          <FormControl>
            <Input placeholder={placeholder} {...field} className='shad-input border-0' />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <div className='flex items-center justify-start rounded-[13px] border border-dashed border-blue-500 bg-blue-500 dark:border-dark-500 dark:bg-dark-400'>
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
    case FormFieldType.GROUP:
      return renderGroup ? renderGroup(field) : null;
    case FormFieldType.DATE_PICKER:
      return (
        <div className='flex items-center justify-start rounded-[13px] border border-dashed border-blue-500 bg-blue-500 dark:border-dark-500 dark:bg-dark-400'>
          {' '}
          {iconSrc && (
            <Icon
              name={iconSrc.name}
              size={iconSizes.MEDIUM}
              type={iconSrc.type}
              className='w-[24px] h-[24px] mx-2'
            />
          )}
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel='Time:'
              dateFormat={dateFormat ?? 'MM/dd/yyyy'}
              wrapperClassName='date-picker'
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className='shad-select-trigger'>
                {' '}
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className='shad-select-content'>{props.children}</SelectContent>
          </Select>
        </FormControl>
      );
    default:
      break;
  }
};

export default RenderField;
