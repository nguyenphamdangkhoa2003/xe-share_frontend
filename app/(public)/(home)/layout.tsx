import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import TanstackProvider from '@/components/providers/TanstackProvider';
import { AuthProvider } from '@/context/auth-provider';
import React from 'react';

function Homelayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <TanstackProvider>
                <AuthProvider>
                    <Navbar />
                    <main className="flex-grow mt-10 ">{children}</main>
                    <Footer />
                </AuthProvider>
            </TanstackProvider>
        </div>
    );
}

export default Homelayout;
