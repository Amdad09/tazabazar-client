import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [sortOrder, setSortOrder] = useState(null); 

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const queryParams = {};

                if (selectedDate) {
                    queryParams.date = selectedDate.toLocaleDateString('en-CA');
                }

                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/markets/approved`,
                    { params: queryParams },
                );

                let fetchedProducts = res.data.products || [];

                if (sortOrder) {
                    fetchedProducts.sort((a, b) => {
                        const priceA = Number(
                            a?.items?.priceHistory?.slice(-1)[0]?.price || 0,
                        );
                        const priceB = Number(
                            b?.items?.priceHistory?.slice(-1)[0]?.price || 0,
                        );
                        return sortOrder === 'asc'
                            ? priceA - priceB
                            : priceB - priceA;
                    });
                }

                setProducts(res.data.products || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [selectedDate, sortOrder]);

    const price = products.map((product) => {
        const updatePrice = product?.items?.priceHistory || [];
        const priceLength = updatePrice.length - 1;
        return Number(updatePrice[priceLength]?.price || 0);
    });

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
            <div className="flex justify-around items-center">
                <div className="text-center mb-6">
                    <label className="mr-2 font-medium text-gray-700">
                        🧭 Sort by:
                    </label>
                    <select
                        value={sortOrder || ''}
                        onChange={(e) => setSortOrder(e.target.value || null)}
                        className="px-4 py-2 border rounded-md"
                    >
                        <option value="">Default</option>
                        <option value="asc">🔼 Price Low to High</option>
                        <option value="desc">🔽 Price High to Low</option>
                    </select>
                </div>

                {/* 📅 Date Filter */}
                <div className="mb-6 text-center">
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        placeholderText="Filter by Date"
                        className="px-4 py-2 border rounded-md"
                    />
                    <button
                        className="ml-3 px-3 py-2 hover:bg-green-300 cursor-pointer bg-green-200 rounded"
                        onClick={() => setSelectedDate(null)}
                    >
                        Clear
                    </button>
                </div>
            </div>

            {/* 📦 Product Grid */}
            {products.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">
                    No market data found.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <div
                            key={product._id}
                            data-aos="zoom-in"
                            // data-aos-delay={index * 100}
                            className="bg-white rounded-2xl shadow-md border border-primary hover:shadow-xl transition duration-300"
                        >
                            <img
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllProducts;
