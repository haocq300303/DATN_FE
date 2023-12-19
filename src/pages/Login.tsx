import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { routes } from '../routes';
import { auth, provider } from '../firebase/config';
import { signInWithPopup } from 'firebase/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Backgound from '../assets/img/Web/banner1.png';
import { Tabs, message } from 'antd';
import type { TabsProps } from 'antd';
import MaskedInput from 'react-text-mask';
import { loginAsync, loginWithGoogleAsync, logout, saveUserValues } from '~/Redux/Slices/userSlice';
import { SigninFormEmail, signinSchema } from '~/interfaces/auth';
import { login, loginSMS } from '~/api/auth';
import jwtDecode from 'jwt-decode';

const Login = () => {
  const user = useSelector((state: RootState) => state.user);

  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  const role_name = useSelector((state: RootState) => state.user.role_name);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorPhonenumber, setErrorPhonenumber] = useState(false);
  const onChange = (key: string) => {
    //console.log(key);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SigninFormEmail>({
    resolver: yupResolver(signinSchema),
  });

  const onSubmit: SubmitHandler<SigninFormEmail> = async (values) => {
    try {
      const response = await login(values);
      if (response.status === 200) {
        const accessToken = response.data.data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        const decode: any = jwtDecode(accessToken);
        dispatch(
          saveUserValues({
            accessToken: accessToken,
            values: decode,
            role_name: decode.role_name,
          })
        );
        message.success('Đăng nhập thành công!');
        setTimeout(() => {
          if (decode.role_name === 'admin') {
            navigate(routes.admin);
          } else if (decode.role_name === 'adminPitch') {
            navigate(routes.admin_pitch);
          } else if (decode.role_name === 'user') {
            navigate(routes.home);
          }
        }, 1000);
      } else {
        message.error(response?.data?.message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
    reset();
  };

  const handleLoginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const idToken = await res.user.getIdToken();
      dispatch(loginWithGoogleAsync(idToken));
    } catch (error) {
      //console.log(error);
    }
  };

  const handleLoginWithSMS = async () => {
    if (!phoneNumber) {
      setErrorPhonenumber(true);
      return;
    }
    if (phoneNumber.length < 10) {
      setErrorPhonenumber(true);
      return;
    }
    try {
      const response = await loginSMS(phoneNumber);
      if (response.status === 200) {
        setTimeout(() => {
          navigate(routes.verify);
        }, 100);
        localStorage.setItem('saff_phone_number', phoneNumber);
      }
    } catch (error: any) {
      //console.log(error);
      message.error(error?.response?.data?.message);
      setErrorPhonenumber(true);
    }
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Login with SMS',
      children: (
        <div>
          <div className="mt-4">
            <label className="block text-gray-700">Phone number</label>
            <MaskedInput
              mask={[/[0]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
              minLength={10}
              placeholder="Enter a phone number"
              guide={false}
              id="my-input-id"
              onBlur={() => {}}
              onChange={(value: any) => {
                setPhoneNumber(value.target.value);
              }}
              className={`w-full px-4 py-3 rounded-lg mt-2 border-2 ${
                errorPhonenumber && 'border-red-500'
              } focus:border-blue-500 focus:bg-white focus:outline-none`}
            />
            {errorPhonenumber && <span className="block text-red-500 mt-2">Số điện thoại không hợp lệ!!!</span>}
          </div>
          <button
            type="submit"
            className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
            onClick={handleLoginWithSMS}
          >
            Log In
          </button>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Login with email',
      children: (
        <div>
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border-2 ${
                  errors.email && 'border-red-500'
                } focus:border-blue-500 focus:bg-white focus:outline-none`}
                {...register('email')}
              />
              {errors.email && <span className="block text-red-500 mt-2">{errors?.email.message}</span>}
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border-2 ${
                  errors.password && 'border-red-500'
                } focus:border-blue-500 focus:bg-white focus:outline-none`}
                {...register('password')}
              />
              {errors.password && <span className="block text-red-500 mt-2">{errors?.password.message}</span>}
            </div>

            <div className="text-right mt-2">
              <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>
        </div>
      ),
    },
  ];
  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img src={Backgound} alt="" className="w-full h-full object-cover" />
      </div>

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 " style={{ fontFamily: 'sans-serif' }}>
            Log in to your account
          </h1>

          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

          <hr className="my-6 border-gray-300 w-full" />

          <button
            type="button"
            className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
          >
            <div className="flex items-center justify-center" onClick={handleLoginWithGoogle}>
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-6 h-6" viewBox="0 0 48 48">
                <defs>
                  <path
                    id="a"
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  />
                </defs>
                <clipPath id="b">
                  <use xlinkHref="#a" overflow="visible" />
                </clipPath>
                <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
              </svg>
              <span className="ml-4">Log in with Google</span>
            </div>
          </button>
          <p className="mt-8">
            Need an account?{' '}
            <Link to={routes.register} className="text-blue-500 hover:text-blue-700 font-semibold">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
