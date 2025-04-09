'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogIn, Menu, Moon, Sun, X } from 'lucide-react';
import {
    MdOutlineAdminPanelSettings,
    MdCalendarToday,
    MdAccountCircle,
} from 'react-icons/md';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserType } from '@/context/auth-provider';
import { useAuthContext } from '@/context/auth-provider';
import { RoleEnum } from '@/types/enum';
import { useMutation } from '@tanstack/react-query';
import { logoutMutationFn } from '@/api/auths/auth';
import LogoutDialog from '@/components/LogoutDialog';

const Navbar = () => {
    const router = useRouter();
    const logoutMutation = useMutation({
        mutationFn: logoutMutationFn,
        onSuccess: () => {
            setAuthState({
                isAuthenticated: false,
                user: undefined,
            });
            router.push('/');
        },
    });
    const { user, isSuccess } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const [authState, setAuthState] = useState<{
        isAuthenticated: boolean;
        user: UserType | undefined;
    }>({
        isAuthenticated: false,
        user: undefined,
    });

    const customSignOut = () => {
        logoutMutation.mutate();
    };
    useEffect(() => {
        if (isSuccess) {
            setAuthState({
                isAuthenticated: true,
                user,
            });
        } else {
            setAuthState({
                isAuthenticated: false,
                user: undefined,
            });
        }
    }, [isSuccess, user]);
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
                        className="md:block hidden"
                    />
                    <Image
                        src="/images/logo.png"
                        height={100}
                        width={150}
                        alt="Logo"
                        className="md:hidden block"
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
                    {!user ? (
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
                                    <Button
                                        variant="ghost"
                                        size="lg"
                                        className="flex items-center gap-2 p-2 hover:bg-gray-100">
                                        {/* Avatar */}
                                        <div className="h-8 w-8 rounded-lg bg-gray-200 flex items-center justify-center">
                                            {user?.avatar ? (
                                                <Image
                                                    src={user.avatar}
                                                    width={32}
                                                    height={32}
                                                    alt="Avatar"
                                                    className="rounded-lg object-cover"
                                                />
                                            ) : (
                                                <span className="text-sm font-semibold">
                                                    {user?.name
                                                        ?.split(' ')?.[0]
                                                        ?.charAt(0)}
                                                    {user?.name
                                                        ?.split(' ')?.[1]
                                                        ?.charAt(0)}
                                                </span>
                                            )}
                                        </div>
                                        {/* Thông tin người dùng */}
                                        <div className="grid flex-1 text-left text-sm leading-tight md:grid">
                                            <span className="truncate font-semibold">
                                                {user?.name}
                                            </span>
                                            <span className="truncate text-xs text-gray-500">
                                                {user?.email}
                                            </span>
                                        </div>
                                        {/* Biểu tượng ellipsis */}
                                        <span className="ml-auto md:block hidden size-4 text-gray-500">
                                            ⋮
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    side="bottom"
                                    align="end"
                                    sideOffset={4}>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                setTheme(
                                                    theme === 'light'
                                                        ? 'dark'
                                                        : 'light'
                                                )
                                            }>
                                            {theme === 'light' ? (
                                                <Moon size={16} />
                                            ) : (
                                                <Sun size={16} />
                                            )}
                                            <span className="ml-2">
                                                Toggle theme
                                            </span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => setIsLogoutOpen(true)}>
                                        <LogIn size={16} />
                                        <span className="ml-2">Đăng xuất</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => router.push('/profile')}>
                                        <MdAccountCircle size={16} />
                                        <span className="ml-2">Hồ sơ</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() =>
                                            router.push('/historybooking')
                                        }>
                                        <MdCalendarToday size={16} />
                                        <span className="ml-2">
                                            Lịch sử đặt chỗ
                                        </span>
                                    </DropdownMenuItem>

                                    {user.role === RoleEnum.ADMIN && (
                                        <DropdownMenuItem
                                            onClick={() =>
                                                router.push('/admin')
                                            }>
                                            <MdOutlineAdminPanelSettings
                                                size={16}
                                            />
                                            <span className="ml-2">
                                                Trang quản trị
                                            </span>
                                        </DropdownMenuItem>
                                    )}
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

            {/* Mobile Menu */}
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
                </div>

                {/* Auth Buttons for Mobile */}
                {!user ? (
                    <div className="flex flex-col gap-3 p-6">
                        <Button
                            className="cursor-pointer w-full"
                            variant="login"
                            onClick={() => {
                                router.push('/sign-in');
                                setIsOpen(false);
                            }}>
                            Đăng nhập
                        </Button>
                        <Button
                            className="cursor-pointer w-full"
                            variant="signup"
                            onClick={() => {
                                router.push('/sign-up');
                                setIsOpen(false);
                            }}>
                            Đăng ký
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 p-6">
                        <Button
                            className="cursor-pointer w-full"
                            variant="outline"
                            onClick={() => {
                                router.push('/profile');
                                setIsOpen(false);
                            }}>
                            Hồ sơ
                        </Button>
                        <Button
                            className="cursor-pointer w-full"
                            variant="outline"
                            onClick={() => {
                                router.push('/historybooking');
                                setIsOpen(false);
                            }}>
                            Lịch sử đặt chỗ
                        </Button>
                        {user.role === RoleEnum.ADMIN && (
                            <Button
                                className="cursor-pointer w-full"
                                variant="outline"
                                onClick={() => {
                                    router.push('/admin');
                                    setIsOpen(false);
                                }}>
                                Trang quản trị
                            </Button>
                        )}
                        <Button
                            className="cursor-pointer w-full"
                            variant="destructive"
                            onClick={() => {
                                setIsLogoutOpen(true);
                                setIsOpen(false);
                            }}>
                            Đăng xuất
                        </Button>
                    </div>
                )}
            </div>

            <LogoutDialog isOpen={isLogoutOpen} setIsOpen={setIsLogoutOpen} />
        </nav>
    );
};

export default Navbar;
