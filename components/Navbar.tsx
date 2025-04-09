'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LogIn, Menu, X } from 'lucide-react';
import { MdOutlineAdminPanelSettings, MdCalendarToday, MdAccountCircle } from 'react-icons/md';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    
    // State tùy chỉnh thay cho useSession
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null as { name: string; image?: string; role?: string } | null
    });

    // Hàm đăng xuất tùy chỉnh
    const customSignOut = () => {
        setAuthState({
            isAuthenticated: false,
            user: null
        });
        router.push('/');
    };

    return (
        <nav
            className="bg-background fixed w-screen z-20 top-0 start-0 border-b shadow-md"
            suppressHydrationWarning>
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3">
                    <Image
                        src="/images/logo.png"
                        height={200}
                        width={200}
                        alt="Logo"
                        className='md:block hidden'
                    />
                    <Image
                        src="/images/logo.png"
                        height={100}
                        width={150}
                        alt="Logo"
                        className='md:hidden block'
                    />
                </Link>

                {/* Menu Desktop */}
                <div className="hidden md:flex space-x-6 text-lg font-medium">
                    <Link href="/" className="hover:text-[#00aaff] transition">
                        Trang chủ
                    </Link>
                    <Link
                        href="/booking"
                        className="hover:text-[#00aaff] transition">
                        Đặt trước
                    </Link>
                    <Link
                        href="/contact"
                        className="hover:text-[#00aaff] transition">
                        Liên hệ
                    </Link>
                    <Link
                        href="/about"
                        className="hover:text-[#00aaff] transition">
                        Về chúng tôi
                    </Link>
                </div>

                {/* Phần điều khiển */}
                <div className="flex space-x-3 items-center">
                    {!authState.isAuthenticated ? (
                        <div className="hidden md:flex gap-3">
                            <Button
                                className="cursor-pointer"
                                variant="login"
                                onClick={() => router.push('/sign-in')}>
                                Đăng nhập
                            </Button>
                            <Button
                                className="cursor-pointer"
                                variant="signup"
                                onClick={() => router.push('/sign-up')}>
                                Đăng ký
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                {authState.user?.image ? (
                                                    <Image 
                                                        src={authState.user.image} 
                                                        width={32} 
                                                        height={32} 
                                                        alt="Avatar" 
                                                        className="rounded-full"
                                                    />
                                                ) : (
                                                    <MdAccountCircle size={24} />
                                                )}
                                            </div>
                                            <span className="hidden md:inline">{authState.user?.name}</span>
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuItem onClick={() => router.push('/profile')}>
                                        <MdAccountCircle className="mr-2 h-4 w-4" />
                                        <span>Hồ sơ</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => router.push('/historybooking')}>
                                        <MdCalendarToday className="mr-2 h-4 w-4" />
                                        <span>Lịch sử đặt chỗ</span>
                                    </DropdownMenuItem>
                                    {authState.user?.role === 'admin' && (
                                        <DropdownMenuItem onClick={() => router.push('/admin')}>
                                            <MdOutlineAdminPanelSettings className="mr-2 h-4 w-4" />
                                            <span>Trang quản trị</span>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem onClick={customSignOut}>
                                        <LogIn className="mr-2 h-4 w-4" />
                                        <span>Đăng xuất</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}

                    {/* Hamburger Menu Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="md:hidden">
                        <Menu size={28} />
                    </button>
                </div>
            </div>

            {/* Sidebar Menu (Trượt từ phải) */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 ease-in-out z-50`}>
                {/* Close Button */}
                <div className="flex justify-end p-4">
                    <button onClick={() => setIsOpen(false)}>
                        <X size={28} />
                    </button>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col space-y-4 p-6 text-lg font-medium">
                    <Link
                        href="/"
                        className="hover:text-[#6f42c1] transition"
                        onClick={() => setIsOpen(false)}>
                        Trang chủ
                    </Link>
                    <Link
                        href="/booking"
                        className="hover:text-[#6f42c1] transition"
                        onClick={() => setIsOpen(false)}>
                        Đặt trước
                    </Link>
                    <Link
                        href="/contact"
                        className="hover:text-[#6f42c1] transition"
                        onClick={() => setIsOpen(false)}>
                        Liên hệ
                    </Link>
                    <Link
                        href="/about"
                        className="hover:text-[#6f42c1] transition"
                        onClick={() => setIsOpen(false)}>
                        Về chúng tôi
                    </Link>

                    {!authState.isAuthenticated ? (
                        <>
                            <Button
                                className="w-full"
                                onClick={() => {
                                    router.push('/sign-in');
                                    setIsOpen(false);
                                }}>
                                Đăng nhập
                            </Button>
                            <Button
                                className="w-full"
                                variant="secondary"
                                onClick={() => {
                                    router.push('/sign-up');
                                    setIsOpen(false);
                                }}>
                                Đăng ký
                            </Button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    router.push('/profile');
                                    setIsOpen(false);
                                }}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                <MdAccountCircle className="mr-2" />
                                Hồ sơ
                            </button>
                            <button
                                onClick={() => {
                                    router.push('/historybooking');
                                    setIsOpen(false);
                                }}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                <MdCalendarToday className="mr-2" />
                                Lịch sử đặt chỗ
                            </button>
                            {authState.user?.role === 'admin' && (
                                <button
                                    onClick={() => {
                                        router.push('/admin');
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    <MdOutlineAdminPanelSettings className="mr-2" />
                                    Trang quản trị
                                </button>
                            )}
                            <Button
                                className="w-full mt-4"
                                variant="destructive"
                                onClick={() => {
                                    customSignOut();
                                    setIsOpen(false);
                                }}>
                                Đăng xuất
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;