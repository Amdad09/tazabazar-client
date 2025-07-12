import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import PayNowModal from '../../../Component/Modal/PayNowModal';

const MyOrders = () => {
    const { user } = useAuth();
    const email = user?.email;
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:3000/my-orders?email=${email}`)
                .then((res) => res.json())
                .then((data) => setOrders(data))
                .catch((err) => console.error('Failed to load orders:', err));
        }
    }, [email]);

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <h2 className="text-2xl font-bold text-center py-6 text-lime-600">
                🧾 My Orders
            </h2>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500">No orders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm bg-white rounded shadow">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    🏪 Market
                                </th>
                                <th className="px-4 py-3 text-left">
                                    🧺 Items
                                </th>
                                <th className="px-4 py-3 text-left">
                                    💰 Total
                                </th>
                                <th className="px-4 py-3 text-left">
                                    🧑‍💼 Seller
                                </th>
                                <th className="px-4 py-3 text-left">📅 Date</th>
                                <th className="px-4 py-3 text-left">
                                    🟡 Status
                                </th>
                                <th className="px-4 py-3 text-left">
                                    ⚙️ Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => {
                                return (
                                    <tr
                                        key={order._id}
                                        className="border-t border-gray-200 hover:bg-gray-50"
                                    >
                                        {/* 🏪 Market */}
                                        <td className="px-4 py-3">
                                            <div className="font-medium">
                                                {order.market}
                                            </div>
                                            <div className="text-xs text-gray-500">
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
                                        <td className="px-4 py-3 font-semibold">
                                            ৳{order.totalPrice?.toFixed(2)}
                                        </td>

                                        {/* 🧑‍💼 Seller */}
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={order.seller?.image}
                                                    alt="seller"
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <span>
                                                    {order.seller?.name}
                                                </span>
                                            </div>
                                        </td>

                                        {/* 📅 Created At */}
                                        <td className="px-4 py-3">
                                            {new Date(
                                                order.createdAt,
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
                                                    className="text-gray-500 text-sm px-3 py-1 bg-gray-200 rounded cursor-not-allowed"
                                                    disabled
                                                >
                                                    ✅ Paid
                                                </button>
                                            ) : (
                                                <button
                                                    className="px-2 py-1 font-medium bg-primary cursor-pointer text-secondary btn-xs rounded"
                                                    onClick={() =>
                                                        setSelectedOrder(order)
                                                    }
                                                >
                                                    💳 Pay Now
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {selectedOrder && (
                        <PayNowModal
                            isOpen={!!selectedOrder}
                            order={selectedOrder}
                            onClose={() => setSelectedOrder(null)}
                            onPaymentUpdate={(updatedOrderId) => {
                                setOrders((prevOrders) =>
                                    prevOrders.map((order) =>
                                        order._id === updatedOrderId
                                            ? { ...order, status: 'paid' }
                                            : order,
                                    ),
                                );
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
