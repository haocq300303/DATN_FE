import { SigninForm, SignupForm } from '~/interfaces/auth';
import instance from './config';

const signup = (data: SignupForm) => {
  return instance.post('register', data);
};

const login = (data: SigninForm) => {
  return instance.post('login', data);
};

const loginSMS = (phone_number: string) => {
  return instance.post('login-otp', { phone_number });
};

const registerSMS = (phone_number: string) => {
  return instance.post('register-otp', { phone_number });
};

const loginWithGoogle = (idToken: string) => {
  return instance.post('login-google', { idToken });
};

const verify = (phone_number: string, otpCode: string) => {
  return instance.post('verify-otp', { phone_number, otpCode });
};

const refetchOtp = (phone_number: string) => {
  return instance.post('refetch-otp', { phone_number });
};

export {
  signup,
  login,
  verify,
  refetchOtp,
  loginWithGoogle,
  loginSMS,
  registerSMS,
};
