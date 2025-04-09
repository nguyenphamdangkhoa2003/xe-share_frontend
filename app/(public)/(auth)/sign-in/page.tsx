"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight, Loader, Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginMutationFn } from "@/api/auths/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Thêm icon Google

export default function Login() {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,
  });
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z.object({
    email: z.string().trim().email().min(1, {
      message: "Email is required",
    }),
    password: z.string().trim().min(1, {
      message: "Password is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: (response) => {
        if (response.data.mfaRequired) {
          router.replace(`/verify-mfa?email=${values.email}`);
          return;
        }
        router.replace(`/`);
      },
      onError: (error) => {
        toast("Error", {
          description: error.message,
          style: {
            background: "#ef4444",
            color: "#fff",
          },
        });
      },
    });
  };

  // Hàm xử lý đăng nhập bằng Google
  const handleGoogleSignIn = async () => {
   
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white dark:bg-gray-800 p-8 shadow-md dark:shadow-gray-700/50">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>

        {/* Nút đăng nhập bằng Google */}
        <Button variant="outline" className="w-full gap-2"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="h-5 w-5" />
          Sign in with Google
        </Button>

        {/* Dòng phân cách */}
        <div className="relative my-4 mt-0">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
              Or continue with email
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your@email.com"
                        {...field}
                        className="h-11 rounded-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-xs mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between mb-1">
                      <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                      </FormLabel>
                    </div>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          className="h-11 rounded-lg pr-10"
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <FormMessage className="text-xs mt-1" />
                  </FormItem>
                )}
              />
              <Link
                href={`/forgot-password?email=${form.getValues().email}`}
                className="text-sm text-blue-600 hover:text-blue-500 hover:underline dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-lg flex items-center justify-center gap-2 text-base font-medium bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Continue <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Sign up
          </Link>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-5 text-center text-xs text-gray-500 dark:text-gray-400">
          By continuing, you agree to our{" "}
          <Link
            href="#"
            className="hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </main>
  );
}