"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Clock, MapPin, Users } from "lucide-react";
import { format, startOfToday } from "date-fns";
import { vi } from 'date-fns/locale';
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const routeSchema = z.object({
  departurePoint: z.string().min(1, "Điểm đi là bắt buộc"),
  destination: z.string().min(1, "Điểm đến là bắt buộc"),
  departureDate: z.date({
    required_error: "Ngày đi là bắt buộc",
    invalid_type_error: "Ngày không hợp lệ",
  }).refine(date => {
    const today = startOfToday();
    return date >= today;
  }, {
    message: "Ngày đi phải từ hôm nay trở đi"
  }),
  availableSeats: z.preprocess(
    (val) => Number(val),
    z.number({
      required_error: 'Vui lòng nhập số chỗ',
      invalid_type_error: 'Vui lòng nhập số chỗ',
    })
      .min(1, "Số chỗ tối thiểu là 1")
      .max(4, "Số chỗ tối đa là 4")
  ),
  departureTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Giờ đi không hợp lệ"),
  estimatedArrivalTime: z.union([
    z.string().length(0),
    z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Giờ đến không hợp lệ",
    })
  ]).optional().transform(val => val === "" ? undefined : val)
}).refine(data => {
  if (data.departureTime && data.estimatedArrivalTime) {
    return data.estimatedArrivalTime > data.departureTime;
  }
  return true;
}, {
  message: "Giờ đến phải sau giờ đi",
  path: ["estimatedArrivalTime"]
});

type RouteFormData = z.infer<typeof routeSchema>;

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RouteFormData>({
    resolver: zodResolver(routeSchema),
    defaultValues: {
      departureDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      estimatedArrivalTime: ""
    }
  });

  const onSubmit = (data: RouteFormData) => {
    console.log("Form submitted:", data);
    alert("Thông tin tuyến đường đã được đăng ký!");
  };

  return (
    <Card className="max-w-2xl mx-auto ">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Điểm đi */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="w-4 h-4" />
              Điểm đi<span className="text-red-500">*</span>
            </label>
            <Input
              {...register("departurePoint")}
              placeholder="Nhập điểm xuất phát"
            />
            {errors.departurePoint && (
              <p className="text-sm text-red-500">{errors.departurePoint.message}</p>
            )}
          </div>

          {/* Điểm đến */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="w-4 h-4" />
              Điểm đến<span className="text-red-500">*</span>
            </label>
            <Input
              {...register("destination")}
              placeholder="Nhập điểm đến"
            />
            {errors.destination && (
              <p className="text-sm text-red-500">{errors.destination.message}</p>
            )}
          </div>

          {/* Ngày đi */}
           <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <CalendarIcon className="w-4 h-4" />
              Ngày đi
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !watch("departureDate") && "text-muted-foreground"
                  )}
                >
                  {format(watch("departureDate"), "dd/MM/yyyy", { locale: vi })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={watch("departureDate")}
                  onSelect={(date) => date && setValue("departureDate", date)}
                  initialFocus
                  fromDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                  locale={vi} 
                />
              </PopoverContent>
            </Popover>
            {errors.departureDate && (
              <p className="text-sm text-red-500">{errors.departureDate.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Số chỗ */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Users className="w-4 h-4" />
                Số chỗ<span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                min="1"
                max="4"
                {...register("availableSeats", { 
                  valueAsNumber: true,
                  validate: (value) => value >= 1 && value <= 4
                })}
                placeholder="Nhập số chỗ"
              />
              {errors.availableSeats && (
                <p className="text-sm text-red-500">{errors.availableSeats.message}</p>
              )}
            </div>

            {/* Giờ đi */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Clock className="w-4 h-4" />
                Giờ đi<span className="text-red-500">*</span>
              </label>
              <Input
                type="time"
                {...register("departureTime")}
              />
              {errors.departureTime && (
                <p className="text-sm text-red-500">{errors.departureTime.message}</p>
              )}
            </div>

            {/* Giờ đến dự kiến */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Clock className="w-4 h-4" />
                Giờ đến
              </label>
              <Input
                type="time"
                {...register("estimatedArrivalTime")}
              />
              {errors.estimatedArrivalTime && (
                <p className="text-sm text-red-500">{errors.estimatedArrivalTime.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Đăng ký tuyến đường
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}