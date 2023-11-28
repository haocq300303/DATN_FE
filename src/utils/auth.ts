import jwtDecode from 'jwt-decode';
import { getRoleById } from '~/api/role';

export const JwtDecode = () => {
  if (localStorage.getItem('accessToken')) {
    return jwtDecode(localStorage.getItem('accessToken') || '');
  }
  return null;
};

export const checkAdmin = async () => {
  const { _doc }: any = JwtDecode();
  const response = await getRoleById(_doc.role_id);
  if (response?.data?.data?.name === 'admin') {
    return true;
  }
  return false;
};

export const checkAdminPitch = async () => {
  const { _doc }: any = JwtDecode();
  const response = await getRoleById(_doc.role_id);
  if (response?.data?.data?.name === 'adminPitch') {
    return true;
  }
  return false;
};

export const isTokenExpired = (token: any) => {
  const now = Math.floor(Date.now() / 1000);
  return token.exp < now;
};
