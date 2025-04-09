import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/components/providers/auth-provider';
import TanstackProvider from '@/components/providers/TanstackProvider';
import { AuthProvider } from '@/context/auth-provider';
import React from 'react';

function Homelayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>
        <div>
            <TanstackProvider>
                <AuthProvider>
                    <Navbar />
                    <main className="flex-grow mt-10 ">{children}</main>
                    <Footer />
                </AuthProvider>
            </TanstackProvider>
        </div>
        </AuthProvider>
    );
}

export default Homelayout;