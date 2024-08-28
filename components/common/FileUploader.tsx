'use client';

import React, { useCallback } from 'react';

import Image from 'next/image';

import { useDropzone } from 'react-dropzone';

import { convertFileToUrl } from '@/lib/utils';

import Icon, { commonIcons, iconSizes, iconTypes } from '../ui/icon';

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt='uploaded image'
          className='max-h-[400px] overflow-hidden object-cover'
        />
      ) : (
        <>
          <Icon
            name={commonIcons.UPLOAD}
            size={iconSizes.MEDIUM}
            type={iconTypes.COMMON}
            className='mx-2 h-[40px] w-[40px]'
          />
          <div className='file-upload_label'>
            <p className='text-14-regular'>
              <span className='mr-2 text-green-700 dark:text-green-600'>
                Click to upload{' '}
              </span>
              or drag and drop
            </p>
            <p className='text-12-regular'>
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
