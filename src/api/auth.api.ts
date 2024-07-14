import axios from 'axios';
import { SignInRequest, SignUpRequest } from '@/constant/auth.constant';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const signup = async (data: SignUpRequest) => {
  let res = await axios.post(`${BASE_URL}/auth/signup`, {
    name: data.name,
    email: data.email,
    password: data.password,
  });
  res = res.data;
  return res;
};

export const signin = async (data: SignInRequest) => {
  const res = await axios.post(`${BASE_URL}/auth/signin`, {
    email: data.email,
    password: data.password,
  });
  const result = res.data;
  return result;
};
