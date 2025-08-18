import { useQuery } from '@tanstack/react-query';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-flip';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../shared/Loading';
// import 'swiper/css/effect-zoom';
import { Link } from 'react-router';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-flip';

const Advertisement = () => {
    const axiosSecure = useAxiosSecure();

    const { data: ads = [], isLoading } = useQuery({
        queryKey: ['all-advertisements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/advertisements/active');
            console.log(res.data);
            return res.data;
        },
    });
    console.log(ads)

    if (isLoading) return <Loading />;

    return (
        <div className="my-12 max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
                🛍️ Advertisement Highlights
            </h2>

            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                spaceBetween={10}
                centeredSlides={true}
                slidesPerView={1.5}
                loop={false}
                breakpoints={{
                    768: {
                        slidesPerView: 2.5,
                        spaceBetween: 30, // For medium and up
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
                onSlideChange={() => {}}
                className="rounded-2xl"
            >
                {ads.map((ad) => (
                    <SwiperSlide
                        key={ad._id}
                        className="transition-all duration-500 mb-5"
                    >
                        {({ isActive }) => (
                            <div
                                className={`rounded-2xl my-5 md:my-12 border border-green-300 shadow-lg px-2 p-2 md:p-4 bg-card text-secondary h-full flex flex-col justify-between items-center transition-all duration-500 ${
                                    isActive
                                        ? 'scale-105 blur-0'
                                        : 'scale-90 blur-sm opacity-70'
                                }`}
                            >
                                <h3 className="text-lg font-semibold text-green-700 dark:text-primary text-center">
                                    {ad.adTitle}
                                </h3>
                                <p className="text-sm   mt-0 md:mt-2 text-center">
                                    {ad.shortDescription}
                                </p>
                                {ad.image && (
                                    <img
                                        src={ad.image}
                                        alt={ad.adTitle}
                                        className="w-full h-32 md:h-40 object-cover rounded-lg mt-3"
                                    />
                                )}
                                <Link
                                    to={`/market/${ad.productId}`}
                                    className="mt-4 mb-2 btn btn-xs lg:btn-md bg-green-600 dark:bg-primary text-secondary hover:bg-green-700 dark:hover:bg-teal-800 border-none transition"
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
