
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import banner1 from '../../../assets/banner1.jpg';
import banner2 from '../../../assets/banner2.jpg';
import banner3 from '../../../assets/banner3.jpg';
import { motion } from 'framer-motion';

const Banner = () => {
    return (
        <section className="max-w-screen-xl mx-auto mb-8 rounded-xl overflow-hidden">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={5000}
                transitionTime={1000}
                swipeable
                emulateTouch>
                {[banner1, banner2, banner3].map((img, index) => (
                    <div
                        key={index}
                        className="relative h-[300px] md:h-[450px] lg:h-[550px]">
                        <img
                            src={img}
                            alt={`Fresh market ${index + 1}`}
                            className="w-full h-full object-cover"
                        />

                        {/* Glass effect overlay with motion */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="absolute inset-0 flex justify-center items-center">
                            <div className="bg-white/10 backdrop-blur-md p-6 md:p-10 rounded-xl max-w-3xl text-white text-center shadow-xl border border-white/20">
                                <h2 className="text-2xl md:text-4xl lg:text-6xl font-extrabold leading-tight drop-shadow">
                                    Welcome to{' '}
                                    <span className="text-primary drop-shadow-lg">
                                        TazaBazar 360
                                    </span>
                                </h2>
                                <p className="mt-4 text-sm md:text-lg lg:text-xl font-medium tracking-wide">
                                    Discover real-time prices from local
                                    markets. <br />
                                    Your daily bazar, now just a click away!
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-6 btn btn-primary text-white font-bold px-6">
                                    Explore Market
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </Carousel>
        </section>
    );
};

export default Banner;
