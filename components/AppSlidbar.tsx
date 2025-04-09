'use client';

import * as React from 'react';
import {
    ArrowUpCircleIcon,
    CameraIcon,
    FileCodeIcon,
    FileTextIcon,
    LayoutDashboardIcon,
    Users,
    Settings,
    ChevronDownIcon,
    ChevronRightIcon,
} from 'lucide-react';

import { NavMain } from '@/components/NavMain';
import { NavUser } from '@/components/NavUser';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { useState } from 'react';

// Định nghĩa kiểu cho user
interface User {
    name: string | null;
    email: string | null;
    avatar: string | null;
}

interface NavItem {
    title: string;
    url?: string;
    icon: React.ComponentType<{ className?: string }>;
    submenu?: Array<{
        title: string;
        url: string;
    }>;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    // Thay thế useUser bằng state tùy chỉnh
    const [user, setUser] = useState<User | null>({
        name: "Admin User",
        email: "admin@example.com",
        avatar: null
    });

    // Mock data - có thể thay thế bằng dữ liệu từ API hoặc auth provider khác
    const data = {
        user: {
            name: user?.name || null,
            email: user?.email || null,
            avatar: user?.avatar || null,
        },
        navMain: [
            {
                title: 'Dashboard',
                url: '/admin/dashboard',
                icon: LayoutDashboardIcon,
            },
            {
                title: 'Users',
                url: '/admin/users',
                icon: Users,
            },
            {
                title: 'Settings',
                icon: Settings,
                submenu: [
                    {
                        title: 'Home',
                        url: '/admin/settings/homepage',
                    },
                    {
                        title: 'Contact',
                        url: '/admin/settings/contactpage',
                    },
                    {
                        title: 'About',
                        url: '/admin/settings/aboutpage',
                    },
                    {
                        title: 'Footer',
                        url: '/admin/settings/footer',
                    },
                ],
            },
        ],
    };

    // Hàm đăng xuất
    const handleLogout = () => {
        setUser(null);
        // Thêm logic xóa token, clear storage nếu cần
        // window.location.href = '/login'; // Chuyển hướng sau khi đăng xuất
    };

    if (!user) {
        // Nếu chưa đăng nhập, có thể redirect hoặc hiển thị nội dung khác
        return null;
    }
    
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <Link href="/">
                                <ArrowUpCircleIcon className="h-5 w-5" />
                                <span className="text-base font-semibold">
                                    XeShare Inc.
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser 
                    user={data.user} 
                    onLogout={handleLogout} 
                />
            </SidebarFooter>
        </Sidebar>
    );
}