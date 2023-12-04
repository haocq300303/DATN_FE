import jwtDecode from 'jwt-decode';
import { getRoleById } from '~/api/role';

export const JwtDecode = () => {
  if (localStorage.getItem('accessToken')) {
    return jwtDecode(localStorage.getItem('accessToken') || '');
  }
  return null;
};

export const checkAdmin = async () => {
  let check = false;
  const { _doc }: any = JwtDecode();
  const response = await getRoleById(_doc.role_id);
  if (response?.data?.data?.name === 'admin') {
    check = true;
  }
  return check;
};

export const checkAdminPitch = async () => {
  let check = false;
  const { _doc }: any = JwtDecode();
  const response = await getRoleById(_doc.role_id);

  if (response?.data?.data?.name === 'adminPitch') {
    check = true;
  }
  return check;
};

export const isTokenExpired = (token: any) => {
  const now = Math.floor(Date.now() / 1000);
  return token.exp < now;
};
