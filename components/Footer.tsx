import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 py-8 pb-4">
      <div className="max-w-6xl mb-16 mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Logo & Mô tả */}
        <div className="flex flex-col items-center md:items-start">
          <Image src="/images/logo.png" alt="KTRideMate Logo" width={200} height={40} />
          <p className="text-gray-600 mt-2 max-w-xs">
            Nền tảng kết nối tài xế và hành khách trên cùng tuyến đường.
          </p>
        </div>

        {/* Liên kết */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-blue-600">Liên kết</h3>
          <a href="#" className="text-gray-600 hover:text-blue-500 mt-2">Chính sách</a>
          <a href="#" className="text-gray-600 hover:text-blue-500 mt-2">Hỗ trợ khách hàng</a>
          <a href="#" className="text-gray-600 hover:text-blue-500 mt-2">Điều khoản dịch vụ</a>
        </div>

        {/* Liên hệ */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-blue-600">Liên hệ</h3>
          <p className="text-gray-600 mt-2">SĐT: 1234567890</p>
          <p className="text-gray-600">Email: contact@xeshare.com</p>
          <p className="text-gray-600">Địa chỉ: 180 Cao Lỗ, Q.8, TP.HCM</p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-3">
            <a href="https://www.facebook.com/home.php" target="_blank" className="text-blue-600 hover:text-blue-800">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-pink-600 hover:text-pink-800">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-blue-700 hover:text-blue-900">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
        
      {/* Bản quyền */}
      <p className="text-gray-500 text-center text-sm  border-t border-gray-300 pt-4">
        © 2025 XeShare. All rights reserved.
      </p>
    </footer>
  );
}
