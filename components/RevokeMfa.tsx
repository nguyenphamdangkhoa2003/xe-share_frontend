'use client';
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Loader } from 'lucide-react';
import { revokeMFAMutationFn } from '@/api/auths/auth';
import { toast } from 'sonner';

const RevokeMfa = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: revokeMFAMutationFn,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({
                queryKey: ['authUser'],
            });
            toast('Success', {
                description: response.message,
            });
        },
        onError: (error: any) => {
            toast('Error', {
                description: error.message,
                style: {
                    background: '#ef4444',
                    color: '#fff',
                },
            });
        },
    });

    const handleClick = useCallback(() => {
        mutate();
    }, []);

    return (
        <Button
            disabled={isPending}
            className="h-[35px] !text-[#c40006d3] !bg-red-100 shadow-none mr-1"
            onClick={handleClick}>
            {isPending && <Loader className="animate-spin" />}
            Revoke Access
        </Button>
    );
};

export default RevokeMfa;
