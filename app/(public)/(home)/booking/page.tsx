import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Clock, ChevronRight, Home } from "lucide-react";
import { MdArrowRight } from "react-icons/md";
import SearchTrip from "@/components/form/SearchTrip";
import Link from "next/link";

const trips = [
    {
        id: 1,
        pickup: "Q. Ba Đình",
        pickupCity: "Hà Nội",
        dropoff: "P. Hồng Bàng",
        dropoffCity: "Hải Phòng",
        departureTime: "08:00",
        arrivalTime: "10:30",
        driver: { 
            name: "Nguyễn Văn A", 
            avatar: "/images/driver1.jpg", 
            rating: 4.7,
            initial: "N" 
        },
        seatsAvailable: 2,
    },
    {
        id: 2,
        pickup: "Q. 1",
        pickupCity: "TP HCM",
        dropoff: "P. 1",
        dropoffCity: "Đà Lạt",
        departureTime: "14:00",
        arrivalTime: "19:00",
        driver: { 
            name: "Trần Văn B", 
            avatar: "/images/driver2.jpg", 
            rating: 5,
            initial: "T" 
        },
        seatsAvailable: 3,
    },
    { // Thêm chuyến đi đã hết chỗ
        id: 3,
        pickup: "Q. Hoàn Kiếm",
        pickupCity: "Hà Nội",
        dropoff: "P. Thạch Thang",
        dropoffCity: "Đà Nẵng",
        departureTime: "07:00",
        arrivalTime: "12:00",
        driver: { 
            name: "Lê Văn C", 
            avatar: "/images/driver3.jpg", 
            rating: 4.5,
            initial: "L" 
        },
        seatsAvailable: 0, // Hết chỗ
    },
];

export default function BookingPage() {
    return (
        <div className="mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-600 mb-2 mt-8 max-w-9/12 m-auto">
                <Link href="/" className="flex text-blue-600 items-center hover:underline">
                    <Home className="w-4 h-4 mr-1" />
                    Trang chủ
                </Link>
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                <span className=" font-normal">Kết quả tìm kiếm</span>
            </div>
            
            {/* Search Section */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
                    <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                        Tìm chuyến đi phù hợp
                    </span>
                </h1>
                <SearchTrip />
            </div>
            
            {/* Trips List */}
            <div className="space-y-4 max-w-3xl m-auto">
                <h2 className="text-xl font-bold text-gray-800">
                    <span className="text-blue-600">Chuyến đi có sẵn</span>
                    <span className="text-gray-500 text-base ml-2">({trips.length} kết quả)</span>
                </h2>
                
                <div className="grid gap-4">
                    {trips.map((trip) => (
                        <Link href={`/tripdetail/${trip.id}`} key={trip.id} className="block">
                            <Card className={`border border-gray-200 rounded-lg hover:shadow-md transition-shadow ${
                                trip.seatsAvailable === 0 ? 'bg-gray-50 opacity-80' : 'bg-white'
                            } hover:border-blue-300`}>
                                <CardContent className="py-1 px-2 md:px-10">
                                    <div className="flex flex-row gap-4">   
                                        {/* Left Side - Pickup and Driver */}
                                        <div className="flex-1">
                                            <div className="mb-3">
                                                <p className={`font-medium md:text-xl ${
                                                    trip.seatsAvailable === 0 ? 'text-gray-500' : 'text-gray-800'
                                                }`}>{trip.pickup}</p>
                                                <p className={`text-sm md:text-base ${
                                                    trip.seatsAvailable === 0 ? 'text-gray-400' : 'text-gray-600'
                                                }`}>{trip.pickupCity}</p>
                                                <p className={`text-sm md:text-base font-medium mt-1 flex items-center ${
                                                    trip.seatsAvailable === 0 ? 'text-gray-500' : 'text-blue-600'
                                                }`}>
                                                    <Clock className={`inline-block w-4 h-4 mr-1 ${
                                                        trip.seatsAvailable === 0 ? 'text-gray-500' : 'text-blue-500'
                                                    }`} /> 
                                                    {trip.departureTime}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 mt-4">
                                                <Avatar className={`w-10 h-10 md:w-10 md:h-10 border-2 ${
                                                    trip.seatsAvailable === 0 ? 'border-gray-200' : 'border-white'
                                                } shadow-sm`}>
                                                    <AvatarImage src={trip.driver.avatar} />
                                                    <AvatarFallback className={`${
                                                        trip.seatsAvailable === 0 ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-600'
                                                    } font-medium`}>
                                                        {trip.driver.initial}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className={`text-sm font-bold md:text-base ${
                                                        trip.seatsAvailable === 0 ? 'text-gray-500' : 'text-gray-800'
                                                    }`}>{trip.driver.name}</p>
                                                    <div className="flex items-center">
                                                        <Star className={`${
                                                            trip.seatsAvailable === 0 ? 'text-gray-300' : 'fill-yellow-400 text-yellow-400'
                                                        } w-4 h-4`} />
                                                        <span className={`text-xs ml-1 font-medium ${
                                                            trip.seatsAvailable === 0 ? 'text-gray-400' : 'text-gray-800'
                                                        }`}>
                                                            {trip.driver.rating}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Icon ArrowRight */}
                                        <div className="flex justify-center items-center mt-2 sm:mt-0">
                                            <MdArrowRight className={`${
                                                trip.seatsAvailable === 0 ? 'text-gray-300' : 'text-gray-400'
                                            } w-6 h-6 sm:w-8 sm:h-8`} />
                                        </div>
                                        {/* Right Side - Dropoff and Seats */}
                                        <div className="flex-1 flex flex-col items-end justify-between">
                                            <div className="mb-3 text-right">
                                                <p className={`font-medium md:text-xl ${
                                                    trip.seatsAvailable === 0 ? 'text-gray-500' : 'text-gray-800'
                                                }`}>{trip.dropoff}</p>
                                                <p className={`text-sm md:text-base ${
                                                    trip.seatsAvailable === 0 ? 'text-gray-400' : 'text-gray-600'
                                                }`}>{trip.dropoffCity}</p>
                                                <p className={`text-sm md:text-base font-medium mt-1 flex items-center justify-end ${
                                                    trip.seatsAvailable === 0 ? 'text-gray-500' : 'text-green-600'
                                                }`}>
                                                    <Clock className={`inline-block w-4 h-4 mr-1 ${
                                                        trip.seatsAvailable === 0 ? 'text-gray-500' : 'text-green-500'
                                                    }`} /> 
                                                    {trip.arrivalTime}
                                                </p>
                                            </div>
                                            <div className="pb-3 text-right">
                                                <span className={`inline-block px-1 md:px-3 py-1 rounded-full text-xs font-medium ${
                                                    trip.seatsAvailable > 2 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : trip.seatsAvailable > 0 
                                                            ? 'bg-orange-100 text-orange-800' 
                                                            : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {trip.seatsAvailable > 0 
                                                        ? `Còn ${trip.seatsAvailable} chỗ trống` 
                                                        : 'Hết chỗ'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}