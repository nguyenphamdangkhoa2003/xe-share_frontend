'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useUser, useSessionList } from '@clerk/nextjs'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

// API imports
import {
    deleteUserProfileImage,
    getUserById,
    updateUser,
    uploadUserProfileImage,
} from '@/api/users/users';
import { addEmail, deleteEmail, updateEmail } from '@/api/email/email';

// Type imports
import { User, EmailAddress, SetPasswordData } from '@/api/users/types';
import { EmailDataForm } from '@/api/email/types';
// Component imports
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Loading from '@/components/ui/loading';
import { PersonInformationForm } from '@/components/form/PersonInformationForm';
import { UploadButton } from '@/components/ButtonUpload';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import PasswordDialog, {
    setPasswordFormSchema,
} from '@/components/PasswordDialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Icon imports
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FaBan, FaRegEdit } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { TbLock } from 'react-icons/tb';
import { AlertCircle, MoreHorizontal,Loader2 } from 'lucide-react';
import { CiMail, CiWarning } from 'react-icons/ci';
import { MdOutlineVerified } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';

// Utility imports
import { getInitials } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import { EmailFormDialog } from '@/components/EmailFormDialog';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { UserDetail } from './UserDetail';
import { DriverInfoForm } from '@/components/form/DriverInformationForm';



