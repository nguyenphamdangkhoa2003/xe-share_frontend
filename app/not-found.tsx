'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
export default function NotFound() {
    const router = useRouter();
    return (
        <section className="bg-white dark:bg-gray-900" suppressHydrationWarning>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                        404
                    </h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                        Something's missing.
                    </p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                        Sorry, we can't find that page. You'll find lots to
                        explore on the home page.{' '}
                    </p>
                    <Button
                        onClick={() => router.push('/home')}
                        className="cursor-pointer">
                        Back to Homepage
                    </Button>
                </div>
            </div>
        </section>
    );
}
