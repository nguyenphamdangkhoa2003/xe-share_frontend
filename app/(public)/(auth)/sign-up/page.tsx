'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader, MailCheckIcon, Eye, EyeOff } from 'lucide-react'; // Thêm Eye và EyeOff
import { useMutation } from '@tanstack/react-query';
import { registerMutationFn } from '@/api/auths/auth';
import { toast } from 'sonner';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

export default function SignUp() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State cho password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State cho confirm password

    const { mutate, isPending } = useMutation({
        mutationFn: registerMutationFn,
    });

    const formSchema = z
        .object({
            name: z.string().trim().min(1, {
                message: 'Name is required',
            }),
            email: z.string().trim().email().min(1, {
                message: 'Email is required',
            }),
            password: z.string().trim().min(8, {
                message: 'Password must be at least 8 characters',
            }),
            confirmPassword: z.string().min(1, {
                message: 'Confirm Password is required',
            }),
        })
        .refine((val) => val.password === val.confirmPassword, {
            message: 'Passwords do not match',
            path: ['confirmPassword'],
        });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate(values, {
            onSuccess: () => {
                setIsSubmitted(true);
            },
            onError: (error) => {
                toast.error('Registration Error', {
                    description: error.message,
                    style: {
                        background: '#ef4444',
                        color: '#fff',
                    },
                });
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
            {!isSubmitted ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Create Your Account
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Join us to get started
                        </p>
                    </div>

                    <Button variant="outline" className="w-full mb-6 gap-2">
                        <FcGoogle className="h-5 w-5" />
                        Sign up with Google
                    </Button>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                                OR CONTINUE WITH EMAIL
                            </span>
                        </div>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-300">
                                            Full Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your name"
                                                className="dark:bg-gray-700 dark:border-gray-600"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-300">
                                            Email Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="your@email.com"
                                                type="email"
                                                autoComplete="off"
                                                className="dark:bg-gray-700 dark:border-gray-600"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-300">
                                            Password
                                        </FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    placeholder="At least 8 characters"
                                                    className="dark:bg-gray-700 dark:border-gray-600 pr-10"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }>
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-300">
                                            Confirm Password
                                        </FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    type={
                                                        showConfirmPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    placeholder="Confirm your password"
                                                    className="dark:bg-gray-700 dark:border-gray-600 pr-10"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }>
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full mt-2 h-11 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                                disabled={isPending}>
                                {isPending ? (
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                ) : null}
                                Create Account
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </Form>

                    <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
                        Already have an account?{' '}
                        <Link
                            href="/sign-in"
                            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                            Sign in
                        </Link>
                    </p>

                    <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6">
                        By signing up, you agree to our{' '}
                        <Link
                            href="#"
                            className="underline hover:text-blue-600 dark:hover:text-blue-400">
                            Terms
                        </Link>{' '}
                        and{' '}
                        <Link
                            href="#"
                            className="underline hover:text-blue-600 dark:hover:text-blue-400">
                            Privacy Policy
                        </Link>
                    </p>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
                    <div className="flex justify-center mb-6">
                        <MailCheckIcon
                            size={48}
                            className="text-green-500 animate-bounce"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Check Your Email
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        We've sent a verification link to{' '}
                        <span className="font-medium">
                            {form.getValues().email}
                        </span>
                    </p>
                    <Link href="/sign-in">
                        <Button className="h-11 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                            Go to Login
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
