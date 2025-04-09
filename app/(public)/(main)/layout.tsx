import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/components/providers/auth-provider';
import TanstackProvider from '@/components/providers/TanstackProvider';
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
                <Navbar />
                <main className="flex-grow mt-10 ">{children}</main>
                <Footer />
            </TanstackProvider>
        </div>
        </AuthProvider>
    );
}

export default Homelayout;