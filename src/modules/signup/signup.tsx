'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signup } from '@/api/auth.api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, User } from 'lucide-react';

type SignUpInputs = {
  name: string;
  email: string;
  password: string;
};

const SignUpModule: React.FC = () => {
  const router = useRouter();

  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
  const togglePassVisibility = () => {
    setIsPassVisible(!isPassVisible);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpInputs>();
  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    try {
      const res = await signup(data);
      if (!res) {
        toast.error('Registration failed');
        return;
      }
      toast.success('Registration success');
      setTimeout(() => {
        router.push('/signin');
      }, 1500);
    } catch (error) {
      toast.error('An error occurred during registration');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-900">
      <div className="flex w-full flex-col items-center justify-center bg-opacity-0 p-8 backdrop-blur-md backdrop-filter md:w-1/2 md:border md:border-gray-200 md:bg-opacity-20 md:p-14 lg:w-1/3">
        <h1 className="mb-5 text-xl font-bold uppercase text-white">Sign Up</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col"
        >
          <div className="mb-2 flex flex-col">
            <p className="mb-1 font-semibold text-white">Name</p>
            <div className="flex flex-row items-center">
              <input
                placeholder="name"
                {...register('name', { required: true })}
                className="mr-2 grow rounded-md border-[1px] border-slate-400 px-4 py-2"
              />
              <User color="#ffffff" size={35} />
            </div>
            {errors.name && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-2 flex flex-col">
            <p className="mb-1 font-semibold text-white">Email</p>
            <div className="flex flex-row items-center">
              <input
                placeholder="email"
                {...register('email', { required: true })}
                className="mr-2 grow rounded-md border-[1px] border-slate-400 px-4 py-2"
              />
              <Mail color="#ffffff" size={35} />
            </div>
            {errors.email && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4 flex flex-col">
            <p className="mb-1 font-semibold text-white">Password</p>
            <div className="flex flex-row items-center">
              <input
                placeholder="password"
                type={isPassVisible ? 'text' : 'password'}
                {...register('password', { required: true })}
                className="mr-2 grow rounded-md border-[1px] border-slate-400 px-4 py-2"
              />
              {isPassVisible ? (
                <Eye
                  color="#ffffff"
                  size={35}
                  onClick={togglePassVisibility}
                  className="cursor-pointer"
                />
              ) : (
                <EyeOff
                  color="#ffffff"
                  size={35}
                  onClick={togglePassVisibility}
                  className="cursor-pointer"
                />
              )}
            </div>
            {errors.password && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>
          <input
            type="submit"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-white duration-100 hover:cursor-pointer hover:bg-emerald-700"
          />
        </form>
        <p className="mt-5 text-sm text-white">
          already have an account?{' '}
          <Link href="/signin" className="text-green-500 hover:text-green-700">
            login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpModule;
