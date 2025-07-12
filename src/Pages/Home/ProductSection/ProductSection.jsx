import { motion } from 'framer-motion';
import { useLoaderData, useNavigate } from 'react-router';

const ProductSection = () => {
    const products = useLoaderData(); // contains 6 market entries
    const navigate = useNavigate();

    const handleDetailsClick = (productId) => {
        navigate(`/market/${productId}`);
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-10 text-lime-600">
                🛍️ Latest 6 Market Updates
            </h2>

            {products?.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">
                    No market data found.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white rounded-2xl shadow-md border border-primary hover:shadow-xl transition duration-300"
                        >
                            {/* 🖼️ Image */}
                            <motion.img
                                whileHover={{ scale: 0.9 }}
                                whileTap={{ scale: 0.8 }}
                                transition={{ duration: 0.7 }}
                                src={product.image}
                                alt={product.market}
                                className="w-full h-48 object-cover rounded-t-2xl"
                            />

                            <div className="p-4 space-y-2">
                                <h3 className="text-xl font-semibold text-lime-600">
                                    🛒 {product.market}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    📅 {product.date}
                                </p>

                                {/* 📋 Items */}
                                <div>
                                    <h4 className="text-gray-700 font-medium">
                                        📋 Items & Prices:
                                    </h4>
                                    <ul className="text-sm text-gray-700 mt-1 space-y-1 list-disc list-inside">
                                        {product.items
                                            ?.slice(0, 3)
                                            .map((item, idx) => {
                                                const latestPrice =
                                                    item.priceHistory?.[
                                                        item.priceHistory
                                                            .length - 1
                                                    ];
                                                return (
                                                    <li key={idx}>
                                                        {item.name} —{' '}
                                                        <span className="font-medium">
                                                            ৳
                                                            {latestPrice?.price}
                                                            /kg
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                    {product.items?.length > 3 && (
                                        <p className="text-xs text-gray-400 mt-1">
                                            ...and more
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={() =>
                                        handleDetailsClick(product._id)
                                    }
                                    className="mt-4 w-full py-2 px-4 bg-primary cursor-pointer text-secondary rounded-lg font-medium hover:bg-green-600 transition"
                                >
                                    View Details 🔍
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductSection;
