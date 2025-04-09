'use client';

import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto pb-8 pt-16 px-4 ">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
        Liên hệ với chúng tôi
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Form liên hệ */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Gửi tin nhắn</h3>
          <Input type="text" placeholder="Họ tên" className="mb-3" />
          <Input type="email" placeholder="Email" className="mb-3" />
          <Input type="tel" placeholder="Số điện thoại" className="mb-3" />
          <textarea
            placeholder="Nội dung"
            rows={4}
            className="w-full p-2 border rounded mb-3"
          ></textarea>
          <Button variant='login' className="w-full">
            Gửi tin nhắn
          </Button>
        </div>

        {/* Thông tin liên hệ */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Thông tin liên hệ</h3>
          <div className="flex items-center gap-2 mb-2">
            <FaPhone className="text-blue-600" /> <span>+84 123 456 789</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <FaEnvelope className="text-blue-600" /> <span>contact@xeshare.com</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <FaMapMarkerAlt className="text-blue-600" />
            <span>180 Cao Lỗ, Quận 8, TP.HCM</span>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d931.5009782495014!2d106.67757112093423!3d10.73754469926743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fad3fb62a95%3A0xa9576c84a879d1fe!2zMTgwIENhbyBM4buXLCBQaMaw4budbmcgNCwgUXXhuq1uIDgsIEjhu5MgQ2jDrSBNaW5oIDcwMDAwLCBWaWV0bmFt!5e1!3m2!1sen!2s!4v1743319627540!5m2!1sen!2s"
            width="100%"
            height="250"
            className="border rounded-lg"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
