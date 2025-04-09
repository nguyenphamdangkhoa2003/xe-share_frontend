"use client"
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from '@/components/ui/pagination';
import { Calendar, Clock, MapPin, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const HistoryTripPage = () => {
  // Dữ liệu mẫu
  const tripHistory = [
    {
      id: 1,
      bookingDate: '10/06/2023',
      tripDate: '15/06/2023',
      departureTime: '08:30',
      arrivalTime: '10:15',
      from: '25 Lê Duẩn, Q.1, TP.HCM',
      to: '2 Phạm Văn Đồng, Q.Thủ Đức, TP.HCM',
      driver: 'Nguyễn Văn A',
      status: 'completed'
    },
    {
      id: 2,
      bookingDate: '05/06/2023',
      tripDate: '10/06/2023',
      departureTime: '18:00',
      arrivalTime: '19:30',
      from: '12 Nguyễn Văn Cừ, Q.5, TP.HCM',
      to: '45 Võ Văn Ngân, Q.Thủ Đức, TP.HCM',
      driver: 'Trần Thị B',
      status: 'completed'
    },
    {
      id: 3,
      bookingDate: '01/06/2023',
      tripDate: '05/06/2023',
      departureTime: '14:00',
      arrivalTime: '15:45',
      from: '78 Lê Văn Việt, Q.9, TP.HCM',
      to: '32 Nguyễn Thị Minh Khai, Q.3, TP.HCM',
      driver: 'Lê Văn C',
      status: 'cancelled'
    }
  ];

  // State phân trang
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(tripHistory.length / itemsPerPage);

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Phần header giữ nguyên */}
      <div className="text-center mb-8 md:mb-10 md:mt-10 mt-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Lịch sử đặt xe</h1>
        <p className="text-sm md:text-base text-gray-500">Xem lại các chuyến đi bạn đã đặt</p>
      </div>
      
      <div className="space-y-4 mb-6 md:mb-8">
        {tripHistory.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        ).map((trip) => (
          <Link href={`/trips/${trip.id}`} key={trip.id} className="block hover:shadow-md transition-all">
            <Card className={`border-l-4 p-4 rounded-lg ${trip.status === 'completed' ? 'border-green-500' : 'border-red-500'}`}>
              <CardHeader className="p-0">
                <CardTitle className="flex justify-between  sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-base md:text-lg font-semibold">Chuyến đi #{trip.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${trip.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {trip.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                  </span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-0">
                {/* Timeline information */}
                <div className="grid grid-cols-1 gap-4">
                  {/* Booking Date */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Ngày đặt</p>
                      <p className="text-sm font-medium">{trip.bookingDate}</p>
                    </div>
                  </div>
                  
                  {/* Trip Date and Time */}
                  <div className="flex items-start gap-3">
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="flex items-center gap-1">
                      <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Ngày đi</p>
                        <p className="text-sm font-medium">{trip.tripDate}</p>
                      </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                          <Clock className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Giờ đi → đến</p>
                          <p className="text-sm font-medium">{trip.departureTime} → {trip.arrivalTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Locations */}
                  <div className="flex items-start gap-3">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                      <div className="flex items-start gap-2">
                        <div className="p-2 bg-green-50 rounded-lg flex-shrink-0">
                          <MapPin className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Điểm đón</p>
                          <p className="text-sm font-medium line-clamp-2">{trip.from}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="p-2 bg-green-50 rounded-lg flex-shrink-0">
                          <MapPin className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Điểm đến</p>
                          <p className="text-sm font-medium line-clamp-2">{trip.to}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Driver */}
                  <div className="flex items-center gap-3 pt-2  border-t border-gray-100">
                    <div className="p-2 bg-yellow-50 rounded-lg flex-shrink-0">
                      <User className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Tài xế</p>
                      <p className="text-sm font-medium">{trip.driver}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination giữ nguyên */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className="text-sm px-4 py-2"
            />
          </PaginationItem>
          
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={currentPage === i + 1}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(i + 1);
                }}
                className="text-sm px-4 py-2"
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
              className="text-sm px-4 py-2"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default HistoryTripPage;