import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { useParams } from 'react-router';
import BuyProductModal from '../../Component/Modal/BuyProductModal';
import PayNowModal from '../../Component/Modal/PayNowModal';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useRole from '../../hooks/useRole';
import Loading from '../../shared/Loading';
import PriceComparisonChart from './PriceComparisonChart';

const ProductDetails = () => {
    // const product = useLoaderData();
    // console.log(product)
    const { user } = useAuth();
    const [role] = useRole();
    const axiosSecure = useAxiosSecure();
    const [isWatchlisted, setIsWatchlisted] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const { id } = useParams();

    const { data: product = {}, isLoading } = useQuery({
        queryKey: ['market', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/market/${id}`);
            console.log(res.data);
            return res.data;
        },
    });
    console.log(product);

    const queryClient = useQueryClient();

    // ✅ Load Reviews
    useEffect(() => {
        axiosSecure
            .get(`reviews/${product._id}`)
            .then((res) => setReviews(res.data));
    }, [product._id, axiosSecure]);

    // ✅ Watchlist Mutation
    const { mutate: addToWatchlist } = useMutation({
        mutationFn: async (watch) => {
            const { data } = await axiosSecure.post('/watchlist', watch);
            return data;
        },
        onSuccess: (data) => {
            if (data.insertedId) {
                toast.success('✅ Added to Watchlist');
                queryClient.invalidateQueries(['watchlist', user.email]);
                setIsWatchlisted(true);
            } else {
                toast.error('⚠️ Already in Watchlist');
            }
        },
        onError: () => {
            toast.error('❌ Failed to add to watchlist');
        },
    });

    if (isLoading) return <Loading />;

    const updatePrice = product.items.priceHistory;
    const priceLength = updatePrice.length - 1;
    console.log(updatePrice.length, Number(updatePrice[priceLength].price));
    const price = Number(updatePrice[priceLength].price);

    const isVendorOrAdmin =
        user?.email === product?.seller?.email || role === 'admin';
    const isNormalUser = role === 'customer';

    // ✅ Review Submit
    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            productId: product._id,
            userEmail: user?.email,
            userName: user?.displayName,
            userImage: user?.photoURL,
            rating,
            comment,
            createdAt: new Date().toISOString().split('T')[0],
        };

        const res = await axiosSecure.post(
            'https://kachabazar-360-server.vercel.app/reviews',
            newReview,
        );
        if (res.data.insertedId) {
            toast.success('Review added!');
            setReviews([...reviews, newReview]);
            setComment('');
            setRating(5);
        }
    };
    // console.log(product.items.priceHistory);
    return (
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
            <div className="text-center">
                {product.status === 'rejected' && product.feedback && (
                    <p className="text-red-600 mt-2 font-medium">
                        ⚠️ Rejection Feedback: {product.feedback}
                    </p>
                )}
            </div>
            {/* 🏪 Market Name & Date */}
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-lime-600">
                    🏪 {product.market}
                </h2>
                <p className=" 0">📅 {product.date}</p>
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
            <div className="space-y-2">
                <h3 className="text-lg font-bold text-lime-700">
                    🥬 {product.items.name}
                </h3>
                <p className="text-sm  ">
                    📦 Description: {product.items.description}
                </p>
                <p className="text-sm  ">
                    📏 Quantity: {product.items.quantity} kg
                </p>
                <p className="text-sm  ">
                    💰 Item & Price:{' '}
                    <span className="font-semibold text-black">
                        {product.items.name} -৳{price} /kg
                    </span>
                </p>

                {/* 📈 Price History */}
                {/* <div className="bg-gray-50 p-4 rounded-xl border mt-5 border-gray-200 shadow-sm">
                    <p className="font-semibold text-gray-800 text-base mb-3 flex items-center gap-2">
                        <span className="text-lg">📊</span> Price History
                    </p>

                    <ResponsiveContainer
                        className="pr-5"
                        width="100%"
                        height={300}
                    >
                        <LineChart
                            data={product.items?.priceHistory?.map((entry) => ({
                                ...entry,
                                price: Number(entry.price), // Ensure it's number
                            }))}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip
                                formatter={(value) => [`৳${value}`, 'Price']}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#10B981"
                                strokeWidth={2}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div> */}
                <div className="my-5 py-12">
                    <PriceComparisonChart item={product.items} />
                </div>
            </div>

            {/* 👨‍🌾 Seller */}
            <div className="border p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium   mb-1">👨‍🌾 Submitted By:</h4>
                <div className="">
                    <div className="flex items-center space-x-4">
                        <img
                            src={product.seller?.photo}
                            alt="Vendor"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-semibold">
                                {product.seller?.name}
                            </p>
                            <p className="text-sm  0">
                                {product.seller?.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 💬 Reviews */}
            <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                    💬 User Reviews
                </h4>

                {reviews.length === 0 ? (
                    <p className=" 0 italic">
                        No reviews yet. Be the first to review!
                    </p>
                ) : (
                    reviews.map((r, i) => (
                        <div
                            key={i}
                            className="  p-4 rounded-lg shadow-sm border border-gray-200 mb-4"
                        >
                            <div className="flex items-start space-x-4">
                                <img
                                    src={r.userImage}
                                    alt="user"
                                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {r.userName}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {r.userEmail}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {r.createdAt}
                                            </p>
                                        </div>
                                        <div className="text-yellow-500 text-sm">
                                            {'⭐'.repeat(r.rating)}
                                            <span className="ml-1  0">
                                                ({r.rating}/5)
                                            </span>
                                        </div>
                                    </div>
                                    <p className="mt-3   leading-relaxed">
                                        {r.comment}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                {role === 'customer' && (
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
                    onClick={() => {
                        const watch = {
                            productId: product._id,
                            market: product.market,
                            date: product.date,
                            image: product.image,
                            category: product.category,
                            items: product.items,
                        };
                        addToWatchlist(watch);
                    }}
                    disabled={!isNormalUser || isWatchlisted || isVendorOrAdmin}
                    className={`btn btn-outline flex-1 ${
                        isWatchlisted ? 'btn-disabled' : 'btn-info'
                    }`}
                >
                    <FaStar className="mr-2" />
                    {isWatchlisted
                        ? 'Already in Watchlist'
                        : '⭐ Add to Watchlist'}
                </button>

                <button
                    onClick={() => setOpenModal(true)}
                    className="btn btn-primary flex-1"
                    disabled={!isNormalUser || isVendorOrAdmin}
                >
                    <FaShoppingCart className="mr-2" />
                    🛒 Buy Product
                </button>
            </div>

            <BuyProductModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                product={product}
                setSelectedOrder={setSelectedOrder}
            />

            {selectedOrder && (
                <PayNowModal
                    isOpen={!!selectedOrder}
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onPaymentUpdate={() => {
                        // optionally refetch data if needed
                    }}
                />
            )}
        </div>
    );
};

export default ProductDetails;
