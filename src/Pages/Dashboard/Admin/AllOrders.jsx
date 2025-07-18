import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../shared/Loading';

const AllOrders = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: orders = [],
        isLoading,
    } = useQuery({
        queryKey: ['all-orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orders');
            return res.data;
        },
    });
    if (isLoading) return <Loading />
    
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
                            <th>seller</th>
                            <th>Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, i) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td>{i + 1}</td>
                                <td>{order.customer?.name || 'N/A'}</td>
                                <td>
                                    {/* <ul className="list-disc ml-4">
                                        {order.items?.map((item, index) => )}
                                    </ul> */}
                                    {order.items
                                        .map((product) => product.name)
                                        .join(', ')}
                                </td>
                                <td>৳{order.totalPrice}</td>
                                <td>{order.status}</td>
                                <td>
                                    <p className="font-semibold">
                                        {order.market}
                                    </p>
                                </td>
                                <td>
                                    <div>
                                        <p className="text-sm font-medium">
                                            {order.seller?.name}
                                        </p>
                                    </div>
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
        </div>
    );
};

export default AllOrders;
