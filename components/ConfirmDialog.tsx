import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { VariantProps } from 'class-variance-authority';
import { ReactNode, MouseEvent } from 'react';

// Định nghĩa interface cho props của ConfirmDialog
interface ConfirmDialogProps {
    triggerText?: string;
    title?: string;
    description?: string;
    cancelText?: string;
    confirmText?: string;
    onConfirm?: (event: MouseEvent<HTMLButtonElement>) => void;
    onCancel?: (event: MouseEvent<HTMLButtonElement>) => void;
    validateAction?: () => Promise<boolean>;
    triggerVariant?: VariantProps<typeof buttonVariants>['variant'];
    disabled?: boolean;
    children?: ReactNode;
}

export function ConfirmDialog({
    triggerText = 'Show Dialog',
    title = 'Are you absolutely sure?',
    description = 'This action cannot be undone.',
    cancelText = 'Cancel',
    confirmText = 'Continue',
    onConfirm,
    onCancel,
    validateAction,
    triggerVariant = 'outline',
    disabled = false,
    children,
}: ConfirmDialogProps) {
    const handleConfirm = async (event: MouseEvent<HTMLButtonElement>) => {
        if (validateAction) {
            try {
                const isValid = await validateAction();
                if (!isValid) return;
            } catch (error) {
                console.error('Validation failed:', error);
                return;
            }
        }
        if (onConfirm) {
            onConfirm(event);
        }
    };

    const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
        if (onCancel) {
            onCancel(event);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children ? (
                    children
                ) : (
                    <Button variant={triggerVariant} disabled={disabled}>
                        {triggerText}
                    </Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={handleCancel}
                        className="hover:cursor-pointer">
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        className="bg-red-500 hover:bg-red-600 hover:cursor-pointer">
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
