import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  idFrontImage: z.string().min(1, "Front image is required"),
  idBackImage: z.string().min(1, "Back image is required"),
  licenseImage: z.string().min(1, "License image is required"),
  vehicleRegistration: z.string().min(1, "Registration document is required"),
});

type DriverInfoFormProps = {
  userId: string;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
};

export function DriverInfoForm({ userId, onSubmit }: DriverInfoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({
    idFrontImage: 0,
    idBackImage: 0,
    licenseImage: 0,
    vehicleRegistration: 0,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idFrontImage: "",
      idBackImage: "",
      licenseImage: "",
      vehicleRegistration: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const simulateUploadProgress = (fieldName: keyof typeof uploadProgress) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(prev => ({ ...prev, [fieldName]: progress }));
    }, 200);
  };

  const handleFileUpload = async (
    fieldName: "idFrontImage" | "idBackImage" | "licenseImage" | "vehicleRegistration", 
    file: File
    ) => {
    simulateUploadProgress(fieldName);
    try {
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        const fileUrl = URL.createObjectURL(file);
        form.setValue(fieldName, fileUrl, { shouldValidate: true });
    } catch (error) {
        console.error("Upload failed:", error);
        form.setError(fieldName, {
        type: "manual",
        message: "Failed to upload file",
        });
    } finally {
        setUploadProgress(prev => ({ ...prev, [fieldName]: 0 }));
    }
  };


  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* ID Card Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ID Card Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Front Side */}
              <FormField
                control={form.control}
                name="idFrontImage"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Front Side of ID</FormLabel>
                    <FormDescription>
                      Upload a clear photo of the front side
                    </FormDescription>
                    <FormControl>
                      <div className="space-y-2">
                        <label
                          htmlFor="idFrontImage"
                          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer 
                            ${fieldState.error ? "border-red-500" : "border-gray-300 hover:border-primary"} 
                            ${uploadProgress.idFrontImage > 0 ? "bg-gray-50" : ""}`}
                        >
                          {field.value ? (
                            <div className="relative w-full h-full">
                              <img
                                src={field.value}
                                alt="ID Front Preview"
                                className="w-full h-full object-contain rounded-lg"
                              />
                              
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
                              <p className="text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                            </div>
                          )}
                          <input
                            id="idFrontImage"
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload('idFrontImage', file);
                              }
                            }}
                            accept="image/*"
                          />
                        </label>
                        {uploadProgress.idFrontImage > 0 && uploadProgress.idFrontImage < 100 && (
                          <Progress value={uploadProgress.idFrontImage} className="h-2" />
                        )}
                        {fieldState.error && (
                          <FormMessage>{fieldState.error.message}</FormMessage>
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Back Side */}
              <FormField
                control={form.control}
                name="idBackImage"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Back Side of ID</FormLabel>
                    <FormDescription>
                      Upload a clear photo of the back side
                    </FormDescription>
                    <FormControl>
                      <div className="space-y-2">
                        <label
                          htmlFor="idBackImage"
                          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer 
                            ${fieldState.error ? "border-red-500" : "border-gray-300 hover:border-primary"} 
                            ${uploadProgress.idBackImage > 0 ? "bg-gray-50" : ""}`}
                        >
                          {field.value ? (
                            <div className="relative w-full h-full">
                              <img
                                src={field.value}
                                alt="ID Back Preview"
                                className="w-full h-full object-contain rounded-lg"
                              />
                              
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
                              <p className="text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                            </div>
                          )}
                          <input
                            id="idBackImage"
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload('idBackImage', file);
                              }
                            }}
                            accept="image/*"
                          />
                        </label>
                        {uploadProgress.idBackImage > 0 && uploadProgress.idBackImage < 100 && (
                          <Progress value={uploadProgress.idBackImage} className="h-2" />
                        )}
                        {fieldState.error && (
                          <FormMessage>{fieldState.error.message}</FormMessage>
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Driver License Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Driver License</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="licenseImage"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>License Photo</FormLabel>
                  <FormDescription>
                    Upload a clear photo of your driver's license
                  </FormDescription>
                  <FormControl>
                    <div className="space-y-2">
                      <label
                        htmlFor="licenseImage"
                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer 
                          ${fieldState.error ? "border-red-500" : "border-gray-300 hover:border-primary"} 
                          ${uploadProgress.licenseImage > 0 ? "bg-gray-50" : ""}`}
                      >
                        {field.value ? (
                          <div className="relative w-full h-full">
                            <img
                              src={field.value}
                              alt="License Preview"
                              className="w-full h-full object-contain rounded-lg"
                            />
                            
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                          </div>
                        )}
                        <input
                          id="licenseImage"
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload('licenseImage', file);
                            }
                          }}
                          accept="image/*"
                        />
                      </label>
                      {uploadProgress.licenseImage > 0 && uploadProgress.licenseImage < 100 && (
                        <Progress value={uploadProgress.licenseImage} className="h-2" />
                      )}
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Vehicle Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vehicle Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="vehicleRegistration"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Vehicle Registration Document</FormLabel>
                  <FormDescription>
                    Upload a clear photo of your vehicle registration document
                  </FormDescription>
                  <FormControl>
                    <div className="space-y-2">
                      <label
                        htmlFor="vehicleRegistration"
                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer 
                          ${fieldState.error ? "border-red-500" : "border-gray-300 hover:border-primary"} 
                          ${uploadProgress.vehicleRegistration > 0 ? "bg-gray-50" : ""}`}
                      >
                        {field.value ? (
                          <div className="relative w-full h-full">
                            <img
                              src={field.value}
                              alt="Registration Preview"
                              className="w-full h-full object-contain rounded-lg"
                            />
                            
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                          </div>
                        )}
                        <input
                          id="vehicleRegistration"
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload('vehicleRegistration', file);
                            }
                          }}
                          accept="image/*,.pdf"
                        />
                      </label>
                      {uploadProgress.vehicleRegistration > 0 && uploadProgress.vehicleRegistration < 100 && (
                        <Progress value={uploadProgress.vehicleRegistration} className="h-2" />
                      )}
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 text-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Verification"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}