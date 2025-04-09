import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { updateUser } from '@/api/users/users';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

// Schema validation
const formSchema = z.object({
    firstName: z.string().min(2, {
        message: 'Firstname must be at least 2 characters.',
    }),
    lastName: z.string().min(2, {
        message: 'Lastname must be at least 2 characters.',
    }),
});
type PersonInformationFormProps = {
    id: string;
    initialValues?: {
        firstName?: string;
        lastName?: string;
    };
};
// Kiểu dữ liệu cho response API
type PersonInformation = {
    id: string;
    first_name: string;
    last_name: string;
};

export function PersonInformationForm(params: PersonInformationFormProps) {
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: params.initialValues?.firstName,
            lastName: params.initialValues?.lastName,
        },
    });

    const { mutate, isPending } = useMutation<
        PersonInformation,
        Error,
        z.infer<typeof formSchema>
    >({
        mutationFn: async (formData) => {
            const response = await updateUser(params.id, formData);
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            toast.message('Profile updated successfully', {
                description: `Hello ${data.first_name} ${data.last_name}!`,
            });
            form.reset();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
            >
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
                    {/* First Name Field */}
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="First name"
                                        {...field}
                                        disabled={isPending}
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Last Name Field */}
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Last name"
                                        {...field}
                                        disabled={isPending}
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Button Group - Adjusted for mobile */}
                
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-end">
                    <Button 
                        type="submit" 
                        disabled={isPending}
                        className="w-full sm:w-auto"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : 'Save'}
                    </Button>
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => form.reset()}
                        disabled={isPending}
                        className="w-full sm:w-auto"
                    >
                        Cancel
                    </Button>
                    
                </div>
            </form>
        </Form>
    );
}
