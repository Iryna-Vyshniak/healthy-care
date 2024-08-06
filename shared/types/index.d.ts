declare type Gender = 'Male' | 'Female' | 'Non-binary' | 'Prefer not to say' | 'Only disclose to doctor';
declare type Status = "awaiting" | "scheduled" | "cancelled";

declare interface CustomProps {
    control: Control<any>;
    fieldType: FormFieldType;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: IconSource;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: ReactNode;
    renderGroup?: (field: any) => ReactNode;
}

declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
}

declare interface User extends CreateUserParams {
    $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
    userId: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    profession: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryPhysician: string;
    insuranceProvider: string;
    insurancePolicyNumber: string;
    allergies: string | undefined;
    currentMedication: string | undefined;
    familyMedicalHistory: string | undefined;
    pastMedicalHistory: string | undefined;
    identificationType: string | undefined;
    identificationNumber: string | undefined;
    identificationDocument: FormData | undefined;
    privacyConsent: boolean;
}

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

interface ContactInfo {
    phone: string;
    email: string;
    address: Address;
}

interface Publication {
    title: string;
    journal: string;
    year: number;
}

interface ProfessionalInfo {
    years_of_experience: number;
    current_position: string;
    publications: Publication[];
    affiliations: string[];
}

interface Doctor {
    id: string;
    full_name: string;
    title: string;
    degree: string;
    specialty: string;
    image: string;
    contact_info: ContactInfo;
    professional_info: ProfessionalInfo;
}