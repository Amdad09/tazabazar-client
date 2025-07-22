import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 9;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(
                    `${
                        import.meta.env.VITE_API_URL
                    }/markets/approved?page=${page}&limit=${limit}`,
                );
                setProducts(res.data.products);
                setTotalCount(res.data.totalCount);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [page]);

    const price = products.map((product) => {
        const updatePrice = product?.items?.priceHistory;
        const priceLength = updatePrice.length - 1;
        return Number(updatePrice[priceLength].price);
    });
    console.log(price);

    const totalPages = Math.ceil(totalCount / limit);
    console.log(totalPages);
    const handleDetailsClick = (productId) => {
        navigate(`/market/${productId}`);
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-10">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-4xl font-bold text-lime-600 mb-2">
                    🛍️ All Market Products
                </h2>
                <p className="text-gray-600 text-lg">
                    Browse daily price entries from different markets. Stay
                    updated with the latest rates for your favorite groceries.
                </p>
            </div>

            {products.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">
                    No market data found.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white rounded-2xl shadow-md border border-primary hover:shadow-xl transition duration-300"
                        >
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

                                <div className="border-t pt-3 space-y-2">
                                    <h4 className="text-lg font-semibold text-gray-700">
                                        📋 Product Info
                                    </h4>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span className="font-medium">
                                            🧅 Name:
                                        </span>
                                        <span>
                                            {product.items?.name || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span className="font-medium">
                                            💰 Price:
                                        </span>
                                        <span>{price[index] || 'N/A'} ৳</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span className="font-medium">
                                            ⚖️ Quantity Type:
                                        </span>
                                        <span>
                                            {product.items?.[0]?.quantityType ||
                                                'kg'}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() =>
                                        handleDetailsClick(product._id)
                                    }
                                    className="mt-4 w-full cursor-pointer py-2 px-4 bg-primary text-secondary rounded-lg font-medium hover:bg-green-600 transition"
                                >
                                    View Details 🔍
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* 🔢 Pagination Buttons */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-10 space-x-2">
                    {[...Array(totalPages).keys()].map((num) => (
                        <button
                            key={num + 1}
                            onClick={() => setPage(num + 1)}
                            className={`px-4 py-2 rounded-full ${
                                page === num + 1
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {num + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllProducts;
