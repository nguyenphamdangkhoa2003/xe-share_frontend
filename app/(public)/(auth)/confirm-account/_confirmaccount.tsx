"use client";
import { verifyEmailMutationFn } from "@/api/auths/auth";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Loader, MailCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function ConfirmAccount() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const { mutate, isPending } = useMutation({
    mutationFn: verifyEmailMutationFn,
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!code) {
      toast.error("Error", {
        description: "Confirmation token not found",
        style: {
          background: "#ef4444",
          color: "#fff"
        },
      });
      return;
    }
    mutate(
      { code },
      {
        onSuccess: () => {
          toast.success("Success", {
            description: "Account confirmed successfully! Redirecting...",
          });
          router.replace("/home");
        },
        onError: (error) => {
          toast.error("Error", {
            description: error.message || "Something went wrong during confirmation",
            style: {
              background: "#ef4444",
              color: "#fff"
            },
          });
        },
      }
    );
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-8 space-y-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/50 mb-4">
            <MailCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Confirm Your Email
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Almost there! Click below to verify your email address.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Button
            disabled={isPending}
            type="submit"
            className="w-full py-6 text-base font-medium rounded-lg transition-all duration-200"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader className="h-5 w-5 animate-spin" />
                <span>Verifying...</span>
              </div>
            ) : (
              "Verify My Email"
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Didn't receive a confirmation email?{' '}
            <button
              type="button"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
              onClick={() => router.push('/resend-confirmation')}
            >
              Resend confirmation
            </button>
          </p>
          <p className="mt-2">
            Need help? Contact{' '}
            <a
              href="mailto:support@squeezy.com"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              support@squeezy.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}