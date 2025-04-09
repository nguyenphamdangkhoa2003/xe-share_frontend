'use client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { IoMdSend } from 'react-icons/io';

import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@radix-ui/react-checkbox';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
export const setPasswordFormSchema = z
    .object({
        password: z.string().min(8),
        confirm_password: z.string(),
        skip_password_checks: z.boolean(),
        sign_out_of_other_sessions: z.boolean(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: 'Confirmation password does not match',
        path: ['password', 'confirm_password'],
    });

export interface PasswordDialogProps {
    handleSetPassword: (data: z.infer<typeof setPasswordFormSchema>) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
function PasswordDialog({
    handleSetPassword,
    open,
    onOpenChange,
}: PasswordDialogProps) {
    const setPasswordForm = useForm<z.infer<typeof setPasswordFormSchema>>({
        resolver: zodResolver(setPasswordFormSchema),
        defaultValues: {
            password: '',
            confirm_password: '',
            sign_out_of_other_sessions: false,
            skip_password_checks: false,
        },
    });
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Set password</DialogTitle>
                </DialogHeader>
                <Form {...setPasswordForm}>
                    <form
                        onSubmit={setPasswordForm.handleSubmit(
                            handleSetPassword
                        )}
                        className="space-y-8 max-w-3xl mx-auto py-10">
                        <FormField
                            control={setPasswordForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter new password."
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={setPasswordForm.control}
                            name="confirm_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter confirm new password."
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={setPasswordForm.control}
                            name="sign_out_of_other_sessions"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Sign out all sessions
                                        </FormLabel>
                                        <FormDescription>
                                            Set to true to sign out the user
                                            from all their active sessions once
                                            their password is updated. This
                                            parameter can only be used when
                                            providing a password
                                        </FormDescription>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={setPasswordForm.control}
                            name="skip_password_checks"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Skip password checks
                                        </FormLabel>
                                        <FormDescription>
                                            Set it to true if you're updating
                                            the user's password and want to skip
                                            any password policy settings check.
                                            This parameter can only be used when
                                            providing a password
                                        </FormDescription>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <DialogClose asChild>
                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    className="flex items-center">
                                    Submit <IoMdSend />
                                </Button>
                                <Button type="button" variant="outline">
                                    Close
                                </Button>
                            </div>
                        </DialogClose>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default PasswordDialog;
