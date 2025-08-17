import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import PayNowModal from '../../../Component/Modal/PayNowModal';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../shared/Loading';

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [page, setPage] = useState(1);
    const limit = 8;
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['my-orders', user?.email, page],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/my-orders?email=${user.email}&page=${page}&limit=${limit}`,
            );
            return res.data; // { total, orders }
        },
    });

    if (isLoading) return <Loading />;

    const totalOrders = data.total;
    const totalPages = Math.ceil(totalOrders / limit);

    return (
        <div className="container mx-auto px-4 min-h-[500px] sm:px-8">
            <h2 className="text-2xl font-bold text-center py-6 text-primary">
                🧾 My Orders
            </h2>

            {data.orders.length === 0 ? (
                <p className="text-center  0">No orders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="relative min-w-[800px] w-full text-sm sm:text-base   rounded shadow">
                        <thead>
                            <tr className=" ">
                                <th className="px-4 py-3 text-left whitespace-nowrap">
                                    🏪 Market
                                </th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">
                                    🧺 Items
                                </th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">
                                    💰 Total
                                </th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">
                                    🧑‍💼 Seller
                                </th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">
                                    📅 Date
                                </th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">
                                    🟡 Status
                                </th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">
                                    ⚙️ Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="border-t border-gray-200 hover:bg-gray-50"
                                >
                                    {/* 🏪 Market */}
                                    <td className="px-4 py-3">
                                        <div className="font-medium">
                                            {order.market}
                                        </div>
                                        <div className="text-xs  0">
                                            {order.date}
                                        </div>
                                    </td>

                                    {/* 🧺 Items */}
                                    <td className="px-4 py-3">
                                        <ul className="list-disc list-inside space-y-1">
                                            {order.items
                                                .slice(0, 2)
                                                .map((item, i) => (
                                                    <li key={i}>
                                                        {item.name} (
                                                        {item.quantity}kg)
                                                    </li>
                                                ))}
                                            {order.items.length > 2 && (
                                                <li className="text-xs text-gray-400">
                                                    ...more
                                                </li>
                                            )}
                                        </ul>
                                    </td>

                                    {/* 💰 Total */}
                                    <td className="px-4 py-3 font-semibold whitespace-nowrap">
                                        ৳{order.totalPrice?.toFixed(2)}
                                    </td>

                                    {/* 🧑‍💼 Seller */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={order?.seller?.photo}
                                                alt="seller"
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            <span className="text-sm">
                                                {order.seller?.name}
                                            </span>
                                        </div>
                                    </td>

                                    {/* 📅 Date */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {new Date(
                                            order.date,
                                        ).toLocaleDateString()}
                                    </td>

                                    {/* 🟡 Status */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-semibold ${
                                                order.status === 'paid'
                                                    ? 'bg-green-200 text-green-800'
                                                    : 'bg-yellow-200 text-yellow-800'
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>

                                    {/* ⚙️ Action */}
                                    <td className="px-4 py-3">
                                        {order.status === 'paid' ? (
                                            <button
                                                className=" 0 text-sm px-3 py-1 bg-gray-200 rounded cursor-not-allowed"
                                                disabled
                                            >
                                                ✅ Paid
                                            </button>
                                        ) : (
                                            <button
                                                className="px-3 py-1 bg-primary text-white text-xs rounded hover:bg-green-600 transition"
                                                onClick={() =>
                                                    setSelectedOrder(order)
                                                }
                                            >
                                                Pay Now
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* ✅ Pay Now Modal */}
                    {selectedOrder && (
                        <PayNowModal
                            isOpen={!!selectedOrder}
                            order={selectedOrder}
                            onClose={() => setSelectedOrder(null)}
                            onPaymentUpdate={() => refetch()}
                        />
                    )}

                    {/* ✅ Pagination Controls */}
                    {totalPages > 1 && (
                        <div className=" absolute flex left-1/2 transform -translate-x-1/2 z-40 gap-2 mt-6">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage((p) => p - 1)}
                                className="btn btn-sm"
                            >
                                Prev
                            </button>
                            {[...Array(totalPages).keys()].map((i) => (
                                <button
                                    key={i}
                                    onClick={() => setPage(i + 1)}
                                    className={`btn btn-sm ${
                                        page === i + 1 ? 'btn-primary' : ''
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage((p) => p + 1)}
                                className="btn btn-sm"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
