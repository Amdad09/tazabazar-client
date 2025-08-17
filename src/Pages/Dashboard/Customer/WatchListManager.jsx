import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../shared/Loading';

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
        <div className="container mx-auto px-4 sm:px-8">
            <h2 className="text-2xl font-bold text-center py-12 text-primary">
                🛠️ Manage Watchlist
            </h2>

            {watchlist.length === 0 ? (
                <p className="text-center  0">No Watchlist found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-[600px] w-full text-sm">
                        <thead>
                            <tr className="  text-left">
                                <th className="p-2">Image</th>
                                <th className="p-2">Product</th>
                                <th className="p-2">Market</th>
                                <th className="p-2">Date</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {watchlist.map((item) => (
                                <tr
                                    key={item._id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="p-2">
                                        <img
                                            className="w-10 h-10 rounded object-cover"
                                            src={item.image}
                                            alt="Product"
                                        />
                                    </td>
                                    <td className="p-2 font-medium">
                                        {item.items.name}
                                    </td>
                                    <td className="p-2">{item.market}</td>
                                    <td className="p-2">{item.date}</td>
                                    <td className="p-2">
                                        <div className="flex gap-2">
                                            <Link
                                                to="/allProducts"
                                                className="px-2 btn btn-xs py-1 bg-primary text-white rounded text-xs text-center"
                                            >
                                                ➕ Add More
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    removeMutation.mutate(
                                                        item._id,
                                                    )
                                                }
                                                className="px-2 btn btn-xs py-1 bg-red-500 text-white rounded text-xs"
                                            >
                                                ❌ Remove
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default WatchlistManager;
