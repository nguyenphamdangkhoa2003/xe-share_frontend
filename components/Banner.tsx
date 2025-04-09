import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface BannerProps extends Omit<ImageProps, 'src' | 'alt'> {
    src: string;
    alt: string;
    className?: string;
}

const Banner = ({ src, alt, className = '', ...imageProps }: BannerProps) => {
    return (
        <div className="w-full h-auto">
            <Image
                src={src}
                alt={alt}
                width={1920}
                height={600}
                className={cn('w-full object-cover', className)} 
                priority
                {...imageProps}
            />
        </div>
    );
};

export default Banner;
