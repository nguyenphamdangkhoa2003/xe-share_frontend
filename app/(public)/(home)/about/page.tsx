'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const teamMembers = [
  { name: "Nguyễn Phạm Đăng Khoa", role: "Backend", image: "/images/avatar.png" },
  { name: "Võ Xuân Thịnh", role: "Giảng viên hướng dẫn", image: "/images/avatar.png" },
  { name: "Phạm Mạnh Tuấn", role: "Frontend", image: "/images/avatar.png" },
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto pb-8 pt-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
        Về Chúng Tôi
      </h2>
      
      <Card className="bg-white shadow-lg">
        <CardContent className="text-base sm:text-lg text-gray-700 space-y-3 sm:space-y-4 p-4 sm:p-6">
          <p>
            - Website đặt xe đi chung của chúng tôi cung cấp nền tảng kết nối những người có nhu cầu đi chung xe với nhau, giúp tiết kiệm chi phí và giảm thiểu tác động môi trường.
          </p>
          <p>
            - Chúng tôi cam kết mang đến một dịch vụ an toàn, tiện lợi và minh bạch, nơi tài xế và hành khách có thể dễ dàng tìm kiếm và thỏa thuận giá cả.
          </p>
          <p>
            - Với giao diện hiện đại, thân thiện và tích hợp nhiều tính năng thông minh, chúng tôi hy vọng sẽ mang đến trải nghiệm tốt nhất cho người dùng.
          </p>
          <p>
            - Đội ngũ quản lý của chúng tôi luôn sẵn sàng hỗ trợ và đảm bảo chất lượng dịch vụ, giúp nền tảng hoạt động ổn định và hiệu quả.
          </p>
        </CardContent>
      </Card>

      <h3 className="text-xl sm:text-2xl font-semibold text-center text-gray-900 mt-8 mb-6 sm:my-8">
        Đội Ngũ Quản Lý
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
        {teamMembers.map((member, index) => (
          <Card 
            key={index} 
            className="bg-white shadow-md text-center p-4 sm:p-6 w-full max-w-xs sm:max-w-sm"
          >
            <CardHeader className="p-2 sm:p-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full mb-3 sm:mb-4"
              />
              <CardTitle className="text-lg sm:text-xl">{member.name}</CardTitle>
              <CardDescription className="text-sm sm:text-base">{member.role}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}