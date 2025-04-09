import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogFooter } from '@/components/ui/dialog';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useForm } from 'react-hook-form';
import { z } from 'zod';
const addEmailFormSchema = z.object({
    email_address: z.string().email({ message: 'Invalid email address' }),
    verified: z.boolean().default(false).optional(),
    primary: z.boolean().default(false).optional(),
});
export function EmailFormDialog({
    userId,
    mutation,
    onSuccess,
}: {
    userId: string;
    mutation: any;
    onSuccess: () => void;
}) {
    

    const form = useForm<z.infer<typeof addEmailFormSchema>>({
        resolver: zodResolver(addEmailFormSchema),
        defaultValues: {
            email_address: '',
            verified: false,
            primary: false,
        },
    });

    const onSubmit = (values: z.infer<typeof addEmailFormSchema>) => {
        mutation.mutate({ user_id: userId, ...values }, { onSuccess });
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email_address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email address</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter email address"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="verified"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel>Mark as verified</FormLabel>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="primary"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel>Set as primary</FormLabel>
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Adding...' : 'Add Email'}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
