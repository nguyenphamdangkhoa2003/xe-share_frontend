import React from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronRight, LogOut, MailOpen, User } from 'lucide-react';
function UserButton() {
    const { isLoaded, user } = useUser();
    const { signOut, openUserProfile } = useClerk();

    if (!isLoaded) return null;
    if (!user?.id) return null;
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                            {user.fullName}
                        </span>
                    </div>
                    <Avatar>
                        <AvatarImage
                            src={user.imageUrl}
                            alt={user.primaryEmailAddress?.emailAddress}
                            width={30}
                            height={30}
                        />
                        <AvatarFallback>{user.fullName}</AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border border-gray-200 bg-white text-black drop-shadow-md">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <button
                        className="flex gap-2 cursor-pointer items-center"
                        onClick={() => openUserProfile()}>
                        <User />
                        Profile
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem />
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <button
                        className="flex gap-2 cursor-pointer items-center"
                        onClick={() => signOut(() => router.push('/'))}>
                        <LogOut />
                        Logout
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserButton;
