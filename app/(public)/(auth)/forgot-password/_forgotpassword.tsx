"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, MailCheck, Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
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
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { forgotPasswordMutationFn } from "@/api/auths/auth";
import { toast } from "sonner";

export default function ForgotPassword() {
  const params = useSearchParams();
  const email = params.get("email");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPasswordMutationFn,
  });

  const formSchema = z.object({
    email: z.string().trim().email().min(1, {
      message: "Email is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: () => {
        setIsSubmitted(true);
      },
      onError: (error) => {
        toast.error("Error", {
          description: error.message,
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      {!isSubmitted ? (
        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 space-y-6">
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Forgot Password?
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Enter your email to receive a reset link
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your@email.com"
                          autoComplete="email"
                          {...field}
                          className="h-12 rounded-lg border-gray-300 dark:border-gray-600"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader className="h-5 w-5 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>
            </Form>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Remember your password?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Sign in here
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <MailCheck className="h-7 w-7 text-green-600 dark:text-green-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Check Your Email
            </h2>
            
            <p className="text-gray-500 dark:text-gray-400">
              We sent a password reset link to{" "}
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {form.getValues().email}
              </span>
            </p>
            
            <div className="pt-2">
              <Link href="/sign-in">
                <Button className="h-12 w-full rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white">
                  Back to Sign In
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 pt-4">
              Didn't receive the email?{" "}
              <button 
                onClick={() => setIsSubmitted(false)}
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}