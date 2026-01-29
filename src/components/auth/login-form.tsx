import { useForm } from "react-hook-form";
import { SocialButton } from "./social-button";
import { Divider } from "./divider";
import { FormInput } from "./form-input";
import { AuthHeader } from "./auth-header";
import Link from "next/link";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void | Promise<void>;
  onGoogleLogin?: () => void;
  forgotPasswordHref?: string;
  signUpHref?: string;
}

export function LoginForm({
  onSubmit,
  onGoogleLogin,
  forgotPasswordHref = "/forgot-password",
  signUpHref = "/signup",
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = async (data: LoginFormData) => {
    await onSubmit?.(data);
  };

  return (
    <div className="space-y-6">
      <AuthHeader title="Log in" subTitle="Find the job made for you!"/>

      <SocialButton provider="google" onClick={onGoogleLogin} />

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

        <div className="space-y-2">
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
          <div className="flex justify-end">
            <Link
              href={forgotPasswordHref}
              className="text-sm text-accent hover:text-accent/80 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-lg bg-primary-gradient font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="text-sm text-muted-foreground">
        Not registered?{" "}
        <Link
          href={signUpHref}
          className="font-medium text-accent hover:text-accent/80 hover:underline"
        >
          Create an Account
        </Link>
      </p>
    </div>
  );
}
