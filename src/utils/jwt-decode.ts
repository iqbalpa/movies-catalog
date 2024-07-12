import { jwtDecode } from 'jwt-decode';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface DecodedToken {
  user: User;
  iat: number;
  exp: number;
}

export const decodeToken = (accessToken: string) => {
  const decoded = jwtDecode<DecodedToken>(accessToken);
  return decoded;
};
