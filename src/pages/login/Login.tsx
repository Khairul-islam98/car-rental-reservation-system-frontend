/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { useAppDispatch } from '@/redux/hooks';
import { verifyToken } from '@/utils/verifyToken';
import { setUser, TUser } from '@/redux/features/auth/authSlice';
import toast from 'react-hot-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({mode: 'onChange'});

  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues>= async(data) => {

    try{
      const userInfo = {
        email: data.email,
        password: data.password
      }
     
      const res = await login(userInfo).unwrap()
      const user = verifyToken(res.data.accessToken) as TUser
      if(user?.status === 'block'){
        toast.error('Your account has been blocked. Please contact the administrator.');
        
      }
  
      dispatch(setUser({user: user, token: res.data.accessToken}))

      toast.success('Logged in successfully! 😍');
      navigate(`/${user?.role}/dashboard`);

    }catch(err: any){
      toast.error(err?.data?.message || 'Failed to login. Please try again.')
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-20 mb-20">
      <section className="">
        <p className="header text-gray-600 text-center">Welcome <span className='animate-waving-hand'>👋</span></p>
        <p className="text-center text-xl text-gray-600">Sign in to your account</p>
      </section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Label className="block text-gray-700">Email</Label>
          <Input
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address'
              }
            })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.email && typeof errors.email.message === 'string' && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <Label className="block text-gray-700">Password</Label>
          <Input
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'Password is required' })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.password && typeof errors.password.message === 'string' && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          
          <p
            className="absolute mt-3 right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </p>
        </div>

        <p>
          <Link to="/forget-password" className="text-[#FEA633] hover:underline">
            Forgot Password?
          </Link>
        </p>

        <Button type="submit" className="w-full mt-2 cursor-pointer bg-[#FEA633] text-white relative h-[50px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl">
          <span className='relative z-10'>Sign In</span>
        </Button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600">
      
          Don't have an account yet?{' '}
          <Link to="/register" className="text-[#FEA633] hover:underline">
            Register
          </Link>
     
      </div>

      <footer className="mt-6 text-center text-xs text-gray-600">
        <p>
          <Link to="/privacy-policy" className="text-[#FEA633] hover:underline">Privacy Policy</Link> {' '} | {' '}
          <Link to="/terms-of-service" className="text-[#FEA633] hover:underline">Terms of Service</Link>
        </p>
      </footer>
    </div>
  );
};

export default Login;
