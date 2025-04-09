'use client';

import { type LucideIcon } from 'lucide-react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url?: string;
        icon?: LucideIcon;
        submenu?: {
            title: string;
            url: string;
        }[];
    }[];
}) {
    const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>(
        {}
    );

    const toggleSubmenu = (title: string) => {
        setOpenSubmenus((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    {items.map((item) => (
                        <div key={item.title}>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    tooltip={item.title}
                                    className="cursor-pointer w-full"
                                    onClick={() => {
                                        if (item.submenu) {
                                            toggleSubmenu(item.title);
                                        }
                                    }}>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-2">
                                            {item.icon && (
                                                <item.icon className="h-4 w-4" />
                                            )}
                                            {item.url ? (
                                                <Link href={item.url}>
                                                    {item.title}
                                                </Link>
                                            ) : (
                                                <span>{item.title}</span>
                                            )}
                                        </div>
                                        {item.submenu &&
                                            (openSubmenus[item.title] ? (
                                                <ChevronDown className="h-4 w-4" />
                                            ) : (
                                                <ChevronRight className="h-4 w-4" />
                                            ))}
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {item.submenu && openSubmenus[item.title] && (
                                <div className="ml-6 pl-2 border-l">
                                    <SidebarMenu>
                                        {item.submenu.map((subItem) => (
                                            <SidebarMenuItem
                                                key={subItem.title}>
                                                <SidebarMenuButton
                                                    tooltip={subItem.title}
                                                    className="cursor-pointer pl-6">
                                                    <Link href={subItem.url}>
                                                        {subItem.title}
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </div>
                            )}
                        </div>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
