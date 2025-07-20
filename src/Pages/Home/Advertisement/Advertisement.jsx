import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../shared/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-cube';
// import 'swiper/css/effect-zoom';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-flip';
import { Link } from 'react-router';

const Advertisement = () => {
    const axiosSecure = useAxiosSecure();

    const { data: ads = [], isLoading } = useQuery({
        queryKey: ['all-advertisements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/advertisements/active');
            console.log(res.data)
            return res.data;
        },
    });
    
    if (isLoading) return <Loading />;

    return (
        <div className="my-12 max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
                🛍️ Advertisement Highlights
            </h2>
           

            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                spaceBetween={30}
                centeredSlides={true}
                slidesPerView={1.5}
                loop={true}
                breakpoints={{
                    768: {
                        slidesPerView: 2.5,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                onSlideChange={() => {}}
                className="rounded-2xl"
            >
                {ads.map((ad) => (
                    <SwiperSlide
                        key={ad._id}
                        className="transition-all duration-500"
                    >
                        {({ isActive }) => (
                            <div
                                className={`rounded-2xl my-12 border border-green-300 shadow-lg p-4 bg-green-100 text-secondary h-full flex flex-col justify-between items-center transition-all duration-500 ${
                                    isActive
                                        ? 'scale-105 blur-0'
                                        : 'scale-90 blur-sm opacity-70'
                                }`}
                            >
                                <h3 className="text-lg font-semibold text-green-700 text-center">
                                    {ad.adTitle}
                                </h3>
                                <p className="text-sm text-gray-600 mt-2 text-center">
                                    {ad.shortDescription}
                                </p>
                                {ad.image && (
                                    <img
                                        src={ad.image}
                                        alt={ad.adTitle}
                                        className="w-full h-40 object-cover rounded-lg mt-3"
                                    />
                                )}
                                <Link
                                    to={`/market/${ad.productId}`}
                                    className="mt-4 bg-green-600 text-secondary font-semibold px-4 py-2 rounded hover:bg-green-700 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Advertisement;
