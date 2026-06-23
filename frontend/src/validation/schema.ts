import * as Yup from 'yup';
import { UserFormValues } from '@/types/user';

export const userValidationSchema: Yup.ObjectSchema<UserFormValues> = Yup.object({
  first_name: Yup.string().trim().required('First name is required'),
  last_name: Yup.string().trim().required('Last name is required'),
  email: Yup.string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),
});
