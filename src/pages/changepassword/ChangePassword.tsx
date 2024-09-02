import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

type TResetForm = {
  email: string;
  newPassword: string;
};

const ChangePassword = () => {
  const [searchParams] = useSearchParams();

  // Extract specific query parameters
  const token = searchParams.get("token");
 
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetForm>();

  const onSubmit: SubmitHandler<TResetForm> = async (data) => {
    if (token) {
      const res = await resetPassword({
        email: data.email,
        token,
        newPassword: data.newPassword,
      });
      console.log(res);
      if (res?.data?.success) {
      toast.success("Password reset successfully! 😍");
        navigate("/login");
      }
    }
  };
  if(isLoading) return <Loader />

  return (
    <section className="max-w-screen-xl mx-auto px-3 lg:px-0 min-h-screen flex items-center justify-center py-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* email */}
        <div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Type Your Email Here:</Label>
            <Input
              className="md:w-80 focus-visible:ring-offset-0"
              type="email"
              id="email"
              {...register("email", { required: true })}
            />
          </div>
          {errors?.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}
        </div>
        {/* new Password */}
        <div className="mb-4 relative">
        <Label htmlFor="newPassword">Type New Password Here:</Label>
          <Input
            type={showPassword ? 'text' : 'password'}
            {...register('newPassword', { required: 'newPassword is required' })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.newPassword && typeof errors.newPassword.message === 'string' && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
          
          <p
            className="absolute mt-3 right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </p>
        </div>
        <Button type="submit" className="w-full mt-2 cursor-pointer bg-[#FEA633] text-white relative h-[50px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl">
          <span className='relative z-10'>Submit</span>
        </Button>
      </form>
    </section>
  );
};

export default ChangePassword;
