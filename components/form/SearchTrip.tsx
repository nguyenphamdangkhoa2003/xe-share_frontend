'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, MapPin, Users } from 'lucide-react';
import { z } from 'zod';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input'; // Import Input component từ Shadcn UI

const schema = z.object({
  pickup: z.string().min(1, 'Điểm đón không được để trống'),
  dropoff: z.string().min(1, 'Điểm đến không được để trống'),
  date: z.string().min(1, 'Vui lòng chọn ngày khởi hành'),
  passengers: z
    .number({
      required_error: 'Vui lòng nhập số người',
      invalid_type_error: 'Vui lòng nhập số người',
    })
    .min(1, 'Số người ít nhất là 1')
    .max(4, 'Tối đa 4 người'),
});

type FormData = z.infer<typeof schema>;

export default function SearchTrip() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      pickup: '',
      dropoff: '',
      date: '',
      passengers: 1,
    },
  });

  useEffect(() => {
    const subscription = watch((values) => {
      localStorage.setItem('searchTripForm', JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const storedData = localStorage.getItem('searchTripForm');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      Object.keys(parsedData).forEach((key:any) => {
        setValue(key, parsedData[key]);
      });
    }
  }, [setValue]);

  const onSubmit = (data: FormData) => {
    console.log('Dữ liệu hợp lệ:', data);
    localStorage.removeItem('searchTripForm');
  };

  return (
    <div className="flex justify-center mt-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-9/12 border border-gray-200"
      >
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
          Tìm chuyến xe
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {/* Điểm đón */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Điểm đón
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1.5 text-gray-500" />
              <Input
                {...register('pickup')}
                placeholder="Nhập điểm đón..."
                className="pl-10"
              />
            </div>
            {errors.pickup && (
              <p className="text-red-500 text-xs mt-1">{errors.pickup.message}</p>
            )}
          </div>

          {/* Điểm đến */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Điểm đến
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1.5 text-gray-500" />
              <Input
                {...register('dropoff')}
                placeholder="Nhập điểm đến..."
                className="pl-10"
              />
            </div>
            {errors.dropoff && (
              <p className="text-red-500 text-xs mt-1">{errors.dropoff.message}</p>
            )}
          </div>

          {/* Ngày khởi hành */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Ngày khởi hành
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1.5 text-gray-500" />
              <Input
                type="date"
                {...register('date')}
                className="pl-10"
              />
            </div>
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Số người */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Số người
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1.5 text-gray-500" />
              <Input
                type="number"
                {...register('passengers', { valueAsNumber: true, min: 1, max: 4 })}
                className="pl-10"
              />
            </div>
            {errors.passengers && (
              <p className="text-red-500 text-xs mt-1">{errors.passengers.message}</p>
            )}
          </div>

          {/* Nút tìm chuyến */}
          <div className="sm:col-span-2 md:col-span-1 flex justify-center md:justify-center">
            <button
              type="submit"
              className="bg-blue-500 md:mt-6 text-white text-sm font-bold px-6 py-2 rounded-md shadow-md hover:opacity-90 transition-all h-9 w-full md:w-auto"
            >
              Tìm chuyến
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}