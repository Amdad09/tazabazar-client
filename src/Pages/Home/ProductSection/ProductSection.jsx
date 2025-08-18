import { motion } from 'framer-motion';
import { useLoaderData, useNavigate } from 'react-router';

const ProductSection = () => {
    const products = useLoaderData();
    const navigate = useNavigate();

    const handleDetailsClick = (productId) => {
        navigate(`/market/${productId}`);
    };

    const price = products.map((product) => {
        const updatePrice = product?.items?.priceHistory;
        const priceLength = updatePrice.length - 1;
        return Number(updatePrice[priceLength].price);
    });

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-10 ">
                🛍️ Latest 6 Market Updates
            </h2>

            {products?.length === 0 ? (
                <p className="text-center  0 text-lg">No market data found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-card rounded-2xl text-gray-800 shadow-md border-primary hover:shadow-xl transition duration-300"
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
                                <h3 className="text-xl font-semibold ">
                                    🛒 {product.market}
                                </h3>
                                <p className="text-sm ">📅 {product.date}</p>

                                {/* 📋 Items */}
                                <div className="border-t pt-3 space-y-2">
                                    <h4 className="text-lg font-semibold">
                                        📋 Product Info
                                    </h4>
                                    <div className="flex justify-between text-sm ">
                                        <span className="font-medium">
                                            🧅 Name:
                                        </span>
                                        <span>{product.items?.name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm ">
                                        <span className="font-medium">
                                            💰 Price:
                                        </span>
                                        <span>{price[index]} ৳</span>
                                    </div>
                                    <div className="flex justify-between text-sm ">
                                        <span className="font-medium">
                                            ⚖️ Quantity Type:
                                        </span>
                                        <span>
                                            {product.items?.quantityType ||
                                                'kg'}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() =>
                                        handleDetailsClick(product._id)
                                    }
                                    className="mt-4 w-full py-2 px-4 bg-primary cursor-pointer text-secondary rounded-lg font-medium teal transition"
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
