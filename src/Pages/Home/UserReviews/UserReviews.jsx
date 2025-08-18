import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const UserReviews = () => {
    
    const reviews = [
        {
            id: 1,
            name: 'Rahim Uddin',
            photo: 'https://i.pravatar.cc/100?img=1',
            rating: 5,
            comment:
                'Fresh products, on-time updates. Very helpful for daily shopping!',
        },
        {
            id: 2,
            name: 'Shila Akter',
            photo: 'https://i.pravatar.cc/100?img=2',
            rating: 4,
            comment:
                'Great platform! Would love to see more local vendors joining soon.',
        },
        {
            id: 3,
            name: 'Tanvir Hasan',
            photo: 'https://i.pravatar.cc/100?img=3',
            rating: 5,
            comment: 'Prices are accurate and the dashboard is easy to use.',
        },
    ];

    return (
        <section className="py-24">
            <div className="max-w-screen-xl mx-auto px-4">
                {/* Section Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold text-center mb-8"
                >
                    💬 What Our Users Say
                </motion.h2>

                {/* Review Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <motion.div
                            key={review.id}
                            whileHover={{ scale: 1.05 }}
                            className="card bg-card text-gray-800 shadow-xl p-6 h-full lg:h-[400px]"
                        >
                            <div className="flex items-center mb-4">
                                <img
                                    src={review.photo}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h3 className="font-semibold">
                                        {review.name}
                                    </h3>
                                    <div className="flex text-yellow-500">
                                        {Array.from({
                                            length: review.rating,
                                        }).map((_, i) => (
                                            <FaStar key={i} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-md">{review.comment}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UserReviews;
