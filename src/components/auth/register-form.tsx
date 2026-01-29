import { useForm } from "react-hook-form";
import { SocialButton } from "./social-button";
import { Divider } from "./divider";
import { FormInput } from "./form-input";
import { AuthHeader } from "./auth-header";
import bcrypt from "bcryptjs"
import Link from "next/link";

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData) => void | Promise<void>;
  onGoogleRegister?: () => void;
  loginHref?: string;
}

export function RegisterForm({
  onSubmit,
  onGoogleRegister,
  loginHref = "/login",
}: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const handleFormSubmit = async (data: RegisterFormData) => {
    const hashedPassword = await bcrypt.hash(data.password, 10); 

    const submitData = {
      email: data.email,
      password: hashedPassword,
      confirmPassword: ""
    };

    await onSubmit?.(submitData);
  };

  return (
    <div className="space-y-6">
      <AuthHeader title="Create Account" subTitle="Hunt your next opportunity!"/>

      <SocialButton provider="google" onClick={onGoogleRegister} type="Sign up"/>

      <Divider />

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormInput
          label="Email"
          type="email"
          placeholder="example@mail.com"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />

        <FormInput
            label="Password"
            type="password"
            placeholder="Password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

        <FormInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => 
                value === password || "Password do not match"
            })}
          />

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-lg bg-primary-gradient font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Signing up..." : "Sign up"}
        </button>
      </form>

      <div className="space-y-2">
          
          <div className="">
            <span
              className="text-sm"
            >By clicking "Sign up", you agree to our </span>
            <Link
              href={loginHref}
              className="text-sm text-accent hover:text-accent/80 hover:underline"
            >
               Terms of Use
            </Link>
            <span
              className="text-sm"
            > and acknowledge you have read the </span>
            <Link
              href={loginHref}
              className="text-sm text-accent hover:text-accent/80 hover:underline"
            >
              Privacy Policy.
            </Link>
          </div>
        </div>

      <p className="text-sm text-muted-foreground">
        <Link
          href={loginHref}
          className="font-medium text-accent hover:text-accent/80 hover:underline"
        >
          Already have an account.
        </Link>
      </p>
    </div>
  );
}
