import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import { useRef } from 'react';

interface UploadButtonProps {
    onUpload: (file: File) => void;
    isUploading?: boolean;
}

export function UploadButton({ onUpload, isUploading }: UploadButtonProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            onUpload(files[0]);
            e.target.value = '';
        }
    };

    return (
        <>
            <Button
                variant="outline"
                className="cursor-pointer"
                onClick={handleClick}
                disabled={isUploading}>
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
            <Input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
        </>
    );
}
