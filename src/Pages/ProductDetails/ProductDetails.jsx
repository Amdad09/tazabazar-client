import { useLoaderData } from 'react-router';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import BuyProductModal from '../../Component/Modal/BuyProductModal';

const ProductDetails = () => {
    const product = useLoaderData();
    const { user } = useAuth();
    const [isWatchlisted, setIsWatchlisted] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const isVendorOrAdmin =
        user?.email === product?.seller?.email || user?.role === 'admin';

    const handleAddToWatchlist = () => {
        // Your watchlist logic here
        setIsWatchlisted(true);
    };

    const handleBuy = () => {
        setOpenModal(true);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
            {/* 🏪 Market Name & Date */}
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-lime-600">
                    🏪 {product.market}
                </h2>
                <p className="text-gray-500">📅 {product.date}</p>
            </div>

            {/* 🖼️ Image */}
            <div className="w-full h-[300px] overflow-hidden rounded-xl shadow">
                <img
                    src={product.image}
                    alt="Market Banner"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 🥕 Items */}
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    🥕 Item Prices
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {product.items?.map((item, idx) => (
                        <li key={idx}>
                            {item.name} —{' '}
                            <span className="font-medium">
                                ৳
                                {item?.priceHistory?.slice(-1)[0]?.price ||
                                    'N/A'}
                                /kg
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 👨‍🌾 Seller */}
            <div className="border p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium text-gray-700 mb-1">
                    👨‍🌾 Submitted By:
                </h4>
                <div className="flex items-center space-x-4">
                    <img
                        src={product.seller?.image}
                        alt="Vendor"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <p className="font-semibold">{product.seller?.name}</p>
                        <p className="text-sm text-gray-500">
                            {product.seller?.email}
                        </p>
                    </div>
                </div>
            </div>

            {/* 💬 Reviews Placeholder */}
            <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                    💬 User Reviews
                </h4>
                <p className="text-gray-500 italic">
                    No reviews yet. Be the first to review!
                </p>
            </div>

            {/* ⭐ Watchlist & Buy */}
            <div className="flex flex-col md:flex-row gap-4">
                <button
                    onClick={handleAddToWatchlist}
                    disabled={isVendorOrAdmin || isWatchlisted}
                    className={`btn btn-outline flex-1 ${
                        isWatchlisted || isVendorOrAdmin
                            ? 'btn-disabled'
                            : 'btn-info'
                    }`}
                >
                    <FaStar className="mr-2" />
                    {isWatchlisted
                        ? 'Already in Watchlist'
                        : '⭐ Add to Watchlist'}
                </button>

                <button onClick={handleBuy} className="btn btn-success flex-1">
                    <FaShoppingCart className="mr-2" />
                    🛒 Buy Product
                </button>
            </div>
            <BuyProductModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                product={product}
            ></BuyProductModal>
        </div>
    );
};

export default ProductDetails;