export default function UserProfilePage() {
    const router = useRouter();
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
    const { user: clerkUser } = useUser();
    const userId = clerkUser?.id;
    const [currentTab, setCurrentTab] = useState('account')
    const { sessions } = useSessionList()
    const [isDriverDialogOpen, setIsDriverDialogOpen] = useState(false);
    const {
        data: user,
        isLoading,
        error,
        refetch,
    } = useQuery<User>({
        queryKey: ['user', userId],
        queryFn: () => userId ? getUserById(userId) : Promise.reject('No user ID'),
        enabled: !!userId
    });
    

    // Mutations
    const registerDriverMutation = useMutation({
        mutationFn: ({ userId, data }: { userId: string; data: object }) => 
            updateUser(userId, data),
        onSuccess: () => {
            toast.success('Đăng ký tài xế thành công');
            refetch();
            setIsDriverDialogOpen(false);
        },
        onError: (error) => toast.error(error.message),
        });
    const deleteEmailMutation = useMutation({
        mutationFn: deleteEmail,
        onSuccess: () => {
            toast.success('Email deleted successfully');
            refetch();
        },
        onError: (error) => toast.error(error.message),
    });

    const updateEmailMutation = useMutation({
        mutationFn: ({
            emailId,
            data,
        }: {
            emailId: string;
            data: EmailDataForm;
        }) => updateEmail(emailId, data),
        onSuccess: () => {
            toast.success('Email updated successfully');
            refetch();
        },
        onError: (error) => toast.error(error.message),
    });

    const addEmailMutation = useMutation({
        mutationFn: (data: EmailDataForm) => addEmail(data),
        onSuccess: () => {
            toast.success('Email added successfully');
            refetch();
        },
        onError: (error) => toast.error(error.message),
    });

    const deleteUserProfileImageMutation = useMutation({
        mutationFn: (id: string) => deleteUserProfileImage(id),
        onSuccess: (data) => refetch(),
        onError: (error) => toast.error(error.message),
    });
    const setPasswordMutation = useMutation({
        mutationFn: async (data: SetPasswordData) => {
            if (!userId) {
            toast.error('User ID is missing');
            return;
            }
            // Giả sử updateUser là hàm bất đồng bộ và trả về Promise
            await updateUser(userId, data);
        },
        onSuccess: () => {
            toast.success('Password updated successfully');
            refetch();
            setIsPasswordDialogOpen(false);
        },
        onError: (error) => toast.error(error.message),
    });


    const uploadAvatarMutation = useMutation({
        mutationFn: ({ userId, file }: { userId: string; file: File }) =>
            uploadUserProfileImage(userId, file),
        onSuccess: (data) => {
            toast.success('Upload avatar successful');
            refetch();
        },
        onError: (error) => toast.error(error.message),
    });

    const setIsYouCanDeleteYouraccount = useMutation({
        mutationFn: ({ userId, data }: { userId: string; data: object }) =>
            updateUser(userId, data),
    });
    // Table column definitions
    const emailColumns: ColumnDef<EmailAddress>[] = [
        {
            accessorKey: 'emailAddress',
            cell: ({ row }) => (
                <div className="flex items-center gap-2 p-2">
                    <CiMail className="text-gray-500" />
                    <span className="font-medium text-gray-400">
                        {row.original.emailAddress}
                    </span>
                    {row.original.verification ? (
                        <MdOutlineVerified className="text-green-500" />
                    ) : (
                        <CiWarning className="text-orange-500" />
                    )}
                    {row.original.id === user?.primaryEmailAddressId && (
                        <span className="text-blue-600 text-xs">Primary</span>
                    )}
                </div>
            ),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() =>
                                updateEmailMutation.mutate({
                                    emailId: row.original.id,
                                    data: {
                                        primary: !(
                                            row.original.id ===
                                            user?.primaryEmailAddressId
                                        ),
                                    },
                                })
                            }
                            disabled={
                                row.original.id === user?.primaryEmailAddressId
                            }>
                            Set as primary
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                updateEmailMutation.mutate({
                                    emailId: row.original.id,
                                    data: {
                                        verified: !row.original.verification,
                                    },
                                })
                            }>
                            Mark as{' '}
                            {row.original.verification
                                ? 'unverified'
                                : 'verified'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            disabled={deleteEmailMutation.isPending}
                            onSelect={(e) => {
                                e.preventDefault();
                            }}>
                            <ConfirmDialog
                                title="Remove email"
                                description="Are you sure you want to delete this user's email?"
                                confirmText="Remove email"
                                cancelText="Cancel"
                                onConfirm={() => {
                                    deleteEmailMutation.mutate(row.original.id);
                                }}>
                                <div className="text-red-500">Remove email</div>
                            </ConfirmDialog>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    // Handlers
    const handleSetPassword = (values: z.infer<typeof setPasswordFormSchema>) => {
    setPasswordMutation.mutate(values);
    };

    const handleBack = () => router.back();

    const handleUploadAvatar = (file: File) => {
        if (!userId) return;
        uploadAvatarMutation.mutate({ userId, file });
    };
    // Loading state
    if (isLoading) return <Loading />;
    // Error state
    if (error || !user) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] px-4 pt-5">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg border border-red-100">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-red-100 rounded-full">
                            <AlertCircle className="h-8 w-8 text-red-600" />
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-800">
                            {error ? 'Error occurred' : 'User not found'}
                        </h2>
                        
                        <p className="text-gray-600">
                            {error?.message || 'The user you are looking for does not exist or may have been removed.'}
                        </p>
                        
                        <div className="flex gap-3 pt-2">
                            <Button 
                                variant="outline" 
                                onClick={handleBack}
                                className="border-gray-300 hover:bg-gray-50"
                            >
                                Go Back
                            </Button>
                            <Button 
                                variant="default"
                                onClick={() => window.location.reload()}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                Try Again
                            </Button>
                        </div>
                        
                        <p className="text-sm text-gray-500 pt-4">
                            Need help? <a href="/contact" className="text-red-600 hover:underline">Contact support</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Username';
    const primaryEmail = user.emailAddresses?.[0]?.emailAddress || 'No email provided';
    const isDriver = user?.publicMetadata.role === 'driver'
    const tabTriggers = [
        { value: 'account', label: 'Account' },
        { value: 'security', label: 'Security' },
      ...(isDriver ? [{ value: 'driver', label: 'Driver' }] : []),
    ]
      
    return (
        <div className="container mx-auto p-4 space-y-6 max-w-4xl pt-16 pb-10">

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-lg shadow">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                    {user.hasImage && (
                        <AvatarImage src={user.imageUrl} alt={fullName} />
                    )}
                    <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="sm:hidden space-y-1">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                        <h2 className="text-lg sm:text-xl font-semibold">{fullName}</h2>
                        {user.banned && (
                        <div className="text-xs sm:text-sm text-red-500 flex items-center gap-1 font-bold">
                            <FaBan className="text-red-500" />
                            Banned
                        </div>
                        )}
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">{primaryEmail}</p>
                    </div>
                </div>

                <div className="w-full space-y-1">
                    <div className="hidden sm:flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-semibold">{fullName}</h2>
                    {user.banned && (
                        <div className="text-xs sm:text-sm text-red-500 flex items-center gap-1 font-bold">
                        <FaBan className="text-red-500" />
                        Banned
                        </div>
                    )}
                    {/* Identity verification status */}
                    {user.identityVerified ? (
                        <div className="text-xs sm:text-sm text-green-500 flex items-center gap-1 font-bold">
                        <MdOutlineVerified className="text-green-500" />
                        Verified
                        </div>
                    ) : (
                        <div className="text-xs sm:text-sm text-yellow-500 flex items-center gap-1 font-bold">
                        <CiWarning className="text-yellow-500" />
                        Unverified
                        </div>
                    )}
                    </div>
                    
                    <div className="sm:hidden flex items-center gap-2">
                    {user.identityVerified ? (
                        <div className="text-xs text-green-500 flex items-center gap-1 font-bold">
                        <MdOutlineVerified className="text-green-500" />
                        Verified
                        </div>
                    ) : (
                        <div className="text-xs text-yellow-500 flex items-center gap-1 font-bold">
                        <CiWarning className="text-yellow-500" />
                        Unverified
                        </div>
                    )}
                    <p className="text-xs text-blue-600">Role: {user.publicMetadata.role}</p>
                    </div>

                    <p className="hidden sm:block text-sm sm:text-base text-gray-600">{primaryEmail}</p>
                    
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                    <p className="hidden sm:block text-blue-600">Role: {user.publicMetadata.role}</p>
                    </div>
                </div>
                </div>

                {!user.identityVerified && (
                <div className="mt-4 p-3 sm:p-4 border border-yellow-200 bg-yellow-50 rounded-lg shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start gap-3">
                    <div className="flex-shrink-0 flex justify-center sm:justify-start w-full sm:w-auto">
                        <div className="p-2 bg-yellow-100 rounded-full">
                        <CiWarning className="h-5 w-5 text-yellow-600" />
                        </div>
                    </div>
                    
                    <div className="flex-1 w-full">
                        <h3 className="text-sm font-medium text-yellow-800 text-center sm:text-left">
                        Identity Verification Required
                        </h3>
                        
                        <div className="mt-1 text-xs sm:text-sm text-yellow-700">
                        <p className="text-center sm:text-left">
                            To access all features, please complete identity verification by:
                        </p>
                        <ul className="list-disc pl-4 sm:pl-5 mt-1 space-y-0.5">
                            <li>Updating personal information</li>
                            <li>Uploading ID card (Citizen ID/Passport)</li>
                            <li>Providing driver's license</li>
                            <li>Submitting vehicle registration</li>
                        </ul>
                        </div>
                        
                        <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row items-center gap-2">
                        <Button
                            variant="default"
                            size="sm"
                            className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white"
                            onClick={() => setCurrentTab('driver')}
                        >
                            <FaRegEdit className="mr-2" />
                            Update Now
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto text-yellow-700 border-yellow-300 hover:bg-yellow-100"
                        >
                            Detailed Instructions
                        </Button>
                        </div>
                    </div>
                    </div>
                </div>
                )}

            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="w-full grid" style={{ gridTemplateColumns: `repeat(${tabTriggers.length}, minmax(0, 1fr))` }}>
                {tabTriggers.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>


                <TabsContent value="account" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    {user.hasImage && (
                                        <AvatarImage
                                            src={user.imageUrl}
                                            alt={fullName}
                                        />
                                    )}
                                    <AvatarFallback>
                                        {getInitials(fullName)}
                                    </AvatarFallback>
                                </Avatar>
                                <UploadButton
                                    onUpload={handleUploadAvatar}
                                    isUploading={uploadAvatarMutation.isPending}
                                />
                                <ConfirmDialog
                                    title="Delete profile image"
                                    description="Are you sure you want to delete this user's profile image?"
                                    confirmText="Delete profile image"
                                    onConfirm={() => {
                                        deleteUserProfileImageMutation.mutate(
                                            user.id
                                        );
                                    }}>
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer">
                                        Clear
                                    </Button>
                                </ConfirmDialog>
                            </div>
                            <PersonInformationForm
                                id={user.id}
                                initialValues={{
                                    firstName: user.firstName || '',
                                    lastName: user.lastName || '',
                                }}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Email Addresses</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <UserDetail
                                columns={emailColumns}
                                data={user.emailAddresses || []}
                            />
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="link">+ Add email</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Add new email address
                                        </DialogTitle>
                                    </DialogHeader>
                                    <EmailFormDialog
                                        userId={user.id}
                                        mutation={addEmailMutation}
                                        onSuccess={refetch}
                                    />
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Social Accounts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {user.externalAccounts?.length ? (
                                <div className="flex flex-col gap-2">
                                    {user.externalAccounts.map((row) => {
                                        return (
                                            <div
                                                key={row.id}
                                                className="flex gap-2 items-center justify-start">
                                                {row.provider ===
                                                'oauth_google' ? (
                                                    <>
                                                        <FcGoogle />
                                                        <div className="font-bold">
                                                            Google
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaGithub />
                                                        <div className="font-bold">
                                                            Github
                                                        </div>
                                                    </>
                                                )}
                                                <div className="text-muted-foreground">
                                                    {row.username ||
                                                        row.emailAddress}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="bg-blue-50 text-center p-3">
                                    No social accounts linked
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    
                </TabsContent>
                <TabsContent value="security" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {user.passwordEnabled ? (
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2 items-center">
                                        <TbLock />
                                        <span>••••••••••</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        onClick={() =>
                                            setIsPasswordDialogOpen(true)
                                        }>
                                        <FaRegEdit />
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="bg-blue-50 text-center p-3">
                                        No password set
                                    </div>
                                    <Button
                                        variant="link"
                                        onClick={() =>
                                            setIsPasswordDialogOpen(true)
                                        }>
                                        + Set password
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Active Sessions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {sessions?.map((session) => (
                          <div key={session.id} className="border p-4 rounded-lg">
                            <p>
                              Last active: {new Date(session.lastActiveAt).toLocaleString()}
                            </p>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="mt-2"
                              onClick={() => handleRevokeSession(session.id)}
                            >
                              Revoke Session
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                </TabsContent>
                {isDriver && (
                <TabsContent value="driver" className="mt-4">
                    <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">🚗 Thông tin tài xế</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {user.identityVerified ==="verified" ? (
                        <div className="grid grid-cols-1 gap-6">
                            {/* Card CCCD */}
                            <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Căn cước công dân</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Ảnh chân dung */}
                                <Card className="h-fit">
                                    <CardHeader>
                                    <CardTitle className="text-sm font-medium">Ảnh chân dung</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                    {user.idPortraitImage ? (
                                        <img 
                                        src={user.idPortraitImage} 
                                        alt="Ảnh CCCD" 
                                        className="w-full h-auto rounded-md border"
                                        />
                                    ) : (
                                        <div className="text-muted-foreground">Không có ảnh</div>
                                    )}
                                    </CardContent>
                                </Card>

                                {/* Thông tin CCCD */}
                                <div className="md:col-span-2 space-y-4">
                                    <Card>
                                    <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                        <p className="text-sm text-muted-foreground">Số CCCD</p>
                                        <p className="font-medium">{user.extractedIdNumber || 'Chưa có dữ liệu'}</p>
                                        </div>
                                        <div>
                                        <p className="text-sm text-muted-foreground">Họ và tên</p>
                                        <p className="font-medium">{user.extractedFullName || 'Chưa có dữ liệu'}</p>
                                        </div>
                                        <div>
                                        <p className="text-sm text-muted-foreground">Ngày sinh</p>
                                        <p className="font-medium">{user.extractedDob || 'Chưa có dữ liệu'}</p>
                                        </div>
                                        <div>
                                        <p className="text-sm text-muted-foreground">Giới tính</p>
                                        <p className="font-medium">{user.extractedGender || 'Chưa có dữ liệu'}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                        <p className="text-sm text-muted-foreground">Địa chỉ</p>
                                        <p className="font-medium">{user.extractedAddress || 'Chưa có dữ liệu'}</p>
                                        </div>
                                    </CardContent>
                                    </Card>
                                </div>
                                </div>
                            </CardContent>
                            </Card>

                            {/* Card GPLX */}
                            <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Giấy phép lái xe</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Card>
                                <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                    <p className="text-sm text-muted-foreground">Số GPLX</p>
                                    <p className="font-medium">{user.extractedLicenseNumber || 'Chưa có dữ liệu'}</p>
                                    </div>
                                    <div>
                                    <p className="text-sm text-muted-foreground">Hạng</p>
                                    <p className="font-medium">{user.extractedLicenseClass || 'Chưa có dữ liệu'}</p>
                                    </div>
                                    <div>
                                    <p className="text-sm text-muted-foreground">Ngày cấp</p>
                                    <p className="font-medium">{user.extractedLicenseIssueDate || 'Chưa có dữ liệu'}</p>
                                    </div>
                                    <div>
                                    <p className="text-sm text-muted-foreground">Ngày hết hạn</p>
                                    <p className="font-medium">{user.extractedLicenseExpiryDate || 'Chưa có dữ liệu'}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                    <p className="text-sm text-muted-foreground">Nơi cấp</p>
                                    <p className="font-medium">{user.extractedLicensePlace || 'Chưa có dữ liệu'}</p>
                                    </div>
                                </CardContent>
                                </Card>
                            </CardContent>
                            </Card>

                            {/* Card Đăng ký xe */}
                            <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Đăng ký xe</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Card>
                                <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                    <p className="text-sm text-muted-foreground">Biển số xe</p>
                                    <p className="font-medium">{user.extractedPlateNumber || 'Chưa có dữ liệu'}</p>
                                    </div>
                                    <div>
                                    <p className="text-sm text-muted-foreground">Chủ xe</p>
                                    <p className="font-medium">{user.extractedVehicleOwner || 'Chưa có dữ liệu'}</p>
                                    </div>
                                    <div>
                                    <p className="text-sm text-muted-foreground">Loại xe</p>
                                    <p className="font-medium">{user.extractedVehicleType || 'Chưa có dữ liệu'}</p>
                                    </div>
                                    <div>
                                    <p className="text-sm text-muted-foreground">Nhãn hiệu</p>
                                    <p className="font-medium">{user.extractedVehicleBrand || 'Chưa có dữ liệu'}</p>
                                    </div>
                                    <div>
                                    <p className="text-sm text-muted-foreground">Số khung</p>
                                    <p className="font-medium">{user.extractedVehicleChassisNumber || 'Chưa có dữ liệu'}</p>
                                    </div>
                                    <div>
                                    <p className="text-sm text-muted-foreground">Số máy</p>
                                    <p className="font-medium">{user.extractedVehicleEngineNumber || 'Chưa có dữ liệu'}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                    <p className="text-sm text-muted-foreground">Ngày đăng ký</p>
                                    <p className="font-medium">{user.extractedVehicleRegistrationDate || 'Chưa có dữ liệu'}</p>
                                    </div>
                                </CardContent>
                                </Card>
                            </CardContent>
                            </Card>

                        </div>
                        ) : (
                        <DriverInfoForm 
                            userId={user.id}
                            onSubmit={async (values) => {
                            try {
                                await verifyDriverInfo(values);
                                toast.success("Đã gửi thông tin để xác minh");
                                refetch();
                            } catch (error) {
                                toast.error("Gửi thông tin thất bại");
                            }
                            }}
                        />
                        )}
                    </CardContent>
                    </Card>
                </TabsContent>
                )}
            </Tabs>
            {!isDriver && (
                <Card className="mt-4">
                    <CardHeader>
                    <CardTitle>Đăng ký trở thành tài xế</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <ConfirmDialog
                        triggerText="Đăng ký tài xế"
                        title="Xác nhận đăng ký tài xế"
                        description="Bạn có chắc chắn muốn đăng ký làm tài xế? Sau khi đăng ký, bạn sẽ có quyền truy cập vào các tính năng dành cho tài xế."
                        cancelText="Hủy bỏ"
                        confirmText="Xác nhận đăng ký"
                        triggerVariant="default"
                        disabled={registerDriverMutation.isPending}
                        onConfirm={() => {
                            registerDriverMutation.mutate({
                            userId: user.id,
                            data: {
                                publicMetadata: {
                                ...user.publicMetadata,
                                role: 'driver'
                                }
                            }
                            });
                        }}
                        >
                        {registerDriverMutation.isPending ? (
                            <Button variant="default" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Đang xử lý...
                            </Button>
                        ) : (
                            <Button variant="default">Đăng ký tài xế</Button>
                        )}
                        </ConfirmDialog>
                    </CardContent>
                </Card>
                )}
            <PasswordDialog
                open={isPasswordDialogOpen}
                onOpenChange={setIsPasswordDialogOpen}
                handleSetPassword={handleSetPassword}
            />
        </div>
    );
}
