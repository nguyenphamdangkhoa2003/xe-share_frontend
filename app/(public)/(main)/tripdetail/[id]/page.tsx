"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Clock, Phone, Info, Car, Hash, MapPin, User, Shield, CarFront } from "lucide-react";

const trips = [
    {
        id: 1,
        pickup: "Q. Ba Đình",
        pickupCity: "Hà Nội",
        dropoff: "P. Hồng Bàng",
        dropoffCity: "Hải Phòng",
        departureTime: "08:00",
        arrivalTime: "10:30",
        seatsAvailable: 2,
        driver: {
            name: "Nguyễn Văn A",
            phone: "0123 456 789",
            avatar: "/images/driver1.jpg",
            rating: 4.7,
            initial: "N",
            note: "Vui lòng có mặt trước 10 phút.",
            joinedDate: "2022"
        },
        vehicle: {
            type: "Toyota Vios",
            plate: "30A-12345",
            color: "Trắng",
            year: "2020",
            features: ["Camera hành trình", "Wifi miễn phí", "Nước uống miễn phí"]
        }
    }
];

const TripDetails = () => {
    const params = useParams();
    const id = params?.id;

    if (!id) {
    return (
        <div className="flex flex-col items-center justify-center mt-20 mb-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600 text-lg">Đang tải thông tin chuyến đi...</p>
            </div>
        );
    }

    const trip = trips.find((trip) => trip.id === Number(id));
    if (!trip) {
    return (
        <div className="flex flex-col items-center justify-center pt-24 px-4 pb-20">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
        <h3 className="text-xl font-medium text-gray-700 mb-2">Không tìm thấy chuyến đi</h3>
        <p className="text-gray-500 text-center max-w-md">
            Chuyến đi bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <Link href="/booking" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Quay lại danh sách chuyến đi
        </Link>
        </div>
    );
    }

    return (
        <div className="mx-auto p-4 md:p-6 max-w-3xl space-y-6">
            {/* Card Thông tin chuyến đi */}
            <Card className="border border-gray-200 rounded-lg shadow-md mt-10">
                <CardContent className="py-6 px-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin chuyến đi</h2>
                    
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Điểm đón - bên trái */}
                        <div className="flex-1">
                            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-500 text-sm">ĐIỂM ĐÓN</p>
                                    <p className="font-semibold text-gray-900">{trip.pickup}</p>
                                    <p className="text-gray-600">{trip.pickupCity}</p>
                                    <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                                        <Clock className="w-4 h-4" />
                                        <span>Khởi hành: {trip.departureTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Điểm đến - bên phải */}
                        <div className="flex-1">
                            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-500 text-sm">ĐIỂM ĐẾN</p>
                                    <p className="font-semibold text-gray-900">{trip.dropoff}</p>
                                    <p className="text-gray-600">{trip.dropoffCity}</p>
                                    <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                                        <Clock className="w-4 h-4" />
                                        <span>Dự kiến: {trip.arrivalTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Thông tin chỗ ngồi - ở giữa */}
                    <div className="mt-6 flex justify-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-600">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium text-gray-900">Còn {trip.seatsAvailable} chỗ trống</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Card Thông tin tài xế */}
            <Card className="border border-gray-200 rounded-lg shadow-md">
                <CardContent className="py-6 px-10">
                    <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Tài xế</h3>
                        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                            <Shield className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-700">Đã xác minh</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="w-16 h-16">
                                <AvatarImage src={trip.driver.avatar} />
                                <AvatarFallback>{trip.driver.initial}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-lg">{trip.driver.name}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${
                                                i < Math.floor(trip.driver.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                            }`}
                                        />
                                    ))}
                                    <span className="text-sm text-gray-600">{trip.driver.rating}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Tham gia</p>
                                    <p className="font-medium">{trip.driver.joinedDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 col-span-2">
                                <Phone className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Điện thoại</p>
                                    <p className="font-medium">{trip.driver.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {trip.driver.note && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-start gap-2">
                                <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-gray-700">{trip.driver.note}</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Card Thông tin xe */}
            <Card className="border border-gray-200 rounded-lg shadow-md">
                <CardContent className="py-6 px-10">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Thông tin xe</h3>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                <CarFront className="w-8 h-8 text-gray-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-lg">{trip.vehicle.type}</p>
                                <p className="text-gray-600">Năm sản xuất: {trip.vehicle.year}</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <Hash className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Biển số</p>
                                    <p className="font-medium">{trip.vehicle.plate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                    <circle cx="9" cy="12" r="1" />
                                    <circle cx="9" cy="5" r="1" />
                                    <circle cx="9" cy="19" r="1" />
                                    <circle cx="15" cy="12" r="1" />
                                    <circle cx="15" cy="5" r="1" />
                                    <circle cx="15" cy="19" r="1" />
                                </svg>
                                <div>
                                    <p className="text-sm text-gray-500">Màu sắc</p>
                                    <p className="font-medium">{trip.vehicle.color}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {trip.vehicle.features?.length > 0 && (
                        <div className="mt-4">
                            <h4 className="font-medium text-gray-900 mb-2">Tiện ích trên xe</h4>
                            <div className="flex flex-wrap gap-2">
                                {trip.vehicle.features.map((feature, index) => (
                                    <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* Nút chat tài xế */}
                <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Chat với tài xế
                </button>

                {/* Nút đặt chuyến */}
                <Link 
                    href="/booking" 
                    className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                    Đặt chuyến ngay
                </Link>
            </div>
        </div>
    );
};

export default TripDetails;