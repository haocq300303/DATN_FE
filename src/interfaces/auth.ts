import * as Yup from 'yup';

export const signinSchema = Yup.object({
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng không được để trống'),
  password: Yup.string().min(6).required('Vui lòng không được để trống'),
});

export const signupSchema = Yup.object({
  name: Yup.string().required('Trường dữ liệu bắt buộc'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Trường dữ liệu bắt buộc'),
  password: Yup.string().min(6).required('Trường dữ liệu bắt buộc'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Trường dữ liệu bắt buộc'),
});

export type SigninForm = Yup.InferType<typeof signinSchema>;

export type SignupForm = Yup.InferType<typeof signupSchema>;

export interface SigninFormEmail {
  email: string;
  password: string;
}

export interface SigninFormPhoneNumber {
  phone_number: string;
}

export interface IVerify {
  email: string;
  otpCode: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface UserState {
  loading: boolean;
  currentUser: {
    values: IUser;
    accessToken: string;
  };
  isLogged: boolean;
  error: string;
  isAdmin: boolean;
  isAdminPitch: boolean;
}

export const otpSchema = Yup.object({
  value1: Yup.string()
    .matches(/^[0-9]$/, 'Giá trị phải là một chuỗi chứa một số từ 1 đến 9')
    .max(1)
    .required('Vui lòng không được để trống'),
  value2: Yup.string()
    .matches(/^[0-9]$/, 'Giá trị phải là một chuỗi chứa một số từ 1 đến 9')
    .max(1)
    .required('Vui lòng không được để trống'),
  value3: Yup.string()
    .matches(/^[0-9]$/, 'Giá trị phải là một chuỗi chứa một số từ 1 đến 9')
    .max(1)
    .required('Vui lòng không được để trống'),
  value4: Yup.string()
    .matches(/^[0-9]$/, 'Giá trị phải là một chuỗi chứa một số từ 1 đến 9')
    .max(1)
    .required('Vui lòng không được để trống'),
  value5: Yup.string()
    .matches(/^[0-9]$/, 'Giá trị phải là một chuỗi chứa một số từ 1 đến 9')
    .max(1)
    .required('Vui lòng không được để trống'),
  value6: Yup.string()
    .matches(/^[0-9]$/, 'Giá trị phải là một chuỗi chứa một số từ 1 đến 9')
    .max(1)
    .required('Vui lòng không được để trống'),
});

export type OtpForm = Yup.InferType<typeof otpSchema>;