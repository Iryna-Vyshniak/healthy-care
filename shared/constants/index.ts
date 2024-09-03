export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  GROUP = 'group',
}

export const GenderOptions = [
  'Male',
  'Female',
  'Non-binary',
  'Prefer not to say',
  'Only disclose to doctor',
];

export const PatientFormDefaultValues = {
  name: '',
  email: '',
  phone: '',
  birthDate: new Date(Date.now()),
  gender: 'male' as Gender,
  address: '',
  profession: '',
  emergencyContactName: '',
  emergencyContactNumber: '',
  primaryPhysician: '',
  insuranceProvider: '',
  insurancePolicyNumber: '',
  allergies: '',
  currentMedication: '',
  familyMedicalHistory: '',
  pastMedicalHistory: '',
  identificationType: 'Birth Certificate',
  identificationNumber: '',
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};
