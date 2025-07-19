import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../shared/Loading';
import { useState } from 'react';

const AllOrders = () => {
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading } = useQuery({
        queryKey: ['orders', page],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/orders?page=${page}&limit=${limit}`,
            );
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    const orders = data.orders || [];
    const totalPages = Math.ceil(data.totalOrders / limit);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Orders</h2>
            <div className="overflow-x-auto">
                <table className="table w-full border border-green-100">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Buyer</th>
                            <th>Product</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Market</th>
                            <th>Seller</th>
                            <th>Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, i) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td>{(page - 1) * limit + i + 1}</td>
                                <td>{order.customer?.name || 'N/A'}</td>
                                <td>
                                    {order.items.map((p) => p.name).join(', ')}
                                </td>
                                <td>৳{order.totalPrice}</td>
                                <td>{order.status}</td>
                                <td>
                                    <p className="font-semibold">
                                        {order.market}
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm font-medium">
                                        {order.seller?.name}
                                    </p>
                                </td>
                                <td>
                                    <p className="text-xs text-gray-500">
                                        {new Date(
                                            order.createdAt,
                                        ).toLocaleString()}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination buttons */}
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40  rounded px-4 py-4 flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`btn btn-sm transition-transform duration-300 ${
                            page === i + 1
                                ? 'bg-primary text-secondary scale-110'
                                : 'bg-gray-200 text-black hover:scale-105'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllOrders;
