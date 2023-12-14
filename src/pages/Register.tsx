import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../routes';
import { signInWithPopup } from 'firebase/auth';
import { loginWithGoogleAsync } from '../Redux/Slices/userSlice';
import { useDispatch } from 'react-redux';
import { auth, provider } from '../firebase/config';
import { SignupForm, signupSchema } from '~/interfaces/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { message } from 'antd';
import { signup } from '../api/auth';
import Backgound from '../assets/img/Web/banner1.png';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<SignupForm> = async (values: SignupForm) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...otherValue }: any = values;
    try {
      await signup(otherValue);
      message.success('Đăng ký thành công');
      setTimeout(() => {
        navigate(routes.login);
      }, 1000);
    } catch (error: any) {
      console.log(error);
      message.error(error?.response?.data?.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: yupResolver(signupSchema),
  });

  const handleLoginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const idToken = res.user.getIdToken();
      dispatch(loginWithGoogleAsync(idToken));
      message.success('Đăng nhập bằng google thành công!');
      setTimeout(() => {
        navigate(routes.home);
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-3" style={{ fontFamily: 'sans-serif' }}>
            Create an account
          </h1>

          <div>
            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-gray-700">Your name</label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className={`w-full px-4 py-2 rounded-lg bg-gray-200 mt-1 border-2 ${
                    errors.name && 'border-red-500'
                  } focus:border-blue-500 focus:bg-white focus:outline-none`}
                  {...register('name')}
                />
                {errors.name && <span className="block text-red-500 mt-1">{errors.name.message}</span>}
              </div>
              <div className="mt-3">
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className={`w-full px-4 py-2 rounded-lg bg-gray-200 mt-1 border-2 ${
                    errors.email && 'border-red-500'
                  } focus:border-blue-500 focus:bg-white focus:outline-none`}
                  {...register('email')}
                />
                {errors.email && <span className="block text-red-500 mt-1">{errors.email.message}</span>}
              </div>
              <div className="mt-3">
                <label className="block text-gray-700">Phone number</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  className={`w-full px-4 py-2 rounded-lg bg-gray-200 mt-1 border-2 ${
                    errors.phone_number && 'border-red-500'
                  } focus:border-blue-500 focus:bg-white focus:outline-none`}
                  {...register('phone_number')}
                />
                {errors.phone_number && <span className="block text-red-500 mt-1">{errors.phone_number.message}</span>}
              </div>
              <div className="mt-3">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  minLength={6}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-200 mt-1 border-2 ${
                    errors.password && 'border-red-500'
                  } focus:border-blue-500 focus:bg-white focus:outline-none`}
                  {...register('password')}
                />
                {errors.password && <span className="block text-red-500 mt-1">{errors.password.message}</span>}
              </div>

              <div className="mt-3">
                <label className="block text-gray-700">Confirnm Password</label>
                <input
                  type="password"
                  placeholder="Enter Confirm Password"
                  minLength={6}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-200 mt-1 border-2 ${
                    errors.confirmPassword && 'border-red-500'
                  } focus:border-blue-500 focus:bg-white focus:outline-none`}
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && <span className="block text-red-500 mt-1">{errors.confirmPassword.message}</span>}
              </div>

              <button
                type="submit"
                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-2 mt-6"
              >
                Sign up
              </button>
            </form>
          </div>

          <button
            type="button"
            onClick={handleLoginWithGoogle}
            className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-2 border border-gray-300 mt-6"
          >
            <div className="flex items-center justify-center">
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
              <span className="ml-4">Sign up with Google</span>
            </div>
          </button>

          <p className="mt-8">
            Do you already have an account?{' '}
            <Link to={routes.login} className="text-blue-500 hover:text-blue-700 font-semibold">
              Log in to your account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
