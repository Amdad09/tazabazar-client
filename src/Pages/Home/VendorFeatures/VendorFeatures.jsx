import { motion } from 'framer-motion';
import { FaUsers, FaStar, FaShieldAlt, FaShoppingCart } from 'react-icons/fa';

const VendorFeatures = () => {
    return (
        <section className="py-24 bg-card">
            <div className="max-w-screen-xl mx-auto px-4 text-center">
                {/* Section Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl text-primary font-bold mb-6"
                >
                    ⭐ Vendor Features & User Benefits
                </motion.h2>

                {/* Features List */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Trusted Vendors */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="card bg-base-200 shadow-lg p-6"
                    >
                        <FaShieldAlt className="text-4xl text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Trusted Vendors
                        </h3>
                        <p className="text-sm">
                            Verified and reliable vendors ensure quality and
                            authenticity.
                        </p>
                    </motion.div>

                    {/* Easy Shopping */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="card bg-base-200 shadow-lg p-6"
                    >
                        <FaShoppingCart className="text-4xl text-success mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Easy Shopping
                        </h3>
                        <p className="text-sm">
                            Browse vendors and products smoothly with one click.
                        </p>
                    </motion.div>

                    {/* Ratings & Reviews */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="card bg-base-200 shadow-lg p-6"
                    >
                        <FaStar className="text-4xl text-warning mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Ratings & Reviews
                        </h3>
                        <p className="text-sm">
                            See ratings and reviews to choose the best vendors
                            quickly.
                        </p>
                    </motion.div>

                    {/* Community & Support */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="card bg-base-200 shadow-lg p-6"
                    >
                        <FaUsers className="text-4xl text-accent mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Community Support
                        </h3>
                        <p className="text-sm">
                            Vendors stay active with seasonal offers and
                            community updates.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default VendorFeatures;
