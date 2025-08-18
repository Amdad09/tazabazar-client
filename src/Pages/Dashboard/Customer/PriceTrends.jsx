import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const TrackedPriceTrends = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const axiosSecure = useAxiosSecure();
    const { data = [], isLoading } = useQuery({
        queryKey: ['trackedItems'],
        queryFn: async () => {
            const res = await axiosSecure.get('/watchlist');
            return res.data;
        },
    });
    console.log(data);

    useEffect(() => {
        if (data.length && !selectedItem) {
            setSelectedItem(data[0]);
        }
    }, [data]);

    if (isLoading) return <p>Loading...</p>;

    if (!isLoading && data.length === 0) {
        return (
            <div className="text-center py-12  0 text-lg">
                No tracked items found.
            </div>
        );
    }

    console.log('Selected:', selectedItem?._id);
    // console.log('Item:', item.items._id);

    return (
        <div className=" my-12">
            <div className="flex flex-wrap gap-2 mb-4">
                {data.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedItem(item)}
                        className={`px-4 py-2 rounded cursor-pointer ${
                            selectedItem?._id === item._id
                                ? 'bg-primary text-secondary'
                                : 'bg-gray-200 text-primary'
                        }`}
                    >
                        {item.items.name}
                    </button>
                ))}
            </div>
            {selectedItem && (
                <div className="  pr-3 md:p-4 rounded">
                    <h2 className="text-xl font-medium mb-5">
                        <p className="font-semibold">{selectedItem.market}</p>
                        {selectedItem.items.name}:{' '}
                        <p className="mt-4">
                            <img
                                className="w-28 h-28 md:w-40 md:h-40 ml-12"
                                src={selectedItem.image}
                                alt="Product image"
                            />
                        </p>
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={selectedItem.items.priceHistory}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="teal"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default TrackedPriceTrends;
