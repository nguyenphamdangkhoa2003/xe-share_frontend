'use client';

import useAuth from '@/hooks/use-auth';
import { RoleEnum } from '@/types/enum';
import React, { createContext, useContext } from 'react';

export type UserType = {
    name: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
    createdAt: Date;
    hasImage: boolean;
    updatedAt: Date;
    avatar: string;
    userPreferences: {
        enable2FA: boolean;
        emailNotification: boolean;
        twoFactorSecret?: string;
    };
    externalAccount?: {
        provider: 'google';
        id: string;
        name: string;
        emails: { value: string; type?: string }[];
        picture: string;
    };
    role: RoleEnum;
    passwordEnable: boolean;
};

type AuthContextType = {
    user?: UserType;
    error: any;
    isLoading: boolean;
    isFetching: boolean;
    isSuccess: boolean;
    refetch: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { data, error, isLoading, isFetching, refetch, isSuccess } =
        useAuth();
    const user = data?.data?.user;

    return (
        <AuthContext.Provider
            value={{ user, error, isLoading, isFetching, refetch, isSuccess }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const conext = useContext(AuthContext);
    if (!conext) {
        throw new Error('useAuthContext must be used within a AuthProvider');
    }
    return conext;
};
