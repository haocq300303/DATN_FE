export const isTokenExpired = (token: any) => {
  const now = Math.floor(Date.now() / 1000);
  return token.exp < now;
};
