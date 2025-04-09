import Banner from '@/components/Banner';
import SearchTrip from '@/components/form/SearchTrip';
import Image from 'next/image';

export default function Home() {
    return (
        <div className='md:pt-9 pt-7'>
            <Banner src="/images/banner.jpg" alt="Banner Image" />

            <div className="mb-4">
                <SearchTrip />
            </div>

            <div className="bg-[#DFF6E6]  rounded-2xl p-8 ">
                <div className="max-w-10/12 m-auto flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                    <div className="flex-shrink-0">
                        <Image
                            src="/images/carpool.png"
                            alt="Carpool"
                            width={250}
                            height={250}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-black">
                            Xe Share – Giải pháp đi chung xe tiện lợi & tiết
                            kiệm!
                        </h2>
                        <p className="text-gray-600 text-lg mt-4 text-justify">
                            Xe Share là nền tảng kết nối những người có tuyến
                            đường di chuyển giống nhau, giúp họ dễ dàng chia sẻ
                            chuyến đi an toàn, tiện lợi và tiết kiệm chi phí.
                            Không chỉ giúp giảm kẹt xe và ô nhiễm môi trường, Xe
                            Share còn mang đến cơ hội kết nối cộng đồng, tạo nên
                            những hành trình thú vị hơn mỗi ngày. 🚗💜
                        </p>
                    </div>
                </div>
            </div>

            {/* Lợi ích */}
            <div className="mt-10 max-w-5xl mx-auto flex flex-col sm:flex-row-reverse items-center gap-8 text-center sm:text-left">
                {/* Hình ảnh */}
                <div className="flex justify-center sm:justify-end w-full sm:w-[35%]">
                    <Image
                        src="/images/carpool1.jpg"
                        alt="Carpooling"
                        width={350}
                        height={280}
                        className="rounded-lg w-full max-w-[350px] object-cover"
                    />
                </div>

                {/* Nội dung mở rộng */}
                <div className="flex-1 md:pb-1 md:px-1 pb-5 px-6">
                    <h2 className="text-2xl font-bold text-black text-center sm:text-left">
                        Lợi ích của việc đi chung xe
                    </h2>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-black">
                            Tiết kiệm chi phí:
                        </h3>
                        <p className="text-gray-600">
                            – Chia sẻ chi phí nhiên liệu, phí cầu đường, giúp
                            giảm đáng kể chi phí di chuyển hàng ngày.
                        </p>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-black">
                            Giảm kẹt xe & ô nhiễm:
                        </h3>
                        <p className="text-gray-600">
                            – Giảm số lượng xe trên đường, hạn chế ùn tắc và cắt
                            giảm khí thải, góp phần bảo vệ môi trường.
                        </p>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-black">
                            Kết nối người cùng tuyến:
                        </h3>
                        <p className="text-gray-600">
                            – Tạo cơ hội kết bạn, mở rộng mối quan hệ và giúp
                            hành trình trở nên thú vị hơn.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
