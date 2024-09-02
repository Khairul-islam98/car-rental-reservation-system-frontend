import { useState } from "react";
import { z } from "zod";
import { useForm, Controller, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const registrationSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
    checkbox: z.boolean().default(false).refine((value) => value === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const Register = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [createUser] = useSignupMutation()
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
   const userData = {
    name: data.name,
    email: data.email,
    password: data.password,
   }
   console.log(userData);
  const res = await createUser(userData)
  console.log(res);
  if(res?.data?.success) {
    toast.success("Account created successfully! 😍");
    reset()
    navigate('/login')
  }else{
    toast.error("Failed to create account. Please try again later. 🥲");
  }

  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-20 mb-10">
      <section className="text-center">
        <h1 className="header text-gray-600">
          Hi there <span className="animate-waving-hand">👋</span>
        </h1>
        <p className="text-xl text-gray-600">Create an account</p>
      </section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Label className="block text-gray-700">Name</Label>
          <Input
            type="text"
            {...register("name")}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.name && typeof errors.name.message === 'string' && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <Label className="block text-gray-700">Email</Label>
          <Input
            type="email"
            {...register("email")}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.email && typeof errors.email.message === 'string' && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <Label className="block text-gray-700">Password</Label>
          <Input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.password && typeof errors.password.message === 'string' && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <p
            className="absolute mt-3 right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </p>
        </div>

        <div className="mb-4 relative">
          <Label className="block text-gray-700">Confirm Password</Label>
          <Input
            type={showPassword ? "text" : "password"}
            {...register("confirmPassword")}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.confirmPassword && typeof errors.confirmPassword.message === 'string' && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          <p
            className="absolute mt-3 right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </p>
        </div>

        <div className="mb-4 flex items-center space-x-2">
          <Controller
            name="checkbox"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="terms"
                {...field}
                checked={field.value}
                onCheckedChange={field.onChange}
                className="dark:border-black"
              />
            )}
          />
          <Label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-600"
          >
            Accept terms and conditions
          </Label>
        </div>
        {errors.checkbox && typeof errors.checkbox.message === 'string' && (
          <p className="text-red-500 text-sm">{errors.checkbox.message}</p>
        )}

        <Button
          type="submit"
          className="w-full mt-2 cursor-pointer bg-[#FEA633] text-white relative h-[50px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl"
        >
          <span className="relative z-10">Sign Up</span>
        </Button>
      </form>

      <div className="mt-4 text-center text-sm dark:text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-[#FEA633] hover:underline">
          Sign in
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

export default Register;
