import React from 'react';
import RegistrationForm from '@/components/form/RegistrationForm';
import Image from 'next/image';

const RegisterATripPage = () => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-white">
            <div className="w-full lg:w-5/12 p-4 lg:p-8  flex items-center justify-center">
                <div className="w-full max-w-lg bg-white p-5 lg:p-6  lg:px-2 rounded-lg">
                    <h1 className="text-2xl font-semibold text-center mb-4">Đăng ký tuyến đường</h1>
                    <p className="text-center text-gray-600 mb-6">
                        Hãy nhập thông tin chi tiết về tuyến đường bạn muốn chia sẻ.
                    </p>
                    <RegistrationForm />
                </div>
            </div>

            <div className="hidden lg:block lg:w-7/12 relative">
                <div className="absolute inset-0 overflow-hidden">
                    <Image
                        src="/images/registertripimage.jpg"
                        alt="Travel background"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        className="z-0"
                    />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent z-10"></div>
                
                
            </div>
        </div>
    );
};

export default RegisterATripPage;