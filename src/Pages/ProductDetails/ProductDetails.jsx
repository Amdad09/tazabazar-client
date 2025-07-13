import { useLoaderData } from 'react-router';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import BuyProductModal from '../../Component/Modal/BuyProductModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import useRole from '../../hooks/useRole';

const ProductDetails = () => {
    const product = useLoaderData();
    const { user } = useAuth();
    const [ role ] = useRole();
    console.log(role);
    const [isWatchlisted, setIsWatchlisted] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);

    const isVendorOrAdmin =
        user?.email === product?.seller?.email || user?.role === 'admin';

    
    const handleBuy = () => {
        setOpenModal(true);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3000/reviews/${product._id}`)
            .then((res) => setReviews(res.data));
    }, [product._id]);

    const isNormalUser = role === 'customer'; 

    const handleAddToWatchlist = async () => {
        try {
            const watch = {
                userEmail: user.email,
                productId: product._id,
                addedAt: new Date(),
            };
            const res = await axios.post(
                'http://localhost:3000/watchlist',
                watch,
            );
            if (res.data.insertedId) {
                setIsWatchlisted(true);
                toast.success('✅ Added to Watchlist');
            }
        } catch (err) {
            toast.error('❌ Failed to add to watchlist');
        }
    };


    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            productId: product._id,
            userEmail: user?.email,
            userName: user?.displayName,
            userImage: user?.photoURL,
            rating,
            comment,
            createdAt: new Date().toISOString(),
        };

        const res = await axios.post(
            'http://localhost:3000/reviews',
            newReview,
        );
        if (res.data.insertedId) {
            toast.success('Review added!');
            setReviews([...reviews, newReview]);
            setComment('');
            setRating(5);
        }
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
            <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                    💬 User Reviews
                </h4>

                {/* Show Reviews */}
                {reviews.length === 0 ? (
                    <p className="text-gray-500 italic">
                        No reviews yet. Be the first to review!
                    </p>
                ) : (
                    reviews.map((r, i) => (
                        <div key={i} className="bg-gray-100 p-3 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={r.userImage}
                                    className="w-8 h-8 rounded-full"
                                    alt="user"
                                />
                                <div>
                                    <p className="font-medium">{r.userName}</p>
                                    <p className="text-sm text-gray-500">
                                        {'⭐'.repeat(r.rating)} ({r.rating}/5)
                                    </p>
                                </div>
                            </div>
                            <p className="mt-2 text-gray-700">{r.comment}</p>
                        </div>
                    ))
                )}

                {/* Only users can review */}
                {isNormalUser && (
                    <form
                        onSubmit={handleReviewSubmit}
                        className="mt-4 space-y-3"
                    >
                        <textarea
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write your review..."
                            className="w-full p-2 border rounded"
                        ></textarea>
                        <div className="flex items-center gap-2">
                            <label
                                htmlFor="rating"
                                className="text-sm font-bold"
                            >
                                Rating:
                            </label>
                            <select
                                id="rating"
                                value={rating}
                                onChange={(e) =>
                                    setRating(parseInt(e.target.value))
                                }
                                className="border border-info p-1 rounded"
                            >
                                {[5, 4, 3, 2, 1].map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="submit"
                                className="ml-auto btn-sm btn btn-info text-white"
                            >
                                Submit Review
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* ⭐ Watchlist & Buy */}
            <div className="flex flex-col md:flex-row gap-4">
                <button
                    onClick={handleAddToWatchlist}
                    disabled={!isNormalUser}
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
