import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../shared/Loading';
import useAuth from '../../../hooks/useAuth';

const WatchlistManager = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = useAuth();

    const { data: watchlist = [], isLoading } = useQuery({
        queryKey: ['watchlist', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/watchlist');
            return res.data;
        },
        enabled: !!user?.email, 
    });
    console.log(watchlist)

    const removeMutation = useMutation({
        mutationFn: async (id) => await axiosSecure.delete(`/watchlist/${id}`),
        onSuccess: () => {
            toast.success('Removed from watchlist!');
            queryClient.invalidateQueries(['watchlist']);
        },
        onError: () => toast.error('Failed to remove from watchlist'),
    });

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 bg-white rounded ">
            <h2 className="text-xl font-semibold mb-4">🛠️ Manage Watchlist</h2>
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left border-b">
                        <th className="p-2">Product</th>
                        <th className="p-2">Market</th>
                        <th className="p-2">Date</th>
                        {/* <th className="p-2">Details</th> */}
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {watchlist.map((item) => (
                        <tr
                            key={item._id}
                            className="border-b border-b-gray-300 hover:bg-gray-50"
                        >
                            <td className="p-2 font-medium">
                                {item.items
                                    .map((product) => product.name)
                                    .join(', ')}
                            </td>
                            <td className="p-2">{item.market}</td>
                            <td className="p-2">{item.date}</td>
                            {/* <td>
                                <Link to={`/market/${item._id}`}>View more</Link>
                            </td> */}
                            <td className="p-2 space-x-2">
                                <Link
                                    to="/allProducts"
                                    className="px-2 py-1 bg-primary text-secondary rounded text-xs"
                                >
                                    ➕ Add More
                                </Link>
                                <button
                                    onClick={() =>
                                        removeMutation.mutate(item._id)
                                    }
                                    className="px-2 py-1 cursor-pointer bg-red-500 text-white rounded text-xs"
                                >
                                    ❌ Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WatchlistManager;
