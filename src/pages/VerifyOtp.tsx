import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../Redux/store';
import { saveUserValues } from '../Redux/Slices/userSlice';
import { routes } from '../routes';
import { refetchOtp, verify } from '../api/auth';
import { message } from 'antd';
import jwtDecode from 'jwt-decode';

function VerifyOtp() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const saff_phone_number: any = localStorage.getItem('saff_phone_number');

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refs: any = useRef([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any, index: any) => {
    const value = e.target.value;
    if (isNaN(value)) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // Tự động chuyển tiếp đến ô tiếp theo nếu đã nhập đủ 1 số
    if (value && index < refs.current.length - 1) {
      refs.current[index + 1].focus();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyDown = (e: any, index: any) => {
    // Tự động chuyển về ô trước nếu nhấn phím Backspace ở ô đầu tiên của OTP
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      refs.current[index - 1].focus();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const otpCode = otp.join('');
      const response = await verify(saff_phone_number, otpCode);
      //console.log('res', response);
      if (response.status === 200) {
        const { _doc }: any = jwtDecode(response.data?.accessToken);
        localStorage.setItem('accessToken', response.data?.accessToken);
        dispatch(
          saveUserValues({
            values: _doc,
            accessToken: response.data?.accessToken,
          })
        );
        message.success(response.data?.message);
        setTimeout(() => {
          navigate(routes.home);
        }, 1000);
      }
    } catch (error: any) {
      //console.log('error', error);
      message.error(error?.response?.data?.message);
    }
  };

  const handleRefetchOtp = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await refetchOtp(saff_phone_number);
      if (res.status === 200) {
        message.success(res.data?.message);
      } else {
        message.error('Gửi lại mã otp thất bại!');
      }
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    if (user.error) {
      message.error(user.error);
    }
  }, [user.error]);

  useEffect(() => {
    message.success(
      'Chúng tôi đã gửi một mã otp về số điện thoại của bạn, để xác minh rằng đây là số điện thoại của bạn hãy nhập mã xác minh.'
    );
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Phone Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>
                We have sent a code to your phone{' '}
                {saff_phone_number && <span className="font-bold text-gray-500">{saff_phone_number}</span>}
              </p>
            </div>
          </div>

          <div>
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row gap-2 items-center justify-between mx-auto w-full max-w-xs">
                  {otp.map((value, index) => (
                    <div className="w-14 h-14 " key={index}>
                      <input
                        type="text"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(ref) => (refs.current[index] = ref)}
                        className={`w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-xl border text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700`}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500 mt-5">
              <p>Bạn không nhận được mã hoặc đã hết hạn?</p>
              {'  '}
              <button className="flex flex-row items-center text-blue-600" rel="noopener noreferrer" onClick={handleRefetchOtp}>
                Gửi lại mã
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
