import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '', // Để trống nếu không dùng port cụ thể
                pathname: '/**', // Cho phép tất cả các đường dẫn dưới domain này
            },
        ],
    },
};

export default nextConfig;
